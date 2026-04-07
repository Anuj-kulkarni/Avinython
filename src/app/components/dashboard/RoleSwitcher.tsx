import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Shield, Calculator, HardHat, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export type UserRole = "admin" | "accountant" | "engineer";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAutoSwitching: boolean;
  triggerAutoSwitch: (targetRole?: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem("buildai_role");
    return (saved as UserRole) || "engineer";
  });
  const [isAutoSwitching, setIsAutoSwitching] = useState(false);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem("buildai_role", newRole);
  };

  const triggerAutoSwitch = (targetRole?: UserRole) => {
    setIsAutoSwitching(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const roles: UserRole[] = ["admin", "accountant", "engineer"];
      const nextRole = targetRole || roles[Math.floor(Math.random() * roles.length)];
      
      setRole(nextRole);
      setIsAutoSwitching(false);
      
      toast.success(`AI Context Switch: Dashboard optimized for ${nextRole.charAt(0).toUpperCase() + nextRole.slice(1)} view`, {
        icon: <Sparkles className="w-4 h-4 text-orange-500" />,
      });
    }, 2000);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isAutoSwitching, triggerAutoSwitch }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useUserRole must be used within a RoleProvider");
  }
  return context;
}

export function RoleSwitcherFloating() {
  const { role, triggerAutoSwitch, isAutoSwitching } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 space-y-2 w-48"
          >
            <div className="p-2 border-b border-gray-50 mb-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Switch Identity</p>
            </div>
            <RoleOption 
              icon={Shield} 
              label="Admin" 
              active={role === "admin"} 
              onClick={() => { triggerAutoSwitch("admin"); setIsOpen(false); }} 
            />
            <RoleOption 
              icon={Calculator} 
              label="Accountant" 
              active={role === "accountant"} 
              onClick={() => { triggerAutoSwitch("accountant"); setIsOpen(false); }} 
            />
            <RoleOption 
              icon={HardHat} 
              label="Engineer" 
              active={role === "engineer"} 
              onClick={() => { triggerAutoSwitch("engineer"); setIsOpen(false); }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isAutoSwitching ? "bg-orange-500 animate-spin" : "bg-blue-600 active:scale-90"
        } text-white`}
      >
        {isAutoSwitching ? <RefreshCw size={20} /> : <Sparkles size={20} />}
      </button>
    </div>
  );
}

function RoleOption({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"
      }`}
    >
      <Icon size={18} />
      <span className="text-sm font-bold">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full" />}
    </button>
  );
}
