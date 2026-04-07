import { createId, db, type InventoryRecord, type WorkerRecord, type SupplierRecord, type InvoiceRecord } from "./localDb";
import {
  runSupabaseSync,
  upsertInventoryRemote,
  upsertWorkerRemote,
  upsertSupplierRemote,
  upsertInvoiceRemote,
} from "../backend/supabaseSync";

export async function initializeBackendSync(): Promise<void> {
  await runSupabaseSync();
}

export async function createInventoryRecord(
  payload: Omit<InventoryRecord, "id" | "createdAt" | "trend"> & { trend?: string },
): Promise<InventoryRecord> {
  const record: InventoryRecord = {
    ...payload,
    id: createId("MAT"),
    trend: payload.trend ?? "0%",
    createdAt: new Date().toISOString(),
  };
  await db.inventory.put(record);
  void upsertInventoryRemote(record).catch((error) => {
    console.warn("Failed to sync inventory record.", error);
  });
  return record;
}

export async function createWorkerRecord(payload: Omit<WorkerRecord, "id" | "createdAt">): Promise<WorkerRecord> {
  const record: WorkerRecord = {
    ...payload,
    id: createId("W"),
    createdAt: new Date().toISOString(),
  };
  await db.workers.put(record);
  void upsertWorkerRemote(record).catch((error) => {
    console.warn("Failed to sync worker record.", error);
  });
  return record;
}

export async function createSupplierRecord(
  payload: Omit<SupplierRecord, "id" | "createdAt">,
): Promise<SupplierRecord> {
  const record: SupplierRecord = {
    ...payload,
    id: createId("SUP"),
    createdAt: new Date().toISOString(),
  };
  await db.suppliers.put(record);
  void upsertSupplierRemote(record).catch((error) => {
    console.warn("Failed to sync supplier record.", error);
  });
  return record;
}

export async function createOrUpdateInvoiceRecord(
  payload: Omit<InvoiceRecord, "createdAt"> & { createdAt?: string },
): Promise<InvoiceRecord> {
  const record: InvoiceRecord = {
    ...payload,
    createdAt: payload.createdAt ?? new Date().toISOString(),
  };
  await db.invoices.put(record);
  void upsertInvoiceRemote(record).catch((error) => {
    console.warn("Failed to sync invoice record.", error);
  });
  return record;
}

export async function markInvoiceAsPaid(invoiceId: string): Promise<void> {
  const existing = await db.invoices.get(invoiceId);
  if (!existing) {
    return;
  }
  const updated: InvoiceRecord = {
    ...existing,
    status: "Paid",
  };
  await db.invoices.put(updated);
  void upsertInvoiceRemote(updated).catch((error) => {
    console.warn("Failed to sync invoice status.", error);
  });
}
