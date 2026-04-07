import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  IndianRupee,
  Users,
  FileText,
  Truck,
  Camera,
  Sparkles,
  Zap,
  WifiOff,
  Wifi,
  Play,
  Pause,
  X,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SyncSuccessToast } from "./SyncSuccess";

interface SyncItem {
  id: string;
  type: "material" | "payment" | "worker" | "invoice" | "delivery" | "scan";
  title: string;
  description: string;
  timestamp: string;
  status: "pending" | "syncing" | "synced" | "failed";
  priority: "critical" | "high" | "normal";
  size: string;
  retryCount?: number;
}

export function DataSyncScreen() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [currentlySyncing, setCurrentlySyncing] = useState<string | null>(null);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  // Mock sync items
  const [syncItems, setSyncItems] = useState<SyncItem[]>([
    {
      id: "SYNC-001",
      type: "payment",
      title: "Payment to Rajesh Kumar",
      description: "Daily wage payment - ₹1,200",
      timestamp: "2 hours ago",
      status: "pending",
      priority: "critical",
      size: "2.4 KB",
    },
    {
      id: "SYNC-002",
      type: "material",
      title: "Cement Stock Added",
      description: "500 bags - Star Cement Industries",
      timestamp: "3 hours ago",
      status: "pending",
      priority: "high",
      size: "3.1 KB",
    },
    {
      id: "SYNC-003",
      type: "payment",
      title: "Payment to Amit Singh",
      description: "Daily wage payment - ₹1,500",
      timestamp: "3 hours ago",
      status: "pending",
      priority: "critical",
      size: "2.4 KB",
    },
    {
      id: "SYNC-004",
      type: "scan",
      title: "Material QR Code Scan",
      description: "TMT Steel Rods - 12mm",
      timestamp: "4 hours ago",
      status: "synced",
      priority: "normal",
      size: "1.8 KB",
    },
    {
      id: "SYNC-005",
      type: "material",
      title: "Sand Inventory Update",
      description: "10 ton - River Sand",
      timestamp: "5 hours ago",
      status: "pending",
      priority: "high",
      size: "2.9 KB",
    },
    {
      id: "SYNC-006",
      type: "invoice",
      title: "Invoice OCR Data",
      description: "INV-2456 - Building materials",
      timestamp: "6 hours ago",
      status: "failed",
      priority: "normal",
      size: "5.2 KB",
      retryCount: 2,
    },
    {
      id: "SYNC-007",
      type: "delivery",
      title: "Delivery Confirmation",
      description: "DEL-2456 - Cement delivery received",
      timestamp: "1 day ago",
      status: "synced",
      priority: "high",
      size: "3.5 KB",
    },
    {
      id: "SYNC-008",
      type: "worker",
      title: "Worker Attendance",
      description: "15 workers checked in",
      timestamp: "1 day ago",
      status: "synced",
      priority: "normal",
      size: "4.2 KB",
    },
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const pendingItems = syncItems.filter((item) => item.status === "pending");
  const syncedItems = syncItems.filter((item) => item.status === "synced");
  const failedItems = syncItems.filter((item) => item.status === "failed");
  const criticalItems = pendingItems.filter((item) => item.priority === "critical");

  const totalItems = syncItems.length;
  const completedItems = syncedItems.length;

  const startSync = () => {
    if (!isOnline) return;

    setIsSyncing(true);
    setIsPaused(false);
    setSyncProgress(0);

    // Sort by priority for syncing
    const itemsToSync = [...pendingItems, ...failedItems].sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, normal: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    let currentIndex = 0;

    const syncInterval = setInterval(() => {
      if (isPaused) return;

      if (currentIndex < itemsToSync.length) {
        const item = itemsToSync[currentIndex];
        setCurrentlySyncing(item.id);

        // Update item status to syncing
        setSyncItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: "syncing" as const } : i))
        );

        // Simulate sync completion after 1.5 seconds
        setTimeout(() => {
          setSyncItems((prev) =>
            prev.map((i) =>
              i.id === item.id ? { ...i, status: "synced" as const, retryCount: 0 } : i
            )
          );

          const progress = ((currentIndex + 1) / itemsToSync.length) * 100;
          setSyncProgress(progress);

          currentIndex++;

          if (currentIndex >= itemsToSync.length) {
            clearInterval(syncInterval);
            setIsSyncing(false);
            setCurrentlySyncing(null);
            setSyncProgress(100);
            // Show success notification
            setShowSyncSuccess(true);
          }
        }, 1500);
      }
    }, 2000);
  };

  const pauseSync = () => {
    setIsPaused(true);
  };

  const resumeSync = () => {
    setIsPaused(false);
  };

  const retryItem = (itemId: string) => {
    setSyncItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: "pending" as const } : item
      )
    );
  };

  const cancelItem = (itemId: string) => {
    setSyncItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "material":
        return <Package className="w-5 h-5" />;
      case "payment":
        return <IndianRupee className="w-5 h-5" />;
      case "worker":
        return <Users className="w-5 h-5" />;
      case "invoice":
        return <FileText className="w-5 h-5" />;
      case "delivery":
        return <Truck className="w-5 h-5" />;
      case "scan":
        return <Camera className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "material":
        return "bg-blue-100 text-blue-600";
      case "payment":
        return "bg-green-100 text-green-600";
      case "worker":
        return "bg-purple-100 text-purple-600";
      case "invoice":
        return "bg-orange-100 text-orange-600";
      case "delivery":
        return "bg-cyan-100 text-cyan-600";
      case "scan":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "bg-green-100 text-green-700 border-green-200";
      case "syncing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">
            <Zap className="w-3 h-3" />
            <span>Critical</span>
          </div>
        );
      case "high":
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold">
            <AlertTriangle className="w-3 h-3" />
            <span>High</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Sync Success Notification */}
      <SyncSuccessToast
        show={showSyncSuccess}
        onClose={() => setShowSyncSuccess(false)}
        itemsSynced={syncedItems.length}
      />

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
              <h1 className="text-2xl font-bold text-white">Data Sync</h1>
              <p className="text-white/90 text-sm mt-1">
                {pendingItems.length + failedItems.length} items to sync
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              {isOnline ? (
                <Wifi className="w-5 h-5 text-white" />
              ) : (
                <WifiOff className="w-5 h-5 text-white" />
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Pending
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{pendingItems.length}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Synced
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{syncedItems.length}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Failed
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{failedItems.length}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sync Progress Card */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Sync Progress</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {completedItems} of {totalItems} items synced
              </p>
            </div>
            {isOnline ? (
              <div className="px-3 py-1.5 bg-green-100 rounded-lg">
                <span className="text-xs font-bold text-green-700">Online</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 bg-red-100 rounded-lg">
                <span className="text-xs font-bold text-red-700">Offline</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-700">
                {isSyncing ? "Syncing..." : syncProgress === 100 ? "Complete" : "Ready"}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round((completedItems / totalItems) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(completedItems / totalItems) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Sync Controls */}
          <div className="flex gap-3">
            {!isSyncing ? (
              <button
                onClick={startSync}
                disabled={!isOnline || pendingItems.length === 0}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5" />
                <span>Start Sync</span>
              </button>
            ) : (
              <>
                {isPaused ? (
                  <button
                    onClick={resumeSync}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseSync}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 active:scale-95 transition-all"
                  >
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* AI Priority Banner */}
      {criticalItems.length > 0 && (
        <div className="px-6 mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-1">
                  AI Priority Alert
                </h3>
                <p className="text-sm text-orange-700 mb-3">
                  {criticalItems.length} critical {criticalItems.length === 1 ? "item" : "items"}{" "}
                  will be synced first. These include time-sensitive data like payments
                  and urgent material updates.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg">
                    <Zap className="w-4 h-4 text-[#F97316]" />
                    <span className="text-xs font-bold text-orange-900">
                      Smart Prioritization Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pending Items List */}
      {pendingItems.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Pending Actions</h3>
            <span className="text-sm text-gray-500">
              {pendingItems.length} {pendingItems.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="space-y-3">
            {pendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  item.priority === "critical" ? "border-2 border-red-500" : "border border-gray-200"
                } ${currentlySyncing === item.id ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 text-sm">
                              {item.title}
                            </h4>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <p className="text-xs text-gray-500 mb-2">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{item.timestamp}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                        </div>
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status === "syncing" && (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          )}
                          {item.status === "pending" && <Clock className="w-3 h-3" />}
                          <span className="uppercase tracking-wider">{item.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority Indicator */}
                {item.priority === "critical" && (
                  <div className="bg-red-50 px-5 py-2 border-t border-red-100">
                    <div className="flex items-center gap-2 text-xs text-red-700">
                      <Zap className="w-3 h-3" />
                      <span className="font-bold">
                        Will sync first - Critical priority
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Failed Items */}
      {failedItems.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Failed Items</h3>
            <span className="text-sm text-gray-500">
              {failedItems.length} {failedItems.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="space-y-3">
            {failedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white rounded-xl shadow-sm border-2 border-red-500 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">{item.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border bg-red-100 text-red-700 border-red-200">
                          <AlertCircle className="w-3 h-3" />
                          <span>Failed</span>
                        </div>
                        {item.retryCount && item.retryCount > 0 && (
                          <span className="text-xs text-gray-500">
                            Retry attempts: {item.retryCount}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => retryItem(item.id)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 active:scale-95 transition-all"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retry</span>
                        </button>
                        <button
                          onClick={() => cancelItem(item.id)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 active:scale-95 transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Synced Items */}
      {syncedItems.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recently Synced</h3>
            <span className="text-sm text-gray-500">
              {syncedItems.length} {syncedItems.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div className="space-y-3">
            {syncedItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index }}
                className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500">{item.timestamp}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
