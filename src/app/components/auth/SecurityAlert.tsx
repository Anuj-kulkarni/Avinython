import { useNavigate } from "react-router";
import { 
  AlertTriangle, 
  Sparkles, 
  Shield, 
  LogOut, 
  MapPin, 
  Clock,
  Smartphone
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface SecurityDetail {
  icon: any;
  label: string;
  value: string;
  isHighlighted?: boolean;
}

export function SecurityAlert() {
  const navigate = useNavigate();

  const handleVerifyIdentity = () => {
    // Navigate to OTP verification for identity confirmation
    navigate("/otp-verification");
  };

  const handleLogout = () => {
    // Navigate back to login
    navigate("/login");
  };

  const securityDetails: SecurityDetail[] = [
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, Maharashtra",
      isHighlighted: true,
    },
    {
      icon: Smartphone,
      label: "Device",
      value: "iPhone 13 Pro",
      isHighlighted: false,
    },
    {
      icon: Clock,
      label: "Time",
      value: "2:45 PM IST",
      isHighlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Animated Alert Header */}
      <div className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] pt-12 pb-8 px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Alert Icon */}
        <div className="relative z-10 flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="relative"
          >
            {/* Pulsing Rings */}
            {[0, 1].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute inset-0 w-24 h-24 border-4 border-white/30 rounded-full"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Icon Container */}
            <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <AlertTriangle className="w-12 h-12 text-[#EF4444]" strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        {/* Alert Text */}
        <div className="relative z-10 text-center">
          <h1 className="text-white mb-2">Unusual Login Detected</h1>
          <p className="text-white/90 text-base">
            We noticed something different about this login
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* AI Detection Reason */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-5 border-2 border-[#F59E0B]/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  AI Security Detection
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">New location detected:</span> This
                  login attempt is from a location you haven't used before.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[12px] shadow-sm border border-gray-200 p-5"
        >
          <h3 className="text-gray-900 mb-4">Login Details</h3>

          <div className="space-y-4">
            {securityDetails.map((detail, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-[12px] ${
                  detail.isHighlighted
                    ? "bg-red-50 border-2 border-red-200"
                    : "bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 ${
                    detail.isHighlighted
                      ? "bg-gradient-to-br from-[#EF4444] to-[#DC2626]"
                      : "bg-gray-200"
                  }`}
                >
                  <detail.icon
                    className={`w-5 h-5 ${
                      detail.isHighlighted ? "text-white" : "text-gray-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-xs text-gray-500 mb-0.5">{detail.label}</p>
                  <p
                    className={`text-sm font-medium ${
                      detail.isHighlighted ? "text-[#EF4444]" : "text-gray-900"
                    }`}
                  >
                    {detail.value}
                  </p>
                  {detail.isHighlighted && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse" />
                      <span className="text-xs text-[#EF4444] font-medium">
                        New location
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-[12px] p-5 border border-blue-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Security Tip
              </p>
              <p className="text-xs text-gray-600">
                If this wasn't you, please logout immediately and change your
                password. Contact support if you need help.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons - Fixed at Bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 shadow-lg space-y-3">
        <Button
          onClick={handleVerifyIdentity}
          className="w-full h-14 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-[12px]"
        >
          <Shield className="w-5 h-5 mr-2" />
          Verify My Identity
        </Button>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-14 border-2 border-red-200 hover:bg-red-50 text-[#EF4444] rounded-[12px] font-medium"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout & Secure Account
        </Button>

        <p className="text-xs text-center text-gray-400 pt-2">
          This security check helps protect your account
        </p>
      </div>
    </div>
  );
}
