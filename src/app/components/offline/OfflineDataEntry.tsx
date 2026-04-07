import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Package,
  IndianRupee,
  Save,
  WifiOff,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  User,
  Building2,
  Hash,
  Layers,
  Database,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type EntryType = "inventory" | "payment";

interface LocalSaveNotification {
  show: boolean;
  type: "inventory" | "payment";
  title: string;
}

export function OfflineDataEntry() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EntryType>("inventory");
  const [showNotification, setShowNotification] = useState<LocalSaveNotification>({
    show: false,
    type: "inventory",
    title: "",
  });
  const [savedCount, setSavedCount] = useState(3); // Mock count of locally saved items

  // Inventory Form State
  const [inventoryForm, setInventoryForm] = useState({
    materialName: "",
    category: "",
    quantity: "",
    unit: "bags",
    supplier: "",
    cost: "",
    notes: "",
  });

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    workerName: "",
    workerId: "",
    amount: "",
    workType: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleInventorySave = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate saving to local storage
    const localData = {
      id: `LOCAL-INV-${Date.now()}`,
      ...inventoryForm,
      timestamp: new Date().toISOString(),
      status: "pending_sync",
    };

    // Mock local storage save
    console.log("Saved to local storage:", localData);

    // Show notification
    setShowNotification({
      show: true,
      type: "inventory",
      title: `${inventoryForm.materialName || "Material"} saved locally`,
    });

    // Update saved count
    setSavedCount((prev) => prev + 1);

    // Reset form
    setInventoryForm({
      materialName: "",
      category: "",
      quantity: "",
      unit: "bags",
      supplier: "",
      cost: "",
      notes: "",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handlePaymentSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate saving to local storage
    const localData = {
      id: `LOCAL-PAY-${Date.now()}`,
      ...paymentForm,
      timestamp: new Date().toISOString(),
      status: "pending_sync",
    };

    // Mock local storage save
    console.log("Saved to local storage:", localData);

    // Show notification
    setShowNotification({
      show: true,
      type: "payment",
      title: `Payment to ${paymentForm.workerName || "worker"} saved locally`,
    });

    // Update saved count
    setSavedCount((prev) => prev + 1);

    // Reset form
    setPaymentForm({
      workerName: "",
      workerId: "",
      amount: "",
      workType: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Saved Locally Notification */}
      <AnimatePresence>
        {showNotification.show && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-4 left-4 right-4 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-0.5">
                      Saved Locally
                    </h3>
                    <p className="text-sm text-white/90">
                      {showNotification.title}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1 bg-white/30">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h1 className="text-2xl font-bold text-white">Offline Entry</h1>
              <p className="text-white/90 text-sm mt-1">
                Add data while offline
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Offline Status Banner */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-orange-500 rounded-xl p-4 border-2 border-orange-400"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                <WifiOff className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-1">You are offline</h3>
                <p className="text-sm text-white/90 mb-3">
                  Your entries will be saved locally and synced when you're back online
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg">
                    <Database className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">
                      {savedCount} items pending sync
                    </span>
                  </div>
                  <button
                    onClick={() => navigate("/data-sync")}
                    className="px-3 py-1.5 bg-white text-orange-600 text-xs font-bold rounded-lg hover:bg-white/90 active:scale-95 transition-all"
                  >
                    View All →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "inventory"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Package size={18} />
              <span>Add Material</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "payment"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <IndianRupee size={18} />
              <span>Record Payment</span>
            </div>
          </button>
        </div>
      </div>

      {/* AI Helper Banner */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-[#F97316] p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-orange-900 mb-1">
                Smart Offline Mode
              </h3>
              <p className="text-xs text-orange-700">
                All data is saved securely on your device and will automatically sync
                when connection is restored. Critical items like payments are prioritized.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Inventory Form */}
      {activeTab === "inventory" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6"
        >
          <form onSubmit={handleInventorySave} className="space-y-5">
            {/* Material Name */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span>Material Name *</span>
              </label>
              <input
                type="text"
                value={inventoryForm.materialName}
                onChange={(e) =>
                  setInventoryForm({ ...inventoryForm, materialName: e.target.value })
                }
                placeholder="e.g., Portland Cement - 53 Grade"
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Layers className="w-4 h-4 text-gray-400" />
                <span>Category *</span>
              </label>
              <select
                value={inventoryForm.category}
                onChange={(e) =>
                  setInventoryForm({ ...inventoryForm, category: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select category</option>
                <option value="cement">Cement & Concrete</option>
                <option value="steel">Steel & Metal</option>
                <option value="sand">Sand & Aggregates</option>
                <option value="bricks">Bricks & Blocks</option>
                <option value="paint">Paint & Coatings</option>
                <option value="hardware">Hardware & Tools</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
              </select>
            </div>

            {/* Quantity and Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <span>Quantity *</span>
                </label>
                <input
                  type="number"
                  value={inventoryForm.quantity}
                  onChange={(e) =>
                    setInventoryForm({ ...inventoryForm, quantity: e.target.value })
                  }
                  placeholder="0"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <span>Unit *</span>
                </label>
                <select
                  value={inventoryForm.unit}
                  onChange={(e) =>
                    setInventoryForm({ ...inventoryForm, unit: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="bags">Bags</option>
                  <option value="kg">Kilograms</option>
                  <option value="ton">Tons</option>
                  <option value="pieces">Pieces</option>
                  <option value="liters">Liters</option>
                  <option value="cubic_meters">Cubic Meters</option>
                </select>
              </div>
            </div>

            {/* Supplier */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span>Supplier</span>
              </label>
              <input
                type="text"
                value={inventoryForm.supplier}
                onChange={(e) =>
                  setInventoryForm({ ...inventoryForm, supplier: e.target.value })
                }
                placeholder="e.g., Star Cement Industries"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Cost */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <span>Total Cost</span>
              </label>
              <input
                type="number"
                value={inventoryForm.cost}
                onChange={(e) =>
                  setInventoryForm({ ...inventoryForm, cost: e.target.value })
                }
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Notes (Optional)
              </label>
              <textarea
                value={inventoryForm.notes}
                onChange={(e) =>
                  setInventoryForm({ ...inventoryForm, notes: e.target.value })
                }
                placeholder="Add any additional notes..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 active:scale-95 transition-all shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>Save Locally</span>
              <Database className="w-5 h-5" />
            </button>

            <p className="text-center text-xs text-gray-500">
              This entry will be saved on your device and synced when online
            </p>
          </form>
        </motion.div>
      )}

      {/* Payment Form */}
      {activeTab === "payment" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6"
        >
          <form onSubmit={handlePaymentSave} className="space-y-5">
            {/* Worker Name */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <span>Worker Name *</span>
              </label>
              <input
                type="text"
                value={paymentForm.workerName}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, workerName: e.target.value })
                }
                placeholder="e.g., Rajesh Kumar"
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Worker ID */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Hash className="w-4 h-4 text-gray-400" />
                <span>Worker ID</span>
              </label>
              <input
                type="text"
                value={paymentForm.workerId}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, workerId: e.target.value })
                }
                placeholder="e.g., WKR-001"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Amount */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <IndianRupee className="w-4 h-4 text-gray-400" />
                <span>Payment Amount *</span>
              </label>
              <input
                type="number"
                value={paymentForm.amount}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, amount: e.target.value })
                }
                placeholder="0.00"
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Work Type */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Layers className="w-4 h-4 text-gray-400" />
                <span>Work Type *</span>
              </label>
              <select
                value={paymentForm.workType}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, workType: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="">Select work type</option>
                <option value="daily_wage">Daily Wage</option>
                <option value="weekly_wage">Weekly Wage</option>
                <option value="piece_work">Piece Work</option>
                <option value="overtime">Overtime</option>
                <option value="bonus">Bonus</option>
                <option value="advance">Advance Payment</option>
              </select>
            </div>

            {/* Date */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Payment Date *</span>
              </label>
              <input
                type="date"
                value={paymentForm.date}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, date: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm p-5">
              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Notes (Optional)
              </label>
              <textarea
                value={paymentForm.notes}
                onChange={(e) =>
                  setPaymentForm({ ...paymentForm, notes: e.target.value })
                }
                placeholder="Add payment details or notes..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Save Button with Priority Badge */}
            <div className="space-y-3">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-900">Critical Priority</span>
                </div>
                <p className="text-xs text-red-700 mt-1">
                  Payment records are synced first when connection is restored
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 active:scale-95 transition-all shadow-lg"
              >
                <Save className="w-5 h-5" />
                <span>Save Locally</span>
                <Database className="w-5 h-5" />
              </button>

              <p className="text-center text-xs text-gray-500">
                This payment will be saved securely and synced when online
              </p>
            </div>
          </form>
        </motion.div>
      )}

      {/* Bottom Info Card */}
      <div className="px-6 mt-6">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-blue-900 mb-2">
                Auto-Sync When Online
              </h3>
              <p className="text-xs text-blue-700">
                Your locally saved entries will automatically sync to the server when
                your device reconnects to the internet. You can continue working
                offline without any interruption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
