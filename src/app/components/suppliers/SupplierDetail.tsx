import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  Package,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Clock,
  IndianRupee,
  Building2,
  Calendar,
  Truck,
  AlertCircle,
  XCircle,
  BarChart3,
  Target,
  Award,
  MessageSquare,
  Download,
  Share2,
  Edit,
  Activity,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Delivery {
  id: string;
  orderId: string;
  date: string;
  material: string;
  quantity: string;
  status: "delivered" | "delayed" | "cancelled";
  deliveryTime: string;
  expectedTime: string;
  amount: number;
}

interface Payment {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  description: string;
}

const INITIAL_PAYMENTS: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-2456",
    date: "2 days ago",
    amount: 125000,
    status: "paid",
    dueDate: "Apr 12, 2026",
    description: "Portland Cement - 53 Grade (500 bags)",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-2398",
    date: "1 week ago",
    amount: 89000,
    status: "paid",
    dueDate: "Apr 5, 2026",
    description: "Concrete Mix M20 (15 cubic meters)",
  },
  {
    id: "PAY-003",
    invoiceId: "INV-2287",
    date: "2 weeks ago",
    amount: 156000,
    status: "pending",
    dueDate: "Apr 15, 2026",
    description: "Ready Mix Concrete (20 cubic meters)",
  },
  {
    id: "PAY-004",
    invoiceId: "INV-2198",
    date: "3 weeks ago",
    amount: 67500,
    status: "paid",
    dueDate: "Mar 28, 2026",
    description: "Portland Cement - 43 Grade (300 bags)",
  },
  {
    id: "PAY-005",
    invoiceId: "INV-2156",
    date: "1 month ago",
    amount: 64000,
    status: "overdue",
    dueDate: "Mar 20, 2026",
    description: "Concrete Mix M25 (10 cubic meters)",
  },
];

