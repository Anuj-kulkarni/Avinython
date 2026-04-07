import {
  Plus,
  Search,
  Filter,
  ChevronRight,
  Users,
  Phone,
  Mail,
  Briefcase,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
  Calendar,
  AlertTriangle,
  UserPlus,
} from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../data/localDb";

const ROLE_COLORS: Record<string, string> = {
  Mason: "bg-blue-50 text-blue-700 border-blue-100",
  Electrician: "bg-yellow-50 text-yellow-700 border-yellow-100",
  Plumber: "bg-cyan-50 text-cyan-700 border-cyan-100",
  Carpenter: "bg-orange-50 text-orange-700 border-orange-100",
  Painter: "bg-purple-50 text-purple-700 border-purple-100",
  "Site Supervisor": "bg-green-50 text-green-700 border-green-100",
};

export function WorkerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const workers = useLiveQuery(() => db.workers.reverse().sortBy("createdAt"), []);

  const filteredWorkers = useMemo(() => {
    const data = workers ?? [];
    const query = searchTerm.trim().toLowerCase();
    return data.filter((worker) => {
      const matchesSearch =
        query.length === 0 ||
        worker.name.toLowerCase().includes(query) ||
        worker.role.toLowerCase().includes(query);
      const matchesFilter =
        selectedFilter === "All" ||
        (selectedFilter === "Active" && worker.status === "Active") ||
        (selectedFilter === "Inactive" && worker.status === "Inactive");
      return matchesSearch && matchesFilter;
    });
  }, [workers, searchTerm, selectedFilter]);

  const activeWorkers = (workers ?? []).filter((w) => w.status === "Active").length;
  const totalHours = (workers ?? []).reduce((sum, w) => sum + w.hoursThisWeek, 0);

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Workers</h1>
          <Link
            to="/workers/add"
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100"
          >
            <UserPlus size={18} />
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
              placeholder="Search workers..."
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

      <section className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-[32px] p-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-green-900/60">AI Workforce Prediction</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-sm font-black text-green-900 leading-none">Team Performance Overview</h4>
              <p className="text-xs text-green-800/70 mt-1.5 font-medium leading-relaxed">
                Keep your active team updated here. New workers are stored in your local database.
              </p>
            </div>
            <div className="shrink-0 w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-100/50 rounded-2xl border border-green-200">
            <AlertTriangle size={14} className="text-green-700 shrink-0" />
            <p className="text-[10px] text-green-900 font-bold leading-relaxed">
              Active workers: {activeWorkers}. Add workers before high-load weeks to avoid delays.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total" value={(workers?.length ?? 0).toString()} color="bg-blue-50 text-blue-600" />
        <StatCard title="Active" value={activeWorkers.toString()} color="bg-green-50 text-green-600" />
        <StatCard title="Hours" value={`${totalHours}h`} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {["All", "Active", "Inactive"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all ${
              selectedFilter === filter
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Team Members</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">
            {filteredWorkers.length} Workers
          </span>
        </div>

        {workers === undefined && (
          <div className="bg-white rounded-[28px] border border-gray-100 p-5 text-sm font-semibold text-gray-500">
            Loading workers...
          </div>
        )}

        {filteredWorkers.map((worker) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm active:scale-[0.98] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm font-black text-lg ${
                  worker.status === "Active" ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {worker.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0] ?? "")
                  .join("")}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-black text-gray-900">{worker.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{worker.id}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-lg ${
                      worker.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {worker.status === "Active" ? (
                      <CheckCircle2 size={10} className="shrink-0" />
                    ) : (
                      <XCircle size={10} className="shrink-0" />
                    )}
                    <span className="text-[9px] font-black uppercase tracking-tight">{worker.status}</span>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[10px] font-black uppercase tracking-tight mb-3 ${
                    ROLE_COLORS[worker.role] || "bg-gray-50 text-gray-700 border-gray-100"
                  }`}
                >
                  <Briefcase size={10} />
                  {worker.role}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                    <Phone size={12} className="text-gray-400" />
                    <span>{worker.contact}</span>
                  </div>
                  {worker.email && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 font-bold truncate">
                      <Mail size={12} className="text-gray-400 shrink-0" />
                      <span className="truncate">{worker.email}</span>
                    </div>
                  )}
                </div>

                {worker.status === "Active" && (
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-[10px] text-gray-500 font-bold">{worker.hoursThisWeek}h this week</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-yellow-600">★</span>
                      <span className="text-[10px] text-gray-900 font-black">{worker.rating.toFixed(1)}</span>
                    </div>
                  </div>
                )}
              </div>

              <ChevronRight size={16} className="text-gray-300 ml-1 mt-3" />
            </div>
          </motion.div>
        ))}

        {workers && filteredWorkers.length === 0 && (
          <div className="py-16 text-center">
            <Users size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No workers found</p>
          </div>
        )}
      </div>

      <Link
        to="/workers/add"
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
              <h3 className="text-xl font-black text-[#0F172A] mb-6">Filter Workers</h3>
              <div className="space-y-3">
                {["All", "Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                      selectedFilter === status
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-100 text-gray-500"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
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
