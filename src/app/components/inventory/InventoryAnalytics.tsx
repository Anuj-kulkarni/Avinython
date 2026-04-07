import { 
  ChevronLeft, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  PieChart as PieIcon,
  Sparkles,
  ArrowRight
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
  Cell
} from "recharts";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const USAGE_OVER_TIME = [
  { date: "Mar 01", usage: 120, predicted: 110 },
  { date: "Mar 05", usage: 150, predicted: 140 },
  { date: "Mar 10", usage: 180, predicted: 190 },
  { date: "Mar 15", usage: 220, predicted: 210 },
  { date: "Mar 20", usage: 200, predicted: 230 },
  { date: "Mar 25", usage: 260, predicted: 250 },
  { date: "Mar 30", usage: 290, predicted: 280 },
];

const USAGE_PER_SITE = [
  { site: "Tower A", amount: 450, color: "#3B82F6" },
  { site: "Site B", amount: 320, color: "#F97316" },
  { site: "West Wing", amount: 180, color: "#94A3B8" },
];

export function InventoryAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/inventory" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Analytics</h1>
      </div>

      {/* Hero Insights Scroll */}
      <div className="flex gap-4 overflow-x-auto -mx-5 px-5 pb-4 scrollbar-hide">
        <InsightCard 
          title="Steel Usage Spike" 
          value="+20%" 
          desc="Unusual high demand detected in Tower A foundation phase."
          color="bg-orange-50 text-orange-600"
          accent="border-orange-100"
        />
        <InsightCard 
          title="Sand Consumption" 
          value="High" 
          desc="Current rate will exceed weekly budget by Friday."
          color="bg-red-50 text-red-600"
          accent="border-red-100"
        />
        <InsightCard 
          title="Optimal Stock" 
          value="92%" 
          desc="Overall inventory health is excellent across 12 sites."
          color="bg-green-50 text-green-600"
          accent="border-green-100"
        />
      </div>

      {/* Usage Trend Line Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[#0F172A] text-sm uppercase tracking-widest">Usage Trend</h3>
          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg text-blue-600 text-[10px] font-black uppercase">
            <TrendingUp size={12} /> Real-time
          </div>
        </div>
        <div className="h-[220px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} id="usage-trend-container">
            <LineChart data={USAGE_OVER_TIME} id="usage-trend-chart">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '11px' }}
                cursor={{ stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line type="monotone" dataKey="usage" stroke="#3B82F6" strokeWidth={4} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              <Line type="monotone" dataKey="predicted" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-1 bg-blue-600 rounded-full" /> Actual Usage</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-1 bg-gray-300 rounded-full border-dashed" /> AI Forecast</div>
        </div>
      </div>

      {/* Consumption Bar Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm min-w-0">
        <h3 className="font-black text-[#0F172A] text-sm uppercase tracking-widest mb-6 px-1">Consumption per Site</h3>
        <div className="h-[200px] w-full min-h-0 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} id="consumption-site-container">
            <BarChart data={USAGE_PER_SITE} layout="vertical" id="consumption-site-chart">
              <XAxis type="number" hide />
              <YAxis dataKey="site" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748B', fontWeight: 700 }} width={80} />
              <Tooltip 
                cursor={{ fill: '#F1F5F9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '11px' }}
              />
              <Bar dataKey="amount" radius={[0, 8, 8, 0]} barSize={24}>
                {USAGE_PER_SITE.map((entry, index) => (
                  <Cell key={`analytics-site-bar-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Smart Summary Card */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <Sparkles size={20} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-white/90">AI Weekly Digest</span>
        </div>
        
        <div className="space-y-6 relative z-10">
          <p className="text-sm font-bold leading-relaxed">Overall material consumption is <span className="text-blue-200">9% higher</span> than forecast, primarily driven by accelerated construction in Tower A.</p>
          <div className="h-px bg-white/10 w-full" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-white/50 tracking-widest">Next Reorder Date</p>
              <h4 className="text-lg font-black mt-1">April 04, 2026</h4>
            </div>
            <button
              onClick={() => {
                toast.info("Opening reorder workflow");
                navigate("/inventory/add");
              }}
              className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InsightCard({ title, value, desc, color, accent }: any) {
  return (
    <div className={`p-6 rounded-[28px] border ${accent} min-w-[240px] flex-shrink-0 transition-all active:scale-95 flex flex-col gap-3 ${color} shadow-sm`}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black uppercase tracking-tight opacity-80">{title}</h4>
        <span className="text-xl font-black">{value}</span>
      </div>
      <p className="text-xs font-bold leading-relaxed opacity-70 line-clamp-2">{desc}</p>
    </div>
  );
}
