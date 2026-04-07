import { AlertTriangle, Info, Shield, X } from "lucide-react";
import { Link } from "react-router";

interface NotificationPopupProps {
  id: string;
  type: "general" | "urgent" | "safety";
  message: string;
  onClose: () => void;
}

export function NotificationPopup({ id, type, message, onClose }: NotificationPopupProps) {
  const getTypeIcon = (notificationType: string) => {
    switch (notificationType) {
      case "urgent":
        return <AlertTriangle size={20} />;
      case "safety":
        return <Shield size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getTypeStyles = (notificationType: string) => {
    switch (notificationType) {
      case "urgent":
        return {
          bg: "bg-gradient-to-r from-red-50 to-red-100",
          border: "border-red-300",
          icon: "bg-red-600",
          text: "text-red-900",
        };
      case "safety":
        return {
          bg: "bg-gradient-to-r from-orange-50 to-orange-100",
          border: "border-orange-300",
          icon: "bg-orange-600",
          text: "text-orange-900",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-blue-50 to-blue-100",
          border: "border-blue-300",
          icon: "bg-blue-600",
          text: "text-blue-900",
        };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <div className={`${styles.bg} border-2 ${styles.border} rounded-xl p-4 shadow-2xl`}>
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`${styles.icon} rounded-full p-2 flex-shrink-0`}>
            <div className="text-white">{getTypeIcon(type)}</div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`font-bold ${styles.text} mb-1 text-sm uppercase`}>
              New {type} Announcement
            </p>
            <p className="text-gray-900 font-medium text-sm leading-relaxed line-clamp-2">
              {message}
            </p>

            {/* Action Button */}
            <Link
              to={`/announcements/${id}`}
              className={`inline-block mt-3 px-4 py-2 ${styles.icon} text-white font-bold rounded-lg text-sm hover:opacity-90 transition-opacity`}
            >
              View
            </Link>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
