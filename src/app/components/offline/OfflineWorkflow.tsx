import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  WifiOff,
  Wifi,
  Package,
  IndianRupee,
  Database,
  RefreshCw,
  CheckCircle2,
  FileText,
  Share2,
  Download,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: "pending" | "active" | "completed";
  color: string;
}

export function OfflineWorkflow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps: WorkflowStep[] = [
    {
      id: "offline",
      title: "User Goes Offline",
      description: "Internet connection is lost while on site",
      icon: WifiOff,
      status: currentStep >= 0 ? "completed" : "pending",
      color: "red",
    },
    {
      id: "entry",
      title: "Data Entry Offline",
      description: "User adds materials and records payments",
      icon: Package,
      status: currentStep >= 1 ? "completed" : currentStep === 0 ? "active" : "pending",
      color: "blue",
    },
    {
      id: "save",
      title: "Save Locally",
      description: "Data stored securely on device",
      icon: Database,
      status: currentStep >= 2 ? "completed" : currentStep === 1 ? "active" : "pending",
      color: "orange",
    },
    {
      id: "online",
      title: "Internet Restored",
      description: "Device reconnects to the internet",
      icon: Wifi,
      status: currentStep >= 3 ? "completed" : currentStep === 2 ? "active" : "pending",
      color: "green",
    },
    {
      id: "sync",
      title: "Auto-Sync Starts",
      description: "Critical items synced first by AI",
      icon: RefreshCw,
      status: currentStep >= 4 ? "completed" : currentStep === 3 ? "active" : "pending",
      color: "purple",
    },
    {
      id: "update",
      title: "Database Updated",
      description: "Server database updated with new data",
      icon: CheckCircle2,
      status: currentStep >= 5 ? "completed" : currentStep === 4 ? "active" : "pending",
      color: "green",
    },
    {
      id: "dashboard",
      title: "Dashboard Updates",
      description: "Real-time insights and analytics refresh",
      icon: TrendingUp,
      status: currentStep >= 6 ? "completed" : currentStep === 5 ? "active" : "pending",
      color: "blue",
    },
    {
      id: "report",
      title: "Report Generated",
      description: "AI generates PDF report automatically",
      icon: FileText,
      status: currentStep >= 7 ? "completed" : currentStep === 6 ? "active" : "pending",
      color: "orange",
    },
    {
      id: "share",
      title: "User Shares Report",
      description: "Report shared with stakeholders",
      icon: Share2,
      status: currentStep >= 8 ? "completed" : currentStep === 7 ? "active" : "pending",
      color: "purple",
    },
  ];

  const getStatusColor = (status: string, baseColor: string) => {
    if (status === "completed") {
      return "bg-green-100 border-green-500 text-green-900";
    }
    if (status === "active") {
      return `bg-${baseColor}-100 border-${baseColor}-500 text-${baseColor}-900 ring-4 ring-${baseColor}-100`;
    }
    return "bg-gray-50 border-gray-200 text-gray-500";
  };

  const getIconColor = (status: string, baseColor: string) => {
    if (status === "completed") {
      return "bg-green-500 text-white";
    }
    if (status === "active") {
      return `bg-${baseColor}-500 text-white`;
    }
    return "bg-gray-200 text-gray-400";
  };

  const nextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-12 -mb-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Offline Workflow</h1>
              <p className="text-white/90 text-sm mt-1">
                Complete offline to online journey
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">Progress</span>
              <span className="text-sm font-bold text-white">
                {Math.round(((currentStep + 1) / workflowSteps.length) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / workflowSteps.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="px-6 -mt-4 mb-6">
        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                step.status === "completed"
                  ? "border-green-500"
                  : step.status === "active"
                  ? "border-blue-500 ring-4 ring-blue-100"
                  : "border-gray-200"
              }`}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        step.status === "completed"
                          ? "bg-green-500"
                          : step.status === "active"
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      ) : (
                        <step.icon
                          className={`w-7 h-7 ${
                            step.status === "active" ? "text-white" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold ${
                        step.status === "pending"
                          ? "text-gray-400"
                          : step.status === "active"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      Step {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className={`font-bold ${
                          step.status === "pending"
                            ? "text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {step.status === "completed" && (
                        <div className="px-2 py-1 bg-green-100 rounded-lg">
                          <span className="text-xs font-bold text-green-700">
                            Complete
                          </span>
                        </div>
                      )}
                      {step.status === "active" && (
                        <div className="px-2 py-1 bg-blue-100 rounded-lg">
                          <span className="text-xs font-bold text-blue-700">
                            Active
                          </span>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        step.status === "pending" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Special badges for AI features */}
                    {step.id === "sync" && step.status !== "pending" && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F97316] bg-opacity-10 rounded-lg">
                        <Zap className="w-4 h-4 text-[#F97316]" />
                        <span className="text-xs font-bold text-[#F97316]">
                          AI Priority Active
                        </span>
                      </div>
                    )}
                    {step.id === "report" && step.status !== "pending" && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F97316] bg-opacity-10 rounded-lg">
                        <Sparkles className="w-4 h-4 text-[#F97316]" />
                        <span className="text-xs font-bold text-[#F97316]">
                          AI Generated
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center -my-2">
                  <div
                    className={`w-0.5 h-4 ${
                      step.status === "completed" ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === workflowSteps.length - 1}
            className="py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={reset}
          className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
        >
          Reset Workflow
        </button>
      </div>

      {/* Info Card */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-orange-900 mb-2">
                Smart Offline Mode
              </h3>
              <p className="text-sm text-orange-700 mb-3">
                BuildAI's offline mode ensures continuous productivity even without
                internet. All critical data like payments are prioritized during sync,
                and AI automatically generates reports once data is synced.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-white rounded-lg">
                  <span className="text-xs font-bold text-orange-900">
                    ✓ Auto Priority
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg">
                  <span className="text-xs font-bold text-orange-900">
                    ✓ Local Storage
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-white rounded-lg">
                  <span className="text-xs font-bold text-orange-900">
                    ✓ Auto Reports
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 mt-6">
        <h3 className="font-bold text-gray-900 mb-4">Try It Out</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/offline-data-entry")}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:bg-blue-50 active:scale-95 transition-all"
          >
            <Package className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm font-bold text-gray-900">Data Entry</p>
          </button>
          <button
            onClick={() => navigate("/data-sync")}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-green-500 hover:bg-green-50 active:scale-95 transition-all"
          >
            <RefreshCw className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm font-bold text-gray-900">Sync Data</p>
          </button>
          <button
            onClick={() => navigate("/sync-settings")}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-purple-500 hover:bg-purple-50 active:scale-95 transition-all"
          >
            <Database className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-bold text-gray-900">Settings</p>
          </button>
          <button
            onClick={() => navigate("/offline-demo")}
            className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-500 hover:bg-orange-50 active:scale-95 transition-all"
          >
            <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-sm font-bold text-gray-900">Demo Mode</p>
          </button>
        </div>
      </div>
    </div>
  );
}
