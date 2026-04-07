import { 
  HardHat, 
  Package, 
  Users, 
  Clock, 
  MapPin, 
  CloudRain, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  Plus,
  QrCode,
  Calendar
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { toast } from "sonner";

export function EngineerDashboard() {
  const handleMarkPriority = () => {
    toast.success("Weather alert marked as priority");
  };

  const handleIgnoreAlert = () => {
    toast.info("Weather alert dismissed for now");
  };

  return (
    <div className="space-y-6">
      {/* Site Quick Glance */}
      <div className="bg-white rounded-[12px] border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 leading-none mb-1.5">Tower Alpha</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
              <Calendar size={12} />
              <span>Monday, April 6, 2026</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 bg-gray-50 p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Attendance</span>
            <p className="text-lg font-black text-gray-900 leading-none">142 / 150</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Status</span>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-lg font-black text-gray-900 leading-none text-green-600 uppercase tracking-widest">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI On-site Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-6 rounded-[12px] text-white shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <CloudRain className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-lg mb-1 leading-tight text-white">AI Weather Alert</h3>
            <p className="text-xs text-orange-50 font-bold opacity-90 leading-relaxed mb-4">
              90% probability of heavy rain starting at 2:30 PM. Suggested: Complete concrete pouring by 1:45 PM or reschedule to tomorrow.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleMarkPriority}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-black shadow-sm active:scale-95 transition-all"
              >
                Mark as Priority
              </button>
              <button
                onClick={handleIgnoreAlert}
                className="bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-black backdrop-blur-sm active:scale-95 transition-all"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions (Engineer Specific) */}
      <div className="grid grid-cols-2 gap-4">
        <QuickActionBtn 
          icon={QrCode} 
          label="Scan Material" 
          to="/scanner" 
          color="bg-indigo-600 shadow-indigo-200"
        />
        <QuickActionBtn 
          icon={Plus} 
          label="Daily Log" 
          to="/quick-entry" 
          color="bg-green-600 shadow-green-200"
        />
      </div>

      {/* Today's Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Today's Key Tasks</h3>
          <span className="text-xs font-black text-blue-600 underline">Add Task</span>
        </div>
        
        <div className="space-y-3">
          <TaskItem title="Concrete Pouring - Level 4" priority="high" time="08:00 AM - 02:00 PM" completed={false} />
          <TaskItem title="Electrical Wiring - Wing B" priority="medium" time="10:00 AM - 05:00 PM" completed={false} />
          <TaskItem title="Safety Inspection" priority="high" time="09:00 AM - 10:00 AM" completed={true} />
        </div>
      </div>

      {/* Material Status (Engineer Focus) */}
      <div className="bg-white rounded-[12px] border border-gray-100 p-5 shadow-sm">
        <h3 className="font-black text-gray-900 text-sm mb-4 uppercase tracking-wider">Critical Inventory</h3>
        <div className="space-y-4">
          <MaterialBar label="Cement Bags" current={450} total={1200} color="bg-blue-600" />
          <MaterialBar label="Steel Bars (12mm)" current={15} total={100} color="bg-red-500" urgent={true} />
          <MaterialBar label="Bricks" current={8500} total={10000} color="bg-green-600" />
        </div>
        <Link to="/inventory" className="w-full block mt-6 text-center py-3 bg-gray-50 text-xs font-black text-gray-600 rounded-xl active:scale-95 transition-all">
          Manage Inventory
        </Link>
      </div>
    </div>
  );
}

function QuickActionBtn({ icon: Icon, label, to, color }: any) {
  return (
    <Link 
      to={to} 
      className={`${color} text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all`}
    >
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </Link>
  );
}

function TaskItem({ title, priority, time, completed }: any) {
  return (
    <div className={`bg-white border ${completed ? 'bg-gray-50 border-gray-100' : 'border-gray-100'} p-4 rounded-[12px] shadow-sm flex items-start gap-4 active:scale-[0.98] transition-all`}>
      <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center transition-all ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200'}`}>
        {completed && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-black text-sm mb-1 ${completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{title}</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider ${priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              {priority}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
              <Clock size={10} />
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaterialBar({ label, current, total, color, urgent }: any) {
  const percentage = (current / total) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest leading-none">
        <span className="text-gray-500">{label}</span>
        <span className={urgent ? 'text-red-600' : 'text-gray-900'}>{current} / {total}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color} transition-all duration-1000`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
