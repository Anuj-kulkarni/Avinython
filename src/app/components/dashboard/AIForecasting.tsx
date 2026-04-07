import { useState } from "react";
import { 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  DollarSign, 
  Calendar, 
  ArrowRight, 
  Info,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Clock
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

// Mock data for budget prediction
const budgetData = [
  { name: "Day 1", actual: 4000, projected: 4000 },
  { name: "Day 5", actual: 12000, projected: 12000 },
  { name: "Day 10", actual: 18000, projected: 18000 },
  { name: "Day 15", actual: 32000, projected: 32000 },
  { name: "Day 20", actual: 45000, projected: 45000 },
  { name: "Day 25", projected: 62000 }, // Forecast starts here
  { name: "Day 30", projected: 85000 }, // Risk point
  { name: "Day 35", projected: 105000 },
  { name: "Day 40", projected: 120000 },
];

// Mock data for material shortage
const materialData = [
  { name: "Cement", stock: 85, predicted: 15, status: "safe" },
  { name: "Steel", stock: 42, predicted: 45, status: "critical" },
  { name: "Bricks", stock: 65, predicted: 30, status: "safe" },
  { name: "Sand", stock: 28, predicted: 35, status: "critical" },
  { name: "Wood", stock: 55, predicted: 20, status: "safe" },
];

export function AIForecasting() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: "Recalculating AI predictions...",
        success: "Forecast updated based on latest site data",
        error: "Failed to update forecast",
      }
    );
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleReviewRisk = () => {
    toast.info("Reviewing critical budget risk details");
  };

  const handleReorderMaterial = (materialName: string) => {
    toast.success(`Reorder initiated for ${materialName}`);
  };

  const handleApplyStrategy = () => {
    toast.success("Optimization strategy applied");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* AI Intelligence Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Sparkles className="text-orange-600" size={20} />
            </div>
            <div>
              <h1 className="font-black text-gray-900 text-lg">AI Insights</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Predictive Forecasting</p>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 hover:bg-gray-100 rounded-xl transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Critical Risk Alert */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-sm overflow-hidden relative"
        >
          <div className="flex items-start gap-3 relative z-10">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-red-900 text-sm uppercase tracking-tight">Critical Risk Detected</h3>
              <p className="text-red-700 text-sm font-bold mt-1">
                Budget overrun expected in 5 days
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] bg-red-200 text-red-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">High Probability</span>
                <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                  <Clock size={10} /> 120h Remaining
                </span>
              </div>
            </div>
            <button onClick={handleReviewRisk} className="text-red-400">
              <ChevronRight size={20} />
            </button>
          </div>
          {/* Subtle background pulse */}
          <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-500 animate-pulse" />
        </motion.div>

        {/* Budget Prediction Graph */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-sm">Budget Forecast</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Next 15 Days Projection</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-red-500">+18%</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Variance</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                  dot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  fillOpacity={1} 
                  fill="url(#colorProjected)" 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-4 mt-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">AI Projected</span>
            </div>
          </div>
        </div>

        {/* Material Shortage Prediction */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-sm">Stock Availability Forecast</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Predicted Depletion Rates</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={materialData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 900, fill: '#1e293b' }}
                  width={60}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Bar dataKey="stock" barSize={12} radius={[0, 10, 10, 0]}>
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.status === 'critical' ? '#F97316' : '#10B981'} />
                  ))}
                </Bar>
                <Bar dataKey="predicted" barSize={12} radius={[0, 10, 10, 0]} fill="#e2e8f0" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Critical Alerts</h4>
            {materialData.filter(m => m.status === 'critical').map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-500 border border-orange-100 shadow-sm">
                    <Info size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-orange-900">{item.name} Shortage</p>
                    <p className="text-[9px] text-orange-700 font-bold uppercase">Expected in 48 hours</p>
                  </div>
                </div>
                <button
                  onClick={() => handleReorderMaterial(item.name)}
                  className="bg-orange-500 text-white p-1.5 rounded-lg active:scale-95 transition-all"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-3 pb-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Smart Recommendations</h3>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                <TrendingUp className="text-blue-400" size={16} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Optimization Strategy</span>
            </div>
            <p className="text-sm font-bold text-gray-200 leading-relaxed">
              Reschedule steel procurement to June 15th to take advantage of 4% predicted price drop and avoid storage bottlenecks.
            </p>
            <button
              onClick={handleApplyStrategy}
              className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-xs font-black uppercase tracking-widest border border-white/10"
            >
              Apply Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
