import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Navigation,
  Clock,
  Package,
  User,
  Phone,
  AlertCircle,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Navigation2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface DeliveryData {
  id: string;
  supplier: string;
  supplierPhone: string;
  material: string;
  quantity: number;
  unit: string;
  site: string;
  siteAddress: string;
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  estimatedArrival: string;
  distance: string;
  status: "on-time" | "delayed" | "arriving";
  delayReason?: string;
}

export function DeliveryTracking() {
  const navigate = useNavigate();
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [truckPosition, setTruckPosition] = useState({ x: 20, y: 30 });
  const [isMoving, setIsMoving] = useState(true);

  // Mock delivery data
  const delivery: DeliveryData = {
    id: "DEL-2024-1234",
    supplier: "BuildMart Suppliers",
    supplierPhone: "+91 98765 43210",
    material: "Cement (OPC)",
    quantity: 500,
    unit: "Bags",
    site: "Tower A - Foundation",
    siteAddress: "Plot 45, Sector 12, New Delhi",
    driverName: "Rajesh Kumar",
    driverPhone: "+91 98888 12345",
    vehicleNumber: "DL-1A-1234",
    estimatedArrival: "2:45 PM",
    distance: "3.2 km",
    status: "on-time",
  };

  // AI predictions
  const aiPrediction = {
    confidence: 94,
    predictedDelay: 0,
    trafficCondition: "Light traffic",
    alternativeRoute: false,
    weatherImpact: "No impact",
    recommendation: "Delivery is on schedule. No action needed.",
  };

  // Simulate truck movement
  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setTruckPosition((prev) => {
        // Move truck along the route from start (20, 30) to destination (70, 60)
        const progress = (prev.x - 20) / 50; // Calculate progress (0 to 1)
        
        if (progress >= 1) {
          setIsMoving(false);
          toast.success("Delivery arrived at site!", {
            description: "Driver is at the entrance",
          });
          return prev;
        }

        return {
          x: prev.x + 0.5,
          y: 30 + (progress * 30) + Math.sin(progress * 6) * 2, // Add slight curve
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isMoving]);

  const handleCall = (phone: string, name: string) => {
    toast.success(`Calling ${name}`, {
      description: phone,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50">
      {/* Map Container */}
      <div className="absolute inset-0">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100">
          {/* Grid Pattern to simulate map */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="map-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />
            </svg>
          </div>

          {/* Road-like paths */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Main roads */}
            <path
              d="M 0 60 L 100 60"
              stroke="#cbd5e1"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 70 0 L 70 100"
              stroke="#cbd5e1"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M 20 0 L 20 100"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 20 30 Q 40 20, 70 60`}
              stroke="url(#routeGradient)"
              strokeWidth="0.8"
              fill="none"
              strokeDasharray="2,2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Site Marker (Destination) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", damping: 12 }}
            className="absolute"
            style={{ left: "70%", top: "60%", transform: "translate(-50%, -100%)" }}
          >
            <div className="relative">
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ width: "60px", height: "60px", left: "-10px", top: "-10px" }}
              />
              
              {/* Marker */}
              <div className="relative bg-white rounded-full p-2 shadow-2xl border-4 border-green-500">
                <MapPin className="w-8 h-8 text-green-600" fill="currentColor" />
              </div>
              
              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-2 rounded-lg shadow-lg border border-green-200">
                <p className="text-xs font-bold text-gray-900">{delivery.site}</p>
                <p className="text-xs text-gray-500">{delivery.siteAddress}</p>
              </div>
            </div>
          </motion.div>

          {/* Truck Marker (Moving) */}
          <motion.div
            className="absolute"
            style={{
              left: `${truckPosition.x}%`,
              top: `${truckPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 12 }}
          >
            <div className="relative">
              {/* Direction indicator */}
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Navigation2 className="w-6 h-6 text-blue-600" fill="currentColor" />
              </motion.div>

              {/* Truck marker */}
              <motion.div
                className="bg-white rounded-full p-3 shadow-2xl border-4 border-blue-500"
                animate={{
                  scale: isMoving ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isMoving ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <Truck className="w-8 h-8 text-blue-600" fill="currentColor" />
              </motion.div>

              {/* Distance badge */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg">
                <p className="text-xs font-bold">{delivery.distance} away</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/30 to-transparent pt-safe">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 transition-all"
            >
              <ArrowLeft size={20} className="text-gray-900" />
            </button>

            <div className="bg-white rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  delivery.status === "on-time" ? "bg-green-500" :
                  delivery.status === "delayed" ? "bg-red-500" : "bg-orange-500"
                } animate-pulse`} />
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  {delivery.status === "on-time" ? "On Time" :
                   delivery.status === "delayed" ? "Delayed" : "Arriving Soon"}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/scanner")}
              className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 transition-all"
            >
              <Navigation size={20} className="text-gray-900" />
            </button>
          </div>
        </div>

        {/* AI Alert Banner */}
        {delivery.status === "delayed" && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-24 left-6 right-6 z-20"
          >
            <div className="bg-red-500 rounded-xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-white text-sm mb-1">Delivery Delayed</p>
                  <p className="text-white/90 text-xs">{delivery.delayReason || "Heavy traffic detected"}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Sliding Panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-30 max-w-md mx-auto"
        initial={{ y: "calc(100% - 180px)" }}
        animate={{ y: isPanelExpanded ? 0 : "calc(100% - 180px)" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
          className="w-full py-4 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <motion.div
            animate={{ rotate: isPanelExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isPanelExpanded ? (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            )}
          </motion.div>
        </button>

        <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
          {/* ETA Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-4 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Estimated Arrival
                </span>
              </div>
              <p className="text-4xl font-bold text-white mb-2">{delivery.estimatedArrival}</p>
              <p className="text-white/90 text-sm font-medium">
                {delivery.distance} away • {aiPrediction.trafficCondition}
              </p>
            </div>
          </motion.div>

          {/* Delivery Details */}
          <div className="space-y-4 mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Delivery Details
            </h3>

            {/* Material Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Material
                  </p>
                  <h4 className="font-bold text-gray-900">{delivery.material}</h4>
                  <p className="text-sm text-gray-600">
                    {delivery.quantity.toLocaleString()} {delivery.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Supplier Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Supplier
                    </p>
                    <h4 className="font-bold text-gray-900">{delivery.supplier}</h4>
                  </div>
                </div>
                <button
                  onClick={() => handleCall(delivery.supplierPhone, delivery.supplier)}
                  className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600 active:scale-90 transition-all"
                >
                  <Phone className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Driver Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Driver
                    </p>
                    <h4 className="font-bold text-gray-900">{delivery.driverName}</h4>
                    <p className="text-xs text-gray-600 font-bold">{delivery.vehicleNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCall(delivery.driverPhone, delivery.driverName)}
                  className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all"
                >
                  <Phone className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Prediction Panel */}
          <AnimatePresence>
            {isPanelExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-5 mb-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-900">AI Delivery Insights</h3>
                    <p className="text-xs text-orange-600 font-bold">
                      {aiPrediction.confidence}% Prediction Accuracy
                    </p>
                  </div>
                </div>

                <p className="text-sm text-orange-900 font-medium mb-4">
                  {aiPrediction.recommendation}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                      Traffic Status
                    </span>
                    <span className="text-sm font-bold text-orange-900">
                      {aiPrediction.trafficCondition}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                      Weather Impact
                    </span>
                    <span className="text-sm font-bold text-orange-900">
                      {aiPrediction.weatherImpact}
                    </span>
                  </div>
                  {aiPrediction.predictedDelay > 0 && (
                    <div className="flex items-center justify-between bg-red-100 rounded-lg p-3">
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        Expected Delay
                      </span>
                      <span className="text-sm font-bold text-red-900">
                        +{aiPrediction.predictedDelay} min
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          {isPanelExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <button
                onClick={() => toast.success("Notifying driver")}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-100"
              >
                Contact Driver
              </button>
              <button
                onClick={() => toast.success("Preparing for delivery")}
                className="w-full py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 active:scale-95 transition-all shadow-lg shadow-green-100"
              >
                Confirm Arrival Preparation
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
