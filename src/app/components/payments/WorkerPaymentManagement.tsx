import { useState } from "react";
import { ChevronLeft, Search, CheckCircle, Clock, ChevronRight, DollarSign } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Worker {
  id: string;
  name: string;
  role: string;
  amount: number;
  status: "paid" | "pending";
  type: "weekly" | "monthly";
}

export function WorkerPaymentManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const [searchQuery, setSearchQuery] = useState("");

  const [workers, setWorkers] = useState<Worker[]>([
    { id: "1", name: "Rajesh Kumar", role: "Mason", amount: 8500, status: "pending", type: "weekly" },
    { id: "2", name: "Amit Singh", role: "Carpenter", amount: 7200, status: "paid", type: "weekly" },
    { id: "3", name: "Priya Sharma", role: "Electrician", amount: 9000, status: "pending", type: "weekly" },
    { id: "4", name: "Suresh Patel", role: "Helper", amount: 5500, status: "paid", type: "weekly" },
    { id: "5", name: "Vijay Reddy", role: "Plumber", amount: 8000, status: "pending", type: "weekly" },
    { id: "6", name: "Anita Desai", role: "Site Supervisor", amount: 45000, status: "paid", type: "monthly" },
    { id: "7", name: "Rahul Mehta", role: "Safety Officer", amount: 38000, status: "pending", type: "monthly" },
    { id: "8", name: "Kavita Joshi", role: "Store Keeper", amount: 32000, status: "paid", type: "monthly" },
  ]);

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.type === activeTab &&
      (worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPending = filteredWorkers
    .filter((w) => w.status === "pending")
    .reduce((sum, w) => sum + w.amount, 0);

  const totalPaid = filteredWorkers
    .filter((w) => w.status === "paid")
    .reduce((sum, w) => sum + w.amount, 0);

  const handleMarkAsPaid = (workerId: string) => {
    setWorkers((prev) =>
      prev.map((worker) => (worker.id === workerId ? { ...worker, status: "paid" } : worker)),
    );
    const worker = workers.find((item) => item.id === workerId);
    toast.success(`Marked ${worker?.name ?? "worker"} as paid`);
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
          <h1 className="text-xl font-bold text-gray-900">Worker Payments</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Weekly Wages
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Monthly Salaries
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-gray-700">Paid</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{totalPaid.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-red-600" />
              <p className="text-sm font-semibold text-gray-700">Pending</p>
            </div>
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
            placeholder="Search workers..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Worker List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="space-y-3">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base mb-1">
                    {worker.name}
                  </h3>
                  <p className="text-sm text-gray-600">{worker.role}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    worker.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {worker.status === "paid" ? "Paid" : "Pending"}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900">
                    ₹{worker.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  {worker.status === "pending" && (
                    <button
                      onClick={() => handleMarkAsPaid(worker.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm active:scale-95 transition-transform"
                    >
                      Mark Paid
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/payments/process/${worker.id}`)}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg active:scale-95 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-semibold">No workers found</p>
          </div>
        )}
      </div>
    </div>
  );
}
