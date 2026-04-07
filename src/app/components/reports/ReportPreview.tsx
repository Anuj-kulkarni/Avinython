import { useState } from "react";
import { Download, Share2, Building2, Calendar, FileText, DollarSign, ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function ReportPreview() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  // Mock report data
  const reportData = {
    siteName: "Tower A Construction",
    date: new Date().toLocaleDateString("en-IN", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }),
    materials: [
      { name: "Cement (50kg bags)", quantity: "120", unit: "bags", cost: "₹48,000" },
      { name: "Steel TMT Bars", quantity: "2.5", unit: "tons", cost: "₹1,25,000" },
      { name: "Bricks", quantity: "5000", unit: "pcs", cost: "₹35,000" },
      { name: "Sand", quantity: "15", unit: "tons", cost: "₹22,500" },
      { name: "Aggregates", quantity: "10", unit: "tons", cost: "₹14,500" },
    ],
    payments: [
      { type: "Worker Wages", count: 18, amount: "₹1,35,000" },
      { type: "Supplier Payment", count: 4, amount: "₹45,000" },
      { type: "Equipment Rent", count: 2, amount: "₹5,000" },
    ],
    invoices: [
      { vendor: "Steel Suppliers Ltd", invoiceNo: "INV-2024-001", amount: "₹1,25,000", status: "Paid" },
      { vendor: "Cement Depot", invoiceNo: "INV-2024-002", amount: "₹48,000", status: "Paid" },
      { vendor: "Building Materials Co", invoiceNo: "INV-2024-003", amount: "₹72,000", status: "Pending" },
    ],
    summary: {
      totalMaterial: "₹2,45,000",
      totalPayments: "₹1,85,000",
      pendingAmount: "₹72,000",
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      toast.success("Report downloaded successfully!");
    }, 1500);
  };

  const handleShare = () => {
    navigate("/reports/share");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/reports")}
          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-90 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#0F172A]">Report Preview</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Daily construction report</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download size={18} />
              Download PDF
            </>
          )}
        </button>
        <button
          onClick={handleShare}
          className="py-3.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* PDF Preview Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* PDF Document Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <p className="font-black text-lg">Daily Construction Report</p>
              <p className="text-xs text-blue-100 font-semibold">BuildAI Construction Management</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-blue-100 text-xs font-semibold mb-1">Site Name</p>
              <p className="font-bold">{reportData.siteName}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs font-semibold mb-1">Date</p>
              <p className="font-bold">{reportData.date}</p>
            </div>
          </div>
        </div>

        {/* PDF Document Content - Scrollable */}
        <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto bg-gray-50">
          {/* Materials Used Section */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={16} />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Materials Used</h3>
            </div>
            <div className="space-y-2">
              {reportData.materials.map((material, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{material.name}</p>
                    <p className="text-xs text-gray-500 font-semibold">
                      {material.quantity} {material.unit}
                    </p>
                  </div>
                  <p className="font-black text-gray-900">{material.cost}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                <p className="text-sm font-black text-gray-900">Total Material Cost</p>
                <p className="text-lg font-black text-blue-600">{reportData.summary.totalMaterial}</p>
              </div>
            </div>
          </div>

          {/* Payments Summary Section */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600" size={16} />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Payments Summary</h3>
            </div>
            <div className="space-y-2">
              {reportData.payments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{payment.type}</p>
                    <p className="text-xs text-gray-500 font-semibold">
                      {payment.count} transactions
                    </p>
                  </div>
                  <p className="font-black text-gray-900">{payment.amount}</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
                <p className="text-sm font-black text-gray-900">Total Payments</p>
                <p className="text-lg font-black text-green-600">{reportData.summary.totalPayments}</p>
              </div>
            </div>
          </div>

          {/* Invoices Section */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <FileText className="text-orange-600" size={16} />
              </div>
              <h3 className="font-black text-gray-900 text-sm">Invoices</h3>
            </div>
            <div className="space-y-2">
              {reportData.invoices.map((invoice, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{invoice.vendor}</p>
                      <p className="text-xs text-gray-500 font-semibold">{invoice.invoiceNo}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold ${
                        invoice.status === "Paid"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  <p className="font-black text-gray-900">{invoice.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-4">
            <h3 className="font-black text-gray-900 text-sm mb-3">Report Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Total Material Cost</p>
                <p className="font-black text-gray-900">{reportData.summary.totalMaterial}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Total Payments</p>
                <p className="font-black text-gray-900">{reportData.summary.totalPayments}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                <p className="text-sm font-bold text-orange-600">Pending Amount</p>
                <p className="font-black text-orange-600">{reportData.summary.pendingAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-semibold text-center">
            Generated by BuildAI on {new Date().toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
}
