import { useState } from "react";
import { Calendar, FileText, DollarSign, AlertCircle, TrendingUp, Sparkles, Download } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function DailyReportDashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for summary cards
  const summaryData = {
    materialUsed: {
      value: "₹2,45,000",
      items: 12,
      trend: "+8%",
    },
    totalPayments: {
      value: "₹1,85,000",
      count: 24,
      trend: "-5%",
    },
    pendingPayments: {
      value: "₹45,000",
      count: 8,
      trend: "0%",
    },
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Report generated successfully!");
      navigate("/reports/preview");
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0F172A]">Daily Report</h1>
        <p className="text-sm text-gray-500 font-semibold mt-1">Generate construction site report</p>
      </div>

      {/* AI Auto-Generate Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm">AI Auto-Generate</p>
            <p className="text-xs text-gray-600 font-semibold mt-1">
              Reports are automatically generated daily at 6 PM
            </p>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Calendar className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Select Date</p>
            <p className="text-xs text-gray-500 font-semibold">Choose report date</p>
          </div>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Summary Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Summary</h2>
        
        {/* Total Material Used */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Material Used</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{summaryData.materialUsed.value}</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">{summaryData.materialUsed.items} items</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-green-600" />
              <span className="text-xs font-bold text-green-600">{summaryData.materialUsed.trend}</span>
            </div>
          </div>
        </div>

        {/* Total Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Payments</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{summaryData.totalPayments.value}</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">{summaryData.totalPayments.count} transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="text-red-600 rotate-180" />
              <span className="text-xs font-bold text-red-600">{summaryData.totalPayments.trend}</span>
            </div>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-orange-600" size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Payments</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{summaryData.pendingPayments.value}</p>
                <p className="text-xs text-gray-500 font-semibold mt-1">{summaryData.pendingPayments.count} pending</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
              <span className="text-xs font-bold text-gray-600">{summaryData.pendingPayments.trend}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleGenerateReport}
        disabled={isGenerating}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-black text-base hover:from-blue-700 hover:to-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download size={20} />
            Generate Report
          </>
        )}
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/reports/preview")}
          className="py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          View Last Report
        </button>
        <button
          onClick={() => navigate("/reports/settings")}
          className="py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          Settings
        </button>
      </div>
    </div>
  );
}
