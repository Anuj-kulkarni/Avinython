import { 
  Sparkles,
  AlertCircle,
  Package,
  CreditCard,
  FileUp,
  TrendingUp,
  MapPin,
  ChevronRight,
  Calendar,
  Clock
} from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function QuickActionButton({ 
  icon: Icon, 
  label, 
  link, 
  color 
}: { 
  icon: any; 
  label: string; 
  link: string; 
  color: string;
}) {
  return (
    <Link
      to={link}
      className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[12px] border border-gray-200 bg-white hover:shadow-md active:scale-[0.98] transition-all ${color}`}
    >
      <div className="w-14 h-14 rounded-[12px] flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#2563EB]">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </Link>
  );
}

function AIInsightCard({ 
  title, 
  description, 
  icon: Icon,
  iconColor,
  urgent = false
}: { 
  title: string; 
  description: string; 
  icon: any;
  iconColor: string;
  urgent?: boolean;
}) {
  return (
    <div className={`p-5 rounded-[12px] border ${
      urgent ? "bg-red-50 border-red-200" : "bg-white border-gray-200"
    }`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0 ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
      </div>
    </div>
  );
}

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const greeting = getGreeting();
  const userName = "Ramesh";
  const currentSite = "Gateway Tower Construction";

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", { 
      weekday: "long", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Greeting */}
        <div>
          <h1 className="text-gray-900">{greeting}, {userName}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentTime)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>

        {/* Current Site Card */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-[12px] p-5 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm opacity-90">Current Site</span>
          </div>
          <h2 className="text-white mb-1">{currentSite}</h2>
          <p className="text-sm text-white/80">Sector 18, Noida • 0.8 km away</p>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-gray-900">AI Insights</h3>
        </div>

        {/* AI Insight Cards */}
        <div className="space-y-3">
          <Link to="/payments" className="block">
            <AIInsightCard
              title="3 Payments Pending"
              description="₹45,000 in worker payments need approval today"
              icon={CreditCard}
              iconColor="bg-gradient-to-br from-[#F97316] to-[#EA580C]"
              urgent={true}
            />
          </Link>

          <Link to="/inventory" className="block">
            <AIInsightCard
              title="Cement Low at Site A"
              description="Only 15 bags remaining. Estimated to run out in 2 days"
              icon={AlertCircle}
              iconColor="bg-gradient-to-br from-[#EF4444] to-[#DC2626]"
              urgent={true}
            />
          </Link>

          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-5 border border-[#F59E0B]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-800 mb-1">Project on Track</p>
                <p className="text-xs text-gray-600">
                  You're 5% ahead of schedule. Great progress this week!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Insights */}
        <Link
          to="/ai-insights"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-gray-200 rounded-[12px] text-sm font-medium text-gray-900 hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          View All AI Insights
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-4">
        <h3 className="text-gray-900">Quick Actions</h3>

        <div className="grid grid-cols-3 gap-3">
          <QuickActionButton
            icon={Package}
            label="Add Material"
            link="/inventory/add"
            color=""
          />
          <QuickActionButton
            icon={CreditCard}
            label="Make Payment"
            link="/payments"
            color=""
          />
          <QuickActionButton
            icon={FileUp}
            label="Upload Invoice"
            link="/invoices/upload"
            color=""
          />
        </div>
      </div>

      {/* Today's Overview */}
      <div className="space-y-4">
        <h3 className="text-gray-900">Today's Overview</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Workers Card */}
          <Link to="/workers" className="bg-white rounded-[12px] border border-gray-200 p-5 hover:shadow-md active:scale-[0.98] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">24</p>
                <p className="text-sm text-gray-500">Workers Active</p>
              </div>
            </div>
          </Link>

          {/* Materials Card */}
          <Link to="/inventory" className="bg-white rounded-[12px] border border-gray-200 p-5 hover:shadow-md active:scale-[0.98] transition-all">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">127</p>
                <p className="text-sm text-gray-500">Materials in Stock</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}