import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bell, MapPin, Calendar, Sparkles, RefreshCw, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useUserRole, RoleSwitcherFloating } from "./RoleSwitcher";
import { AdminDashboard } from "./AdminDashboard";
import { AccountantDashboard } from "./AccountantDashboard";
import { EngineerDashboard } from "./EngineerDashboard";

export function RoleBasedDashboard() {
  const navigate = useNavigate();
  const { role, isAutoSwitching } = useUserRole();
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const getRoleTitle = () => {
    switch (role) {
      case "admin": return "Super Admin";
      case "accountant": return "Finance Head";
      case "engineer": return "Senior Engineer";
      default: return "User";
    }
  };

  const handleOpenSearch = () => {
    toast.info("Opening inventory search");
    navigate("/inventory");
  };

  const handleOpenNotifications = () => {
    navigate("/notifications");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      {/* Dynamic Header */}
      <header className="bg-white sticky top-0 z-30 border-b border-gray-100">
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Sparkles size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900 leading-none mb-1.5 uppercase tracking-tight">BuildAI</h1>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Smart Construction</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenSearch}
                className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 active:scale-95 transition-all"
              >
                <Search size={18} />
              </button>
              <button
                onClick={handleOpenNotifications}
                className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 active:scale-95 transition-all relative"
              >
                <Bell size={18} />
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Workspace Overview</p>
              <h2 className="text-2xl font-black text-gray-900 leading-none">{greeting}, Ramesh</h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-700">
              <div className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-purple-500' : role === 'accountant' ? 'bg-green-500' : 'bg-blue-500'}`} />
              {getRoleTitle()}
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-5">
        <AnimatePresence mode="wait">
          {isAutoSwitching ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-6"
            >
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-orange-500 animate-pulse" size={24} />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black text-gray-900 mb-1">AI Context Switching</h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Optimizing dashboard for {role}...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {role === "admin" && <AdminDashboard />}
              {role === "accountant" && <AccountantDashboard />}
              {role === "engineer" && <EngineerDashboard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Role Switcher */}
      <RoleSwitcherFloating />
    </div>
  );
}
