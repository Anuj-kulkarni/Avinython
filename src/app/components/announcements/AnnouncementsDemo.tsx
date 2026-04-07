import { Link } from "react-router";
import { Bell, Plus, FileText, Users, AlertTriangle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { NotificationPopup } from "./NotificationPopup";

export function AnnouncementsDemo() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    id: "1",
    type: "urgent" as "general" | "urgent" | "safety",
    message: "Site inspection scheduled for tomorrow at 10 AM. All engineers must attend.",
  });

  // Auto-show notification after 2 seconds as demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const triggerNotification = (type: "general" | "urgent" | "safety", message: string, id: string) => {
    setNotificationData({ id, type, message });
    setShowNotification(true);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Show Notification Popup */}
      {showNotification && (
        <NotificationPopup
          id={notificationData.id}
          type={notificationData.type}
          message={notificationData.message}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="font-bold text-white text-2xl mb-2">Announcements System</h1>
        <p className="text-blue-100">Complete announcement management demo</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Integration Guide Link */}
        <Link
          to="/announcements-guide"
          className="block bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <BookOpen size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">Integration Guide</p>
              <p className="text-sm text-blue-100">Learn how to use the Announcements System</p>
            </div>
            <span className="text-2xl">→</span>
          </div>
        </Link>

        {/* Demo Notification Triggers */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <h2 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
            <Bell className="text-blue-600" size={20} />
            Test Notification Popups
          </h2>
          <p className="text-sm text-gray-600 mb-4">Click to see different notification types</p>
          
          <div className="space-y-3">
            <button
              onClick={() => triggerNotification("general", "Concrete delivery scheduled for 2 PM today.", "3")}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Bell size={18} />
              Show General Notification
            </button>
            
            <button
              onClick={() => triggerNotification("urgent", "Site inspection scheduled for tomorrow at 10 AM.", "1")}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <AlertTriangle size={18} />
              Show Urgent Notification
            </button>
            
            <button
              onClick={() => triggerNotification("safety", "New safety helmets available at the office.", "2")}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Bell size={18} />
              Show Safety Notification
            </button>
          </div>
        </div>

        {/* Main Screens */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Main Screens</h2>
          <div className="space-y-3">
            <Link
              to="/announcements"
              className="block bg-blue-50 rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 rounded-lg p-2">
                  <Bell className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Announcements List</p>
                  <p className="text-xs text-gray-600">View all site announcements</p>
                </div>
              </div>
            </Link>

            <Link
              to="/announcements/create"
              className="block bg-green-50 rounded-xl p-4 border-2 border-green-200 hover:border-green-400 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-600 rounded-lg p-2">
                  <Plus className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Create Announcement</p>
                  <p className="text-xs text-gray-600">Send new announcement to team</p>
                </div>
              </div>
            </Link>

            <Link
              to="/announcements/1"
              className="block bg-orange-50 rounded-xl p-4 border-2 border-orange-200 hover:border-orange-400 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 rounded-lg p-2">
                  <FileText className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Announcement Detail</p>
                  <p className="text-xs text-gray-600">View full announcement</p>
                </div>
              </div>
            </Link>

            <Link
              to="/announcements/1/read-status"
              className="block bg-purple-50 rounded-xl p-4 border-2 border-purple-200 hover:border-purple-400 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 rounded-lg p-2">
                  <Users className="text-white" size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Read Status Tracking</p>
                  <p className="text-xs text-gray-600">See who viewed the announcement</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <h2 className="font-bold text-gray-900 text-lg mb-4">System Features</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Three Announcement Types</p>
                <p className="text-xs text-gray-600">General, Urgent, and Safety categories</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Pin Important Announcements</p>
                <p className="text-xs text-gray-600">Keep critical updates at the top</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Read Status Tracking</p>
                <p className="text-xs text-gray-600">Track who has seen each announcement</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Instant Notifications</p>
                <p className="text-xs text-gray-600">Real-time popup notifications for new announcements</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Audience Targeting</p>
                <p className="text-xs text-gray-600">Send to specific roles or all users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}