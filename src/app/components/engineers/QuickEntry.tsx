import { useState } from "react";
import { QrCode, CheckCircle, Package, Hash, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

const COMMON_MATERIALS = [
  { id: 1, name: "Cement", icon: "🏗️", unit: "bags" },
  { id: 2, name: "Steel", icon: "🔩", unit: "kg" },
  { id: 3, name: "Sand", icon: "🏖️", unit: "cubic m" },
  { id: 4, name: "Bricks", icon: "🧱", unit: "pieces" },
  { id: 5, name: "Concrete", icon: "⚙️", unit: "cubic m" },
  { id: 6, name: "Wood", icon: "🪵", unit: "pieces" },
];

export function QuickEntry() {
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [quantity, setQuantity] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(0, quantity + delta));
  };

  const handleSubmit = async () => {
    if (!selectedMaterial) {
      toast.error("Please select a material");
      return;
    }
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(`${quantity} ${selectedMaterial.unit} of ${selectedMaterial.name} recorded!`);

    // Reset form
    setSelectedMaterial(null);
    setQuantity(0);
    setIsSubmitting(false);
  };

  const handleQRScan = () => {
    toast.info("QR Scanner opening...");
    // Simulate QR scan
    setTimeout(() => {
      const randomMaterial = COMMON_MATERIALS[Math.floor(Math.random() * COMMON_MATERIALS.length)];
      setSelectedMaterial(randomMaterial);
      toast.success(`Scanned: ${randomMaterial.name}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black">Quick Entry</h1>
            <p className="text-blue-100 text-sm font-semibold">Record Material Usage</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6 -mt-4">
        {/* QR Code Scanner Button - Prominent */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleQRScan}
          className="w-full bg-white rounded-3xl shadow-xl border-4 border-orange-400 p-8 flex flex-col items-center gap-4 active:shadow-lg transition-all"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <QrCode size={48} className="text-white" strokeWidth={3} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-gray-900">Scan QR Code</p>
            <p className="text-sm font-bold text-gray-500 mt-1">Quick material lookup</p>
          </div>
        </motion.button>

        {/* OR Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-0.5 bg-gray-200"></div>
          <span className="text-sm font-black text-gray-400 uppercase tracking-wider">Or Select</span>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
        </div>

        {/* Material Selection */}
        <div>
          <label className="block text-lg font-black text-gray-700 mb-4 flex items-center gap-2">
            <Package size={24} className="text-blue-600" />
            Select Material
          </label>
          <div className="grid grid-cols-2 gap-3">
            {COMMON_MATERIALS.map((material) => (
              <motion.button
                key={material.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMaterial(material)}
                className={`p-6 rounded-2xl border-3 transition-all ${
                  selectedMaterial?.id === material.id
                    ? "bg-blue-500 border-blue-600 shadow-xl"
                    : "bg-white border-gray-200 hover:border-blue-200 shadow-sm"
                }`}
              >
                <div className="text-5xl mb-3">{material.icon}</div>
                <p
                  className={`text-base font-black ${
                    selectedMaterial?.id === material.id ? "text-white" : "text-gray-900"
                  }`}
                >
                  {material.name}
                </p>
                <p
                  className={`text-xs font-bold mt-1 ${
                    selectedMaterial?.id === material.id ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {material.unit}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        {selectedMaterial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6"
          >
            <label className="block text-lg font-black text-gray-700 mb-4 flex items-center gap-2">
              <Hash size={24} className="text-green-600" />
              Quantity ({selectedMaterial.unit})
            </label>

            {/* Large Number Display */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 mb-6 border-2 border-green-200">
              <div className="text-center">
                <div className="text-6xl font-black text-green-700 mb-2">{quantity}</div>
                <div className="text-sm font-bold text-green-600 uppercase tracking-wider">
                  {selectedMaterial.unit}
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="grid grid-cols-3 gap-4">
              {/* Minus Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 0}
                className="h-20 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-2xl font-black text-3xl shadow-lg active:shadow-sm transition-all flex items-center justify-center"
              >
                <Minus size={36} strokeWidth={4} />
              </motion.button>

              {/* Number Input */}
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                className="h-20 bg-white border-3 border-gray-300 rounded-2xl text-center text-3xl font-black text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                min="0"
              />

              {/* Plus Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(1)}
                className="h-20 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-3xl shadow-lg active:shadow-sm transition-all flex items-center justify-center"
              >
                <Plus size={36} strokeWidth={4} />
              </motion.button>
            </div>

            {/* Quick Add Buttons */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[5, 10, 20, 50].map((amount) => (
                <motion.button
                  key={amount}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuantity(quantity + amount)}
                  className="py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl font-black text-lg border-2 border-blue-200 active:border-blue-400 transition-all"
                >
                  +{amount}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        {selectedMaterial && quantity > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-24 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-3xl font-black text-2xl shadow-2xl active:shadow-lg transition-all flex items-center justify-center gap-4"
          >
            {isSubmitting ? (
              <>
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={36} strokeWidth={3} />
                Submit Entry
              </>
            )}
          </motion.button>
        )}

        {/* Helper Text */}
        {!selectedMaterial && (
          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <p className="text-center text-base font-bold text-blue-700 leading-relaxed">
              👆 Scan QR code or select material to start
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
