
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { bootstrapDatabase } from "./app/data/localDb";
  import { initializeBackendSync } from "./app/data/repository";
  import "./styles/index.css";

  void (async () => {
    await bootstrapDatabase();
    await initializeBackendSync();
    window.addEventListener("online", () => {
      void initializeBackendSync();
    });
    window.setInterval(() => {
      void initializeBackendSync();
    }, 60_000);
  })();
  createRoot(document.getElementById("root")!).render(<App />);
  
