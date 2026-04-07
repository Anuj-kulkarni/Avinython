import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Package,
  User,
  Clock,
  Camera,
  FileSignature,
  AlertCircle,
  Sparkles,
  Navigation,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function DeliveryConfirmation() {
  const navigate = useNavigate();
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);
  const [rating, setRating] = useState<"good" | "bad" | null>(null);
  const [notes, setNotes] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  // Mock delivery data
  const delivery = {
    id: "DEL-2024-1234",
    material: "Cement (OPC)",
    quantity: 500,
    unit: "Bags",
    supplier: "BuildMart Suppliers",
    driverName: "Rajesh Kumar",
    vehicleNumber: "DL-1A-1234",
    site: "Tower A - Foundation",
    siteAddress: "Plot 45, Sector 12, New Delhi",
    arrivalTime: "2:45 PM",
    coordinates: {
      lat: 28.6139,
      lng: 77.2090,
    },
  };

  // AI location verification
  const locationVerification = {
    isCorrectLocation: true,
    confidence: 98,
    verifiedSite: "Tower A - Foundation",
    distance: "5m from designated spot",
    status: "verified",
  };

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    setShowPhotoCapture(false);
    toast.success("Photo captured successfully");
  };

  const handleSignature = () => {
    setSignatureDone(true);
    setShowSignature(false);
    toast.success("Signature recorded");
  };

  const handleConfirmDelivery = () => {
    if (!photoTaken) {
      toast.error("Please take a photo of the delivery");
      return;
    }

    setIsConfirming(true);

    // Simulate confirmation
    setTimeout(() => {
      toast.success("Delivery confirmed successfully!", {
        description: "Materials added to inventory",
      });
      navigate("/inventory");
    }, 2000);
  };

  const handleReportIssue = () => {
    toast.info("Reporting delivery issue", {
      description: "Your concern has been noted",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Map Snapshot */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="map-grid-confirm"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 30 0 L 0 0 0 30"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid-confirm)" />
            </svg>
          </div>

          {/* Road lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 50 L 100 50"
              stroke="#cbd5e1"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 50 0 L 50 100"
              stroke="#cbd5e1"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
          </svg>

          {/* Location Pin - Centered */}
          <motion.div
            initial={{ scale: 0, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 10, delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full"
          >
            <div className="relative">
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ width: "60px", height: "60px", left: "-5px", top: "-5px" }}
              />

              {/* Pin */}
              <div className="relative bg-green-500 rounded-full p-4 shadow-2xl border-4 border-white">
                <MapPin className="w-10 h-10 text-white" fill="currentColor" />
              </div>

              {/* Pin shadow */}
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/30 to-transparent pt-safe">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 transition-all"
            >
              <ArrowLeft size={20} className="text-gray-900" />
            </button>

            <div className="bg-white rounded-xl px-4 py-2 shadow-lg">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Confirm Delivery
              </span>
            </div>

            <button
              onClick={() => navigate("/delivery-tracking")}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 transition-all"
            >
              <Navigation size={18} className="text-gray-900" />
            </button>
          </div>
        </div>

        {/* Location Label */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-4 left-6 right-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Delivery Location
                </p>
                <p className="font-bold text-gray-900">{delivery.site}</p>
                <p className="text-xs text-gray-500">{delivery.siteAddress}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Location Verification */}
      <div className="px-6 -mt-6 mb-6 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`rounded-xl p-5 shadow-lg border-2 ${
            locationVerification.isCorrectLocation
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
              : "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                locationVerification.isCorrectLocation
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {locationVerification.isCorrectLocation ? (
                <Shield className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`font-bold text-lg ${
                  locationVerification.isCorrectLocation
                    ? "text-green-900"
                    : "text-red-900"
                }`}
              >
                {locationVerification.isCorrectLocation
                  ? "Location Verified ✓"
                  : "Location Mismatch!"}
              </h3>
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-4 h-4 ${
                    locationVerification.isCorrectLocation
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                />
                <span
                  className={`text-xs font-bold ${
                    locationVerification.isCorrectLocation
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  AI Verified • {locationVerification.confidence}% Confidence
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 rounded-lg p-3">
            <p
              className={`text-sm font-medium ${
                locationVerification.isCorrectLocation
                  ? "text-green-900"
                  : "text-red-900"
              }`}
            >
              {locationVerification.isCorrectLocation
                ? `Delivery location matches ${locationVerification.verifiedSite}. You are ${locationVerification.distance}.`
                : "The current location doesn't match the designated delivery site. Please verify before confirming."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Delivery Details */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-5"
        >
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Delivery Details
          </h3>

          {/* Material Info */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Material
              </p>
              <h4 className="font-bold text-gray-900 text-lg">{delivery.material}</h4>
              <p className="text-sm text-gray-600">
                {delivery.quantity.toLocaleString()} {delivery.unit}
              </p>
            </div>
          </div>

          {/* Driver & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <User size={14} className="text-gray-500" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Driver
                </p>
              </div>
              <p className="font-bold text-gray-900 text-sm">{delivery.driverName}</p>
              <p className="text-xs text-gray-600">{delivery.vehicleNumber}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-gray-500" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Arrived At
                </p>
              </div>
              <p className="font-bold text-gray-900 text-sm">{delivery.arrivalTime}</p>
              <p className="text-xs text-green-600 font-bold">On Time</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verification Actions */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-5"
        >
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Verification Required
          </h3>

          <div className="space-y-3">
            {/* Photo Capture */}
            <button
              onClick={() => setShowPhotoCapture(true)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                photoTaken
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    photoTaken ? "bg-green-100" : "bg-blue-100"
                  }`}
                >
                  {photoTaken ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                  ) : (
                    <Camera className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900 text-sm">Take Photo</p>
                  <p className="text-xs text-gray-500">
                    {photoTaken ? "Photo captured" : "Required for confirmation"}
                  </p>
                </div>
                {photoTaken && (
                  <div className="text-green-600 font-bold text-xs">✓ Done</div>
                )}
              </div>
            </button>

            {/* Signature (Optional) */}
            <button
              onClick={() => setShowSignature(true)}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                signatureDone
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    signatureDone ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {signatureDone ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                  ) : (
                    <FileSignature className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900 text-sm">Add Signature</p>
                  <p className="text-xs text-gray-500">
                    {signatureDone ? "Signature recorded" : "Optional"}
                  </p>
                </div>
                {signatureDone && (
                  <div className="text-green-600 font-bold text-xs">✓ Done</div>
                )}
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Rating & Notes */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm p-5"
        >
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Rate This Delivery
          </h3>

          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setRating("good")}
              className={`flex-1 py-4 rounded-xl border-2 transition-all ${
                rating === "good"
                  ? "bg-green-50 border-green-500"
                  : "bg-gray-50 border-gray-200 hover:border-green-300"
              }`}
            >
              <ThumbsUp
                className={`w-6 h-6 mx-auto mb-2 ${
                  rating === "good" ? "text-green-600" : "text-gray-400"
                }`}
                fill={rating === "good" ? "currentColor" : "none"}
              />
              <p
                className={`text-sm font-bold ${
                  rating === "good" ? "text-green-700" : "text-gray-600"
                }`}
              >
                Good
              </p>
            </button>
            <button
              onClick={() => setRating("bad")}
              className={`flex-1 py-4 rounded-xl border-2 transition-all ${
                rating === "bad"
                  ? "bg-red-50 border-red-500"
                  : "bg-gray-50 border-gray-200 hover:border-red-300"
              }`}
            >
              <ThumbsDown
                className={`w-6 h-6 mx-auto mb-2 ${
                  rating === "bad" ? "text-red-600" : "text-gray-400"
                }`}
                fill={rating === "bad" ? "currentColor" : "none"}
              />
              <p
                className={`text-sm font-bold ${
                  rating === "bad" ? "text-red-700" : "text-gray-600"
                }`}
              >
                Issues
              </p>
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              <MessageSquare size={12} />
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any comments about the delivery..."
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
              rows={3}
            />
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 space-y-3">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={handleConfirmDelivery}
          disabled={isConfirming || !locationVerification.isCorrectLocation}
          className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
            isConfirming
              ? "bg-gray-400 cursor-not-allowed"
              : !locationVerification.isCorrectLocation
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-green-100"
          }`}
        >
          {isConfirming ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              Confirming...
            </>
          ) : (
            <>
              <CheckCircle2 size={24} strokeWidth={2.5} />
              Confirm Delivery
            </>
          )}
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={handleReportIssue}
          className="w-full py-4 bg-white border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <AlertCircle size={20} />
          Report Issue
        </motion.button>
      </div>

      {/* Photo Capture Modal */}
      <AnimatePresence>
        {showPhotoCapture && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhotoCapture(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 z-50 max-w-md mx-auto max-h-96"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-4">Take Photo</h3>
              <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-6">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPhotoCapture(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTakePhoto}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all"
                >
                  Capture
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Signature Modal */}
      <AnimatePresence>
        {showSignature && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignature(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-4 top-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 z-50 max-w-md mx-auto max-h-96"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-4">Add Signature</h3>
              <div className="bg-gray-100 rounded-2xl h-48 flex items-center justify-center mb-6">
                <FileSignature className="w-16 h-16 text-gray-400" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSignature(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignature}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 active:scale-95 transition-all"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
