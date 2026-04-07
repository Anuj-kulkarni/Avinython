import { useState } from "react";
import { 
  Shield, 
  Lock, 
  Smartphone, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Fingerprint, 
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Smartphone as DeviceIcon
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export function SecuritySettings() {
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordForm.new.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    toast.success("Password updated successfully");
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const handleToggle2FA = () => {
    if (!is2FAEnabled) {
      toast.info("Setting up 2FA... Redirecting to verification", {
        icon: <Smartphone className="w-4 h-4" />
      });
      // In a real app, this would redirect to a setup flow
      setTimeout(() => setIs2FAEnabled(true), 1000);
    } else {
      setIs2FAEnabled(false);
      toast.success("Two-factor authentication disabled");
    }
  };

  const handleDownloadAudit = () => {
    const report = [
      "BuildAI Security Audit",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `2FA Enabled: ${is2FAEnabled ? "Yes" : "No"}`,
      `Biometric Enabled: ${isBiometricEnabled ? "Yes" : "No"}`,
      `Password Length: ${passwordForm.new.length > 0 ? passwordForm.new.length : "Not changed in this session"}`,
      "",
      "Recommendation: Enable 2FA and rotate password every 90 days.",
    ].join("\n");
    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "security-audit.txt";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    toast.success("Security audit downloaded");
  };

  const handleResetSecurity = () => {
    setIs2FAEnabled(false);
    setIsBiometricEnabled(false);
    setPasswordForm({ current: "", new: "", confirm: "" });
    toast.success("Security settings reset. Please reconfigure protection.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="p-4 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 text-lg">Security Settings</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account Protection</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Security Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/90">AI Security Audit</span>
            </div>
            
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="text-3xl font-black mb-1">82/100</h3>
                <p className="text-xs font-bold text-blue-100">Your security score is good</p>
              </div>
              <ShieldCheck size={48} className="text-blue-200/50" />
            </div>

            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '82%' }} />
              </div>
              <p className="text-[10px] text-blue-50 font-medium leading-relaxed">
                Enable 2FA and update your 6-month-old password to reach 100%.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h3 className="font-black text-gray-900">Change Password</h3>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Current Password</label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">New Password</label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="At least 8 characters"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-1">Confirm New Password</label>
              <input 
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                placeholder="Repeat new password"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-sm active:scale-95 transition-all shadow-lg shadow-blue-100 mt-2"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* 2FA & Biometrics Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                <Smartphone size={20} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-sm">Two-Factor Authentication</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enhanced Protection</p>
              </div>
            </div>
            <button 
              onClick={handleToggle2FA}
              className={`w-12 h-6 rounded-full transition-all relative ${is2FAEnabled ? 'bg-orange-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${is2FAEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <Fingerprint size={20} />
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-sm">Biometric Login</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">FaceID / TouchID</p>
              </div>
            </div>
            <button 
              onClick={() => setIsBiometricEnabled(!isBiometricEnabled)}
              className={`w-12 h-6 rounded-full transition-all relative ${isBiometricEnabled ? 'bg-purple-600' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isBiometricEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {/* Session Management Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => navigate("/settings/sessions")}
            className="w-full p-5 flex items-center justify-between active:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <DeviceIcon size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-black text-gray-900 text-sm">Active Sessions</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">3 devices logged in</p>
              </div>
            </div>
            <ChevronRight className="text-gray-300" size={20} />
          </button>
          
          <div className="px-5 pb-5 pt-2">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <AlertTriangle className="text-orange-500 mt-0.5" size={16} />
              <div className="flex-1">
                <p className="text-xs font-black text-orange-900">1 Unfamiliar Login</p>
                <p className="text-[10px] text-orange-700 font-bold leading-relaxed">
                  We noticed a login from Bangalore, Karnataka that doesn't match your usual pattern.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Section */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Advanced Settings</h3>
          
          <button
            onClick={handleDownloadAudit}
            className="w-full bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between text-left active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <Shield className="text-gray-400" size={18} />
              <span className="text-sm font-black text-gray-900">Download Security Audit</span>
            </div>
            <ChevronRight className="text-gray-300" size={16} />
          </button>

          <button
            onClick={handleResetSecurity}
            className="w-full bg-red-50 border border-red-100 p-4 rounded-xl flex items-center justify-between text-left active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-3">
              <Shield className="text-red-500 group-active:text-red-600 transition-colors" size={18} />
              <span className="text-sm font-black text-red-600">Reset Account Security</span>
            </div>
            <ChevronRight className="text-red-300" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
