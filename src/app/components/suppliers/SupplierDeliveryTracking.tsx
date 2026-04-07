import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Truck,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  Building2,
  Phone,
  Navigation,
  Timer,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";

interface Delivery {
  id: string;
  orderId: string;
  supplier: {
    id: string;
    name: string;
    contact: string;
    phone: string;
  };
  material: string;
  quantity: string;
  status: "pending" | "in-transit" | "delivered" | "delayed";
  orderDate: string;
  expectedDate: string;
  eta: string;
  currentLocation: string;
  progress: number;
  aiDelayPrediction?: {
    likelihood: number;
    estimatedDelay: string;
    reason: string;
  };
}

export function SupplierDeliveryTracking() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-transit" | "delivered">("all");

  // Mock deliveries data
  const deliveries: Delivery[] = [
    {
      id: "DEL-2456",
      orderId: "ORD-2456",
      supplier: {
        id: "SUP-001",
        name: "Star Cement Industries",
        contact: "Rajesh Mehta",
        phone: "+91 98765 43210",
      },
      material: "Portland Cement - 53 Grade",
      quantity: "500 bags",
      status: "in-transit",
      orderDate: "Apr 3, 2026",
      expectedDate: "Apr 6, 2026",
      eta: "Today, 2:30 PM",
      currentLocation: "15 km from site",
      progress: 75,
      aiDelayPrediction: {
        likelihood: 15,
        estimatedDelay: "30 mins",
        reason: "Light traffic on delivery route",
      },
    },
    {
      id: "DEL-2457",
      orderId: "ORD-2457",
      supplier: {
        id: "SUP-002",
        name: "Steel Corp Limited",
        contact: "Amit Singh",
        phone: "+91 98765 43211",
      },
      material: "TMT Steel Rods - 12mm",
      quantity: "2000 kg",
      status: "pending",
      orderDate: "Apr 4, 2026",
      expectedDate: "Apr 7, 2026",
      eta: "Tomorrow, 10:00 AM",
      currentLocation: "At supplier warehouse",
      progress: 0,
      aiDelayPrediction: {
        likelihood: 65,
        estimatedDelay: "2-3 hours",
        reason: "High demand and loading queue at warehouse",
      },
    },
    {
      id: "DEL-2458",
      orderId: "ORD-2458",
      supplier: {
        id: "SUP-003",
        name: "BuildMax Suppliers",
        contact: "Priya Sharma",
        phone: "+91 98765 43212",
      },
      material: "River Sand",
      quantity: "10 ton",
      status: "in-transit",
      orderDate: "Apr 5, 2026",
      expectedDate: "Apr 5, 2026",
      eta: "Today, 4:00 PM",
      currentLocation: "8 km from site",
      progress: 85,
    },
    {
      id: "DEL-2454",
      orderId: "ORD-2454",
      supplier: {
        id: "SUP-001",
        name: "Star Cement Industries",
        contact: "Rajesh Mehta",
        phone: "+91 98765 43210",
      },
      material: "Concrete Mix M20",
      quantity: "15 cubic meters",
      status: "delivered",
      orderDate: "Apr 1, 2026",
      expectedDate: "Apr 3, 2026",
      eta: "Delivered on time",
      currentLocation: "Site received",
      progress: 100,
    },
    {
      id: "DEL-2455",
      orderId: "ORD-2455",
      supplier: {
        id: "SUP-004",
        name: "Premium Paints Co.",
        contact: "Vikram Patel",
        phone: "+91 98765 43213",
      },
      material: "Exterior Emulsion Paint",
      quantity: "200 liters",
      status: "delayed",
      orderDate: "Apr 2, 2026",
      expectedDate: "Apr 4, 2026",
      eta: "Today, 6:00 PM (Delayed)",
      currentLocation: "Stuck in traffic - 25 km away",
      progress: 60,
      aiDelayPrediction: {
        likelihood: 85,
        estimatedDelay: "1-2 hours",
        reason: "Heavy traffic due to road construction",
      },
    },
    {
      id: "DEL-2453",
      orderId: "ORD-2453",
      supplier: {
        id: "SUP-005",
        name: "Elite Hardware Solutions",
        contact: "Sunita Reddy",
        phone: "+91 98765 43214",
      },
      material: "Power Tools Set",
      quantity: "5 units",
      status: "delivered",
      orderDate: "Mar 30, 2026",
      expectedDate: "Apr 2, 2026",
      eta: "Delivered on time",
      currentLocation: "Site received",
      progress: 100,
    },
  ];

  // Filter deliveries
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      searchQuery === "" ||
      delivery.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || delivery.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const activeDeliveries = deliveries.filter(
    (d) => d.status === "pending" || d.status === "in-transit" || d.status === "delayed"
  );
  const deliveredCount = deliveries.filter((d) => d.status === "delivered").length;
  const delayedCount = deliveries.filter((d) => d.status === "delayed").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "in-transit":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "delayed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "in-transit":
        return <Truck className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "delayed":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getDelayColor = (likelihood: number) => {
    if (likelihood >= 70) return "text-red-600";
    if (likelihood >= 40) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
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
              <h1 className="text-2xl font-bold text-white">Delivery Tracking</h1>
              <p className="text-white/90 text-sm mt-1">
                {activeDeliveries.length} active deliveries
              </p>
            </div>
            <button
              onClick={() => navigate("/suppliers")}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <Building2 size={20} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Active
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{activeDeliveries.length}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Delivered
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{deliveredCount}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Delayed
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{delayedCount}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      {activeDeliveries.some((d) => d.aiDelayPrediction && d.aiDelayPrediction.likelihood > 50) && (
        <div className="px-6 -mt-4 mb-6 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900 mb-1">
                  AI Delay Alert
                </h3>
                <p className="text-sm text-orange-700 mb-2">
                  {activeDeliveries.filter((d) => d.aiDelayPrediction && d.aiDelayPrediction.likelihood > 50).length} delivery(ies) 
                  may experience delays. Check predictions below for details.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg">
                    <Timer className="w-4 h-4 text-[#F97316]" />
                    <span className="text-xs font-bold text-orange-900">
                      Real-time Tracking Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by supplier, material, or order ID..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterStatus("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("in-transit")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "in-transit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              In Transit
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "pending"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("delivered")}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filterStatus === "delivered"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Delivered
            </button>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="px-6 space-y-4">
        {filteredDeliveries.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No deliveries found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredDeliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => navigate(`/delivery-status?id=${delivery.id}`)}
              className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                delivery.aiDelayPrediction && delivery.aiDelayPrediction.likelihood > 50
                  ? "border-2 border-[#F97316]"
                  : "border border-gray-200"
              }`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-gray-900">
                        {delivery.orderId}
                      </span>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getStatusColor(
                          delivery.status
                        )}`}
                      >
                        {getStatusIcon(delivery.status)}
                        <span>{delivery.status.replace("-", " ")}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">ID: {delivery.id}</p>
                  </div>
                  {delivery.status === "in-transit" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/delivery-tracking?id=${delivery.id}`);
                      }}
                      className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-100 active:scale-90 transition-all"
                    >
                      <Navigation size={18} />
                    </button>
                  )}
                </div>

                {/* Supplier Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">
                      {delivery.supplier.name}
                    </p>
                    <p className="text-xs text-gray-500">{delivery.supplier.contact}</p>
                  </div>
                  <a
                    href={`tel:${delivery.supplier.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
                  >
                    <Phone size={18} />
                  </a>
                </div>

                {/* Material Details */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Material Details
                    </span>
                  </div>
                  <p className="font-bold text-gray-900 mb-1">{delivery.material}</p>
                  <p className="text-sm text-gray-600">Quantity: {delivery.quantity}</p>
                </div>

                {/* Progress Bar (for in-transit/delayed) */}
                {(delivery.status === "in-transit" || delivery.status === "delayed") && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Progress
                      </span>
                      <span className="text-xs font-bold text-gray-900">
                        {delivery.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          delivery.status === "delayed"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${delivery.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Location and ETA */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Location
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {delivery.currentLocation}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        ETA
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">
                      {delivery.eta}
                    </p>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>Ordered: {delivery.orderDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>Expected: {delivery.expectedDate}</span>
                  </div>
                </div>

                {/* AI Delay Prediction */}
                {delivery.aiDelayPrediction && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-[#F97316]">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-orange-900">
                            AI Delay Prediction
                          </h4>
                          <span
                            className={`text-xs font-bold ${getDelayColor(
                              delivery.aiDelayPrediction.likelihood
                            )}`}
                          >
                            {delivery.aiDelayPrediction.likelihood}% likely
                          </span>
                        </div>
                        <p className="text-xs text-orange-700 mb-2">
                          {delivery.aiDelayPrediction.reason}
                        </p>
                        {delivery.aiDelayPrediction.likelihood > 50 && (
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-[#F97316]" />
                            <span className="text-xs font-bold text-orange-900">
                              Estimated delay: {delivery.aiDelayPrediction.estimatedDelay}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div
                className={`px-5 py-3 flex items-center justify-between ${
                  delivery.aiDelayPrediction && delivery.aiDelayPrediction.likelihood > 50
                    ? "bg-orange-50"
                    : delivery.status === "delivered"
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {delivery.status === "in-transit" && (
                    <>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                        En Route
                      </span>
                    </>
                  )}
                  {delivery.status === "pending" && (
                    <>
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">
                        Awaiting Dispatch
                      </span>
                    </>
                  )}
                  {delivery.status === "delivered" && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                        Completed
                      </span>
                    </>
                  )}
                  {delivery.status === "delayed" && (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                        Running Late
                      </span>
                    </>
                  )}
                </div>
                <span className="text-xs font-bold text-blue-600">
                  View Details →
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
