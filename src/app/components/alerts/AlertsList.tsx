import { AlertCircle, Package, Truck, TrendingUp, Filter, Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Alert {
  id: string;
  type: "low-stock" | "delivery-delay" | "over-usage";
  title: string;
  description: string;
  severity: "critical" | "warning" | "normal";
  timestamp: string;
  location?: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "low-stock",
    title: "Low Stock Alert",
    description: "Cement inventory below minimum threshold. Only 45 bags remaining.",
    severity: "critical",
    timestamp: "5 minutes ago",
    location: "Riverdale Tower",
  },
  {
    id: "2",
    type: "delivery-delay",
    title: "Delivery Delayed",
    description: "Steel bars delivery delayed by 2 hours due to traffic.",
    severity: "warning",
    timestamp: "15 minutes ago",
    location: "Riverdale Tower",
  },
  {
    id: "3",
    type: "over-usage",
    title: "Over Usage Detected",
    description: "Brick consumption 15% higher than planned for this week.",
    severity: "warning",
    timestamp: "1 hour ago",
    location: "Riverdale Tower",
  },
  {
    id: "4",
    type: "low-stock",
    title: "Low Stock Alert",
    description: "TMT Steel bars running low. 120 units remaining.",
    severity: "warning",
    timestamp: "2 hours ago",
    location: "Green Valley",
  },
  {
    id: "5",
    type: "delivery-delay",
    title: "Delivery Delayed",
    description: "Sand delivery postponed to tomorrow morning.",
    severity: "normal",
    timestamp: "3 hours ago",
    location: "Skyline Plaza",
  },
];

export function AlertsList() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "normal">("all");

  const filteredAlerts = filter === "all"
    ? alerts
    : alerts.filter((alert) => alert.severity === filter);

  const handleViewDetails = (alertItem: Alert) => {
    toast.info(`${alertItem.title}: ${alertItem.description}`);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "low-stock":
        return <Package size={20} />;
      case "delivery-delay":
        return <Truck size={20} />;
      case "over-usage":
        return <TrendingUp size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-gradient-to-r from-red-50 to-red-100",
          border: "border-red-300",
          icon: "bg-red-600",
          text: "text-red-900",
          badge: "bg-red-600 text-white",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-r from-yellow-50 to-yellow-100",
          border: "border-yellow-300",
          icon: "bg-yellow-600",
          text: "text-yellow-900",
          badge: "bg-yellow-600 text-white",
        };
      case "normal":
        return {
          bg: "bg-gradient-to-r from-green-50 to-green-100",
          border: "border-green-300",
          icon: "bg-green-600",
          text: "text-green-900",
          badge: "bg-green-600 text-white",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-300",
          icon: "bg-gray-600",
          text: "text-gray-900",
          badge: "bg-gray-600 text-white",
        };
    }
  };

  const alertCount = {
    all: alerts.length,
    critical: alerts.filter((a) => a.severity === "critical").length,
    warning: alerts.filter((a) => a.severity === "warning").length,
    normal: alerts.filter((a) => a.severity === "normal").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Bell className="text-white" size={24} />
            </div>
            <h1 className="font-bold text-white text-2xl">Alerts</h1>
          </div>
          <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {alertCount.all}
          </div>
        </div>
        <p className="text-blue-100">Monitor site notifications</p>
      </div>

      {/* Filter Buttons */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="text-gray-600" size={18} />
          <span className="text-sm font-bold text-gray-900">Filter by Severity</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            All ({alertCount.all})
          </button>
          <button
            onClick={() => setFilter("critical")}
            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              filter === "critical"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Critical ({alertCount.critical})
          </button>
          <button
            onClick={() => setFilter("warning")}
            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              filter === "warning"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Warning ({alertCount.warning})
          </button>
          <button
            onClick={() => setFilter("normal")}
            className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${
              filter === "normal"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Normal ({alertCount.normal})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-6 space-y-3">
        {filteredAlerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <div
              key={alert.id}
              className={`${styles.bg} rounded-xl p-4 border-2 ${styles.border} shadow-sm`}
            >
              <div className="flex items-start gap-3">
                <div className={`${styles.icon} rounded-full p-2 flex-shrink-0`}>
                  <div className="text-white">{getAlertIcon(alert.type)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className={`font-bold ${styles.text}`}>{alert.title}</p>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${styles.badge}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  {alert.location && (
                    <p className="text-xs text-gray-600 mb-2">📍 {alert.location}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{alert.timestamp}</span>
                    <button
                      onClick={() => handleViewDetails(alert)}
                      className={`px-3 py-1.5 ${styles.badge} text-xs font-bold rounded-lg hover:opacity-90 transition-opacity`}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredAlerts.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Bell className="text-gray-400" size={24} />
          </div>
          <p className="font-bold text-gray-900 mb-1">No alerts</p>
          <p className="text-sm text-gray-600">No {filter} alerts at this time</p>
        </div>
      )}
    </div>
  );
}
