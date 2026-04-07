import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  AlertTriangle,
  Sparkles,
  Calendar,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface TimelineStatus {
  id: string;
  label: string;
  status: "completed" | "active" | "pending" | "delayed";
  timestamp?: string;
  description?: string;
  icon: any;
}

interface AlternateSupplier {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  price: number;
  reliability: number;
}

export function DeliveryStatus() {
  const navigate = useNavigate();
  const [showAlternates, setShowAlternates] = useState(false);

  // Mock delivery data
  const delivery = {
    id: "DEL-2024-1234",
    orderId: "ORD-2024-5678",
    material: "Cement (OPC)",
    quantity: 500,
    unit: "Bags",
    supplier: "BuildMart Suppliers",
    supplierPhone: "+91 98765 43210",
    site: "Tower A - Foundation",
    expectedDelivery: "Apr 5, 2026 - 2:45 PM",
    orderDate: "Apr 5, 2026 - 9:00 AM",
    driverName: "Rajesh Kumar",
    vehicleNumber: "DL-1A-1234",
    currentStatus: "in-transit",
    isDelayed: true,
    delayMinutes: 25,
  };

  // Timeline stages
  const timeline: TimelineStatus[] = [
    {
      id: "ordered",
      label: "Order Placed",
      status: "completed",
      timestamp: "9:00 AM",
      description: "Order confirmed by supplier",
      icon: FileText,
    },
    {
      id: "dispatched",
      label: "Dispatched",
      status: "completed",
      timestamp: "10:30 AM",
      description: "Left supplier warehouse",
      icon: Package,
    },
    {
      id: "in-transit",
      label: "In Transit",
      status: delivery.isDelayed ? "delayed" : "active",
      timestamp: "11:45 AM",
      description: delivery.isDelayed 
        ? `Delayed by ${delivery.delayMinutes} minutes due to traffic`
        : "On the way to site",
      icon: Truck,
    },
    {
      id: "delivered",
      label: "Delivered",
      status: "pending",
      timestamp: "2:45 PM (Expected)",
      description: "Awaiting delivery confirmation",
      icon: CheckCircle2,
    },
  ];

  // AI Alternate Suppliers
  const alternateSuppliers: AlternateSupplier[] = [
    {
      id: "SUP-001",
      name: "QuickBuild Materials",
      rating: 4.8,
      deliveryTime: "45 mins",
      price: 295,
      reliability: 96,
    },
    {
      id: "SUP-002",
      name: "Metro Construction Supply",
      rating: 4.6,
      deliveryTime: "1 hour",
      price: 285,
      reliability: 94,
    },
    {
      id: "SUP-003",
      name: "Prime Builders Depot",
      rating: 4.7,
      deliveryTime: "50 mins",
      price: 290,
      reliability: 95,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "active":
        return "blue";
      case "delayed":
        return "red";
      case "pending":
        return "gray";
      default:
        return "gray";
    }
  };

  const handleCallSupplier = () => {
    toast.success(`Calling ${delivery.supplier}`, {
      description: delivery.supplierPhone,
    });
  };

  const handleContactDriver = () => {
    toast.success(`Calling ${delivery.driverName}`, {
      description: "Connecting...",
    });
  };

  const handleSwitchSupplier = (supplier: AlternateSupplier) => {
    toast.success("Switching to alternate supplier", {
      description: `${supplier.name} - ETA: ${supplier.deliveryTime}`,
    });
    setShowAlternates(false);
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
              <h1 className="text-2xl font-bold text-white">Delivery Status</h1>
              <p className="text-white/90 text-sm mt-1">Track your order</p>
            </div>
            <button
              onClick={() => navigate("/delivery-tracking")}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-sm font-bold hover:bg-white/30 active:scale-90 transition-all"
            >
              Live Map
            </button>
          </div>

          {/* Order ID Card */}
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Order ID
                </p>
                <p className="text-lg font-bold text-white">{delivery.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">
                  Delivery ID
                </p>
                <p className="text-sm font-bold text-white">{delivery.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-xl p-5 shadow-lg ${
            delivery.isDelayed
              ? "bg-gradient-to-br from-red-500 to-red-600"
              : "bg-gradient-to-br from-green-500 to-emerald-600"
          }`}
        >
          <div className="flex items-center gap-3">
            {delivery.isDelayed ? (
              <AlertTriangle className="w-8 h-8 text-white" strokeWidth={2.5} />
            ) : (
              <Clock className="w-8 h-8 text-white" />
            )}
            <div className="flex-1">
              <p className="text-white font-bold text-lg">
                {delivery.isDelayed ? "Delayed Delivery" : "On Track"}
              </p>
              <p className="text-white/90 text-sm">
                {delivery.isDelayed
                  ? `${delivery.delayMinutes} minutes behind schedule`
                  : "Delivery progressing as expected"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Material Info */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Material Details
              </p>
              <h3 className="font-bold text-gray-900 text-lg">{delivery.material}</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Quantity
              </p>
              <p className="font-bold text-gray-900">
                {delivery.quantity.toLocaleString()} {delivery.unit}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Site
              </p>
              <p className="font-bold text-gray-900">{delivery.site}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Timeline */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Delivery Timeline
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {timeline.map((item, index) => {
                const color = getStatusColor(item.status);
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 top-1 w-12 h-12 rounded-xl flex items-center justify-center ${
                        color === "green"
                          ? "bg-green-100"
                          : color === "blue"
                          ? "bg-blue-100"
                          : color === "red"
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          color === "green"
                            ? "text-green-600"
                            : color === "blue"
                            ? "text-blue-600"
                            : color === "red"
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2 ${
                        color === "green"
                          ? "bg-green-100 text-green-700"
                          : color === "blue"
                          ? "bg-blue-100 text-blue-700"
                          : color === "red"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status === "completed" && (
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                      )}
                      {item.status === "active" && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      )}
                      {item.status === "delayed" && (
                        <AlertTriangle size={14} strokeWidth={2.5} />
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {item.status === "completed"
                          ? "Completed"
                          : item.status === "active"
                          ? "Active"
                          : item.status === "delayed"
                          ? "Delayed"
                          : "Pending"}
                      </span>
                    </div>

                    {/* Timeline Content */}
                    <h4 className="font-bold text-gray-900 text-base mb-1">
                      {item.label}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                    {item.timestamp && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock size={12} />
                        <span className="font-bold">{item.timestamp}</span>
                      </div>
                    )}

                    {/* Delay Warning */}
                    {item.status === "delayed" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3"
                      >
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-red-700 mb-1">
                              Delivery Delay Detected
                            </p>
                            <p className="text-xs text-red-600">
                              Heavy traffic on route. Driver is working to minimize delay.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Delay Alert & Alternate Suppliers */}
      {delivery.isDelayed && (
        <div className="px-6 mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-orange-900">AI Recommendation</h3>
                <p className="text-xs text-orange-600 font-bold">
                  Alternative suppliers available
                </p>
              </div>
            </div>

            <p className="text-sm text-orange-900 font-medium mb-4">
              This delivery is delayed by {delivery.delayMinutes} minutes. We found faster
              alternatives nearby with similar pricing and high reliability.
            </p>

            <button
              onClick={() => setShowAlternates(!showAlternates)}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              {showAlternates ? "Hide" : "View"} Alternate Suppliers
              <ChevronRight
                size={18}
                className={`transition-transform ${
                  showAlternates ? "rotate-90" : ""
                }`}
              />
            </button>

            {/* Alternate Suppliers List */}
            {showAlternates && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                {alternateSuppliers.map((supplier, index) => (
                  <motion.div
                    key={supplier.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 border-2 border-orange-100 hover:border-orange-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">
                          {supplier.name}
                        </h4>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            <div className="text-yellow-500">★</div>
                            <span className="text-sm font-bold text-gray-700">
                              {supplier.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-600 font-bold">
                              {supplier.deliveryTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={12} className="text-green-500" />
                            <span className="text-xs text-green-600 font-bold">
                              {supplier.reliability}% reliable
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 font-bold mb-1">
                          Price per bag
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{supplier.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSwitchSupplier(supplier)}
                        className="px-5 py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 active:scale-95 transition-all"
                      >
                        Switch
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* Contact Cards */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Quick Contact
          </h3>

          {/* Supplier Contact */}
          <div className="bg-white rounded-xl shadow-sm p-4">
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
                onClick={handleCallSupplier}
                className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600 active:scale-90 transition-all shadow-lg shadow-green-100"
              >
                <Phone className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Driver Contact */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Driver
                  </p>
                  <h4 className="font-bold text-gray-900">{delivery.driverName}</h4>
                  <p className="text-xs text-gray-600 font-bold">
                    {delivery.vehicleNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={handleContactDriver}
                className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 active:scale-90 transition-all shadow-lg shadow-blue-100"
              >
                <Phone className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expected Delivery */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Expected Delivery
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">
              {delivery.expectedDelivery}
            </p>
            {delivery.isDelayed && (
              <p className="text-white/90 text-sm">
                Originally scheduled for 2:20 PM
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
