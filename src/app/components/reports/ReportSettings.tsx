import { useState } from "react";
import { ArrowLeft, Clock, Mail, Save, Sparkles, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function ReportSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    autoGenerate: true,
    reportTime: "18:00",
    autoShareWhatsApp: false,
    autoShareEmail: true,
    emailRecipients: "admin@buildai.com",
    whatsappNumber: "+91 98765 43210",
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
    navigate("/reports");
  };

  const ToggleSwitch = ({ 
    enabled, 
    onChange 
  }: { 
    enabled: boolean; 
    onChange: (val: boolean) => void 
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-14 h-7 rounded-full transition-all ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/reports")}
          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-90 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#0F172A]">Report Settings</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Configure automatic reports</p>
        </div>
      </div>

      {/* Auto-Generate Report Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">AI Auto-Generate</h2>
            <p className="text-blue-100 text-xs font-semibold">Automatic report generation</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Auto-Generate Toggle */}
          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-900 text-sm">Auto-Generate Daily Report</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Generate report automatically</p>
            </div>
            <ToggleSwitch
              enabled={settings.autoGenerate}
              onChange={(val) => setSettings({ ...settings, autoGenerate: val })}
            />
          </div>

          {/* Time Selector */}
          {settings.autoGenerate && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Clock size={14} />
                Generation Time
              </label>
              <input
                type="time"
                value={settings.reportTime}
                onChange={(e) => setSettings({ ...settings, reportTime: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 font-semibold mt-2">
                Report will be generated daily at {settings.reportTime}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Share Options Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">Auto-Share Options</h2>
            <p className="text-orange-100 text-xs font-semibold">Automatic sharing settings</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* WhatsApp Auto-Share */}
          <div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">Auto-Share via WhatsApp</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">Send to WhatsApp automatically</p>
              </div>
              <ToggleSwitch
                enabled={settings.autoShareWhatsApp}
                onChange={(val) => setSettings({ ...settings, autoShareWhatsApp: val })}
              />
            </div>

            {settings.autoShareWhatsApp && (
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            )}
          </div>

          {/* Email Auto-Share */}
          <div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl mb-3">
              <div>
                <p className="font-bold text-gray-900 text-sm">Auto-Share via Email</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">Send to email automatically</p>
              </div>
              <ToggleSwitch
                enabled={settings.autoShareEmail}
                onChange={(val) => setSettings({ ...settings, autoShareEmail: val })}
              />
            </div>

            {settings.autoShareEmail && (
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} />
                  Email Recipients
                </label>
                <input
                  type="email"
                  value={settings.emailRecipients}
                  onChange={(e) => setSettings({ ...settings, emailRecipients: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="admin@buildai.com"
                />
                <p className="text-xs text-gray-500 font-semibold mt-2">
                  Separate multiple emails with commas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-black text-gray-900 text-sm mb-4">Additional Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-900 text-sm">Include AI Insights</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Add AI predictions to report</p>
            </div>
            <ToggleSwitch
              enabled={true}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-900 text-sm">Include Photos</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Attach site photos to report</p>
            </div>
            <ToggleSwitch
              enabled={true}
              onChange={() => {}}
            />
          </div>

          <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-bold text-gray-900 text-sm">Weekly Summary</p>
              <p className="text-xs text-gray-500 font-semibold mt-1">Generate weekly summary reports</p>
            </div>
            <ToggleSwitch
              enabled={false}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-black text-base hover:from-blue-700 hover:to-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save Settings
      </button>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-blue-700 font-semibold text-center">
          All changes will take effect from tomorrow
        </p>
      </div>
    </div>
  );
}
