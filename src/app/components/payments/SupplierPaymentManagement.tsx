import { useState } from "react";
import { ChevronLeft, Search, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  materials: string;
  amount: number;
  status: "paid" | "pending" | "discrepancy";
}

export function SupplierPaymentManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: "1", name: "BuildMart Supplies", materials: "Cement, Steel", amount: 125000, status: "pending" },
    { id: "2", name: "GreenTech Materials", materials: "Bricks, Sand", amount: 85000, status: "paid" },
    { id: "3", name: "MetalWorks Inc", materials: "Steel Rods", amount: 156000, status: "discrepancy" },
    { id: "4", name: "ConcretePro Ltd", materials: "Ready Mix Concrete", amount: 245000, status: "paid" },
    { id: "5", name: "TimberMasters", materials: "Wood Planks", amount: 67000, status: "pending" },
    { id: "6", name: "PaintWorld", materials: "Paints, Coating", amount: 42000, status: "paid" },
  ]);

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.materials.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPending = suppliers
    .filter((s) => s.status === "pending")
    .reduce((sum, s) => sum + s.amount, 0);

  const totalPaid = suppliers
    .filter((s) => s.status === "paid")
    .reduce((sum, s) => sum + s.amount, 0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "paid":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Paid",
          icon: CheckCircle,
        };
      case "pending":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          label: "Pending",
          icon: Clock,
        };
      case "discrepancy":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Discrepancy",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          label: "Unknown",
          icon: Clock,
        };
    }
  };

  const handlePayNow = (supplier: Supplier) => {
    if (supplier.status === "paid") {
      return;
    }
    setSuppliers((prev) =>
      prev.map((item) => (item.id === supplier.id ? { ...item, status: "paid" } : item)),
    );
    toast.success(`Payment recorded for ${supplier.name}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Supplier Payments</h1>
        </div>
      </div>

      {/* Summary */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Total Paid</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">Pending</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalPending.toLocaleString()}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suppliers..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Supplier List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="space-y-3">
          {filteredSuppliers.map((supplier) => {
            const statusConfig = getStatusConfig(supplier.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={supplier.id}
                className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200"
              >
                {/* Supplier Info */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {supplier.name}
                    </h3>
                    <p className="text-sm text-gray-600">{supplier.materials}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.label}
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{supplier.amount.toLocaleString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {supplier.status !== "paid" && (
                    <button
                      onClick={() => handlePayNow(supplier)}
                      className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold active:scale-95 transition-transform"
                    >
                      Pay Now
                    </button>
                  )}
                  <button
                    onClick={() => navigate("/invoices")}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <FileText className="w-5 h-5" />
                    View Invoices
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
