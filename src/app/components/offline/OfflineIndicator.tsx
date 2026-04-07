import { useState, useEffect } from "react";
import {
  WifiOff,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Database,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface OfflineIndicatorProps {
  pendingSyncCount?: number;
  lastSyncTime?: string;
  showDetails?: boolean;
}

export function OfflineIndicator({
  pendingSyncCount = 0,
  lastSyncTime = "2 hours ago",
  showDetails = true,
}: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate retry attempt
    setTimeout(() => {
      setIsRetrying(false);
      // Check actual connection
      setIsOnline(navigator.onLine);
    }, 1500);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  // Don't show if online or dismissed
  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Main Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
          <div className="px-6 py-3">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                <WifiOff className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-white text-sm">
                    You are offline
                  </h3>
                  {isRetrying && (
                    <RefreshCw className="w-4 h-4 text-white animate-spin" />
                  )}
                </div>
                <p className="text-xs text-white/90">
                  Changes will sync when connection is restored
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white hover:bg-white/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRetrying ? "Retrying..." : "Retry"}
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Status Bar */}
          {showDetails && (
            <div className="bg-black/20 backdrop-blur-sm px-6 py-2.5 border-t border-white/10">
              <div className="flex items-center justify-between gap-4 text-xs">
                {/* Pending Sync */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-wider font-bold">
                      Pending Sync
                    </p>
                    <p className="text-white font-bold">
                      {pendingSyncCount} {pendingSyncCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                {/* Last Sync */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-wider font-bold">
                      Last Sync
                    </p>
                    <p className="text-white font-bold">{lastSyncTime}</p>
                  </div>
                </div>

                {/* Cached Data */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                    <Database className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] uppercase tracking-wider font-bold">
                      Cached Data
                    </p>
                    <p className="text-white font-bold">Available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Subtle gradient fade */}
        <div className="h-2 bg-gradient-to-b from-black/5 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}

// Simple version for minimal UI
export function OfflineIndicatorSimple() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2.5 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">
              You are offline
            </span>
            <span className="text-xs text-white/80">•</span>
            <span className="text-xs text-white/90">
              Changes will sync automatically
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              className="ml-2 w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-b from-black/5 to-transparent" />
      </motion.div>
    </AnimatePresence>
  );
}

// Sync status icon (can be used in other parts of the app)
export function SyncStatusIcon({ isOnline = true, isSyncing = false }) {
  if (isSyncing) {
    return (
      <div className="relative">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="relative">
        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
          <WifiOff className="w-4 h-4 text-red-600" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    </div>
  );
}
