import { useNavigate } from "react-router";
import { 
  Package, 
  UserCheck, 
  CreditCard, 
  Sparkles,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import { motion } from "motion/react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  link: string;
  color: string;
  bgColor: string;
  isMostUsed?: boolean;
  usageCount?: number;
}

function QuickActionCard({ 
  action, 
  delay 
}: { 
  action: QuickAction; 
  delay: number;
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onClick={() => navigate(action.link)}
      className={`relative w-full ${action.bgColor} rounded-[12px] p-6 text-left shadow-sm hover:shadow-lg active:scale-[0.98] transition-all border-2 ${
        action.isMostUsed ? "border-[#F97316]" : "border-transparent"
      }`}
    >
      {/* Most Used Badge */}
      {action.isMostUsed && (
        <div className="absolute -top-2 right-4 bg-[#F97316] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          Most Used
        </div>
      )}

      <div className="flex items-center gap-5">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-[12px] flex items-center justify-center ${action.color} shadow-lg flex-shrink-0`}>
          <action.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 mb-1">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
          
          {/* Usage indicator */}
          {action.usageCount && (
            <div className="flex items-center gap-1 mt-2">
              <div className="h-1 w-full max-w-[120px] bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F97316] rounded-full"
                  style={{ width: `${Math.min(action.usageCount, 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{action.usageCount}%</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
      </div>
    </motion.button>
  );
}

export function QuickActionLogin() {
  const navigate = useNavigate();

  // Quick actions with AI-powered sorting
  const quickActions: QuickAction[] = [
    {
      id: "material",
      title: "Add Material",
      description: "Record new inventory items",
      icon: Package,
      link: "/inventory/add",
      color: "bg-gradient-to-br from-[#3B82F6] to-[#2563EB]",
      bgColor: "bg-blue-50",
      isMostUsed: true,
      usageCount: 85,
    },
    {
      id: "attendance",
      title: "Mark Attendance",
      description: "Record worker attendance",
      icon: UserCheck,
      link: "/workers",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      bgColor: "bg-green-50",
      isMostUsed: false,
      usageCount: 65,
    },
    {
      id: "payment",
      title: "Make Payment",
      description: "Process worker payments",
      icon: CreditCard,
      link: "/payments",
      color: "bg-gradient-to-br from-[#F97316] to-[#EA580C]",
      bgColor: "bg-orange-50",
      isMostUsed: false,
      usageCount: 45,
    },
  ];

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-12 pb-6 px-6"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[12px] mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-gray-900 mb-2">What would you like to do?</h2>
        <p className="text-sm text-gray-500">
          Choose a quick action to get started
        </p>
      </motion.div>

      {/* AI Insight Banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mx-6 mb-6"
      >
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-4 border border-[#F59E0B]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Add Material</span> is your most used action
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <div className="flex-1 px-6 space-y-4">
        {quickActions.map((action, index) => (
          <QuickActionCard 
            key={action.id} 
            action={action} 
            delay={0.3 + index * 0.1} 
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 shadow-lg space-y-3">
        {/* Go to Dashboard Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleSkip}
          className="w-full h-14 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-[12px] font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <LayoutDashboard className="w-5 h-5" />
          Go to Dashboard
        </motion.button>

        <p className="text-xs text-center text-gray-400">
          You can access these actions anytime from the dashboard
        </p>
      </div>
    </div>
  );
}
