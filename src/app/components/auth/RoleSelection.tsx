import { useNavigate } from "react-router";
import { Sparkles, HardHat, Calculator, Shield, Users } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isRecommended?: boolean;
  onClick: () => void;
}

function RoleCard({ title, description, icon, isRecommended, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full bg-white rounded-[12px] shadow-sm p-6 text-left transition-all hover:shadow-md active:scale-[0.98] ${
        isRecommended ? "border-2 border-[#F97316]" : "border border-gray-200"
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-2 right-4 bg-[#F97316] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Recommended
        </div>
      )}
      <div className="flex items-start gap-4">
        <div
          className={`w-14 h-14 rounded-[12px] flex items-center justify-center flex-shrink-0 ${
            isRecommended
              ? "bg-gradient-to-br from-[#F97316] to-[#EA580C]"
              : "bg-gradient-to-br from-[#3B82F6] to-[#2563EB]"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1 pt-1">
          <h3 className="text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}

export function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    console.log("Selected role:", role);
    // Navigate to site selection after role selection
    navigate("/site-selection");
  };

  const roles = [
    {
      id: "engineer",
      title: "Site Engineer",
      description: "Manage materials, workers, and daily site operations",
      icon: <HardHat className="w-7 h-7 text-white" />,
      isRecommended: true,
    },
    {
      id: "accountant",
      title: "Accountant",
      description: "Handle invoices, payments, and financial records",
      icon: <Calculator className="w-7 h-7 text-white" />,
      isRecommended: false,
    },
    {
      id: "admin",
      title: "Admin",
      description: "Full access to all features and settings",
      icon: <Shield className="w-7 h-7 text-white" />,
      isRecommended: false,
    },
    {
      id: "worker",
      title: "Worker",
      description: "View tasks, mark attendance, and submit work",
      icon: <Users className="w-7 h-7 text-white" />,
      isRecommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Logo Section */}
      <div className="pt-12 pb-6 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[12px] mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-gray-900 mb-2">Select Your Role</h2>
        <p className="text-sm text-gray-500">Choose how you'll use BuildAI</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8">
        {/* AI Recommendation */}
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-5 mb-6 border border-[#F59E0B]/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm text-gray-800 mb-1">AI Recommendation</p>
              <p className="text-xs text-gray-600">
                Based on your activity, we suggest <span className="font-semibold">Engineer role</span>
              </p>
            </div>
          </div>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              title={role.title}
              description={role.description}
              icon={role.icon}
              isRecommended={role.isRecommended}
              onClick={() => handleRoleSelect(role.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-xs text-gray-400">
          You can change your role anytime in Settings
        </p>
      </div>
    </div>
  );
}