import { MapPin, Truck, AlertCircle, Clock, User, Package } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function DeliveryTrackingMap() {
  const navigate = useNavigate();
  const delivery = {
    supplier: "Kumar Steel Industries",
    material: "TMT Steel Bars (500 units)",
    eta: "15 minutes",
    currentLocation: "NH-8, Near Ambience Mall",
    driver: "Rajesh Kumar",
    phone: "+91 98765 43210",
    delayed: false,
    delayReason: null,
  };

  const handleCallDriver = () => {
    window.location.href = `tel:${delivery.phone.replace(/\s+/g, "")}`;
  };

  const handleShareLocation = async () => {
    const shareText = `${delivery.material} from ${delivery.supplier} is arriving in ${delivery.eta}. Current location: ${delivery.currentLocation}`;
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Location details copied");
    } catch {
      toast.error("Unable to copy location details");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Map View */}
      <div className="flex-1 relative bg-gradient-to-br from-blue-100 to-green-100">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            {/* Road */}
            <path
              d="M 50 550 Q 100 450, 150 350 T 250 150 T 350 50"
              stroke="#94a3b8"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />
            {/* Road Dashes */}
            <path
              d="M 50 550 Q 100 450, 150 350 T 250 150 T 350 50"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="15,15"
              strokeLinecap="round"
            />
          </svg>

          {/* Truck Location Marker */}
          <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Pulsing Circle */}
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" style={{ width: "60px", height: "60px" }}></div>
              {/* Marker */}
              <div className="relative bg-orange-600 rounded-full p-4 shadow-lg border-4 border-white">
                <Truck className="text-white" size={28} />
              </div>
              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                Truck Location
              </div>
            </div>
          </div>

          {/* Site Location Marker */}
          <div className="absolute top-[15%] right-[15%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Marker */}
              <div className="relative bg-blue-600 rounded-full p-4 shadow-lg border-4 border-white">
                <MapPin className="text-white" size={28} />
              </div>
              {/* Label */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                Your Site
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate(-1)}
            className="bg-white rounded-xl p-3 shadow-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* AI Alert - Delay Prediction */}
        {delivery.delayed && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 max-w-sm">
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 shadow-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-bold text-red-900">Delay Predicted</p>
                  <p className="text-xs text-red-700 mt-0.5">Heavy traffic on route</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Panel */}
      <div className="bg-white rounded-t-3xl shadow-2xl border-t-4 border-blue-600 p-6">
        {/* ETA */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-full p-3">
              <Clock className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimated Arrival</p>
              <p className="font-bold text-gray-900 text-xl">{delivery.eta}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Current Location</p>
            <p className="text-sm font-semibold text-gray-700">{delivery.currentLocation}</p>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="space-y-4">
          {/* Supplier */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-blue-100 rounded-lg p-2">
              <Package className="text-blue-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-0.5">Supplier</p>
              <p className="font-bold text-gray-900">{delivery.supplier}</p>
            </div>
          </div>

          {/* Material */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="bg-orange-100 rounded-lg p-2">
              <Package className="text-orange-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-0.5">Material</p>
              <p className="font-bold text-gray-900">{delivery.material}</p>
            </div>
          </div>

          {/* Driver */}
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-lg p-2">
              <User className="text-purple-600" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-0.5">Driver</p>
              <p className="font-bold text-gray-900">{delivery.driver}</p>
              <p className="text-sm text-gray-600">{delivery.phone}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleCallDriver}
            className="py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
          >
            Call Driver
          </button>
          <button
            onClick={handleShareLocation}
            className="py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Share Location
          </button>
        </div>
      </div>
    </div>
  );
}
