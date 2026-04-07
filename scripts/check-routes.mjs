import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const routesFile = path.join(projectRoot, "src", "app", "routes.tsx");
const srcRoot = path.join(projectRoot, "src");

function normalizePath(value) {
  if (!value || value === "/") {
    return "/";
  }
  let out = value.replace(/\\/g, "/").replace(/\/+/g, "/");
  if (!out.startsWith("/")) {
    out = `/${out}`;
  }
  if (out.length > 1 && out.endsWith("/")) {
    out = out.slice(0, -1);
  }
  return out;
}

function joinPath(base, segment) {
  if (!segment || segment === ".") {
    return normalizePath(base);
  }
  return normalizePath(`${normalizePath(base)}/${segment}`);
}

function getStringProperty(objectLiteral, propertyName) {
  for (const prop of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }
    if (prop.name.getText() !== propertyName) {
      continue;
    }
    if (ts.isStringLiteral(prop.initializer)) {
      return prop.initializer.text;
    }
  }
  return undefined;
}

function getBooleanProperty(objectLiteral, propertyName) {
  for (const prop of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }
    if (prop.name.getText() !== propertyName) {
      continue;
    }
    if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
      return true;
    }
  }
  return false;
}

function getChildrenProperty(objectLiteral) {
  for (const prop of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }
    if (prop.name.getText() !== "children") {
      continue;
    }
    if (ts.isArrayLiteralExpression(prop.initializer)) {
      return prop.initializer;
    }
  }
  return undefined;
}

function collectRoutes(routeObject, parentPaths, allPaths) {
  const pathValue = getStringProperty(routeObject, "path");
  const isIndexRoute = getBooleanProperty(routeObject, "index");
  let currentPaths = parentPaths;

  if (typeof pathValue === "string") {
    if (pathValue !== "*" && !pathValue.includes("*")) {
      if (pathValue.startsWith("/")) {
        currentPaths = [normalizePath(pathValue)];
      } else {
        currentPaths = parentPaths.map((basePath) => joinPath(basePath, pathValue));
      }
      for (const resolvedPath of currentPaths) {
        allPaths.add(resolvedPath);
      }
    }
  } else if (isIndexRoute) {
    for (const resolvedPath of parentPaths) {
      allPaths.add(normalizePath(resolvedPath));
    }
  }

  const children = getChildrenProperty(routeObject);
  if (!children) {
    return;
  }
  for (const child of children.elements) {
    if (child && ts.isObjectLiteralExpression(child)) {
      collectRoutes(child, currentPaths, allPaths);
    }
  }
}

function routePatternToRegex(routePattern) {
  const escaped = routePattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:[^/]+/g, "[^/]+");
  return new RegExp(`^${escaped}$`);
}

function listFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(absolutePath));
      continue;
    }
    if (absolutePath.endsWith(".ts") || absolutePath.endsWith(".tsx")) {
      files.push(absolutePath);
    }
  }
  return files;
}

function extractRouteReferences(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const references = [];
  const patterns = [
    /navigate\(\s*["'`]([^"'`]+)["'`]/g,
    /\bto\s*=\s*["'`]([^"'`]+)["'`]/g,
  ];

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const line = lines[lineNumber];
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      let match = pattern.exec(line);
      while (match) {
        references.push({
          filePath,
          lineNumber: lineNumber + 1,
          rawPath: match[1],
        });
        match = pattern.exec(line);
      }
    }
  }
  return references;
}

function normalizeReferencePath(rawPath) {
  const withoutQuery = rawPath.split("?")[0].split("#")[0];
  const dynamicReplaced = withoutQuery.replace(/\$\{[^}]+\}/g, ":param");
  return normalizePath(dynamicReplaced);
}

if (!fs.existsSync(routesFile)) {
  console.error("Route file not found:", routesFile);
  process.exit(1);
}

const routesSource = fs.readFileSync(routesFile, "utf8");
const sourceFile = ts.createSourceFile(
  routesFile,
  routesSource,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);

let routerArrayLiteral;

function findRouterDeclaration(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === "router") {
    const initializer = node.initializer;
    if (
      initializer &&
      ts.isCallExpression(initializer) &&
      initializer.arguments.length > 0 &&
      ts.isArrayLiteralExpression(initializer.arguments[0])
    ) {
      routerArrayLiteral = initializer.arguments[0];
    }
  }
  ts.forEachChild(node, findRouterDeclaration);
}

findRouterDeclaration(sourceFile);

if (!routerArrayLiteral) {
  console.error("Could not find createBrowserRouter([...]) declaration in routes.tsx");
  process.exit(1);
}

const declaredRoutes = new Set();
for (const element of routerArrayLiteral.elements) {
  if (element && ts.isObjectLiteralExpression(element)) {
    collectRoutes(element, ["/"], declaredRoutes);
  }
}

const declaredPatterns = [...declaredRoutes]
  .filter((routePath) => routePath !== "/" && !routePath.includes("*"))
  .map((routePath) => ({
    routePath,
    regex: routePatternToRegex(routePath),
  }));

const missing = [];
const scannedFiles = listFiles(srcRoot);

for (const filePath of scannedFiles) {
  const references = extractRouteReferences(filePath);
  for (const ref of references) {
    if (!ref.rawPath.startsWith("/")) {
      continue;
    }
    if (ref.rawPath.includes("://")) {
      continue;
    }

    const normalizedPath = normalizeReferencePath(ref.rawPath);
    if (normalizedPath === "/") {
      continue;
    }

    const isMatch = declaredPatterns.some((pattern) => pattern.regex.test(normalizedPath));
    if (!isMatch) {
      missing.push({
        filePath,
        lineNumber: ref.lineNumber,
        rawPath: ref.rawPath,
      });
    }
  }
}

if (missing.length > 0) {
  console.error("Route reference check failed. Missing router paths:");
  for (const issue of missing) {
    const rel = path.relative(projectRoot, issue.filePath).replace(/\\/g, "/");
    console.error(` - ${rel}:${issue.lineNumber} -> ${issue.rawPath}`);
  }
  process.exit(1);
}

console.log(
  `Route check passed. Validated ${declaredRoutes.size} declared paths across ${scannedFiles.length} files.`,
);