export function SupplierDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"deliveries" | "payments">("deliveries");
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);

  // Mock supplier data (in real app, fetch based on id)
  const supplier = {
    id: id || "SUP-001",
    name: "Star Cement Industries",
    contact: "Rajesh Mehta",
    phone: "+91 98765 43210",
    email: "contact@starcement.com",
    location: "Mumbai, Maharashtra",
    address: "Plot No. 45, MIDC Industrial Area, Andheri East, Mumbai - 400093",
    materials: ["Cement", "Concrete Mix", "Ready Mix Concrete"],
    rating: 4.8,
    totalOrders: 156,
    onTimeDelivery: 98,
    avgCost: "Low" as const,
    joinedDate: "Jan 2023",
    lastOrder: "2 days ago",
    isRecommended: true,
    aiScore: 95,
  };

  // Mock deliveries
  const deliveries: Delivery[] = [
    {
      id: "DEL-001",
      orderId: "ORD-2456",
      date: "2 days ago",
      material: "Portland Cement - 53 Grade",
      quantity: "500 bags",
      status: "delivered",
      deliveryTime: "10:30 AM",
      expectedTime: "11:00 AM",
      amount: 125000,
    },
    {
      id: "DEL-002",
      orderId: "ORD-2398",
      date: "1 week ago",
      material: "Concrete Mix M20",
      quantity: "15 cubic meters",
      status: "delivered",
      deliveryTime: "2:15 PM",
      expectedTime: "2:00 PM",
      amount: 89000,
    },
    {
      id: "DEL-003",
      orderId: "ORD-2287",
      date: "2 weeks ago",
      material: "Ready Mix Concrete",
      quantity: "20 cubic meters",
      status: "delivered",
      deliveryTime: "9:00 AM",
      expectedTime: "9:00 AM",
      amount: 156000,
    },
    {
      id: "DEL-004",
      orderId: "ORD-2198",
      date: "3 weeks ago",
      material: "Portland Cement - 43 Grade",
      quantity: "300 bags",
      status: "delivered",
      deliveryTime: "3:45 PM",
      expectedTime: "3:30 PM",
      amount: 67500,
    },
    {
      id: "DEL-005",
      orderId: "ORD-2156",
      date: "1 month ago",
      material: "Concrete Mix M25",
      quantity: "10 cubic meters",
      status: "delayed",
      deliveryTime: "5:30 PM",
      expectedTime: "2:00 PM",
      amount: 64000,
    },
  ];


  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "delayed":
        return "bg-orange-100 text-orange-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "delayed":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments
    .filter((p) => p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const onTimeDeliveries = deliveries.filter((d) => d.status === "delivered").length;
  const totalDeliveries = deliveries.length;
  const costEfficiency = 87; // Mock AI-calculated cost efficiency

  const copyText = async (value: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const handleEditSupplier = () => {
    navigate("/suppliers");
    toast.info("Open supplier list to edit supplier details");
  };

  const handleContactSupplier = async () => {
    try {
      await copyText(`${supplier.contact} - ${supplier.phone}`);
      toast.success("Contact details copied");
    } catch {
      toast.error("Unable to copy contact details");
    }
  };

  const handleShareSupplier = async () => {
    const shareText = `${supplier.name}\nContact: ${supplier.contact} (${supplier.phone})\nMaterials: ${supplier.materials.join(", ")}\nRating: ${supplier.rating}`;
    try {
      await copyText(shareText);
      toast.success("Supplier summary copied");
    } catch {
      toast.error("Unable to copy supplier summary");
    }
  };

  const handlePay = (paymentId: string) => {
    const target = payments.find((payment) => payment.id === paymentId);
    if (!target || target.status === "paid") {
      return;
    }
    setPayments((prev) =>
      prev.map((payment) => (payment.id === paymentId ? { ...payment, status: "paid" } : payment)),
    );
    toast.success(`Payment completed for ${target.invoiceId}`);
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
              <h1 className="text-2xl font-bold text-white">Supplier Details</h1>
              <p className="text-white/90 text-sm mt-1">{supplier.id}</p>
            </div>
            <button
              onClick={handleEditSupplier}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <Edit size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Supplier Info Card */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`bg-white rounded-xl shadow-lg overflow-hidden ${
            supplier.isRecommended ? "border-2 border-[#F97316]" : ""
          }`}
        >
          {/* AI Badge */}
          {supplier.isRecommended && (
            <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] px-5 py-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Recommended Supplier
                </span>
              </div>
            </div>
          )}

          <div className="p-5">
            {/* Main Info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {supplier.name}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(supplier.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {supplier.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({supplier.totalOrders} orders)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {supplier.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                    Contact Person
                  </p>
                  <p className="text-sm font-bold text-gray-900">{supplier.contact}</p>
                  <p className="text-sm text-gray-600">{supplier.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-gray-900">{supplier.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                    Address
                  </p>
                  <p className="text-sm text-gray-900">{supplier.address}</p>
                </div>
              </div>
            </div>

            {/* Materials Supplied */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Materials Supplied
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {supplier.materials.map((material) => (
                  <span
                    key={material}
                    className="px-3 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg border border-blue-100"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Performance Analysis */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-5 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-orange-900">AI Performance Analysis</h3>
              <p className="text-xs text-orange-700 mt-0.5">
                Real-time insights powered by AI
              </p>
            </div>
            <div className="px-3 py-1.5 bg-white rounded-lg">
              <span className="text-sm font-bold text-orange-900">
                Score: {supplier.aiScore}%
              </span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {/* On-Time Delivery */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    On-Time Delivery
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {supplier.onTimeDelivery}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {onTimeDeliveries}/{totalDeliveries} deliveries
                  </p>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold">+2.5%</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${supplier.onTimeDelivery}%` }}
                />
              </div>
            </div>

            {/* Cost Efficiency */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Cost Efficiency
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{costEfficiency}%</p>
                  <p className="text-xs text-gray-500 mt-1">vs market avg</p>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold">+5.2%</span>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${costEfficiency}%` }}
                />
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="mt-4 bg-white rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-2">
                  Key Insights
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      98% on-time delivery rate, exceeding industry average by 15%
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      Consistent pricing 12% below market average for cement materials
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-[#F97316] rounded-full mt-1.5 flex-shrink-0" />
                    <span>
                      Strong reliability with no quality complaints in last 6 months
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Paid
              </p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{(totalPaid / 1000).toFixed(0)}K
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Pending
              </p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{(totalPending / 1000).toFixed(0)}K
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Overdue
              </p>
            </div>
            <p className="text-xl font-bold text-gray-900">
              ₹{(totalOverdue / 1000).toFixed(0)}K
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 mb-4">
        <div className="bg-white rounded-xl shadow-sm p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("deliveries")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "deliveries"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Truck size={18} />
              <span>Delivery History</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === "payments"
                ? "bg-blue-500 text-white"
                : "bg-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <IndianRupee size={18} />
              <span>Payment Status</span>
            </div>
          </button>
        </div>
      </div>

      {/* Delivery History Tab */}
      {activeTab === "deliveries" && (
        <div className="px-6 space-y-3">
          {deliveries.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-xl shadow-sm p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-900">
                      {delivery.orderId}
                    </span>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${getDeliveryStatusColor(
                        delivery.status
                      )}`}
                    >
                      {getDeliveryStatusIcon(delivery.status)}
                      <span>{delivery.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{delivery.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(delivery.amount / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold text-gray-900 mb-1">{delivery.material}</p>
                <p className="text-sm text-gray-600">Quantity: {delivery.quantity}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Delivered: {delivery.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Target className="w-3 h-3" />
                  <span>Expected: {delivery.expectedTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Payment Status Tab */}
      {activeTab === "payments" && (
        <div className="px-6 space-y-3">
          {payments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-xl shadow-sm p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-900">
                      {payment.invoiceId}
                    </span>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${getPaymentStatusColor(
                        payment.status
                      )}`}
                    >
                      <span>{payment.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{(payment.amount / 1000).toFixed(1)}K
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700">{payment.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Due: {payment.dueDate}</span>
                </div>
                {payment.status === "pending" && (
                  <button
                    onClick={() => handlePay(payment.id)}
                    className="px-4 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 active:scale-95 transition-all"
                  >
                    Pay Now
                  </button>
                )}
                {payment.status === "overdue" && (
                  <button
                    onClick={() => handlePay(payment.id)}
                    className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 active:scale-95 transition-all"
                  >
                    Pay Overdue
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 mt-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleContactSupplier}
            className="flex items-center justify-center gap-2 py-4 bg-white rounded-xl shadow-sm text-blue-600 font-bold hover:shadow-md active:scale-95 transition-all"
          >
            <MessageSquare size={20} />
            <span>Contact</span>
          </button>
          <button
            onClick={handleShareSupplier}
            className="flex items-center justify-center gap-2 py-4 bg-white rounded-xl shadow-sm text-gray-700 font-bold hover:shadow-md active:scale-95 transition-all"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
