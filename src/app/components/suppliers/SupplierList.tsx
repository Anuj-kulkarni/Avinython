import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  Star,
  TrendingDown,
  Sparkles,
  Award,
  ThumbsUp,
  UserPlus,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/localDb";

const COST_COLORS: Record<string, string> = {
  Low: "bg-green-50 text-green-700 border-green-100",
  Medium: "bg-yellow-50 text-yellow-700 border-yellow-100",
  High: "bg-orange-50 text-orange-700 border-orange-100",
};

export function SupplierList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const suppliers = useLiveQuery(() => db.suppliers.reverse().sortBy("createdAt"), []);

  const filteredSuppliers = useMemo(() => {
    const data = suppliers ?? [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return data;
    }
    return data.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.materials.some((m) => m.toLowerCase().includes(query)),
    );
  }, [suppliers, searchTerm]);

  const recommendedSuppliers = filteredSuppliers.filter(
    (s) => s.isRecommended || (s.rating >= 4.7 && s.reliability >= 95),
  );
  const avgRating =
    suppliers && suppliers.length > 0
      ? (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Suppliers</h1>
          <Link
            to="/suppliers/add"
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100"
          >
            <UserPlus size={18} />
          </Link>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all shadow-sm"
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

      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-[32px] p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-900/60">AI Supplier Recommendations</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-indigo-900 leading-none">Best Value Suppliers</h4>
              <p className="text-xs text-indigo-800/70 mt-1.5 font-medium leading-relaxed">
                {recommendedSuppliers.length} suppliers currently match high reliability and strong ratings.
              </p>
            </div>
            <div className="shrink-0 w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <Award size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {recommendedSuppliers.slice(0, 2).map((supplier) => (
              <div key={supplier.id} className="p-3 bg-indigo-100/50 rounded-2xl border border-indigo-200">
                <div className="flex items-center gap-1.5 mb-1">
                  <ThumbsUp size={12} className="text-indigo-700" />
                  <span className="text-[10px] font-black text-indigo-900 uppercase tracking-tight">Top Pick</span>
                </div>
                <p className="text-xs font-bold text-indigo-900 truncate">{supplier.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={10} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-[10px] font-black text-indigo-700">{supplier.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total" value={(suppliers?.length ?? 0).toString()} color="bg-indigo-50 text-indigo-600" />
        <StatCard
          title="Avg Rating"
          value={avgRating}
          color="bg-yellow-50 text-yellow-600"
          icon={<Star size={14} className="fill-current" />}
        />
        <StatCard title="Active" value={(suppliers?.length ?? 0).toString()} color="bg-green-50 text-green-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">All Suppliers</h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">
            {filteredSuppliers.length} Suppliers
          </span>
        </div>

        {suppliers === undefined && (
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm text-sm font-semibold text-gray-500">
            Loading suppliers...
          </div>
        )}

        {filteredSuppliers.map((supplier) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm active:scale-[0.98] transition-all group relative overflow-hidden"
          >
            {(supplier.isRecommended || (supplier.rating >= 4.7 && supplier.reliability >= 95)) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <Award size={10} />
                <span className="text-[9px] font-black uppercase tracking-tight">AI Pick</span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white">
                <Building2 size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2 pr-16">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">{supplier.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{supplier.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-600">
                    {supplier.contact
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0] ?? "")
                      .join("")}
                  </div>
                  <span className="text-xs font-bold text-gray-600">{supplier.contact}</span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                    <Phone size={12} className="text-gray-400" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold truncate">
                    <Mail size={12} className="text-gray-400 shrink-0" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                    <MapPin size={12} className="text-gray-400" />
                    <span>{supplier.location}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Package size={11} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Materials</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.materials.map((material) => (
                      <span
                        key={material}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-black text-gray-900">{supplier.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Rating</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div
                      className={`inline-flex items-center gap-1 self-start px-2 py-0.5 rounded-lg border text-[10px] font-black ${
                        COST_COLORS[supplier.avgCost] || "bg-gray-50 text-gray-700 border-gray-100"
                      }`}
                    >
                      <TrendingDown size={10} />
                      {supplier.avgCost}
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Cost</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black text-gray-900">{supplier.reliability}%</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Reliable</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-gray-500 font-bold">{supplier.orders} orders completed</div>
              </div>

              <ChevronRight size={16} className="text-gray-300 ml-1 mt-3" />
            </div>
          </motion.div>
        ))}

        {suppliers && filteredSuppliers.length === 0 && (
          <div className="py-16 text-center">
            <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No suppliers found</p>
          </div>
        )}
      </div>

      <Link
        to="/suppliers/add"
        className="fixed bottom-24 right-5 w-16 h-16 bg-indigo-600 text-white rounded-[24px] shadow-xl shadow-indigo-200 flex items-center justify-center active:scale-90 transition-transform z-50 border-4 border-white"
      >
        <Plus size={28} strokeWidth={3} />
      </Link>

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
              <h3 className="text-xl font-black text-[#0F172A] mb-6">Filter Suppliers</h3>
              <p className="text-sm text-gray-500 mb-6">
                Search by supplier name or material. Advanced filters can be added next.
              </p>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-4 bg-indigo-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-transform"
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

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: string;
  color: string;
  icon?: ReactNode;
}) {
  return (
    <div className={`p-4 rounded-[20px] flex flex-col gap-2 ${color} shadow-sm`}>
      <div className="flex items-center gap-1">
        {icon && <span className="opacity-70">{icon}</span>}
        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{title}</span>
      </div>
      <span className="text-lg font-black">{value}</span>
    </div>
  );
}
