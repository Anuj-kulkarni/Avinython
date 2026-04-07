import {
  Package,
  Wallet,
  FileText,
  Users,
  Building2,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Bell,
  Search,
  Plus,
  Calendar,
  MapPin,
  Clock,
  QrCode
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";

export function ERPDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-black text-gray-900">BuildAI ERP</h1>
              <p className="text-xs text-gray-500 font-bold">Construction Management</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/inventory")}
                className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 active:scale-95 transition-all"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 active:scale-95 transition-all relative"
              >
                <Bell size={18} />
                <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              </button>
            </div>
          </div>

          {/* Site & Date Info */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 rounded-xl text-blue-600 font-bold">
              <MapPin size={12} />
              <span>Tower A</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-xl text-gray-600 font-bold">
              <Calendar size={12} />
              <span>Apr 5, 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* AI Insights Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-black mb-1">AI Alert: Critical Action Needed</h3>
              <p className="text-xs text-orange-50 font-bold leading-relaxed">
                Cement stock will deplete in 3.4 days. AI suggests immediate reorder of 500 bags.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              toast.success("Opening AI recommendations");
              navigate("/ai-insights");
            }}
            className="w-full bg-white text-orange-600 py-3 rounded-xl font-black text-sm active:scale-[0.98] transition-all shadow-sm"
          >
            Review AI Recommendations
          </button>
        </motion.div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            title="Today's Progress"
            value="87%"
            change="+12%"
            positive={true}
            icon={TrendingUp}
            color="bg-green-50"
            textColor="text-green-600"
          />
          <MetricCard
            title="Pending Tasks"
            value="24"
            change="-8"
            positive={true}
            icon={Clock}
            color="bg-blue-50"
            textColor="text-blue-600"
          />
          <MetricCard
            title="Active Workers"
            value="156"
            change="+5"
            positive={true}
            icon={Users}
            color="bg-purple-50"
            textColor="text-purple-600"
          />
          <MetricCard
            title="Budget Used"
            value="68%"
            change="+4%"
            positive={false}
            icon={Wallet}
            color="bg-orange-50"
            textColor="text-orange-600"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-black text-gray-900 mb-3 px-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickActionButton
              icon={QrCode}
              label="Scan Material"
              to="/scanner"
              color="bg-indigo-500"
            />
            <QuickActionButton
              icon={Plus}
              label="Add Material"
              to="/inventory/add"
              color="bg-blue-500"
            />
            <QuickActionButton
              icon={FileText}
              label="Upload Invoice"
              to="/invoices/upload"
              color="bg-purple-500"
            />
            <QuickActionButton
              icon={Users}
              label="Add Worker"
              to="/workers/add"
              color="bg-green-500"
            />
          </div>
        </div>

        {/* Module Cards */}
        <div>
          <h2 className="text-sm font-black text-gray-900 mb-3 px-1">Modules</h2>
          <div className="space-y-3">
            <ModuleCard
              icon={Package}
              title="Inventory Management"
              description="Track materials & supplies"
              badge="3 Alerts"
              badgeColor="bg-orange-500"
              to="/inventory"
              stats={[
                { label: "Items", value: "1,245" },
                { label: "Low Stock", value: "3" }
              ]}
            />
            <ModuleCard
              icon={Wallet}
              title="Payment Processing"
              description="Worker payments & expenses"
              badge="₹64.2k"
              badgeColor="bg-blue-500"
              to="/payments"
              stats={[
                { label: "Pending", value: "12" },
                { label: "This Week", value: "₹45k" }
              ]}
            />
            <ModuleCard
              icon={FileText}
              title="Invoice Management"
              description="OCR-powered invoice scanning"
              badge="2 New"
              badgeColor="bg-purple-500"
              to="/invoices"
              stats={[
                { label: "Total", value: "87" },
                { label: "Unpaid", value: "5" }
              ]}
            />
            <ModuleCard
              icon={Users}
              title="Worker Management"
              description="Track attendance & performance"
              badge="156 Active"
              badgeColor="bg-green-500"
              to="/workers"
              stats={[
                { label: "Present", value: "142" },
                { label: "On Leave", value: "14" }
              ]}
            />
            <ModuleCard
              icon={Building2}
              title="Supplier Network"
              description="Manage vendors & orders"
              badge="28 Partners"
              badgeColor="bg-indigo-500"
              to="/suppliers"
              stats={[
                { label: "Active", value: "28" },
                { label: "Orders", value: "15" }
              ]}
            />
            <ModuleCard
              icon={Sparkles}
              title="AI Insights"
              description="Predictive analytics & reports"
              badge="AI Powered"
              badgeColor="bg-gradient-to-r from-orange-500 to-pink-500"
              to="/ai-insights"
              stats={[
                { label: "Insights", value: "24" },
                { label: "Savings", value: "₹1.2M" }
              ]}
            />
          </div>
        </div>

        {/* AI Weekly Digest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-white/90">AI Weekly Summary</span>
            </div>
            <h3 className="font-black text-lg mb-2">Project Health: Excellent</h3>
            <p className="text-sm text-blue-100 font-bold leading-relaxed mb-4">
              Construction is 9% ahead of schedule. Material efficiency improved by 12%.
              No critical issues detected across all sites.
            </p>
            <Link
              to="/ai-insights"
              className="inline-flex items-center gap-2 text-xs font-black bg-white text-blue-600 px-4 py-2.5 rounded-lg active:scale-95 transition-all"
            >
              View Full Report
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  color,
  textColor
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: any;
  color: string;
  textColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center ${textColor} mb-3`}>
        <Icon size={20} />
      </div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-black text-gray-900">{value}</span>
        <span className={`text-xs font-black ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </motion.div>
  );
}

function QuickActionButton({
  icon: Icon,
  label,
  to,
  color
}: {
  icon: any;
  label: string;
  to: string;
  color: string;
}) {
  return (
    <Link
      to={to}
      className={`${color} text-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-2 h-24`}
    >
      <Icon size={24} strokeWidth={2.5} />
      <span className="text-xs font-black text-center">{label}</span>
    </Link>
  );
}

function ModuleCard({
  icon: Icon,
  title,
  description,
  badge,
  badgeColor,
  to,
  stats
}: {
  icon: any;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  to: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-all group"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 transition-all shadow-sm">
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-black text-gray-900 text-sm">{title}</h3>
            <span className={`${badgeColor} text-white text-xs font-black px-2 py-1 rounded-lg whitespace-nowrap`}>
              {badge}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-bold mb-3">{description}</p>
          <div className="flex items-center gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-400">{stat.label}:</span>
                <span className="text-xs font-black text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <ArrowRight size={16} className="text-gray-300 mt-1 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
