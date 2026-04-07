import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  MapPin,
  User,
  Calendar,
  IndianRupee,
  Package,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  PieChart,
  Settings,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface MaterialUsage {
  name: string;
  used: number;
  total: number;
  unit: string;
  status: "normal" | "low" | "critical";
}

interface Worker {
  id: string;
  name: string;
  role: string;
  status: "active" | "break" | "absent";
  hours: number;
}

interface BudgetData {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export function SiteDashboard() {
  const navigate = useNavigate();
  const { siteId } = useParams();
  const [selectedTab, setSelectedTab] = useState<"overview" | "materials" | "workers">("overview");

  // Mock site data
  const site = {
    id: siteId || "SITE-001",
    name: "Gateway Tower Construction",
    location: "Sector 18, Noida",
    manager: "Amit Sharma",
    progress: 68,
    budgetTotal: 10000000,
    budgetSpent: 8200000,
    startDate: "Jan 15, 2026",
    expectedCompletion: "Dec 20, 2026",
    daysRemaining: 259,
    status: "active",
    workers: 45,
    workersActive: 38,
  };

  // Budget breakdown by category
  const budgetData: BudgetData[] = [
    { category: "Materials", allocated: 4000000, spent: 3500000, remaining: 500000 },
    { category: "Labor", allocated: 3000000, spent: 2600000, remaining: 400000 },
    { category: "Equipment", allocated: 2000000, spent: 1500000, remaining: 500000 },
    { category: "Other", allocated: 1000000, spent: 600000, remaining: 400000 },
  ];

  // Material usage data
  const materials: MaterialUsage[] = [
    { name: "Cement", used: 850, total: 1000, unit: "bags", status: "normal" },
    { name: "Steel Rods", used: 4200, total: 5000, unit: "kg", status: "normal" },
    { name: "Bricks", used: 18500, total: 20000, unit: "pcs", status: "normal" },
    { name: "Sand", used: 85, total: 100, unit: "m³", status: "low" },
    { name: "Paint", used: 145, total: 150, unit: "L", status: "critical" },
    { name: "Tiles", used: 2800, total: 3500, unit: "sq.ft", status: "normal" },
  ];

