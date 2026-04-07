import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Upload,
  Camera,
  Sparkles,
  Copy,
  Calendar,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/localDb";

export function InvoiceList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const invoices = useLiveQuery(() => db.invoices.reverse().sortBy("createdAt"), []);

  const filteredInvoices = useMemo(() => {
    const data = invoices ?? [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return data;
    }
    return data.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(query) ||
        invoice.supplier.toLowerCase().includes(query) ||
        invoice.category.toLowerCase().includes(query),
    );
  }, [invoices, searchTerm]);

  const totals = useMemo(() => {
    const data = invoices ?? [];
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const pending = data.filter((item) => item.status === "Pending").reduce((sum, item) => sum + item.amount, 0);
    const paid = data.filter((item) => item.status === "Paid").reduce((sum, item) => sum + item.amount, 0);
    return { total, pending, paid };
  }, [invoices]);

  const handleFileUpload = (_file: File) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsUploadOpen(false);
      toast.success("Invoice detected! Data auto-filled.", {
        description: "Open upload screen to review and save it.",
      });
      navigate("/invoices/upload");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Invoices</h1>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100"
          >
            <Upload size={18} />
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search invoices..."
              className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-500 shadow-sm active:scale-95 transition-transform"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <section className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-[32px] p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-purple-900/60">AI Invoice Scanner</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-purple-900 leading-none">Smart Detection Active</h4>
            <p className="text-xs text-purple-800/70 mt-1.5 font-medium leading-relaxed">
              Upload photos to auto-extract supplier, amount, and dates. Duplicate invoices are flagged instantly.
            </p>
          </div>
          <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Camera size={20} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total" value={`₹${totals.total.toLocaleString()}`} color="bg-blue-50 text-blue-600" />
        <StatCard title="Pending" value={`₹${totals.pending.toLocaleString()}`} color="bg-orange-50 text-orange-600" />
        <StatCard title="Paid" value={`₹${totals.paid.toLocaleString()}`} color="bg-green-50 text-green-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Recent Invoices</h3>
          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">
            {filteredInvoices.length} Records
          </span>
        </div>

        {invoices === undefined && (
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm text-sm font-semibold text-gray-500">
            Loading invoices...
          </div>
        )}

        {filteredInvoices.map((invoice) => (
          <motion.button
            type="button"
            onClick={() => navigate(`/invoice-detail/${invoice.id}`)}
            key={invoice.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full text-left bg-white p-5 rounded-[28px] border shadow-sm active:scale-[0.98] transition-all group ${
              invoice.status === "Duplicate" ? "border-red-200 bg-red-50/30" : "border-gray-100"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  invoice.status === "Paid"
                    ? "bg-green-50 text-green-600"
                    : invoice.status === "Duplicate"
                    ? "bg-red-50 text-red-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {invoice.status === "Paid" ? (
                  <CheckCircle2 size={22} />
                ) : invoice.status === "Duplicate" ? (
                  <Copy size={22} />
                ) : (
                  <Clock size={22} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-gray-900">{invoice.id}</h4>
                  <span
                    className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-lg ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : invoice.status === "Duplicate"
                        ? "bg-red-100 text-red-700 animate-pulse"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-bold truncate mb-2">{invoice.supplier}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-gray-900">₹{invoice.amount.toLocaleString()}</span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold">
                    <Calendar size={10} />
                    <span>{new Date(invoice.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </div>

                {invoice.status === "Duplicate" && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                    <AlertCircle size={12} className="text-red-600 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-red-700 font-bold leading-relaxed">
                      This invoice is marked duplicate. Review it before payment.
                    </p>
                  </div>
                )}
              </div>

              <ChevronRight size={16} className="text-gray-300 ml-1 mt-2" />
            </div>
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => setIsUploadOpen(true)}
        className="fixed bottom-24 right-5 w-16 h-16 bg-purple-600 text-white rounded-[24px] shadow-xl shadow-purple-200 flex items-center justify-center active:scale-90 transition-transform z-50 border-4 border-white"
      >
        <Plus size={28} strokeWidth={3} />
      </button>

      <AnimatePresence>
        {isUploadOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !uploading && setIsUploadOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[70] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />

              {uploading ? (
                <div className="py-12 flex flex-col items-center gap-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-16 h-16 border-4 border-purple-100 border-t-purple-600 rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-black text-[#0F172A] mb-2">AI Processing...</h3>
                    <p className="text-xs text-gray-500 font-bold">Extracting invoice data from image</p>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-black text-[#0F172A] mb-2">Upload Invoice</h3>
                  <p className="text-xs text-gray-500 font-bold mb-8">Take a photo or select from gallery</p>
                  <div className="space-y-4">
                    <button
                      onClick={() => handleFileUpload(new File(["invoice"], "invoice.jpg", { type: "image/jpeg" }))}
                      className="w-full py-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-sm font-black rounded-3xl shadow-xl shadow-purple-100 active:scale-95 transition-transform flex items-center justify-center gap-3 cursor-pointer"
                    >
                      <Camera size={22} strokeWidth={3} />
                      Auto-Scan Test Invoice
                    </button>
                    <Link to="/invoices/upload">
                      <div className="w-full py-6 bg-white border-2 border-gray-100 text-gray-900 text-sm font-black rounded-3xl active:scale-95 transition-transform flex items-center justify-center gap-3 cursor-pointer">
                        <Upload size={22} strokeWidth={3} />
                        Open Upload Screen
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[70] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8" />
              <h3 className="text-xl font-black text-[#0F172A] mb-6">Filter Invoices</h3>
              <p className="text-sm text-gray-500 mb-6">Search supports ID, supplier, and category filters instantly.</p>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-4 bg-purple-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-purple-100 active:scale-95 transition-transform"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className={`p-4 rounded-[20px] flex flex-col gap-2 ${color} shadow-sm`}>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{title}</span>
      <span className="text-lg font-black">{value}</span>
    </div>
  );
}
