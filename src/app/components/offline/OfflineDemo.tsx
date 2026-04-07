import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  WifiOff,
  Wifi,
  RefreshCw,
  Database,
  Settings,
  Info,
  Package,
  IndianRupee,
  CheckCircle2,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  OfflineIndicator,
  OfflineIndicatorSimple,
  SyncStatusIcon,
} from "./OfflineIndicator";

export function OfflineDemo() {
  const navigate = useNavigate();
  const [showDetailedBanner, setShowDetailedBanner] = useState(true);
  const [pendingSyncCount, setPendingSyncCount] = useState(3);
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleOffline = () => {
    setIsOnline(!isOnline);
    // Dispatch custom events to trigger the offline indicator
    if (isOnline) {
      window.dispatchEvent(new Event("offline"));
    } else {
      window.dispatchEvent(new Event("online"));
    }
  };

  const simulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show Offline Indicator */}
      {showDetailedBanner ? (
        <OfflineIndicator
          pendingSyncCount={pendingSyncCount}
          lastSyncTime="2 hours ago"
          showDetails={true}
        />
      ) : (
        <OfflineIndicatorSimple />
      )}

      {/* Demo Content */}
      <div className="px-6 pt-6 pb-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl px-6 py-8 mb-6 relative overflow-hidden">
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
                <h1 className="text-2xl font-bold text-white">Offline Mode Demo</h1>
                <p className="text-white/90 text-sm mt-1">
                  Test offline functionality
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Connection Status</h2>
            <SyncStatusIcon isOnline={isOnline} isSyncing={isSyncing} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                {isOnline ? (
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <WifiOff className="w-5 h-5 text-red-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isOnline ? "Connected to server" : "No internet connection"}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleOffline}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isOnline
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </button>
            </div>

            {!isOnline && (
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-orange-900">
                      Pending Sync
                    </p>
                    <p className="text-xs text-orange-700">
                      {pendingSyncCount} items waiting to sync
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Test Controls</h2>

          <div className="space-y-3">
            <button
              onClick={simulateSync}
              disabled={isSyncing || isOnline === false}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync Now"}</span>
            </button>

            <button
              onClick={() => setPendingSyncCount(pendingSyncCount + 1)}
              disabled={isOnline}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Pending Item ({pendingSyncCount})
            </button>

            <button
              onClick={() => setShowDetailedBanner(!showDetailedBanner)}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
            >
              Toggle Banner Style
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-900 mb-2">How it works</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    When offline, all changes are saved locally and queued for sync
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    Data automatically syncs when connection is restored
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    Cached data remains available for viewing during offline mode
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                  <span>
                    The banner can be dismissed but will reappear if still offline
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Usage Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="font-bold text-gray-900 mb-4">Offline Features</h2>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/offline-workflow")}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">
                    Complete Workflow Demo
                  </p>
                  <p className="text-xs text-white/90">
                    Step-by-step offline to online journey
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => navigate("/offline-data-entry")}
              className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-blue-900">
                    Offline Data Entry
                  </p>
                  <p className="text-xs text-blue-700">
                    Add materials & payments offline
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </button>

            <button
              onClick={() => navigate("/data-sync")}
              className="w-full flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-green-900">
                    Auto-Sync Screen
                  </p>
                  <p className="text-xs text-green-700">
                    View sync progress & pending items
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-green-600" />
            </button>

            <button
              onClick={() => navigate("/sync-settings")}
              className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-purple-900">
                    Sync Settings
                  </p>
                  <p className="text-xs text-purple-700">
                    Configure auto-sync behavior
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>

        {/* Component Variants Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h2 className="font-bold text-gray-900 mb-4">Component Variants</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Detailed Banner</p>
              <p className="text-xs text-gray-500 mb-3">
                Shows sync status, pending items, and last sync time
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-800">
                  &lt;OfflineIndicator pendingSyncCount=&#123;3&#125; /&gt;
                </code>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Simple Banner</p>
              <p className="text-xs text-gray-500 mb-3">
                Minimal banner with just offline message
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-800">
                  &lt;OfflineIndicatorSimple /&gt;
                </code>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-700 mb-2">Sync Status Icon</p>
              <p className="text-xs text-gray-500 mb-3">
                Small icon for headers or toolbars
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-xs text-gray-800">
                  &lt;SyncStatusIcon isOnline=&#123;true&#125; /&gt;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
