import { useState, useEffect } from "react";
import { X, Zap, ZapOff, Keyboard, Sparkles, Check, Package, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface ScannedMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  site: string;
  supplier: string;
  category: string;
  lastUpdated: string;
}

export function MaterialScanner() {
  const navigate = useNavigate();
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [scannedMaterial, setScannedMaterial] = useState<ScannedMaterial | null>(null);
  const [manualCode, setManualCode] = useState("");

  // Simulate scanning after 3 seconds
  useEffect(() => {
    if (isScanning && !showManualEntry) {
      const timer = setTimeout(() => {
        simulateScan();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, showManualEntry]);

  const simulateScan = () => {
    setIsScanning(false);
    const materialData = {
      id: "MAT-2024-001",
      name: "Cement (OPC)",
      quantity: 50,
      unit: "Bags",
      site: "Tower A - Foundation",
      supplier: "BuildMart Suppliers",
      category: "Building Materials",
      lastUpdated: "2 hours ago",
    };
    // Navigate to confirmation screen with material data
    setTimeout(() => {
      navigate("/scan-confirm", { state: { material: materialData } });
    }, 1500);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      setShowManualEntry(false);
      setIsScanning(false);
      simulateScan();
    } else {
      toast.error("Please enter a valid material code");
    }
  };

  const handleConfirm = () => {
    toast.success("Material details confirmed");
    navigate("/scan-confirm", { state: { material: scannedMaterial } });
  };

  const handleRescan = () => {
    setScannedMaterial(null);
    setIsScanning(true);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Simulated Camera View */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Camera Feed Simulation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent pt-safe">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all"
          >
            <X size={24} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${
                flashEnabled
                  ? "bg-yellow-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {flashEnabled ? <Zap size={22} fill="currentColor" /> : <ZapOff size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scanning Area */}
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="relative w-full max-w-sm aspect-square">
          {/* Dark Overlay with Cut-out */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id="scanMask">
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="80" height="80" rx="3" fill="black" />
                </mask>
              </defs>
              <rect width="100" height="100" fill="rgba(0, 0, 0, 0.7)" mask="url(#scanMask)" />
            </svg>
          </div>

          {/* Scanning Frame */}
          <div className="absolute inset-0 m-[10%]">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>

            {/* Scanning Line Animation */}
            {isScanning && !showManualEntry && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-lg shadow-blue-500/50"
                animate={{
                  top: ["0%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}

            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction Text */}
      <div className="absolute top-1/3 left-0 right-0 text-center px-8 -mt-20 z-20">
        <div className="bg-black/60 backdrop-blur-lg rounded-2xl px-6 py-4 inline-block">
          <p className="text-white font-bold text-lg">
            {isScanning ? "Scan Material QR Code" : "Processing..."}
          </p>
          <p className="text-white/70 text-sm mt-1">
            {isScanning ? "Position QR code within the frame" : "Detecting material details"}
          </p>
        </div>
      </div>

      {/* AI Processing Indicator */}
      {!isScanning && !scannedMaterial && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        >
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl px-8 py-6 shadow-2xl shadow-orange-500/50">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <p className="text-white font-bold text-lg">AI Analyzing...</p>
                <p className="text-white/90 text-sm">Detecting material</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent pb-safe">
        <div className="px-6 py-6">
          <button
            onClick={() => setShowManualEntry(true)}
            className="w-full py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 active:scale-95 transition-all"
          >
            <Keyboard size={20} />
            Enter Code Manually
          </button>
        </div>
      </div>

      {/* Manual Entry Modal */}
      <AnimatePresence>
        {showManualEntry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowManualEntry(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50 max-w-md mx-auto"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

              <h3 className="font-bold text-xl text-gray-900 mb-2">Enter Material Code</h3>
              <p className="text-sm text-gray-500 mb-6">Type the code manually if scanning fails</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-2 uppercase tracking-wider">
                    Material Code
                  </label>
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g., MAT-2024-001"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowManualEntry(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleManualSubmit}
                    className="flex-1 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scanned Material Result Modal */}
      <AnimatePresence>
        {scannedMaterial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl overflow-hidden w-full max-w-md"
              >
                {/* Success Header */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-4 relative z-10"
                  >
                    <Check className="w-10 h-10 text-white" strokeWidth={3} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Material Detected!</h3>
                  <p className="text-white/90 text-sm relative z-10">AI successfully identified the material</p>
                </div>

                {/* Material Details */}
                <div className="p-6 space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Material Name</p>
                        <h4 className="font-bold text-gray-900 text-lg">{scannedMaterial.name}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity</p>
                        <p className="font-bold text-gray-900">
                          {scannedMaterial.quantity.toLocaleString()} {scannedMaterial.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Code</p>
                        <p className="font-bold text-gray-900">{scannedMaterial.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Site Location */}
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Site Location</p>
                      <p className="font-bold text-blue-900">{scannedMaterial.site}</p>
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">AI Insight</p>
                        <p className="text-sm text-orange-900 font-medium">
                          Stock level is normal. Last updated {scannedMaterial.lastUpdated}.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleRescan}
                      className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
                    >
                      Scan Again
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-[2] py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-100"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}