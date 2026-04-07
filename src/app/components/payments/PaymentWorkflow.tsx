import { ChevronLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function PaymentWorkflow() {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Worker Payment",
      description: "Process wages & salaries",
      color: "bg-blue-500",
      route: "/worker-payments",
    },
    {
      id: 2,
      title: "Supplier Payment",
      description: "Pay material suppliers",
      color: "bg-green-500",
      route: "/supplier-payments",
    },
    {
      id: 3,
      title: "Invoice Management",
      description: "Upload & track invoices",
      color: "bg-purple-500",
      route: "/invoice-management",
    },
    {
      id: 4,
      title: "Payment Tracking",
      description: "Monitor payment status",
      color: "bg-orange-500",
      route: "/payments/analytics",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Payment Workflow</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <p className="text-gray-600 text-center mb-8">
          Complete payment management process
        </p>

        {/* Workflow Steps */}
        <div className="max-w-md mx-auto space-y-4">
          {steps.map((step, index) => (
            <div key={step.id}>
              <div
                onClick={() => navigate(step.route)}
                className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200 active:scale-98 transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`${step.color} rounded-xl p-4 text-white font-bold text-xl`}>
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="max-w-md mx-auto mt-8 bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <p className="text-sm text-blue-900 text-center">
            Follow this workflow to ensure complete payment processing and tracking
          </p>
        </div>
      </div>
    </div>
  );
}
