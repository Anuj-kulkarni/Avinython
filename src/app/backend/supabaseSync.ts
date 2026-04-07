import supabase, { isSupabaseConfigured } from "../../supabaseClient";
import {
  db,
  type InventoryRecord,
  type WorkerRecord,
  type SupplierRecord,
  type InvoiceRecord,
} from "../data/localDb";

type RemoteInventoryRecord = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  site: string;
  supplier: string;
  date: string;
  status: InventoryRecord["status"];
  trend: string;
  created_at: string;
};

type RemoteWorkerRecord = {
  id: string;
  name: string;
  role: string;
  contact: string;
  email: string;
  address: string;
  joining_date: string;
  hourly_rate: number;
  status: WorkerRecord["status"];
  hours_this_week: number;
  rating: number;
  created_at: string;
};

type RemoteSupplierRecord = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  materials: string[];
  rating: number;
  orders: number;
  avg_cost: SupplierRecord["avgCost"];
  reliability: number;
  is_recommended: boolean;
  created_at: string;
};

type RemoteInvoiceRecord = {
  id: string;
  supplier: string;
  amount: number;
  status: InvoiceRecord["status"];
  date: string;
  category: string;
  created_at: string;
};

function toRemoteInventory(record: InventoryRecord): RemoteInventoryRecord {
  return {
    id: record.id,
    name: record.name,
    quantity: record.quantity,
    unit: record.unit,
    site: record.site,
    supplier: record.supplier,
    date: record.date,
    status: record.status,
    trend: record.trend,
    created_at: record.createdAt,
  };
}

function toLocalInventory(record: RemoteInventoryRecord): InventoryRecord {
  return {
    id: record.id,
    name: record.name,
    quantity: record.quantity,
    unit: record.unit,
    site: record.site,
    supplier: record.supplier,
    date: record.date,
    status: record.status,
    trend: record.trend,
    createdAt: record.created_at,
  };
}

function toRemoteWorker(record: WorkerRecord): RemoteWorkerRecord {
  return {
    id: record.id,
    name: record.name,
    role: record.role,
    contact: record.contact,
    email: record.email,
    address: record.address,
    joining_date: record.joiningDate,
    hourly_rate: record.hourlyRate,
    status: record.status,
    hours_this_week: record.hoursThisWeek,
    rating: record.rating,
    created_at: record.createdAt,
  };
}

function toLocalWorker(record: RemoteWorkerRecord): WorkerRecord {
  return {
    id: record.id,
    name: record.name,
    role: record.role,
    contact: record.contact,
    email: record.email,
    address: record.address,
    joiningDate: record.joining_date,
    hourlyRate: record.hourly_rate,
    status: record.status,
    hoursThisWeek: record.hours_this_week,
    rating: record.rating,
    createdAt: record.created_at,
  };
}

function toRemoteSupplier(record: SupplierRecord): RemoteSupplierRecord {
  return {
    id: record.id,
    name: record.name,
    contact: record.contact,
    phone: record.phone,
    email: record.email,
    location: record.location,
    materials: record.materials,
    rating: record.rating,
    orders: record.orders,
    avg_cost: record.avgCost,
    reliability: record.reliability,
    is_recommended: record.isRecommended,
    created_at: record.createdAt,
  };
}

function toLocalSupplier(record: RemoteSupplierRecord): SupplierRecord {
  return {
    id: record.id,
    name: record.name,
    contact: record.contact,
    phone: record.phone,
    email: record.email,
    location: record.location,
    materials: record.materials,
    rating: record.rating,
    orders: record.orders,
    avgCost: record.avg_cost,
    reliability: record.reliability,
    isRecommended: record.is_recommended,
    createdAt: record.created_at,
  };
}

function toRemoteInvoice(record: InvoiceRecord): RemoteInvoiceRecord {
  return {
    id: record.id,
    supplier: record.supplier,
    amount: record.amount,
    status: record.status,
    date: record.date,
    category: record.category,
    created_at: record.createdAt,
  };
}

function toLocalInvoice(record: RemoteInvoiceRecord): InvoiceRecord {
  return {
    id: record.id,
    supplier: record.supplier,
    amount: record.amount,
    status: record.status,
    date: record.date,
    category: record.category,
    createdAt: record.created_at,
  };
}

