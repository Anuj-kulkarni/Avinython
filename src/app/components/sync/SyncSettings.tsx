import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  Clock,
  Zap,
  Shield,
  Wifi,
  Battery,
  HardDrive,
  Settings as SettingsIcon,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { motion } from "motion/react";

export function SyncSettings() {
  const navigate = useNavigate();
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [wifiOnlyMode, setWifiOnlyMode] = useState(true);
  const [prioritizeCritical, setPrioritizeCritical] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);
  const [lowBatteryMode, setLowBatteryMode] = useState(false);

  // Mock data
  const lastSyncTime = "5 mins ago";
  const nextScheduledSync = "In 10 mins";
  const totalDataCached = "24.8 MB";
  const pendingSyncItems = 3;

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
              <h1 className="text-2xl font-bold text-white">Sync Settings</h1>
              <p className="text-white/90 text-sm mt-1">
                Configure sync behavior
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Status Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">Sync Status</h3>
                <p className="text-sm text-white/80">
                  All systems operational
                </p>
              </div>
              <div className="px-3 py-1.5 bg-green-500/30 backdrop-blur-sm rounded-lg border border-green-400/50">
                <span className="text-xs font-bold text-white">Active</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-white/70" />
                  <p className="text-xs text-white/70 uppercase tracking-wider font-bold">
                    Last Sync
                  </p>
                </div>
                <p className="text-sm font-bold text-white">{lastSyncTime}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4 text-white/70" />
                  <p className="text-xs text-white/70 uppercase tracking-wider font-bold">
                    Next Sync
                  </p>
                </div>
                <p className="text-sm font-bold text-white">{nextScheduledSync}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Pending
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {pendingSyncItems}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                  Cached
                </p>
                <p className="text-xl font-bold text-gray-900">{totalDataCached}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auto-Sync Settings */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Auto-Sync</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Auto-Sync Toggle */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Enable Auto-Sync
                  </h3>
                  <p className="text-sm text-gray-500">
                    Automatically sync data when connection is available
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={autoSyncEnabled}
                  onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* WiFi Only Mode */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wifi className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">WiFi Only</h3>
                  <p className="text-sm text-gray-500">
                    Sync only when connected to WiFi to save mobile data
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={wifiOnlyMode}
                  onChange={(e) => setWifiOnlyMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Background Sync */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Background Sync
                  </h3>
                  <p className="text-sm text-gray-500">
                    Continue syncing when app is in background
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={backgroundSync}
                  onChange={(e) => setBackgroundSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Sync Settings */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Smart Sync</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Priority Sync */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-[#F97316] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-[#F97316]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      Prioritize Critical Data
                    </h3>
                    <div className="px-2 py-0.5 bg-[#F97316] bg-opacity-10 rounded text-xs font-bold text-[#F97316]">
                      AI
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Sync payments and urgent items first
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={prioritizeCritical}
                  onChange={(e) => setPrioritizeCritical(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F97316]"></div>
              </label>
            </div>
          </div>

          {/* Low Battery Mode */}
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Battery className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">
                    Low Battery Mode
                  </h3>
                  <p className="text-sm text-gray-500">
                    Reduce sync frequency when battery is low
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={lowBatteryMode}
                  onChange={(e) => setLowBatteryMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Card */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-orange-900 mb-2">
                Smart Sync Enabled
              </h3>
              <p className="text-sm text-orange-700 mb-3">
                BuildAI intelligently manages your sync to ensure critical data like
                payments and urgent updates are always prioritized. Your data is safe
                and optimized for the best performance.
              </p>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-white rounded-lg">
                  <span className="text-xs font-bold text-orange-900">
                    ✓ AI Priority Active
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg">
                  <span className="text-xs font-bold text-orange-900">
                    ✓ Auto Optimized
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Warning about disabling auto-sync */}
      {!autoSyncEnabled && (
        <div className="px-6 mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-red-50 rounded-xl border-2 border-red-200 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-red-900 mb-1">
                  Auto-Sync Disabled
                </h3>
                <p className="text-sm text-red-700">
                  Your data will not sync automatically. Make sure to manually sync
                  your pending items to avoid data loss.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Manual Sync Button */}
      <div className="px-6">
        <button
          onClick={() => navigate("/data-sync")}
          className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Manual Sync Now</span>
        </button>
      </div>
    </div>
  );
}