  // Active workers data
  const workers: Worker[] = [
    { id: "1", name: "Rajesh Kumar", role: "Mason", status: "active", hours: 6.5 },
    { id: "2", name: "Suresh Yadav", role: "Carpenter", status: "active", hours: 7.0 },
    { id: "3", name: "Manoj Singh", role: "Electrician", status: "break", hours: 5.5 },
    { id: "4", name: "Vikram Joshi", role: "Plumber", status: "active", hours: 6.0 },
    { id: "5", name: "Deepak Sharma", role: "Welder", status: "active", hours: 7.5 },
    { id: "6", name: "Ravi Verma", role: "Helper", status: "absent", hours: 0 },
  ];

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  const budgetPercentage = (site.budgetSpent / site.budgetTotal) * 100;
  const progressVsBudget = site.progress - budgetPercentage;

  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const handleShare = async () => {
    const summary = `${site.name} | ${site.location} | Progress: ${site.progress}% | Budget used: ${budgetPercentage.toFixed(0)}% | ETA: ${site.expectedCompletion}`;
    try {
      await copyToClipboard(summary);
      toast.success("Site summary copied");
    } catch {
      toast.error("Unable to copy site summary");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-12 -mb-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white truncate">{site.name}</h1>
              <div className="flex items-center gap-1.5 text-white/90 text-sm mt-1">
                <MapPin size={14} />
                <p className="truncate">{site.location}</p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <Share2 size={18} />
            </button>
          </div>

          {/* Progress Overview */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Project Progress
              </span>
              <span className="text-2xl font-bold text-white">{site.progress}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${site.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar size={14} />
                <span>{site.daysRemaining} days remaining</span>
              </div>
              <span className="text-white/90">{site.expectedCompletion}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Risk Alert */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-orange-900 mb-1">AI Delay Prediction</h3>
              <p className="text-sm text-orange-700 mb-3">
                Based on current spending rate, project may experience a 12-day delay.
                Material shortage for Sand and Paint detected.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-orange-900">
                    Risk Level: Medium
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-orange-900">12 days</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-4"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Budget Used
            </p>
            <p className="text-lg font-bold text-gray-900">{budgetPercentage.toFixed(0)}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(site.budgetSpent)} / {formatCurrency(site.budgetTotal)}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-4"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Active Workers
            </p>
            <p className="text-lg font-bold text-gray-900">{site.workersActive}</p>
            <p className="text-xs text-gray-500 mt-1">of {site.workers} total</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-4"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
              Efficiency
            </p>
            <p className="text-lg font-bold text-gray-900">
              {progressVsBudget > 0 ? "+" : ""}
              {progressVsBudget.toFixed(0)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">vs budget</p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-2 flex gap-2">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              selectedTab === "overview"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedTab("materials")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              selectedTab === "materials"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Materials
          </button>
          <button
            onClick={() => setSelectedTab("workers")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              selectedTab === "workers"
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Workers
          </button>
        </div>
      </div>

      {/* Content Based on Selected Tab */}
      {selectedTab === "overview" && (
        <div className="px-6 space-y-6">
          {/* Budget Breakdown */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Budget vs Actual</h3>
                  <p className="text-xs text-gray-500">Spending by category</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {budgetData.map((item, index) => {
                const percentage = (item.spent / item.allocated) * 100;
                const isOverBudget = item.spent > item.allocated;

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-gray-700">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(item.spent)}
                        </span>
                        <span className="text-xs text-gray-500">/</span>
                        <span className="text-xs text-gray-500">
                          {formatCurrency(item.allocated)}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                        className={`h-full rounded-full ${
                          isOverBudget
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : percentage > 85
                            ? "bg-gradient-to-r from-orange-400 to-amber-500"
                            : "bg-gradient-to-r from-blue-400 to-blue-500"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{percentage.toFixed(0)}% used</span>
                      <span
                        className={`text-xs font-bold ${
                          isOverBudget
                            ? "text-red-600"
                            : item.remaining < item.allocated * 0.2
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {formatCurrency(item.remaining)} remaining
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Materials */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Material Usage</h3>
                  <p className="text-xs text-gray-500">Top 3 materials</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTab("materials")}
                className="text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {materials.slice(0, 3).map((material, index) => {
                const percentage = (material.used / material.total) * 100;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-900">
                          {material.name}
                        </span>
                        <span className="text-sm font-bold text-gray-700">
                          {material.used}/{material.total} {material.unit}
                        </span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percentage}%` }}
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {selectedTab === "materials" && (
        <div className="px-6 space-y-4">
          {/* Critical Materials Alert */}
          {materials.some((m) => m.status === "critical" || m.status === "low") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-1">Material Shortage Alert</h3>
                  <p className="text-sm text-red-700">
                    {materials.filter((m) => m.status === "critical").length} critical,{" "}
                    {materials.filter((m) => m.status === "low").length} low stock items
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {materials.map((material, index) => {
            const percentage = (material.used / material.total) * 100;
            const statusColor =
              material.status === "critical"
                ? "red"
                : material.status === "low"
                ? "orange"
                : "green";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm p-5 ${
                  material.status !== "normal" ? "border-2 border-" + statusColor + "-200" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{material.name}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                          statusColor === "green"
                            ? "bg-green-100 text-green-700"
                            : statusColor === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {material.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {percentage.toFixed(0)}% used
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {material.used}/{material.total}
                    </p>
                    <p className="text-xs text-gray-500">{material.unit}</p>
                  </div>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    className={`h-full rounded-full ${
                      statusColor === "green"
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : statusColor === "orange"
                        ? "bg-gradient-to-r from-orange-400 to-amber-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                    }`}
                  />
                </div>

                {material.status !== "normal" && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <p className="text-orange-700 font-bold">
                      {material.status === "critical"
                        ? "Urgent: Order immediately to avoid delays"
                        : "Warning: Stock running low, order soon"}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {selectedTab === "workers" && (
        <div className="px-6 space-y-4">
          {/* Worker Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-5"
          >
            <h3 className="font-bold text-gray-900 mb-4">Today's Summary</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {workers.filter((w) => w.status === "active").length}
                </p>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mt-1">
                  Active
                </p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">
                  {workers.filter((w) => w.status === "break").length}
                </p>
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wider mt-1">
                  On Break
                </p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {workers.filter((w) => w.status === "absent").length}
                </p>
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider mt-1">
                  Absent
                </p>
              </div>
            </div>
          </motion.div>

          {/* Worker List */}
          {workers.map((worker, index) => (
            <motion.div
              key={worker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    worker.status === "active"
                      ? "bg-green-100"
                      : worker.status === "break"
                      ? "bg-orange-100"
                      : "bg-gray-100"
                  }`}
                >
                  <User
                    className={`w-6 h-6 ${
                      worker.status === "active"
                        ? "text-green-600"
                        : worker.status === "break"
                        ? "text-orange-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900">{worker.name}</h3>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        worker.status === "active"
                          ? "bg-green-500 animate-pulse"
                          : worker.status === "break"
                          ? "bg-orange-500 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{worker.role}</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm font-bold text-gray-700">
                        {worker.hours}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