export async function upsertInventoryRemote(record: InventoryRecord): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.from("inventory_records").upsert([toRemoteInventory(record)], {
    onConflict: "id",
  });
  if (error) {
    throw error;
  }
}

export async function upsertWorkerRemote(record: WorkerRecord): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.from("worker_records").upsert([toRemoteWorker(record)], {
    onConflict: "id",
  });
  if (error) {
    throw error;
  }
}

export async function upsertSupplierRemote(record: SupplierRecord): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.from("supplier_records").upsert([toRemoteSupplier(record)], {
    onConflict: "id",
  });
  if (error) {
    throw error;
  }
}

export async function upsertInvoiceRemote(record: InvoiceRecord): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.from("invoice_records").upsert([toRemoteInvoice(record)], {
    onConflict: "id",
  });
  if (error) {
    throw error;
  }
}

async function pushLocalToRemote(): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const [inventory, workers, suppliers, invoices] = await Promise.all([
    db.inventory.toArray(),
    db.workers.toArray(),
    db.suppliers.toArray(),
    db.invoices.toArray(),
  ]);

  if (inventory.length > 0) {
    const { error } = await supabase
      .from("inventory_records")
      .upsert(inventory.map(toRemoteInventory), { onConflict: "id" });
    if (error) {
      throw error;
    }
  }

  if (workers.length > 0) {
    const { error } = await supabase
      .from("worker_records")
      .upsert(workers.map(toRemoteWorker), { onConflict: "id" });
    if (error) {
      throw error;
    }
  }

  if (suppliers.length > 0) {
    const { error } = await supabase
      .from("supplier_records")
      .upsert(suppliers.map(toRemoteSupplier), { onConflict: "id" });
    if (error) {
      throw error;
    }
  }

  if (invoices.length > 0) {
    const { error } = await supabase
      .from("invoice_records")
      .upsert(invoices.map(toRemoteInvoice), { onConflict: "id" });
    if (error) {
      throw error;
    }
  }
}

async function pullRemoteToLocal(): Promise<void> {
  if (!isSupabaseConfigured) {
    return;
  }
  const [inventoryRes, workersRes, suppliersRes, invoicesRes] = await Promise.all([
    supabase.from("inventory_records").select("*"),
    supabase.from("worker_records").select("*"),
    supabase.from("supplier_records").select("*"),
    supabase.from("invoice_records").select("*"),
  ]);

  if (inventoryRes.error) {
    throw inventoryRes.error;
  }
  if (workersRes.error) {
    throw workersRes.error;
  }
  if (suppliersRes.error) {
    throw suppliersRes.error;
  }
  if (invoicesRes.error) {
    throw invoicesRes.error;
  }

  const inventory = (inventoryRes.data ?? []) as RemoteInventoryRecord[];
  const workers = (workersRes.data ?? []) as RemoteWorkerRecord[];
  const suppliers = (suppliersRes.data ?? []) as RemoteSupplierRecord[];
  const invoices = (invoicesRes.data ?? []) as RemoteInvoiceRecord[];

  await db.transaction("rw", db.inventory, db.workers, db.suppliers, db.invoices, async () => {
    if (inventory.length > 0) {
      await db.inventory.bulkPut(inventory.map(toLocalInventory));
    }
    if (workers.length > 0) {
      await db.workers.bulkPut(workers.map(toLocalWorker));
    }
    if (suppliers.length > 0) {
      await db.suppliers.bulkPut(suppliers.map(toLocalSupplier));
    }
    if (invoices.length > 0) {
      await db.invoices.bulkPut(invoices.map(toLocalInvoice));
    }
  });
}

let syncInProgress = false;

export async function runSupabaseSync(): Promise<void> {
  if (!isSupabaseConfigured || syncInProgress) {
    return;
  }
  syncInProgress = true;
  try {
    await pushLocalToRemote();
    await pullRemoteToLocal();
  } catch (error) {
    console.warn("Supabase sync failed. Continuing in local mode.", error);
  } finally {
    syncInProgress = false;
  }
}
