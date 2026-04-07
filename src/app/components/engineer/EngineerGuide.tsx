import { Link } from "react-router";
import { HardHat, MapPin, LayoutDashboard, ArrowRight } from "lucide-react";

export function EngineerGuide() {
  const engineerFlow = [
    {
      step: 1,
      title: "Login",
      description: "Engineer logs in with phone number",
      route: "/engineer/login",
      icon: HardHat,
      color: "bg-blue-500",
    },
    {
      step: 2,
      title: "Select Site",
      description: "Choose construction site to work on",
      route: "/engineer/site-selection",
      icon: MapPin,
      color: "bg-green-500",
    },
    {
      step: 3,
      title: "Dashboard",
      description: "Access site tools and features",
      route: "/engineer/dashboard/1",
      icon: LayoutDashboard,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 rounded-2xl p-6 inline-block mb-4">
            <HardHat className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Site Engineer Workflow
          </h1>
          <p className="text-gray-600">
            Simple, mobile-first interface for construction site engineers
          </p>
        </div>

        {/* Flow Steps */}
        <div className="space-y-4">
          {engineerFlow.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step}>
                <Link
                  to={item.route}
                  className="block bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${item.color} rounded-xl p-4 flex-shrink-0`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs font-bold">
                          Step {item.step}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                        <span>Open Screen</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Arrow between steps */}
                {index < engineerFlow.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Dashboard Features</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <div>
                <p className="font-semibold text-gray-900">Scan Material</p>
                <p className="text-gray-600">QR code scanning for material tracking</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <div>
                <p className="font-semibold text-gray-900">Add Usage</p>
                <p className="text-gray-600">Quick material usage entry</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></div>
              <div>
                <p className="font-semibold text-gray-900">Track Delivery</p>
                <p className="text-gray-600">Real-time delivery tracking with map</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
              <div>
                <p className="font-semibold text-gray-900">Update Progress</p>
                <p className="text-gray-600">Phase-wise construction progress updates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
              <div>
                <p className="font-semibold text-gray-900">AI Insights</p>
                <p className="text-gray-600">Smart alerts for stock levels and deliveries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Button */}
        <div className="mt-6">
          <Link
            to="/engineer/login"
            className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-center shadow-lg hover:bg-blue-700 transition-colors"
          >
            Start as Site Engineer
          </Link>
        </div>
      </div>
    </div>
  );
}
