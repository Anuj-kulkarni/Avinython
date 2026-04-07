import { Link } from "react-router";
import { Bell, AlertTriangle, Info, Shield, Pin, Plus, Users } from "lucide-react";

interface Announcement {
  id: string;
  message: string;
  type: "general" | "urgent" | "safety";
  date: string;
  time: string;
  isPinned: boolean;
  seenCount: number;
  totalUsers: number;
  fullMessage: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    message: "Site inspection scheduled for tomorrow at 10 AM. All engineers must attend.",
    type: "urgent",
    date: "Apr 6, 2026",
    time: "9:30 AM",
    isPinned: true,
    seenCount: 45,
    totalUsers: 60,
    fullMessage: "Site inspection scheduled for tomorrow at 10 AM. All engineers must attend. Please ensure all safety equipment is in place and work areas are organized.",
  },
  {
    id: "2",
    message: "New safety helmets available at the office. Please collect yours.",
    type: "safety",
    date: "Apr 6, 2026",
    time: "8:15 AM",
    isPinned: true,
    seenCount: 52,
    totalUsers: 60,
    fullMessage: "New safety helmets available at the office. Please collect yours today from the safety officer.",
  },
  {
    id: "3",
    message: "Concrete delivery postponed to 2 PM due to traffic delays.",
    type: "general",
    date: "Apr 5, 2026",
    time: "11:45 AM",
    isPinned: false,
    seenCount: 58,
    totalUsers: 60,
    fullMessage: "Concrete delivery postponed to 2 PM due to traffic delays. Please adjust work schedule accordingly.",
  },
  {
    id: "4",
    message: "Weekly team meeting on Friday at 4 PM in the conference room.",
    type: "general",
    date: "Apr 5, 2026",
    time: "9:00 AM",
    isPinned: false,
    seenCount: 60,
    totalUsers: 60,
    fullMessage: "Weekly team meeting on Friday at 4 PM in the conference room. Attendance is mandatory for all team members.",
  },
  {
    id: "5",
    message: "Emergency evacuation drill this Thursday at 3 PM.",
    type: "safety",
    date: "Apr 4, 2026",
    time: "2:30 PM",
    isPinned: false,
    seenCount: 57,
    totalUsers: 60,
    fullMessage: "Emergency evacuation drill this Thursday at 3 PM. All personnel must participate. Assembly point is the main gate.",
  },
];

export function AnnouncementsScreen() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle size={18} />;
      case "safety":
        return <Shield size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-300",
          cardBg: "bg-red-50",
        };
      case "safety":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          border: "border-orange-300",
          cardBg: "bg-orange-50",
        };
      default:
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-300",
          cardBg: "bg-blue-50",
        };
    }
  };

  const pinnedAnnouncements = announcements.filter((a) => a.isPinned);
  const regularAnnouncements = announcements.filter((a) => !a.isPinned);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
              <Bell className="text-white" size={24} />
            </div>
            <h1 className="font-bold text-white text-2xl">Announcements</h1>
          </div>
          <div className="bg-white/20 backdrop-blur-sm text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {announcements.length}
          </div>
        </div>
        <p className="text-blue-100">Site updates and notifications</p>
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="text-orange-600" size={18} />
            <h2 className="font-bold text-gray-900">Pinned</h2>
          </div>
          <div className="space-y-3">
            {pinnedAnnouncements.map((announcement) => {
              const styles = getTypeStyles(announcement.type);
              return (
                <Link
                  key={announcement.id}
                  to={`/announcements/${announcement.id}`}
                  className={`block bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-[0.98]`}
                >
                  {/* Pin Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-200 rounded-lg">
                      <Pin size={12} className="text-yellow-700" />
                      <span className="text-xs font-bold text-yellow-700">Pinned</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 ${styles.bg} rounded-lg`}>
                      <div className={styles.text}>{getTypeIcon(announcement.type)}</div>
                      <span className={`text-xs font-bold uppercase ${styles.text}`}>
                        {announcement.type}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-gray-900 font-semibold mb-3 leading-relaxed">
                    {announcement.message}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-yellow-300">
                    <span className="text-xs text-gray-600">
                      {announcement.date} • {announcement.time}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-700">
                      <Users size={14} />
                      <span className="font-semibold">
                        {announcement.seenCount}/{announcement.totalUsers} seen
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">All Announcements</h2>
        <div className="space-y-3">
          {regularAnnouncements.map((announcement) => {
            const styles = getTypeStyles(announcement.type);
            return (
              <Link
                key={announcement.id}
                to={`/announcements/${announcement.id}`}
                className={`block bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-all active:scale-[0.98]`}
              >
                {/* Type Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`flex items-center gap-1 px-2 py-1 ${styles.bg} rounded-lg`}>
                    <div className={styles.text}>{getTypeIcon(announcement.type)}</div>
                    <span className={`text-xs font-bold uppercase ${styles.text}`}>
                      {announcement.type}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <p className="text-gray-900 font-semibold mb-3 leading-relaxed">
                  {announcement.message}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-600">
                    {announcement.date} • {announcement.time}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-700">
                    <Users size={14} />
                    <span className="font-semibold">
                      {announcement.seenCount}/{announcement.totalUsers} seen
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Floating Create Button */}
      <Link
        to="/announcements/create"
        className="fixed bottom-24 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all active:scale-[0.95] z-10"
      >
        <Plus size={28} />
      </Link>
    </div>
  );
}
