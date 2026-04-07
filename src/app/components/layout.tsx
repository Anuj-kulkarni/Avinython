import { Outlet, Link, NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  FileText,
  Users,
  Settings,
  Bell,
  Menu,
  BrainCircuit,
  Search,
  X,
  Building2,
  Zap,
  Shield,
  Calculator,
  HardHat,
  Sparkles,
  BarChart3
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUserRole } from "./dashboard/RoleSwitcher";
import { OfflineIndicatorSimple } from "./offline/OfflineIndicator";

export function Root() {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const { role } = useUserRole();

  const sidebarItems = useMemo(() => {
    const base = [
      { name: "Dashboard", icon: LayoutDashboard, path: "/" },
      { name: "AI Insights", icon: BrainCircuit, path: "/ai-insights" },
      { name: "Daily Reports", icon: BarChart3, path: "/reports" },
    ];

    if (role === 'admin') {
      return [
        ...base,
        { name: "Site Management", icon: Building2, path: "/site-management" },
        { name: "Worker Directory", icon: Users, path: "/workers" },
        { name: "Settings", icon: Settings, path: "/settings" },
      ];
    }

    if (role === 'accountant') {
      return [
        ...base,
        { name: "Payments", icon: CreditCard, path: "/payments" },
        { name: "Invoices", icon: FileText, path: "/invoices" },
        { name: "Suppliers", icon: Building2, path: "/suppliers" },
      ];
    }

    return [
      ...base,
      { name: "Quick Entry", icon: Zap, path: "/quick-entry" },
      { name: "Inventory", icon: Package, path: "/inventory" },
      { name: "Workers", icon: Users, path: "/workers" },
      { name: "Scanner", icon: Zap, path: "/scanner" },
    ];
  }, [role]);

  const navItems = useMemo(() => {
    if (role === 'admin') {
      return [
        { name: "Home", icon: LayoutDashboard, path: "/" },
        { name: "Sites", icon: Building2, path: "/site-management" },
        { name: "Alerts", icon: Bell, path: "/notifications" },
        { name: "AI", icon: Sparkles, path: "/ai-insights" },
      ];
    }
    if (role === 'accountant') {
      return [
        { name: "Home", icon: LayoutDashboard, path: "/" },
        { name: "Pay", icon: CreditCard, path: "/payments" },
        { name: "Bills", icon: FileText, path: "/invoices" },
        { name: "Vendors", icon: Building2, path: "/suppliers" },
      ];
    }
    return [
      { name: "Home", icon: LayoutDashboard, path: "/" },
      { name: "Stock", icon: Package, path: "/inventory" },
      { name: "Scan", icon: Zap, path: "/scanner" },
      { name: "Log", icon: FileText, path: "/quick-entry" },
    ];
  }, [role]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative font-sans">
      {/* Offline Indicator */}
      <OfflineIndicatorSimple />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSidebar(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg">
                    BA
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-[#0F172A]">BuildAI</h2>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Menu</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-2">
                {sidebarItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowSidebar(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm
                      ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* User Profile Section */}
              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-gray-50">
                <Link
                  to="/settings"
                  onClick={() => setShowSidebar(false)}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-all active:scale-[0.98]"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md uppercase">
                    {role.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 capitalize">{role}</p>
                    <p className="text-xs text-gray-500 font-semibold">BuildAI Member</p>
                  </div>
                  <Settings size={16} className="text-gray-400" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg">
            BA
          </div>
          <div>
            <h1 className="text-sm font-black text-[#0F172A] tracking-tight">BuildAI</h1>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Construction OS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/notifications"
            className="relative w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 transition-all"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-lg">
              3
            </span>
          </Link>
          <button
            onClick={() => setShowSidebar(true)}
            className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 active:scale-90 transition-all"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <main className="flex-1 overflow-y-auto pb-24 relative bg-[#F8FAFC]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-4 h-20 z-40 pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300
              ${isActive ? "text-blue-600" : "text-gray-400"}
            `}
          >
            {({ isActive }) => (
              <>
                <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-blue-50" : ""}`}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-0"}`}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}