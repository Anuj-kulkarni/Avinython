import { 
  TrendingUp, 
  Users, 
  Building2, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  DollarSign,
  Activity
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleApproveReallocation = () => {
    toast.success("Budget reallocation approved");
  };

  const handleViewAllProjects = () => {
    navigate("/site-management");
  };

  return (
    <div className="space-y-6">
      {/* Header with quick stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={16} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Projects</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-black text-gray-900 leading-none">12</h2>
            <div className="flex items-center gap-0.5 text-green-600 text-xs font-black">
              <ArrowUpRight size={12} />
              <span>+2</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-5 rounded-[12px] border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
              <Users size={16} />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Workforce</span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-black text-gray-900 leading-none">842</h2>
            <div className="flex items-center gap-0.5 text-green-600 text-xs font-black">
              <ArrowUpRight size={12} />
              <span>15%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Financial Outlook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-6 rounded-[12px] text-white shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-lg mb-1 leading-tight">AI Financial Outlook</h3>
            <p className="text-xs text-orange-50 font-bold opacity-90 leading-relaxed mb-4">
              Projected ROI for Q2 is 14% higher than predicted. Reallocating ₹4.2M surplus to Site Alpha will accelerate completion by 18 days.
            </p>
            <button
              onClick={handleApproveReallocation}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-black shadow-sm active:scale-95 transition-all"
            >
              Approve Reallocation
            </button>
          </div>
        </div>
      </motion.div>

      {/* Project Health Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Project Portfolio Health</h3>
          <button onClick={handleViewAllProjects} className="text-xs font-black text-blue-600">View All</button>
        </div>
        
        <div className="space-y-3">
          <ProjectHealthCard 
            name="The Grand Plaza" 
            progress={78} 
            status="ahead" 
            budget="₹1.2Cr" 
            health="Excellent"
          />
          <ProjectHealthCard 
            name="Skyline Apartments" 
            progress={42} 
            status="on-track" 
            budget="₹4.5Cr" 
            health="Good"
          />
          <ProjectHealthCard 
            name="Industrial Park B" 
            progress={15} 
            status="behind" 
            budget="₹8.8Cr" 
            health="Action Required"
          />
        </div>
      </div>

      {/* Compliance & Risk */}
      <div className="bg-white rounded-[12px] border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-sm">Critical Risk Alerts</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">3 items require attention</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <RiskItem 
            title="Safety Certification Expiring" 
            desc="Site Alpha certification expires in 4 days"
            urgency="high"
          />
          <RiskItem 
            title="Contractor Dispute" 
            desc="Lumber vendor payment escalation"
            urgency="medium"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectHealthCard({ name, progress, status, budget, health }: any) {
  const statusColors: any = {
    "ahead": "text-green-600 bg-green-50",
    "on-track": "text-blue-600 bg-blue-50",
    "behind": "text-red-600 bg-red-50"
  };

  return (
    <div className="bg-white border border-gray-100 p-4 rounded-[12px] shadow-sm active:scale-[0.98] transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-black text-gray-900 text-sm mb-1">{name}</h4>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Budget: {budget}</p>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${statusColors[status]}`}>
          {health}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${status === 'behind' ? 'bg-red-500' : 'bg-blue-600'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function RiskItem({ title, desc, urgency }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
      <div className={`w-1.5 h-10 rounded-full ${urgency === 'high' ? 'bg-red-500' : 'bg-orange-400'}`} />
      <div className="flex-1 min-w-0">
        <h5 className="text-xs font-black text-gray-900 truncate mb-0.5">{title}</h5>
        <p className="text-[10px] text-gray-500 font-bold line-clamp-1">{desc}</p>
      </div>
      <ChevronRight size={14} className="text-gray-300 mt-1" />
    </div>
  );
}
