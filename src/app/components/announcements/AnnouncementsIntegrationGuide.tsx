import { Code, FileCode, Lightbulb, BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

export function AnnouncementsIntegrationGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={() => navigate("/announcements-demo")}
          className="text-white mb-4 hover:underline text-sm font-semibold"
        >
          ← Back to Demo
        </button>
        <h1 className="font-bold text-white text-2xl mb-2">Integration Guide</h1>
        <p className="text-blue-100">How to use the Announcements System</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Overview */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-blue-600" size={20} />
            <h2 className="font-bold text-gray-900 text-lg">System Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            The BuildAI Announcements System provides a complete solution for site-wide communication
            with support for different announcement types, priority levels, read tracking, and real-time
            notifications.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Key Components:</strong> AnnouncementsScreen, CreateAnnouncement, AnnouncementDetail,
              ReadStatusTracking, and NotificationPopup
            </p>
          </div>
        </div>

        {/* Component Usage */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Code className="text-green-600" size={20} />
            <h2 className="font-bold text-gray-900 text-lg">Using NotificationPopup</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">1. Import the component:</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-xs font-mono">
                  import {"{"} NotificationPopup {"}"} from "./components/announcements/NotificationPopup";
                </code>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">2. Add state management:</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-xs font-mono block">
                  const [showNotification, setShowNotification] = useState(false);
                  <br />
                  const [notification, setNotification] = useState({"{"}
                  <br />
                  &nbsp;&nbsp;id: "1",
                  <br />
                  &nbsp;&nbsp;type: "urgent" as "general" | "urgent" | "safety",
                  <br />
                  &nbsp;&nbsp;message: "Your message here"
                  <br />
                  {"}"});
                </code>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 mb-2">3. Render conditionally:</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-green-400 text-xs font-mono block">
                  {"{"}showNotification && (
                  <br />
                  &nbsp;&nbsp;&lt;NotificationPopup
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;id={"{"}notification.id{"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;type={"{"}notification.type{"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;message={"{"}notification.message{"}"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;onClose={"{"}&nbsp;() =&gt; setShowNotification(false)&nbsp;{"}"}
                  <br />
                  &nbsp;&nbsp;/&gt;
                  <br />
                  {")"}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="text-orange-600" size={20} />
            <h2 className="font-bold text-gray-900 text-lg">NotificationPopup Props</h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-bold text-sm text-gray-900 mb-1">
                id: <span className="text-blue-600">string</span>
              </p>
              <p className="text-xs text-gray-600">Unique identifier for the announcement</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-bold text-sm text-gray-900 mb-1">
                type: <span className="text-blue-600">"general" | "urgent" | "safety"</span>
              </p>
              <p className="text-xs text-gray-600">Category of the announcement (affects styling)</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-bold text-sm text-gray-900 mb-1">
                message: <span className="text-blue-600">string</span>
              </p>
              <p className="text-xs text-gray-600">The announcement message to display</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="font-bold text-sm text-gray-900 mb-1">
                onClose: <span className="text-blue-600">() =&gt; void</span>
              </p>
              <p className="text-xs text-gray-600">Callback when user dismisses the notification</p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-yellow-600" size={20} />
            <h2 className="font-bold text-gray-900 text-lg">Best Practices</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Auto-dismiss Notifications</p>
                <p className="text-xs text-gray-600">
                  Set a timeout to automatically close notifications after 5-10 seconds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Use Appropriate Types</p>
                <p className="text-xs text-gray-600">
                  Use "urgent" for time-sensitive matters, "safety" for safety-related issues, "general" for regular updates
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Keep Messages Concise</p>
                <p className="text-xs text-gray-600">
                  Show brief preview in popup, full details available in announcement detail view
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Track Read Status</p>
                <p className="text-xs text-gray-600">
                  Monitor engagement with the ReadStatusTracking component to ensure important messages are seen
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">5</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Pin Critical Announcements</p>
                <p className="text-xs text-gray-600">
                  Use the pin feature to keep urgent announcements visible at the top of the list
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Reference */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Available Routes</h2>
          
          <div className="space-y-2">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-blue-900 font-bold">/announcements</code>
              <p className="text-xs text-gray-600 mt-1">Main announcements list with pinned and regular items</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-blue-900 font-bold">/announcements/create</code>
              <p className="text-xs text-gray-600 mt-1">Create new announcement form</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-blue-900 font-bold">/announcements/:id</code>
              <p className="text-xs text-gray-600 mt-1">Detailed view of a specific announcement</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-blue-900 font-bold">/announcements/:id/read-status</code>
              <p className="text-xs text-gray-600 mt-1">View who has seen the announcement</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <code className="text-xs font-mono text-blue-900 font-bold">/announcements-demo</code>
              <p className="text-xs text-gray-600 mt-1">Interactive demo of all announcement features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}