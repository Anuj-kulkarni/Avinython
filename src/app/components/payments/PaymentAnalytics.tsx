import { 
  ChevronLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  PieChart as PieIcon,
  Sparkles,
  ArrowRight,
  TrendingDown as TrendingDownIcon,
  Layers,
  Users
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  Legend
} from "recharts";
import { Link } from "react-router";
import { motion } from "motion/react";

const MONTHLY_EXPENSE = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 61000 },
  { month: "May", amount: 55000 },
  { month: "Jun", amount: 64000 },
];

const LABOR_VS_MATERIAL = [
  { name: "Labor Cost", value: 45, color: "#F97316" },
  { name: "Material Cost", value: 55, color: "#3B82F6" },
];

export function PaymentAnalytics() {
  return (
    <div className="space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/payments" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Financial Hub</h1>
      </div>

      {/* KPI Scroll Container */}
      <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-4 scrollbar-hide">
        <FinanceCard 
          title="Monthly Expense" 
          value="$64.2k" 
          change="+15%" 
          positive={false} 
          icon={TrendingUp} 
          color="bg-orange-50 text-orange-600" 
        />
        <FinanceCard 
          title="Labor Efficiency" 
          value="94%" 
          change="+4%" 
          positive={true} 
          icon={Users} 
          color="bg-blue-50 text-blue-600" 
        />
        <FinanceCard 
          title="Profit Margin" 
          value="18.5%" 
          change="-2.1%" 
          positive={false} 
          icon={TrendingDownIcon} 
          color="bg-red-50 text-red-600" 
        />
      </div>

      {/* AI Insights Panel */}
      <section className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/15 transition-all duration-1000" />
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md ring-1 ring-white/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white/90">AI Auditor Scan</h4>
            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-tighter">Report for Mar 20 - Mar 27</p>
          </div>
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 flex items-start gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0 animate-pulse" />
            <p className="text-xs font-bold leading-relaxed">Labor costs increased by <span className="text-orange-300">15% this month</span>. Spike primarily detected in Site B foundation team.</p>
          </div>
          <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-md border border-white/10 flex items-start gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0 animate-pulse" />
            <p className="text-xs font-bold leading-relaxed">Unusual spike detected in vendor payments for HVAC. Reviewing invoice validity against market rates.</p>
          </div>
        </div>
      </section>

      {/* Monthly Expense Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-8 px-1">
          <h3 className="font-black text-[#0F172A] text-sm uppercase tracking-widest">Monthly Expense</h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">Last 6 Months</span>
        </div>
        <div className="h-[220px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} id="monthly-expense-container">
            <BarChart data={MONTHLY_EXPENSE} id="monthly-expense-chart">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '11px' }}
              />
              <Bar dataKey="amount" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={32}>
                {MONTHLY_EXPENSE.map((entry, index) => (
                  <Cell key={`payment-expense-bar-${index}`} fill={entry.amount > 60000 ? '#F97316' : '#3B82F6'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Labor vs Material Card */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm min-w-0 mb-4">
        <h3 className="font-black text-[#0F172A] text-sm uppercase tracking-widest mb-8 px-1">Expense Distribution</h3>
        <div className="flex items-center gap-6">
          <div className="h-[140px] w-[140px] min-h-0 shrink-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} id="labor-material-container">
              <LineChart 
                id="labor-material-chart"
                data={[
                  { name: '1', labor: 40, material: 60 },
                  { name: '2', labor: 45, material: 55 },
                  { name: '3', labor: 50, material: 50 },
                  { name: '4', labor: 45, material: 55 },
                ]}
              >
                <Line type="monotone" dataKey="labor" stroke="#F97316" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="material" stroke="#3B82F6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-4">
            {LABOR_VS_MATERIAL.map((item) => (
              <div key={item.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: item.color }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinanceCard({ title, value, change, positive, icon: Icon, color }: any) {
  return (
    <div className={`p-6 rounded-[28px] border border-gray-100 min-w-[180px] flex-shrink-0 bg-white transition-all active:scale-95 flex flex-col gap-4 shadow-sm group`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} transition-all group-hover:scale-110 shadow-sm`}>
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{title}</h4>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-lg font-black text-[#0F172A]">{value}</span>
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-lg ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}