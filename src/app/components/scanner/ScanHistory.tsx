import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Clock,
  Package,
  Plus,
  CheckCircle2,
  Calendar,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Filter,
  Search,
  BarChart3,
} from "lucide-react";
import { motion } from "motion/react";

interface ScanHistoryItem {
  id: string;
  materialName: string;
  materialCode: string;
  quantity: number;
  unit: string;
  action: "added" | "used";
  site: string;
  timestamp: string;
  date: string;
  time: string;
}

export function ScanHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "added" | "used">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock scan history data
  const scanHistory: ScanHistoryItem[] = [
    {
      id: "1",
      materialName: "Cement (OPC)",
      materialCode: "MAT-2024-001",
      quantity: 50,
      unit: "Bags",
      action: "added",
      site: "Tower A - Foundation",
      timestamp: "2026-04-05T14:30:00",
      date: "Today",
      time: "2:30 PM",
    },
    {
      id: "2",
      materialName: "Steel Rods (10mm)",
      materialCode: "MAT-2024-045",
      quantity: 120,
      unit: "Pieces",
      action: "used",
      site: "Tower B - Structure",
      timestamp: "2026-04-05T11:15:00",
      date: "Today",
      time: "11:15 AM",
    },
    {
      id: "3",
      materialName: "Cement (OPC)",
      materialCode: "MAT-2024-001",
      quantity: 30,
      unit: "Bags",
      action: "used",
      site: "Tower A - Foundation",
      timestamp: "2026-04-05T09:45:00",
      date: "Today",
      time: "9:45 AM",
    },
    {
      id: "4",
      materialName: "Paint (White)",
      materialCode: "MAT-2024-089",
      quantity: 15,
      unit: "Gallons",
      action: "added",
      site: "Tower C - Finishing",
      timestamp: "2026-04-04T16:20:00",
      date: "Yesterday",
      time: "4:20 PM",
    },
    {
      id: "5",
      materialName: "Bricks (Red Clay)",
      materialCode: "MAT-2024-012",
      quantity: 5000,
      unit: "Units",
      action: "added",
      site: "Tower A - Foundation",
      timestamp: "2026-04-04T13:00:00",
      date: "Yesterday",
      time: "1:00 PM",
    },
    {
      id: "6",
      materialName: "Steel Rods (10mm)",
      materialCode: "MAT-2024-045",
      quantity: 200,
      unit: "Pieces",
      action: "added",
      site: "Tower B - Structure",
      timestamp: "2026-04-04T10:30:00",
      date: "Yesterday",
      time: "10:30 AM",
    },
    {
      id: "7",
      materialName: "Sand (River)",
      materialCode: "MAT-2024-023",
      quantity: 8,
      unit: "Tons",
      action: "used",
      site: "Tower A - Foundation",
      timestamp: "2026-04-03T15:45:00",
      date: "Apr 3",
      time: "3:45 PM",
    },
    {
      id: "8",
      materialName: "Cement (OPC)",
      materialCode: "MAT-2024-001",
      quantity: 40,
      unit: "Bags",
      action: "used",
      site: "Tower C - Finishing",
      timestamp: "2026-04-03T12:10:00",
      date: "Apr 3",
      time: "12:10 PM",
    },
  ];

  // AI Usage Trends
  const usageTrends = {
    totalScans: scanHistory.length,
    addedCount: scanHistory.filter((item) => item.action === "added").length,
    usedCount: scanHistory.filter((item) => item.action === "used").length,
    trendPercentage: 12,
    trendDirection: "up" as "up" | "down",
    topMaterial: "Cement (OPC)",
    topMaterialScans: 3,
    insights: [
      "Cement usage increased by 15% this week",
      "Steel rods consumption is higher than usual",
      "Consider reordering paint supplies soon",
    ],
  };

  // Filter history
  const filteredHistory = scanHistory.filter((item) => {
    const matchesFilter = filter === "all" || item.action === filter;
    const matchesSearch = 
      item.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.materialCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group by date
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, ScanHistoryItem[]>);

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
              <h1 className="text-2xl font-bold text-white">Scan History</h1>
              <p className="text-white/90 text-sm mt-1">
                Track all your QR scans
              </p>
            </div>
            <button
              onClick={() => navigate("/scanner")}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <BarChart3 size={22} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials..."
              className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/60 font-bold focus:outline-none focus:bg-white/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 -mt-6 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Quick Stats</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {usageTrends.totalScans}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-1">Total Scans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {usageTrends.addedCount}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-1">Added</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {usageTrends.usedCount}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-1">Used</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-orange-900">AI Usage Trends</h3>
              <div className="flex items-center gap-1 text-xs">
                {usageTrends.trendDirection === "up" ? (
                  <TrendingUp size={12} className="text-orange-600" />
                ) : (
                  <TrendingDown size={12} className="text-orange-600" />
                )}
                <span className="text-orange-600 font-bold">
                  {usageTrends.trendPercentage}% vs last week
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {usageTrends.insights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-2 bg-white/60 rounded-lg p-3"
              >
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                <p className="text-sm text-orange-900 font-medium flex-1">
                  {insight}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-orange-200">
            <div className="flex items-center justify-between">
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                Most Scanned
              </p>
              <div className="flex items-center gap-2">
                <Package size={14} className="text-orange-600" />
                <span className="font-bold text-orange-900">
                  {usageTrends.topMaterial} ({usageTrends.topMaterialScans}x)
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
              filter === "all"
                ? "bg-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            All ({scanHistory.length})
          </button>
          <button
            onClick={() => setFilter("added")}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-1.5 ${
              filter === "added"
                ? "bg-green-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Plus size={16} strokeWidth={3} />
            Added ({usageTrends.addedCount})
          </button>
          <button
            onClick={() => setFilter("used")}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-1.5 ${
              filter === "used"
                ? "bg-orange-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <CheckCircle2 size={16} strokeWidth={2.5} />
            Used ({usageTrends.usedCount})
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="px-6 space-y-6">
        {Object.entries(groupedHistory).map(([date, items], dateIndex) => (
          <motion.div
            key={date}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + dateIndex * 0.05 }}
          >
            {/* Date Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                <Calendar size={14} className="text-gray-600" />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {date}
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Timeline Items */}
            <div className="relative pl-6 space-y-4">
              {/* Timeline Line */}
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200" />

              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-6 top-4 w-4 h-4 rounded-full border-2 border-white shadow-md ${
                      item.action === "added"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  />

                  {/* History Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Action Banner */}
                    <div
                      className={`px-4 py-2 flex items-center gap-2 ${
                        item.action === "added"
                          ? "bg-green-50 border-b border-green-100"
                          : "bg-orange-50 border-b border-orange-100"
                      }`}
                    >
                      {item.action === "added" ? (
                        <Plus size={14} className="text-green-600" strokeWidth={3} />
                      ) : (
                        <CheckCircle2 size={14} className="text-orange-600" strokeWidth={2.5} />
                      )}
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          item.action === "added" ? "text-green-700" : "text-orange-700"
                        }`}
                      >
                        {item.action === "added" ? "Added to Inventory" : "Marked as Used"}
                      </span>
                      <div className="flex-1" />
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500 font-bold">
                        {item.time}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            item.action === "added"
                              ? "bg-green-100"
                              : "bg-orange-100"
                          }`}
                        >
                          <Package
                            className={`w-6 h-6 ${
                              item.action === "added"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-base mb-1">
                            {item.materialName}
                          </h3>
                          <p className="text-xs text-gray-500 font-bold mb-2">
                            {item.materialCode}
                          </p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Package size={12} className="text-gray-400" />
                              <span className="text-sm font-bold text-gray-700">
                                {item.quantity.toLocaleString()} {item.unit}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1 h-1 bg-gray-300 rounded-full" />
                              <span className="text-xs text-gray-500 font-medium">
                                {item.site}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 py-12 text-center"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Clock className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">No Scans Found</h3>
          <p className="text-sm text-gray-500 mb-6">
            {searchQuery
              ? "Try a different search term"
              : "Start scanning materials to see history"}
          </p>
          <button
            onClick={() => navigate("/scanner")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <Package size={18} />
            Scan Material
          </button>
        </motion.div>
      )}

      {/* Bottom Padding for Navigation */}
      <div className="h-8" />
    </div>
  );
}
