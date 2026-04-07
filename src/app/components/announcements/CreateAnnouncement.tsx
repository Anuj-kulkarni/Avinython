import { useState } from "react";
import { useNavigate } from "react-router";
import { Send, AlertTriangle, Info, Shield, Pin, Bell } from "lucide-react";

export function CreateAnnouncement() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"general" | "urgent" | "safety">("general");
  const [audience, setAudience] = useState("all");
  const [isPinned, setIsPinned] = useState(false);
  const [sendNotification, setSendNotification] = useState(true);

  const handleSend = () => {
    // Here you would send the announcement
    console.log({ message, type, audience, isPinned, sendNotification });
    navigate("/announcements");
  };

  const getTypeIcon = (selectedType: string) => {
    switch (selectedType) {
      case "urgent":
        return <AlertTriangle size={18} />;
      case "safety":
        return <Shield size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={() => navigate("/announcements")}
          className="text-white mb-4 hover:underline text-sm font-semibold"
        >
          ← Back
        </button>
        <h1 className="font-bold text-white text-2xl mb-2">Create Announcement</h1>
        <p className="text-blue-100">Send message to site team</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Message Input */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
          <label className="block font-bold text-gray-900 mb-3">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your announcement message here..."
            rows={6}
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 font-medium resize-none focus:outline-none focus:border-blue-600 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-2">{message.length} characters</p>
        </div>

        {/* Type Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
          <label className="block font-bold text-gray-900 mb-3">Type</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setType("general")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                type === "general"
                  ? "bg-blue-100 border-blue-600 text-blue-700"
                  : "bg-gray-50 border-gray-300 text-gray-600"
              }`}
            >
              <Info size={24} />
              <span className="text-sm font-bold">General</span>
            </button>
            <button
              onClick={() => setType("urgent")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                type === "urgent"
                  ? "bg-red-100 border-red-600 text-red-700"
                  : "bg-gray-50 border-gray-300 text-gray-600"
              }`}
            >
              <AlertTriangle size={24} />
              <span className="text-sm font-bold">Urgent</span>
            </button>
            <button
              onClick={() => setType("safety")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                type === "safety"
                  ? "bg-orange-100 border-orange-600 text-orange-700"
                  : "bg-gray-50 border-gray-300 text-gray-600"
              }`}
            >
              <Shield size={24} />
              <span className="text-sm font-bold">Safety</span>
            </button>
          </div>
        </div>

        {/* Audience Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
          <label className="block font-bold text-gray-900 mb-3">Audience</label>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:outline-none focus:border-blue-600 transition-colors"
          >
            <option value="all">All Users</option>
            <option value="engineers">Site Engineers</option>
            <option value="workers">Workers</option>
            <option value="accountants">Accountants</option>
          </select>
        </div>

        {/* Toggle Options */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 space-y-4">
          <label className="block font-bold text-gray-900 mb-3">Options</label>

          {/* Pin Option */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${isPinned ? "bg-yellow-100" : "bg-gray-200"}`}>
                <Pin size={20} className={isPinned ? "text-yellow-600" : "text-gray-500"} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Mark as Important</p>
                <p className="text-xs text-gray-600">Pin to top of list</p>
              </div>
            </div>
            <button
              onClick={() => setIsPinned(!isPinned)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                isPinned ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isPinned ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Notification Option */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 ${sendNotification ? "bg-blue-100" : "bg-gray-200"}`}>
                <Bell size={20} className={sendNotification ? "text-blue-600" : "text-gray-500"} />
              </div>
              <div>
                <p className="font-bold text-gray-900">Send Notification</p>
                <p className="text-xs text-gray-600">Alert users immediately</p>
              </div>
            </div>
            <button
              onClick={() => setSendNotification(!sendNotification)}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                sendNotification ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  sendNotification ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all ${
            message.trim()
              ? "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Send size={20} />
          Send Announcement
        </button>
      </div>
    </div>
  );
}
