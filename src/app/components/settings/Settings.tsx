import { useState } from "react";
import { User, Shield, Key, Palette, ChevronRight, Camera, Save, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "John Anderson",
    email: "john.anderson@buildai.com",
    phone: "+1 (555) 123-4567",
    company: "BuildAI Corp",
  });

  const [roleData, setRoleData] = useState({
    role: "Project Manager",
    department: "Construction Operations",
    employeeId: "EMP-2024-001",
  });

  const [permissions, setPermissions] = useState({
    viewInventory: true,
    manageInventory: true,
    viewPayments: true,
    processPayments: false,
    viewInvoices: true,
    uploadInvoices: true,
    manageWorkers: false,
    manageSuppliers: false,
    aiInsights: true,
  });

  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#3B82F6");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleSaveRole = () => {
    toast.success("Role settings updated");
  };

  const handleSavePermissions = () => {
    toast.success("Permissions updated");
  };

  const handleSaveTheme = () => {
    toast.success(`Theme settings saved (${theme}, ${accentColor})`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-[#0F172A]">Settings</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Manage your account and preferences</p>
      </div>

      {/* Quick Actions / Security Links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 space-y-3">
          <button
            onClick={() => navigate("/settings/security")}
            className="w-full flex items-center justify-between p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all border border-blue-100/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                <Shield className="text-white" size={20} />
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 text-sm">Security Settings</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Password, 2FA & Audit</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button
            onClick={() => navigate("/settings/access-control")}
            className="w-full flex items-center justify-between p-4 bg-orange-50/50 rounded-xl hover:bg-orange-50 active:scale-[0.98] transition-all border border-orange-100/50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
                <Key className="text-white" size={20} />
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 text-sm">Access Control</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Manage Permissions</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>

          <button
            onClick={() => navigate("/settings/sessions")}
            className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                <Smartphone className="text-gray-600" size={20} />
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 text-sm">Session Management</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">3 active devices</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </button>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">User Profile</h2>
            <p className="text-blue-100 text-xs font-semibold">Personal information</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                JA
              </div>
              <button
                onClick={() => toast.info("Profile photo picker can be connected here")}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center text-blue-600 border border-gray-100 hover:bg-gray-50 active:scale-90 transition-all"
              >
                <Camera size={14} />
              </button>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{profileData.name}</p>
              <p className="text-xs text-gray-500 font-semibold mt-0.5">{profileData.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Company</label>
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save Profile
          </button>
        </div>
      </div>

      {/* Role Management Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">Role Management</h2>
            <p className="text-purple-100 text-xs font-semibold">Job title and department</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Role</label>
            <select
              value={roleData.role}
              onChange={(e) => setRoleData({ ...roleData, role: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
            >
              <option>Project Manager</option>
              <option>Site Supervisor</option>
              <option>Construction Manager</option>
              <option>Financial Controller</option>
              <option>Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Department</label>
            <select
              value={roleData.department}
              onChange={(e) => setRoleData({ ...roleData, department: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
            >
              <option>Construction Operations</option>
              <option>Finance & Accounting</option>
              <option>Human Resources</option>
              <option>Supply Chain</option>
              <option>Quality Control</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Employee ID</label>
            <input
              type="text"
              value={roleData.employeeId}
              onChange={(e) => setRoleData({ ...roleData, employeeId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled
            />
          </div>

          <button
            onClick={handleSaveRole}
            className="w-full py-3.5 bg-purple-600 text-white rounded-xl font-bold text-sm hover:bg-purple-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save Role Settings
          </button>
        </div>
      </div>

      {/* Permissions Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Key className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">Permissions</h2>
            <p className="text-orange-100 text-xs font-semibold">Access control settings</p>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {/* Permission Toggle Items */}
          <div className="space-y-2">
            <PermissionToggle
              label="View Inventory"
              enabled={permissions.viewInventory}
              onChange={(val) => setPermissions({ ...permissions, viewInventory: val })}
            />
            <PermissionToggle
              label="Manage Inventory"
              enabled={permissions.manageInventory}
              onChange={(val) => setPermissions({ ...permissions, manageInventory: val })}
            />
            <PermissionToggle
              label="View Payments"
              enabled={permissions.viewPayments}
              onChange={(val) => setPermissions({ ...permissions, viewPayments: val })}
            />
            <PermissionToggle
              label="Process Payments"
              enabled={permissions.processPayments}
              onChange={(val) => setPermissions({ ...permissions, processPayments: val })}
            />
            <PermissionToggle
              label="View Invoices"
              enabled={permissions.viewInvoices}
              onChange={(val) => setPermissions({ ...permissions, viewInvoices: val })}
            />
            <PermissionToggle
              label="Upload Invoices"
              enabled={permissions.uploadInvoices}
              onChange={(val) => setPermissions({ ...permissions, uploadInvoices: val })}
            />
            <PermissionToggle
              label="Manage Workers"
              enabled={permissions.manageWorkers}
              onChange={(val) => setPermissions({ ...permissions, manageWorkers: val })}
            />
            <PermissionToggle
              label="Manage Suppliers"
              enabled={permissions.manageSuppliers}
              onChange={(val) => setPermissions({ ...permissions, manageSuppliers: val })}
            />
            <PermissionToggle
              label="AI Insights Access"
              enabled={permissions.aiInsights}
              onChange={(val) => setPermissions({ ...permissions, aiInsights: val })}
            />
          </div>

          <button
            onClick={handleSavePermissions}
            className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-bold text-sm hover:bg-orange-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            <Save size={16} />
            Save Permissions
          </button>
        </div>
      </div>

      {/* Theme Settings Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Palette className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-base">Theme Settings</h2>
            <p className="text-emerald-100 text-xs font-semibold">Appearance preferences</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">Color Theme</label>
            <div className="grid grid-cols-3 gap-3">
              <ThemeOption
                name="Light"
                active={theme === "light"}
                onClick={() => setTheme("light")}
                colors={["#FFFFFF", "#F8FAFC", "#3B82F6"]}
              />
              <ThemeOption
                name="Dark"
                active={theme === "dark"}
                onClick={() => setTheme("dark")}
                colors={["#1E293B", "#0F172A", "#3B82F6"]}
              />
              <ThemeOption
                name="Auto"
                active={theme === "auto"}
                onClick={() => setTheme("auto")}
                colors={["#FFFFFF", "#0F172A", "#3B82F6"]}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Accent Color</label>
            <div className="flex gap-2">
              {["#3B82F6", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#EC4899"].map((color) => (
                <button
                  key={color}
                  onClick={() => setAccentColor(color)}
                  className={`w-12 h-12 rounded-xl border-2 hover:border-gray-400 active:scale-90 transition-all ${
                    accentColor === color ? "border-gray-900" : "border-gray-200"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveTheme}
            className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save Theme Settings
          </button>
        </div>
      </div>
    </div>
  );
}

function PermissionToggle({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (val: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-all ${enabled ? "bg-orange-500" : "bg-gray-300"}`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeOption({ name, active, onClick, colors }: { name: string; active: boolean; onClick: () => void; colors: string[] }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all active:scale-95 ${
        active ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex gap-1 mb-2">
        {colors.map((color, i) => (
          <div key={i} className="w-full h-6 rounded" style={{ backgroundColor: color }} />
        ))}
      </div>
      <p className={`text-xs font-bold uppercase tracking-wider ${active ? "text-emerald-600" : "text-gray-600"}`}>{name}</p>
    </button>
  );
}
