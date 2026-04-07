import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  Package,
  MapPin,
  Phone,
  Mail,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Building2,
  ChevronRight,
  Plus,
  ThumbsUp,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";

interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  location: string;
  materials: string[];
  rating: number;
  totalOrders: number;
  onTimeDelivery: number;
  avgCost: "Low" | "Medium" | "High";
  lastOrder: string;
  isRecommended: boolean;
  aiScore: number;
}

export function SupplierManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "recommended" | "top-rated">("all");

  // Mock suppliers data
  const suppliers: Supplier[] = [
    {
      id: "SUP-001",
      name: "Star Cement Industries",
      contact: "Rajesh Mehta",
      phone: "+91 98765 43210",
      email: "contact@starcement.com",
      location: "Mumbai, Maharashtra",
      materials: ["Cement", "Concrete Mix"],
      rating: 4.8,
      totalOrders: 156,
      onTimeDelivery: 98,
      avgCost: "Low",
      lastOrder: "2 days ago",
      isRecommended: true,
      aiScore: 95,
    },
    {
      id: "SUP-002",
      name: "Steel Corp Limited",
      contact: "Amit Singh",
      phone: "+91 98765 43211",
      email: "amit@steelcorp.com",
      location: "Pune, Maharashtra",
      materials: ["Steel Rods", "Iron Bars", "TMT Steel"],
      rating: 4.9,
      totalOrders: 243,
      onTimeDelivery: 96,
      avgCost: "Medium",
      lastOrder: "1 week ago",
      isRecommended: true,
      aiScore: 98,
    },
    {
      id: "SUP-003",
      name: "BuildMax Suppliers",
      contact: "Priya Sharma",
      phone: "+91 98765 43212",
      email: "priya@buildmax.com",
      location: "Delhi NCR",
      materials: ["Sand", "Gravel", "Bricks"],
      rating: 4.5,
      totalOrders: 89,
      onTimeDelivery: 92,
      avgCost: "Low",
      lastOrder: "3 days ago",
      isRecommended: false,
      aiScore: 82,
    },
    {
      id: "SUP-004",
      name: "Premium Paints Co.",
      contact: "Vikram Patel",
      phone: "+91 98765 43213",
      email: "vikram@premiumpaint.com",
      location: "Bangalore, Karnataka",
      materials: ["Paint", "Primer", "Coatings"],
      rating: 4.7,
      totalOrders: 67,
      onTimeDelivery: 95,
      avgCost: "High",
      lastOrder: "5 days ago",
      isRecommended: false,
      aiScore: 88,
    },
    {
      id: "SUP-005",
      name: "Elite Hardware Solutions",
      contact: "Sunita Reddy",
      phone: "+91 98765 43214",
      email: "sunita@elitehardware.com",
      location: "Hyderabad, Telangana",
      materials: ["Tools", "Equipment", "Hardware"],
      rating: 4.6,
      totalOrders: 124,
      onTimeDelivery: 94,
      avgCost: "Medium",
      lastOrder: "1 day ago",
      isRecommended: false,
      aiScore: 85,
    },
    {
      id: "SUP-006",
      name: "QuickBuild Materials",
      contact: "Deepak Kumar",
      phone: "+91 98765 43215",
      email: "deepak@quickbuild.com",
      location: "Noida, UP",
      materials: ["Tiles", "Marble", "Granite"],
      rating: 4.4,
      totalOrders: 45,
      onTimeDelivery: 89,
      avgCost: "High",
      lastOrder: "2 weeks ago",
      isRecommended: false,
      aiScore: 78,
    },
  ];

  // Filter suppliers
  const filteredSuppliers = suppliers
    .filter((supplier) => {
      const matchesSearch =
        searchQuery === "" ||
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.materials.some((m) =>
          m.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        supplier.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterType === "all" ||
        (filterType === "recommended" && supplier.isRecommended) ||
        (filterType === "top-rated" && supplier.rating >= 4.7);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.aiScore - a.aiScore);

  const topSupplier = suppliers.reduce((prev, current) =>
    prev.aiScore > current.aiScore ? prev : current
  );

  const avgRating =
    suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length;

  const getCostColor = (cost: string) => {
    switch (cost) {
      case "Low":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-orange-100 text-orange-700";
      case "High":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
              <h1 className="text-2xl font-bold text-white">Suppliers</h1>
              <p className="text-white/90 text-sm mt-1">
                {suppliers.length} registered suppliers
              </p>
            </div>
            <button
              onClick={() => navigate("/suppliers/add")}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <Plus size={20} />
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
                <Building2 className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Total
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{suppliers.length}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Avg Rating
                </p>
              </div>
              <p className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-white/80" />
                <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
                  Top Rated
                </p>
              </div>
              <p className="text-2xl font-bold text-white">
                {suppliers.filter((s) => s.rating >= 4.7).length}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
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
                AI Recommended Supplier
              </h3>
              <p className="text-sm text-orange-700 mb-3">
                <span className="font-bold">{topSupplier.name}</span> is our top
                recommendation based on rating ({topSupplier.rating}★), delivery
                performance ({topSupplier.onTimeDelivery}%), and cost efficiency.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg">
                  <ThumbsUp className="w-4 h-4 text-[#F97316]" />
                  <span className="text-xs font-bold text-orange-900">
                    AI Score: {topSupplier.aiScore}%
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/suppliers/detail/${topSupplier.id}`)}
                  className="px-3 py-1.5 bg-[#F97316] text-white text-xs font-bold rounded-lg hover:bg-[#EA580C] transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
              placeholder="Search by name, material, or location..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterType === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("recommended")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterType === "recommended"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              AI Picks
            </button>
            <button
              onClick={() => setFilterType("top-rated")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                filterType === "top-rated"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Top Rated
            </button>
          </div>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="px-6 space-y-4">
        {filteredSuppliers.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No suppliers found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => navigate(`/suppliers/detail/${supplier.id}`)}
              className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer ${
                supplier.isRecommended ? "border-2 border-[#F97316]" : "border border-gray-200"
              }`}
            >
              {/* Supplier Header */}
              <div className="p-5">
                {/* AI Badge */}
                {supplier.isRecommended && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F97316] text-white rounded-full mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      AI Recommended
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {supplier.name}
                        </h3>
                        <p className="text-xs text-gray-500">{supplier.id}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {supplier.contact
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">{supplier.contact}</span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
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
                  </div>
                </div>

                {/* Materials Supplied */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Materials Supplied
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {supplier.materials.map((material) => (
                      <span
                        key={material}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3 h-3 text-green-600" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        On-Time
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {supplier.onTimeDelivery}%
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <IndianRupee className="w-3 h-3 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Cost
                      </p>
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${getCostColor(
                        supplier.avgCost
                      )}`}
                    >
                      {supplier.avgCost}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Last Order
                      </p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 leading-tight">
                      {supplier.lastOrder}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{supplier.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div
                className={`px-5 py-3 flex items-center justify-between ${
                  supplier.isRecommended ? "bg-orange-50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {supplier.isRecommended && (
                    <Award className="w-4 h-4 text-[#F97316]" />
                  )}
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      supplier.isRecommended ? "text-orange-700" : "text-gray-600"
                    }`}
                  >
                    {supplier.isRecommended ? "Top Supplier" : "Active"}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold ${
                    supplier.isRecommended ? "text-[#F97316]" : "text-blue-600"
                  }`}
                >
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