import { 
  CreditCard, 
  FileText, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  Clock,
  PieChart,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AccountantDashboard() {
  const navigate = useNavigate();

  const handleAutoLinkInvoices = () => {
    toast.success("Opening invoice management");
    navigate("/invoices");
  };

  const handleGenerateReport = () => {
    toast.success("Opening monthly report preview");
    navigate("/reports/preview");
  };

  return (
    <div className="space-y-6">
      {/* Cash Flow Glance */}
      <div className="bg-white rounded-[12px] border border-gray-100 p-6 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Net Cash Flow</h3>
            <h2 className="text-3xl font-black text-gray-900 leading-none">₹84.5M</h2>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-black">
            <ArrowUpRight size={14} />
            <span>+12.4%</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <ArrowDownRight size={12} className="text-green-500" />
              <span>Receivables</span>
            </div>
            <p className="text-lg font-black text-gray-900">₹12.8M</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <ArrowUpRight size={12} className="text-red-500" />
              <span>Payables</span>
            </div>
            <p className="text-lg font-black text-gray-900">₹4.2M</p>
          </div>
        </div>
      </div>

      {/* AI Budget Forecasting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#F97316] to-[#EA580C] p-6 rounded-[12px] text-white shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-lg mb-1 leading-tight text-white">AI Tax Optimization</h3>
            <p className="text-xs text-orange-50 font-bold opacity-90 leading-relaxed mb-4">
              Detected ₹1.8M in tax-deductible material expenses across 42 unlinked invoices. Linking now will save ₹540k in GST.
            </p>
            <button
              onClick={handleAutoLinkInvoices}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-black shadow-sm active:scale-95 transition-all flex items-center gap-2"
            >
              Auto-link Invoices
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Pending Approvals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Pending Approvals</h3>
          <span className="text-xs font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-lg">8 Pending</span>
        </div>
        
        <div className="space-y-3">
          <ApprovalCard 
            title="Lumber Supply Invoice" 
            amount="₹4.2L" 
            vendor="Metro Woods Co." 
            time="2h ago"
            type="invoice"
          />
          <ApprovalCard 
            title="Weekly Labor Payout" 
            amount="₹12.5L" 
            vendor="Site Alpha - 84 Workers" 
            time="5h ago"
            type="payment"
          />
          <ApprovalCard 
            title="Safety Gear Purchase" 
            amount="₹85.4k" 
            vendor="Industrial Safety Plus" 
            time="Yesterday"
            type="invoice"
          />
        </div>
      </div>

      {/* Financial Health Metrics */}
      <div className="bg-white rounded-[12px] border border-gray-100 p-5 shadow-sm">
        <h3 className="font-black text-gray-900 text-sm mb-4 uppercase tracking-wider">Expense Breakdown</h3>
        <div className="space-y-4">
          <ExpenseProgress label="Raw Materials" value={65} color="bg-blue-600" amount="₹42.8M" />
          <ExpenseProgress label="Labor Costs" value={22} color="bg-purple-600" amount="₹14.2M" />
          <ExpenseProgress label="Equipment Rental" value={13} color="bg-orange-500" amount="₹8.5M" />
        </div>
        <button
          onClick={handleGenerateReport}
          className="w-full mt-6 py-3 border border-gray-100 text-xs font-black text-gray-600 rounded-xl active:scale-95 transition-all"
        >
          Generate Full Monthly Report
        </button>
      </div>
    </div>
  );
}

function ApprovalCard({ title, amount, vendor, time, type }: any) {
  return (
    <div className="bg-white border border-gray-100 p-4 rounded-[12px] shadow-sm flex items-start gap-4 active:scale-[0.98] transition-all">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${type === 'invoice' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
        {type === 'invoice' ? <FileText size={20} /> : <Wallet size={20} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-black text-gray-900 text-sm truncate">{title}</h4>
          <span className="text-xs font-black text-gray-900">{amount}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{vendor}</p>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
            <Clock size={10} />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpenseProgress({ label, value, color, amount }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest leading-none">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-900">{amount}</span>
      </div>
      <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color} transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
