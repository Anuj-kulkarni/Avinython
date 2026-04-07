import { useState } from "react";
import { 
  Shield, 
  ChevronRight, 
  ArrowLeft,
  CreditCard,
  Package,
  Users,
  FileText,
  Zap,
  Info,
  Lock,
  Eye,
  Settings as SettingsIcon
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { motion } from "motion/react";

interface PermissionItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  category: "financial" | "inventory" | "team" | "system";
}

export function AccessControl() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { 
      id: "view_payments", 
      label: "View Payments", 
      description: "Access transaction history and payment status", 
      enabled: true, 
      category: "financial" 
    },
    { 
      id: "process_payments", 
      label: "Process Payments", 
      description: "Authorize new payments and fund transfers", 
      enabled: false, 
      category: "financial" 
    },
    { 
      id: "view_inventory", 
      label: "View Inventory", 
      description: "Check stock levels and material locations", 
      enabled: true, 
      category: "inventory" 
    },
    { 
      id: "edit_inventory", 
      label: "Edit Inventory", 
      description: "Modify stock counts and update material data", 
      enabled: false, 
      category: "inventory" 
    },
    { 
      id: "manage_workers", 
      label: "Manage Workers", 
      description: "Add, remove or edit site worker profiles", 
      enabled: false, 
      category: "team" 
    },
    { 
      id: "ai_insights", 
      label: "AI Predictive Insights", 
      description: "Access AI-driven cost and timeline predictions", 
      enabled: true, 
      category: "system" 
    },
  ]);

  const togglePermission = (id: string) => {
    setPermissions(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
    const item = permissions.find(p => p.id === id);
    if (item) {
      toast.success(`${item.label} ${!item.enabled ? 'enabled' : 'disabled'}`);
    }
  };

  const categories = [
    { id: "financial", label: "Financial Control", icon: <CreditCard className="text-blue-500" size={18} />, color: "bg-blue-50" },
    { id: "inventory", label: "Inventory Management", icon: <Package className="text-orange-500" size={18} />, color: "bg-orange-50" },
    { id: "team", label: "Team & HR", icon: <Users className="text-purple-500" size={18} />, color: "bg-purple-50" },
    { id: "system", label: "System & AI", icon: <Zap className="text-emerald-500" size={18} />, color: "bg-emerald-50" },
  ];

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
            <h1 className="font-black text-gray-900 text-lg">Access Control</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Permissions & Roles</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Shield className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-base">Granular Permissions</h3>
              <p className="text-xs text-blue-50 font-medium mt-1 leading-relaxed">
                Manage your specific access levels. Changes here may require administrator approval for certain high-privilege roles.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>

        {/* Categories & Permissions */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.id} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className={`w-8 h-8 ${cat.color} rounded-lg flex items-center justify-center`}>
                  {cat.icon}
                </div>
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{cat.label}</h3>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                {permissions
                  .filter((p) => p.category === cat.id)
                  .map((permission) => (
                    <div key={permission.id} className="p-4 flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-black text-gray-900">{permission.label}</span>
                          {!permission.enabled && permission.category === 'financial' && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-black text-gray-400 uppercase">
                              <Lock size={8} /> Restricted
                            </div>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 font-bold">{permission.description}</p>
                      </div>
                      <button 
                        onClick={() => togglePermission(permission.id)}
                        className={`relative w-12 h-6 rounded-full transition-all flex-shrink-0 ${
                          permission.enabled ? (cat.id === 'financial' ? 'bg-blue-600' : 
                                               cat.id === 'inventory' ? 'bg-orange-500' :
                                               cat.id === 'team' ? 'bg-purple-600' : 'bg-emerald-500') 
                          : 'bg-gray-200'
                        }`}
                      >
                        <motion.div 
                          initial={false}
                          animate={{ x: permission.enabled ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Role Overview */}
        <div className="bg-gray-100 rounded-2xl p-5 border border-dashed border-gray-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200">
              <SettingsIcon className="text-gray-400" size={20} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-sm">Active Role: Project Manager</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Assigned by Admin</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Eye size={12} />
                <span className="text-[10px] font-black uppercase">Viewing</span>
              </div>
              <p className="text-xs font-bold text-gray-700">Can view all project reports and dashboards.</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <FileText size={12} />
                <span className="text-[10px] font-black uppercase">Editing</span>
              </div>
              <p className="text-xs font-bold text-gray-700">Limited editing for inventory materials.</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            toast.info("Access request sent to Administrator", {
              description: "You'll be notified once your permissions are updated."
            });
          }}
          className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-black text-sm active:scale-[0.98] transition-all"
        >
          Request Elevated Access
        </button>
      </div>
    </div>
  );
}
