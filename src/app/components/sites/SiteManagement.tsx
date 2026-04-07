import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Building2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  MapPin,
  User,
  Calendar,
  IndianRupee,
  ChevronRight,
  Filter,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";

interface Site {
  id: string;
  name: string;
  location: string;
  manager: string;
  progress: number;
  budgetSpent: number;
  budgetTotal: number;
  budgetStatus: "on-track" | "at-risk" | "overrun";
  startDate: string;
  expectedCompletion: string;
  status: "active" | "delayed" | "completed";
  workers: number;
  image?: string;
}

export function SiteManagement() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "at-risk">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock sites data
  const sites: Site[] = [
    {
      id: "SITE-001",
      name: "Tower A - Residential Complex",
      location: "Sector 12, New Delhi",
      manager: "Amit Sharma",
      progress: 68,
      budgetSpent: 8200000,
      budgetTotal: 10000000,
      budgetStatus: "on-track",
      startDate: "Jan 15, 2026",
      expectedCompletion: "Dec 20, 2026",
      status: "active",
      workers: 45,
    },
    {
      id: "SITE-002",
      name: "Metro Mall Construction",
      location: "Connaught Place, Delhi",
      manager: "Priya Verma",
      progress: 42,
      budgetSpent: 15800000,
      budgetTotal: 15000000,
      budgetStatus: "overrun",
      startDate: "Nov 10, 2025",
      expectedCompletion: "Oct 15, 2026",
      status: "delayed",
      workers: 78,
    },
    {
      id: "SITE-003",
      name: "Office Park Development",
      location: "Gurgaon, Haryana",
      manager: "Rajesh Kumar",
      progress: 85,
      budgetSpent: 22500000,
      budgetTotal: 25000000,
      budgetStatus: "on-track",
      startDate: "Aug 5, 2025",
      expectedCompletion: "May 30, 2026",
      status: "active",
      workers: 62,
    },
    {
      id: "SITE-004",
      name: "Highway Expansion Project",
      location: "NH-8 Corridor",
      manager: "Deepak Singh",
      progress: 55,
      budgetSpent: 34000000,
      budgetTotal: 38000000,
      budgetStatus: "at-risk",
      startDate: "Sep 20, 2025",
      expectedCompletion: "Sep 15, 2026",
      status: "active",
      workers: 120,
    },
    {
      id: "SITE-005",
      name: "Green Valley Villas",
      location: "Noida Extension",
      manager: "Sunita Reddy",
      progress: 95,
      budgetSpent: 12800000,
      budgetTotal: 13000000,
      budgetStatus: "on-track",
      startDate: "Mar 1, 2025",
      expectedCompletion: "Apr 15, 2026",
      status: "active",
      workers: 28,
    },
    {
      id: "SITE-006",
      name: "Smart City Infrastructure",
      location: "Dwarka, Delhi",
      manager: "Vikram Joshi",
      progress: 38,
      budgetSpent: 19500000,
      budgetTotal: 20000000,
      budgetStatus: "at-risk",
      startDate: "Dec 1, 2025",
      expectedCompletion: "Nov 30, 2026",
      status: "active",
      workers: 95,
    },
  ];

  // Calculate stats
  const totalSites = sites.length;
  const activeSites = sites.filter((s) => s.status === "active").length;
  const atRiskSites = sites.filter((s) => s.budgetStatus !== "on-track").length;
  const avgProgress = Math.round(
    sites.reduce((sum, s) => sum + s.progress, 0) / sites.length
  );

  // Filter sites
  const filteredSites = sites.filter((site) => {
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && site.status === "active") ||
      (filterStatus === "at-risk" && site.budgetStatus !== "on-track");

    const matchesSearch =
      searchQuery === "" ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "green";
      case "at-risk":
        return "orange";
      case "overrun":
        return "red";
      default:
        return "gray";
    }
  };

  const getBudgetStatusLabel = (status: string) => {
    switch (status) {
      case "on-track":
        return "On Track";
      case "at-risk":
        return "At Risk";
      case "overrun":
        return "Budget Overrun";
      default:
        return "Unknown";
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
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
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Site Management</h1>
              <p className="text-white/90 text-sm mt-1">
                {totalSites} Active Projects
              </p>
            </div>
            <button
              onClick={() => navigate("/site-switcher")}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Active
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{activeSites}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Progress
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{avgProgress}%</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  At Risk
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{atRiskSites}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-4"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sites..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus("all")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Sites
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "active"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus("at-risk")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "at-risk"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              At Risk
            </button>
          </div>
        </motion.div>
      </div>

      {/* AI Risk Alert */}
      {atRiskSites > 0 && filterStatus === "all" && (
        <div className="px-6 mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-1">
                  AI Budget Alert
                </h3>
                <p className="text-sm text-orange-700">
                  {atRiskSites} {atRiskSites === 1 ? "site" : "sites"} showing budget concerns. 
                  Immediate attention recommended.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sites List */}
      <div className="px-6 space-y-4">
        {filteredSites.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No sites found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          filteredSites.map((site, index) => {
            const budgetColor = getBudgetStatusColor(site.budgetStatus);
            const budgetPercentage = (site.budgetSpent / site.budgetTotal) * 100;
            const isRisky = site.budgetStatus !== "on-track";

            return (
              <motion.div
                key={site.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => navigate(`/sites/${site.id}`)}
                className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                  isRisky ? "ring-2 ring-orange-200" : ""
                }`}
              >
                {/* Site Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        budgetColor === "green"
                          ? "bg-green-100"
                          : budgetColor === "orange"
                          ? "bg-orange-100"
                          : "bg-red-100"
                      }`}
                    >
                      <Building2
                        className={`w-6 h-6 ${
                          budgetColor === "green"
                            ? "text-green-600"
                            : budgetColor === "orange"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">
                            {site.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <MapPin size={12} />
                            <p className="text-xs">{site.location}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      {/* Budget Status Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                          budgetColor === "green"
                            ? "bg-green-100 text-green-700"
                            : budgetColor === "orange"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isRisky && <AlertTriangle size={12} strokeWidth={2.5} />}
                        {!isRisky && <CheckCircle2 size={12} strokeWidth={2.5} />}
                        <span className="text-xs font-bold uppercase tracking-wider">
                          {getBudgetStatusLabel(site.budgetStatus)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Construction Progress
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {site.progress}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${site.progress}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className={`h-full rounded-full ${
                          site.progress < 30
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : site.progress < 70
                            ? "bg-gradient-to-r from-orange-400 to-amber-500"
                            : "bg-gradient-to-r from-green-400 to-emerald-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Budget Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Budget Usage
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold text-gray-900">
                          {formatCurrency(site.budgetSpent)}
                        </span>
                        <span className="text-xs text-gray-500">/</span>
                        <span className="text-xs text-gray-500">
                          {formatCurrency(site.budgetTotal)}
                        </span>
                      </div>
                    </div>
                    {/* Budget Progress Bar */}
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                        className={`h-full rounded-full ${
                          budgetColor === "green"
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : budgetColor === "orange"
                            ? "bg-gradient-to-r from-orange-400 to-amber-500"
                            : "bg-gradient-to-r from-red-400 to-red-500"
                        }`}
                      />
                    </div>
                    {budgetPercentage > 100 && (
                      <p className="text-xs text-red-600 font-bold mt-1.5">
                        Exceeded by {formatCurrency(site.budgetSpent - site.budgetTotal)}
                      </p>
                    )}
                  </div>

                  {/* AI Risk Warning */}
                  {isRisky && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-3 mb-4"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-orange-900 mb-1">
                            AI Risk Analysis
                          </p>
                          <p className="text-xs text-orange-700">
                            {site.budgetStatus === "overrun"
                              ? "Budget exceeded. Consider cost optimization measures and supplier negotiations."
                              : "Budget approaching limit. Monitor spending closely to avoid overrun."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Site Details Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <User size={12} className="text-gray-400" />
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Manager
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{site.manager}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <User size={12} className="text-gray-400" />
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Workers
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">{site.workers}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar size={12} className="text-gray-400" />
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Due
                        </p>
                      </div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        {site.expectedCompletion}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div
                  className={`px-5 py-3 flex items-center justify-between ${
                    budgetColor === "green"
                      ? "bg-green-50"
                      : budgetColor === "orange"
                      ? "bg-orange-50"
                      : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        site.status === "active"
                          ? "bg-green-500 animate-pulse"
                          : site.status === "delayed"
                          ? "bg-red-500 animate-pulse"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        budgetColor === "green"
                          ? "text-green-700"
                          : budgetColor === "orange"
                          ? "text-orange-700"
                          : "text-red-700"
                      }`}
                    >
                      {site.status === "active"
                        ? "Active"
                        : site.status === "delayed"
                        ? "Delayed"
                        : "Completed"}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      budgetColor === "green"
                        ? "text-green-600"
                        : budgetColor === "orange"
                        ? "text-orange-600"
                        : "text-red-600"
                    }`}
                  >
                    View Details →
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
