import Dexie, { type Table } from "dexie";

export type InventoryStatus = "Normal" | "Low";
export type WorkerStatus = "Active" | "Inactive";
export type SupplierCost = "Low" | "Medium" | "High";
export type InvoiceStatus = "Paid" | "Pending" | "Duplicate";

export interface InventoryRecord {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  site: string;
  supplier: string;
  date: string;
  status: InventoryStatus;
  trend: string;
  createdAt: string;
}

export interface WorkerRecord {
  id: string;
  name: string;
  role: string;
  contact: string;
  email: string;
  address: string;
  joiningDate: string;
  hourlyRate: number;
  status: WorkerStatus;
  hoursThisWeek: number;
  rating: number;
  createdAt: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  materials: string[];
  rating: number;
  orders: number;
  avgCost: SupplierCost;
  reliability: number;
  isRecommended: boolean;
  createdAt: string;
}

export interface InvoiceRecord {
  id: string;
  supplier: string;
  amount: number;
  status: InvoiceStatus;
  date: string;
  category: string;
  createdAt: string;
}

class BuildAiDatabase extends Dexie {
  inventory!: Table<InventoryRecord, string>;
  workers!: Table<WorkerRecord, string>;
  suppliers!: Table<SupplierRecord, string>;
  invoices!: Table<InvoiceRecord, string>;

  constructor() {
    super("buildai_local_database");
    this.version(1).stores({
      inventory: "id,name,site,status,createdAt",
      workers: "id,name,role,status,createdAt",
      suppliers: "id,name,avgCost,rating,isRecommended,createdAt",
      invoices: "id,supplier,status,date,category,createdAt",
    });
  }
}

export const db = new BuildAiDatabase();

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

const seedInventory: InventoryRecord[] = [
  { id: "MAT-001", name: "Cement (OPC)", quantity: 1250, unit: "Bags", site: "Tower A", supplier: "Star Cement Industries", date: "2026-04-01", status: "Normal", trend: "+12%", createdAt: "2026-04-01T08:00:00.000Z" },
  { id: "MAT-002", name: "Steel Rebars (12mm)", quantity: 45, unit: "Tons", site: "Site B", supplier: "Steel Corp Ltd", date: "2026-04-02", status: "Low", trend: "-5%", createdAt: "2026-04-02T08:00:00.000Z" },
  { id: "MAT-003", name: "Sand (Fine)", quantity: 800, unit: "Cubic Ft", site: "Tower A", supplier: "BuildMax Suppliers", date: "2026-04-03", status: "Normal", trend: "+2%", createdAt: "2026-04-03T08:00:00.000Z" },
];

const seedWorkers: WorkerRecord[] = [
  { id: "W001", name: "Rajesh Kumar", role: "Mason", contact: "+91 98765 43210", email: "rajesh.k@buildai.com", address: "Noida", joiningDate: "2026-01-10", hourlyRate: 350, status: "Active", hoursThisWeek: 42, rating: 4.8, createdAt: "2026-01-10T08:00:00.000Z" },
  { id: "W002", name: "Amit Singh", role: "Electrician", contact: "+91 98765 43211", email: "amit.s@buildai.com", address: "Delhi", joiningDate: "2026-01-15", hourlyRate: 400, status: "Active", hoursThisWeek: 38, rating: 4.9, createdAt: "2026-01-15T08:00:00.000Z" },
  { id: "W003", name: "Priya Sharma", role: "Plumber", contact: "+91 98765 43212", email: "priya.s@buildai.com", address: "Gurgaon", joiningDate: "2026-02-01", hourlyRate: 370, status: "Inactive", hoursThisWeek: 0, rating: 4.7, createdAt: "2026-02-01T08:00:00.000Z" },
];

const seedSuppliers: SupplierRecord[] = [
  { id: "SUP001", name: "Star Cement Industries", contact: "Rajesh Mehta", phone: "+91 98765 43210", email: "rajesh@starcement.com", location: "Mumbai, MH", materials: ["Cement", "Concrete"], rating: 4.8, orders: 156, avgCost: "Low", reliability: 98, isRecommended: true, createdAt: "2026-01-01T08:00:00.000Z" },
  { id: "SUP002", name: "Steel Corp Ltd", contact: "Amit Singh", phone: "+91 98765 43211", email: "amit@steelcorp.com", location: "Pune, MH", materials: ["Steel", "Iron Rods"], rating: 4.9, orders: 243, avgCost: "Medium", reliability: 96, isRecommended: true, createdAt: "2026-01-02T08:00:00.000Z" },
  { id: "SUP003", name: "BuildMax Suppliers", contact: "Priya Sharma", phone: "+91 98765 43212", email: "priya@buildmax.com", location: "Delhi, DL", materials: ["Sand", "Gravel", "Bricks"], rating: 4.5, orders: 89, avgCost: "Low", reliability: 92, isRecommended: false, createdAt: "2026-01-03T08:00:00.000Z" },
];

const seedInvoices: InvoiceRecord[] = [
  { id: "INV-2026-001", supplier: "Star Cement Industries", amount: 45000, status: "Paid", date: "2026-03-28", category: "Materials", createdAt: "2026-03-28T08:00:00.000Z" },
  { id: "INV-2026-002", supplier: "Steel Corp Ltd", amount: 78500, status: "Pending", date: "2026-03-29", category: "Materials", createdAt: "2026-03-29T08:00:00.000Z" },
  { id: "INV-2026-003", supplier: "BuildMax Suppliers", amount: 32000, status: "Paid", date: "2026-03-30", category: "Equipment", createdAt: "2026-03-30T08:00:00.000Z" },
];

let bootstrapPromise: Promise<void> | null = null;

export function bootstrapDatabase(): Promise<void> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    await db.open();
    const [inventoryCount, workerCount, supplierCount, invoiceCount] = await Promise.all([
      db.inventory.count(),
      db.workers.count(),
      db.suppliers.count(),
      db.invoices.count(),
    ]);

    if (inventoryCount + workerCount + supplierCount + invoiceCount > 0) {
      return;
    }

    await db.transaction("rw", db.inventory, db.workers, db.suppliers, db.invoices, async () => {
      await db.inventory.bulkAdd(seedInventory);
      await db.workers.bulkAdd(seedWorkers);
      await db.suppliers.bulkAdd(seedSuppliers);
      await db.invoices.bulkAdd(seedInvoices);
    });
  })();

  return bootstrapPromise;
}
