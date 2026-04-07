import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Check,
  Package,
  MapPin,
  User,
  Sparkles,
  TrendingUp,
  Plus,
  CheckCircle2,
  ArrowLeft,
  Edit3,
  History
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface MaterialData {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  site: string;
  supplier: string;
  category: string;
  lastUpdated: string;
}

export function ScanConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get scanned material from location state or use mock data
  const scannedMaterial: MaterialData = location.state?.material || {
    id: "MAT-2024-001",
    name: "Cement (OPC)",
    quantity: 50,
    unit: "Bags",
    site: "Tower A - Foundation",
    supplier: "BuildMart Suppliers",
    category: "Building Materials",
    lastUpdated: "2 hours ago",
  };

  const [quantity, setQuantity] = useState(scannedMaterial.quantity);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);

  // AI suggestions based on past data
  const aiSuggestions = {
    averageUsage: 35,
    reorderPoint: 20,
    confidence: 92,
    recommendation: "Based on past 30 days, you typically use 35 bags/week at this site.",
  };

  const handleAddToInventory = () => {
    toast.success("Material added to inventory", {
      description: `${quantity} ${scannedMaterial.unit} of ${scannedMaterial.name}`,
    });
    navigate("/inventory");
  };

  const handleMarkAsUsed = () => {
    toast.success("Material marked as used", {
      description: `${quantity} ${scannedMaterial.unit} consumed at ${scannedMaterial.site}`,
    });
    navigate("/inventory");
  };

  const handleEditQuantity = () => {
    setIsEditingQuantity(true);
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with green confirmation accent */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-12 -mb-12" />
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={() => navigate("/scan-history")}
          className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
        >
          <History size={20} />
        </button>

        <div className="relative z-10 pt-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-4"
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Scan Successful!
          </h1>
          <p className="text-white/90 text-sm text-center">
            Material detected and ready for processing
          </p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-10 space-y-4">
        {/* Material Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-green-200"
        >
          {/* Material Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-4 border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wider">
                  Material Name
                </p>
                <h2 className="font-bold text-gray-900 text-lg">
                  {scannedMaterial.name}
                </h2>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>

          {/* Material Details Grid */}
          <div className="p-5 space-y-4">
            {/* Quantity with Edit */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Quantity
                </p>
                <button
                  onClick={handleEditQuantity}
                  className="text-blue-600 hover:text-blue-700 active:scale-90 transition-all"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              {isEditingQuantity ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border-2 border-blue-300 rounded-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => setIsEditingQuantity(false)}
                  />
                  <span className="font-bold text-blue-900">{scannedMaterial.unit}</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-blue-900">
                  {quantity.toLocaleString()} {scannedMaterial.unit}
                </p>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Code
                </p>
                <p className="font-bold text-gray-900">{scannedMaterial.id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Category
                </p>
                <p className="font-bold text-gray-900">{scannedMaterial.category}</p>
              </div>
            </div>

            {/* Site Location */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Site Location
                </p>
                <p className="font-bold text-blue-900">{scannedMaterial.site}</p>
              </div>
            </div>

            {/* Supplier */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Supplier
                </p>
                <p className="font-bold text-gray-900">{scannedMaterial.supplier}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-orange-900">AI Usage Insights</h3>
                <p className="text-xs text-orange-600 font-bold">
                  {aiSuggestions.confidence}% Confidence
                </p>
              </div>
            </div>

            <p className="text-sm text-orange-900 font-medium mb-4">
              {aiSuggestions.recommendation}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={14} className="text-orange-600" />
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    Avg Usage
                  </p>
                </div>
                <p className="text-lg font-bold text-orange-900">
                  {aiSuggestions.averageUsage} {scannedMaterial.unit}/week
                </p>
              </div>
              <div className="bg-white/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package size={14} className="text-orange-600" />
                  <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                    Reorder At
                  </p>
                </div>
                <p className="text-lg font-bold text-orange-900">
                  {aiSuggestions.reorderPoint} {scannedMaterial.unit}
                </p>
              </div>
            </div>

            {/* Auto-fill suggestion */}
            {quantity !== aiSuggestions.averageUsage && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setQuantity(aiSuggestions.averageUsage);
                  toast.success("Quantity auto-filled by AI");
                }}
                className="mt-3 w-full py-3 bg-orange-100 text-orange-900 rounded-lg font-bold text-sm hover:bg-orange-200 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                Use AI Suggested Amount ({aiSuggestions.averageUsage} {scannedMaterial.unit})
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 pt-2"
        >
          <button
            onClick={handleAddToInventory}
            className="w-full py-5 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
          >
            <Plus size={24} strokeWidth={3} />
            Add to Inventory
          </button>

          <button
            onClick={handleMarkAsUsed}
            className="w-full py-5 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 active:scale-95 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-3"
          >
            <CheckCircle2 size={24} strokeWidth={2.5} />
            Mark as Used
          </button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center mb-3">
            Recent Activity
          </p>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-500 font-bold mt-1">This Week</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500 font-bold mt-1">This Month</p>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">-8%</p>
              <p className="text-xs text-gray-500 font-bold mt-1">vs Last Month</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}