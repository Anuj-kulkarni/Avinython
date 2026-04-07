import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Package,
  ArrowUpRight,
  BrainCircuit,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/localDb";

const PREDICTION_DATA = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 150 },
  { day: "Wed", usage: 180 },
  { day: "Thu", usage: 220 },
  { day: "Fri", usage: 200 },
  { day: "Sat", usage: 140 },
  { day: "Sun", usage: 90 },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const inventoryData = useLiveQuery(() => db.inventory.reverse().sortBy("createdAt"), []);

  const filteredInventory = useMemo(() => {
    const data = inventoryData ?? [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return data;
    }
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.site.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query),
    );
  }, [inventoryData, searchTerm]);

  const totalCategories = useMemo(
    () => new Set((inventoryData ?? []).map((item) => item.name)).size,
    [inventoryData],
  );
  const lowCount = useMemo(
    () => (inventoryData ?? []).filter((item) => item.status === "Low").length,
    [inventoryData],
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Inventory</h1>
          <Link
            to="/inventory/analytics"
            className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-blue-600 shadow-sm"
          >
            <BarChart2 size={18} />
          </Link>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search materials..."
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

      <section className="bg-orange-50/50 border border-orange-100 rounded-[32px] p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <BrainCircuit size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-orange-900/60">AI Smart Refill</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-black text-orange-900 leading-none">
              {lowCount > 0 ? `${lowCount} low-stock material(s)` : "Stock levels healthy"}
            </h4>
            <p className="text-xs text-orange-800/70 mt-1.5 font-medium leading-relaxed">
              Add new deliveries from suppliers to keep all project sites stocked and prevent delays.
            </p>
          </div>
          <Link
            to="/inventory/add"
            className="shrink-0 w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 active:scale-90 transition-transform"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Active Stock</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">
            {totalCategories} Categories
          </span>
        </div>

        {inventoryData === undefined && (
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm text-sm font-semibold text-gray-500">
            Loading inventory...
          </div>
        )}

        {filteredInventory.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all group"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                item.status === "Low" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
              }`}
            >
              <Package size={22} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className="text-sm font-black text-gray-900 truncate">{item.name}</h4>
                <span
                  className={`text-[10px] font-black uppercase tracking-tighter ${
                    item.status === "Low" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-bold">
                  {item.quantity} {item.unit}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.site}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-300" />
                  <span
                    className={`text-[10px] font-bold ${
                      item.trend.startsWith("+")
                        ? "text-green-600"
                        : item.trend.startsWith("-")
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.trend}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 ml-1" />
          </motion.div>
        ))}

        {inventoryData && filteredInventory.length === 0 && (
          <div className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm text-sm font-semibold text-gray-500">
            No materials found.
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-bold text-[#0F172A] text-sm">Predicted Usage Trend</h3>
          <TrendingUp size={16} className="text-blue-600" />
        </div>
        <div className="h-[120px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} id="inventory-usage-container">
            <BarChart data={PREDICTION_DATA} id="inventory-usage-chart">
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#F1F5F9" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  fontSize: "10px",
                }}
              />
              <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                {PREDICTION_DATA.map((entry, index) => (
                  <Cell key={`inventory-cell-${entry.day}-${index}`} fill={entry.usage > 180 ? "#F97316" : "#3B82F6"} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-gray-400 font-bold text-center mt-4 uppercase tracking-widest">
          Expected consumption: Next 7 days
        </p>
      </div>

      <Link
        to="/inventory/add"
        className="fixed bottom-24 right-5 w-16 h-16 bg-blue-600 text-white rounded-[24px] shadow-xl shadow-blue-200 flex items-center justify-center active:scale-90 transition-transform z-50 border-4 border-white"
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
              <h3 className="text-xl font-black text-[#0F172A] mb-6">Filter Materials</h3>
              <p className="text-sm text-gray-500 mb-6">
                Search already filters your data instantly. More advanced filters can be added next.
              </p>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-4 bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-blue-100 active:scale-95 transition-transform"
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
