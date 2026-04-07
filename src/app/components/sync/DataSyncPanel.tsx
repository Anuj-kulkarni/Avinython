import { RefreshCw, CheckCircle, Clock, Package, Edit, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

interface PendingAction {
  id: string;
  type: "material" | "update" | "progress";
  description: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
}

const pendingActions: PendingAction[] = [
  {
    id: "1",
    type: "material",
    description: "Added 50 bags of cement to inventory",
    timestamp: "2 minutes ago",
    priority: "high",
  },
  {
    id: "2",
    type: "update",
    description: "Updated steel bar usage (250 units)",
    timestamp: "5 minutes ago",
    priority: "high",
  },
  {
    id: "3",
    type: "progress",
    description: "Structure phase progress updated to 68%",
    timestamp: "10 minutes ago",
    priority: "medium",
  },
  {
    id: "4",
    type: "material",
    description: "Added 100 bricks to inventory",
    timestamp: "15 minutes ago",
    priority: "low",
  },
];

export function DataSyncPanel() {
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleSync = () => {
    setSyncing(true);
    setSyncProgress(0);

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setSyncing(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "material":
        return <Package size={16} />;
      case "update":
        return <Edit size={16} />;
      case "progress":
        return <TrendingUp size={16} />;
      default:
        return <CheckCircle size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="font-bold text-white text-2xl mb-2">Data Sync</h1>
        <p className="text-blue-100">Manage offline data synchronization</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Sync Status Card */}
        <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-2 ${syncing ? "bg-blue-100" : "bg-green-100"}`}>
                {syncing ? (
                  <RefreshCw className="text-blue-600 animate-spin" size={20} />
                ) : (
                  <CheckCircle className="text-green-600" size={20} />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {syncing ? "Syncing..." : "Ready to Sync"}
                </p>
                <p className="text-sm text-gray-600">
                  {pendingActions.length} pending actions
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {syncing && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">{syncProgress}% complete</p>
            </div>
          )}
        </div>

        {/* AI Priority Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex items-start gap-3">
            <div className="bg-orange-600 rounded-lg p-2 flex-shrink-0">
              <Zap className="text-white" size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 mb-1">AI Prioritization</p>
              <p className="text-sm text-gray-700">
                Critical inventory updates will be synced first
              </p>
            </div>
          </div>
        </div>

        {/* Pending Actions List */}
        <div>
          <h2 className="font-bold text-gray-900 mb-3">Pending Actions</h2>
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="bg-white rounded-xl p-4 border-2 border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-lg p-2 ${getPriorityColor(action.priority)}`}>
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-gray-900 text-sm">{action.description}</p>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold border ${getPriorityColor(
                          action.priority
                        )}`}
                      >
                        {action.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Clock size={12} />
                      <span>{action.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Now Button */}
        <button
          onClick={handleSync}
          disabled={syncing}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed"
        >
          {syncing ? "Syncing..." : "Sync Now"}
        </button>
      </div>
    </div>
  );
}
