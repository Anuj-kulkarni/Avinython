import { Link, useNavigate, useParams } from "react-router";
import {
  ScanLine,
  Plus,
  Truck,
  TrendingUp,
  Package,
  ClipboardList,
  AlertCircle,
  Zap,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

export function EngineerDashboard() {
  const { siteId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header - Site Info */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1">
            <p className="text-sm text-blue-100 mb-1">Current Site</p>
            <h1 className="font-bold text-white">Riverdale Tower</h1>
          </div>
          <Link
            to="/engineer/site-selection"
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-lg hover:bg-white/30 transition-all"
          >
            Switch
          </Link>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 backdrop-blur-sm text-white rounded-lg text-sm font-semibold">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Active Construction
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="px-6 -mt-8 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/scanner"
              className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 rounded-xl p-4 transition-all active:scale-[0.95] border-2 border-blue-200"
            >
              <div className="bg-blue-600 rounded-xl p-3 mb-2">
                <ScanLine className="text-white" size={24} />
              </div>
              <span className="text-sm font-bold text-gray-900">Scan Material</span>
            </Link>

            <Link
              to="/quick-entry"
              className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 rounded-xl p-4 transition-all active:scale-[0.95] border-2 border-green-200"
            >
              <div className="bg-green-600 rounded-xl p-3 mb-2">
                <Plus className="text-white" size={24} />
              </div>
              <span className="text-sm font-bold text-gray-900">Add Usage</span>
            </Link>

            <Link
              to="/delivery-tracking"
              className="flex flex-col items-center justify-center bg-orange-50 hover:bg-orange-100 rounded-xl p-4 transition-all active:scale-[0.95] border-2 border-orange-200"
            >
              <div className="bg-orange-600 rounded-xl p-3 mb-2">
                <Truck className="text-white" size={24} />
              </div>
              <span className="text-sm font-bold text-gray-900">Track Delivery</span>
            </Link>

            <Link
              to="/phases"
              className="flex flex-col items-center justify-center bg-purple-50 hover:bg-purple-100 rounded-xl p-4 transition-all active:scale-[0.95] border-2 border-purple-200"
            >
              <div className="bg-purple-600 rounded-xl p-3 mb-2">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-sm font-bold text-gray-900">Update Progress</span>
            </Link>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-orange-600" size={20} />
          <h2 className="font-bold text-gray-900">AI Insights</h2>
        </div>
        <div className="space-y-3">
          {/* Critical Alert */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border-2 border-red-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-red-600 rounded-full p-2 flex-shrink-0">
                <AlertCircle className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 mb-1">Cement Stock Low</p>
                <p className="text-sm text-gray-700">Only 45 bags remaining. Expected to last 2 days.</p>
                <button
                  onClick={() => {
                    toast.info("Opening supplier module for quick reorder");
                    navigate("/suppliers");
                  }}
                  className="mt-3 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Alert */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                <Truck className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 mb-1">Delivery Arriving Soon</p>
                <p className="text-sm text-gray-700">Steel bars delivery expected in 45 minutes.</p>
                <button
                  onClick={() => navigate("/delivery-tracking")}
                  className="mt-3 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Track Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-6">
        <h2 className="font-bold text-gray-900 mb-3">Summary</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <Link
            to="/inventory"
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.95]"
          >
            <div className="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
              <Package className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">156</p>
            <p className="text-xs text-gray-600">Materials</p>
          </Link>

          <Link
            to="/phases"
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.95]"
          >
            <div className="bg-green-100 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
              <ClipboardList className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">24</p>
            <p className="text-xs text-gray-600">Active Tasks</p>
          </Link>

          <Link
            to="/alerts"
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.95]"
          >
            <div className="bg-orange-100 rounded-lg w-10 h-10 flex items-center justify-center mb-2">
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">7</p>
            <p className="text-xs text-gray-600">Alerts</p>
          </Link>
        </div>

        {/* Detailed Cards */}
        <div className="space-y-3">
          <Link
            to="/inventory"
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <Package className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Available Materials</p>
                  <p className="text-sm text-gray-600">156 items in stock</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </Link>

          <Link
            to="/phases"
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <ClipboardList className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Active Tasks</p>
                  <p className="text-sm text-gray-600">24 tasks in progress</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </Link>

          <Link
            to="/alerts"
            className="block bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-blue-300 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 rounded-lg p-2">
                  <AlertCircle className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Alerts</p>
                  <p className="text-sm text-gray-600">7 items need attention</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
