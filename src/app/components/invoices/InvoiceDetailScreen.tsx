import { ChevronLeft, Download, CheckCircle, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/localDb";
import { markInvoiceAsPaid } from "../../data/repository";
import { toast } from "sonner";

export function InvoiceDetail() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const invoice = useLiveQuery(
    async () => {
      if (!invoiceId) {
        return null;
      }
      return db.invoices.get(invoiceId);
    },
    [invoiceId],
  );

  const handleMarkAsPaid = async () => {
    if (!invoice) {
      return;
    }
    try {
      await markInvoiceAsPaid(invoice.id);
      toast.success("Invoice marked as paid");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to mark invoice as paid";
      toast.error(message);
    }
  };

  const handleDownload = () => {
    if (!invoice) {
      return;
    }
    const content = [
      "BUILD AI - INVOICE",
      "",
      `Invoice ID: ${invoice.id}`,
      `Date: ${invoice.date}`,
      `Supplier: ${invoice.supplier}`,
      `Category: ${invoice.category}`,
      `Amount: INR ${invoice.amount.toLocaleString()}`,
      `Status: ${invoice.status}`,
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${invoice.id}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded");
  };

  if (invoice === undefined) {
    return <div className="p-8 text-sm font-semibold text-gray-500">Loading invoice...</div>;
  }

  if (!invoice) {
    return (
      <div className="p-8">
        <p className="text-sm font-semibold text-gray-500 mb-4">Invoice not found.</p>
        <button onClick={() => navigate("/invoices")} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
          Back to Invoices
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 active:scale-95 transition-transform">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Invoice Details</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-start justify-between mb-4 pb-4 border-b-2 border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-gray-900 text-lg">{invoice.id}</h2>
              </div>
              <p className="text-sm text-gray-600">{invoice.date}</p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                invoice.status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
              }`}
            >
              {invoice.status}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Supplier</p>
            <p className="font-bold text-gray-900 text-lg">{invoice.supplier}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-bold text-gray-900">{invoice.category}</p>
          </div>

          <div className="pt-4 border-t-2 border-gray-100">
            <div className="flex justify-between items-center">
              <p className="font-bold text-gray-900 text-lg">Total Amount</p>
              <p className="font-bold text-blue-600 text-2xl">₹{invoice.amount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200 space-y-2">
        <button
          onClick={handleDownload}
          className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </button>
        {invoice.status !== "Paid" && (
          <button
            onClick={handleMarkAsPaid}
            className="w-full py-4 bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Paid
          </button>
        )}
      </div>
    </div>
  );
}
