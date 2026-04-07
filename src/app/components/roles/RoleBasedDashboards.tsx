import { Link } from "react-router";
import { Shield, Wrench, Calculator, TrendingUp, Package, FileText, DollarSign, AlertCircle, BarChart3 } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-red-100">Role</p>
            <h1 className="font-bold text-white text-xl">Administrator</h1>
          </div>
        </div>
        <p className="text-red-100 text-sm">Full system access</p>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Overview</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Total Sites</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Payments</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹2.5M</p>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Management</h2>
        <div className="space-y-3">
          <Link
            to="/payments"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Payments Overview</h3>
                <p className="text-sm text-gray-600">Worker & supplier payments</p>
              </div>
            </div>
          </Link>

          <Link
            to="/site-management"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-xl p-3">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Site Management</h3>
                <p className="text-sm text-gray-600">Manage all construction sites</p>
              </div>
            </div>
          </Link>

          <Link
            to="/role-management"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 rounded-xl p-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">User Roles</h3>
                <p className="text-sm text-gray-600">Manage permissions & access</p>
              </div>
            </div>
          </Link>

          <Link
            to="/ai-insights"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Reports & Analytics</h3>
                <p className="text-sm text-gray-600">Business intelligence</p>
              </div>
            </div>
          </Link>

          <Link
            to="/reports"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 rounded-xl p-3">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Daily Reports</h3>
                <p className="text-sm text-gray-600">Generate & share reports</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      <div className="px-6">
        <h2 className="font-bold text-gray-900 mb-3">System Alerts</h2>
        <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-gray-900 mb-1">3 Pending Approvals</p>
              <p className="text-sm text-gray-700">Review pending payment requests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EngineerDashboardRole() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-100">Role</p>
            <h1 className="font-bold text-white text-xl">Site Engineer</h1>
          </div>
        </div>
        <p className="text-blue-100 text-sm">Field operations & tracking</p>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/scanner"
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-95"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 rounded-xl p-4 mb-3">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-bold text-gray-900">Scan Material</p>
            </div>
          </Link>

          <Link
            to="/quick-entry"
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-200 hover:border-green-400 transition-all active:scale-95"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-xl p-4 mb-3">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <p className="font-bold text-gray-900">Add Usage</p>
            </div>
          </Link>

          <Link
            to="/delivery-tracking"
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-orange-200 hover:border-orange-400 transition-all active:scale-95"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-xl p-4 mb-3">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <p className="font-bold text-gray-900">Track Delivery</p>
            </div>
          </Link>

          <Link
            to="/phases"
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-purple-200 hover:border-purple-400 transition-all active:scale-95"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 rounded-xl p-4 mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="font-bold text-gray-900">Update Progress</p>
            </div>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-indigo-200 hover:border-indigo-400 transition-all active:scale-95"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-xl p-4 mb-3">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="font-bold text-gray-900">Daily Report</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AccountantDashboardRole() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-100">Role</p>
            <h1 className="font-bold text-white text-xl">Accountant</h1>
          </div>
        </div>
        <p className="text-green-100 text-sm">Financial management</p>
      </div>

      {/* Financial Overview */}
      <div className="px-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-3">Financial Overview</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
            <p className="text-2xl font-bold text-orange-600">₹1.2M</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Paid This Month</p>
            <p className="text-2xl font-bold text-green-600">₹2.8M</p>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6">
        <h2 className="font-bold text-gray-900 mb-3">Management</h2>
        <div className="space-y-3">
          <Link
            to="/worker-payments"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Worker Payments</h3>
                <p className="text-sm text-gray-600">Manage wages & salaries</p>
              </div>
            </div>
          </Link>

          <Link
            to="/supplier-payments"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-xl p-3">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Supplier Payments</h3>
                <p className="text-sm text-gray-600">Material supplier invoices</p>
              </div>
            </div>
          </Link>

          <Link
            to="/invoice-management"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 rounded-xl p-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Invoice Management</h3>
                <p className="text-sm text-gray-600">Upload & track invoices</p>
              </div>
            </div>
          </Link>

          <Link
            to="/payments/analytics"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Financial Reports</h3>
                <p className="text-sm text-gray-600">Analytics & insights</p>
              </div>
            </div>
          </Link>

          <Link
            to="/reports"
            className="block bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-98"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 rounded-xl p-3">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Daily Reports</h3>
                <p className="text-sm text-gray-600">Generate & share reports</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
