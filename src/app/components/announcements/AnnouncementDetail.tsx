import { useParams, useNavigate, Link } from "react-router";
import { AlertTriangle, Info, Shield, Users, Clock, CheckCircle } from "lucide-react";

// Mock data - in real app would come from API
const announcementData: Record<string, any> = {
  "1": {
    id: "1",
    message: "Site inspection scheduled for tomorrow at 10 AM. All engineers must attend.",
    fullMessage: "Site inspection scheduled for tomorrow at 10 AM. All engineers must attend. Please ensure all safety equipment is in place and work areas are organized. The inspection will cover all active construction zones.",
    type: "urgent",
    date: "Apr 6, 2026",
    time: "9:30 AM",
    isPinned: true,
    seenCount: 45,
    totalUsers: 60,
    audience: "All Users",
  },
  "2": {
    id: "2",
    message: "New safety helmets available at the office. Please collect yours.",
    fullMessage: "New safety helmets available at the office. Please collect yours today from the safety officer. The helmets meet the latest safety standards and are mandatory for all site personnel.",
    type: "safety",
    date: "Apr 6, 2026",
    time: "8:15 AM",
    isPinned: true,
    seenCount: 52,
    totalUsers: 60,
    audience: "All Users",
  },
  "3": {
    id: "3",
    message: "Concrete delivery postponed to 2 PM due to traffic delays.",
    fullMessage: "Concrete delivery postponed to 2 PM due to traffic delays. Please adjust work schedule accordingly. The concrete pouring will now begin at 2:30 PM instead of the originally scheduled 11 AM.",
    type: "general",
    date: "Apr 5, 2026",
    time: "11:45 AM",
    isPinned: false,
    seenCount: 58,
    totalUsers: 60,
    audience: "Site Engineers",
  },
};

export function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const announcement = announcementData[id || "1"];

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="font-bold text-gray-900 mb-4">Announcement not found</p>
          <button
            onClick={() => navigate("/announcements")}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl"
          >
            Back to Announcements
          </button>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle size={24} />;
      case "safety":
        return <Shield size={24} />;
      default:
        return <Info size={24} />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
        };
      case "safety":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300",
        };
      default:
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-300",
        };
    }
  };

  const styles = getTypeStyles(announcement.type);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={() => navigate("/announcements")}
          className="text-white mb-4 hover:underline text-sm font-semibold"
        >
          ← Back to Announcements
        </button>
        <h1 className="font-bold text-white text-2xl mb-2">Announcement</h1>
        <p className="text-blue-100">Full details</p>
      </div>

      <div className="px-6 space-y-4">
        {/* Type Badge */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-4 py-2 ${styles.bg} rounded-xl border-2 ${styles.border}`}>
            <div className={styles.text}>{getTypeIcon(announcement.type)}</div>
            <span className={`font-bold uppercase ${styles.text}`}>{announcement.type}</span>
          </div>
        </div>

        {/* Main Message Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
          <p className="text-gray-900 text-lg leading-relaxed">{announcement.fullMessage}</p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock size={20} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Posted on</p>
              <p className="font-bold text-gray-900">
                {announcement.date} at {announcement.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Users size={20} className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-600">Audience</p>
              <p className="font-bold text-gray-900">{announcement.audience}</p>
            </div>
          </div>
        </div>

        {/* Read Status Card */}
        <Link
          to={`/announcements/${announcement.id}/read-status`}
          className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-300 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-blue-600" />
              <span className="font-bold text-gray-900">Read Status</span>
            </div>
            <span className="text-sm text-blue-600 font-semibold">View All →</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600">{announcement.totalUsers}</p>
              <p className="text-xs text-gray-600 mt-1">Total</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{announcement.seenCount}</p>
              <p className="text-xs text-gray-600 mt-1">Seen</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {announcement.totalUsers - announcement.seenCount}
              </p>
              <p className="text-xs text-gray-600 mt-1">Pending</p>
            </div>
          </div>
        </Link>

        {/* Action Button */}
        <button
          onClick={() => navigate("/announcements")}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <CheckCircle size={20} />
          Mark as Read
        </button>
      </div>
    </div>
  );
}
