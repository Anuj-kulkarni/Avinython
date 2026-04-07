import { 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Smartphone, 
  Banknote,
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";

const WORKER_DATA = {
  id: 1, 
  name: "Robert Wilson", 
  role: "Site Supervisor", 
  daysWorked: 26, 
  wage: 80, 
  status: "Pending", 
  avatar: "https://i.pravatar.cc/150?u=robert" 
};

export function PaymentProcessing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAppliedSchedule, setHasAppliedSchedule] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success("Payment processed successfully!");
      navigate("/payments");
    }, 1500);
  };

  const total = WORKER_DATA.daysWorked * WORKER_DATA.wage;

  const handleApplySchedule = () => {
    setHasAppliedSchedule(true);
    toast.success("Payment scheduled for Friday morning");
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/payments" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Process Payment</h1>
      </div>

      {/* Worker Card */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-all duration-700" />
        <div className="w-16 h-16 rounded-[24px] overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-gray-100 transition-all group-hover:ring-blue-200">
          <img src={WORKER_DATA.avatar} alt={WORKER_DATA.name} className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <h4 className="text-lg font-black text-gray-900 leading-none">{WORKER_DATA.name}</h4>
          <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">{WORKER_DATA.role}</p>
          <div className="mt-3 flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 rounded-lg">
               <Calendar size={12} className="text-blue-600" />
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{WORKER_DATA.daysWorked} Days</span>
             </div>
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-50 rounded-lg">
               <Info size={12} className="text-orange-600" />
               <span className="text-[10px] font-black text-orange-600 uppercase tracking-tighter">${WORKER_DATA.wage}/day</span>
             </div>
          </div>
        </div>
      </div>

      {/* Breakdown Card */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest block px-1">Payment Breakdown</h3>
        
        <div className="space-y-4">
           <div className="flex items-center justify-between py-1 px-1">
             <span className="text-sm font-bold text-gray-500">Regular Wage (26 days)</span>
             <span className="text-sm font-black text-gray-900">${total}</span>
           </div>
           <div className="flex items-center justify-between py-1 px-1">
             <span className="text-sm font-bold text-gray-500">Overtime Bonus</span>
             <span className="text-sm font-black text-green-600">+$120.00</span>
           </div>
           <div className="flex items-center justify-between py-1 px-1">
             <span className="text-sm font-bold text-gray-500">Tax Deductions</span>
             <span className="text-sm font-black text-red-500">-$45.00</span>
           </div>
           
           <div className="h-px bg-gray-100 w-full my-4" />
           
           <div className="flex items-center justify-between py-2 px-1">
             <span className="text-base font-black text-gray-900">Total Payable</span>
             <span className="text-2xl font-black text-blue-600">${total + 120 - 45}</span>
           </div>
        </div>
      </div>

      {/* AI Fraud Detection Alert (Optional but asked for in brief) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-orange-50 border border-orange-100 p-6 rounded-[32px] flex items-start gap-4 relative overflow-hidden"
      >
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 text-orange-600">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="text-sm font-black text-orange-900 uppercase tracking-widest">Security Scan</h4>
          <p className="text-xs mt-1.5 leading-relaxed font-bold text-orange-800/80">AI verified: Worker bank details match recorded profile. Zero fraud risk detected for this transaction.</p>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Payment Method</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'Bank', icon: CreditCard, label: 'Bank' },
            { id: 'UPI', icon: Smartphone, label: 'UPI' },
            { id: 'Cash', icon: Banknote, label: 'Cash' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setMethod(item.id)}
              className={`p-4 rounded-[28px] border transition-all flex flex-col items-center gap-2 active:scale-95 shadow-sm ${
                method === item.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
              }`}
            >
              <item.icon size={22} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Schedule Suggestion */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-[32px] flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 text-blue-600">
          <Sparkles size={20} />
        </div>
        <div>
          <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest leading-none">AI Scheduler</h4>
          <p className="text-xs mt-1.5 leading-relaxed font-bold text-blue-800/80">AI suggests scheduling this payment for Friday morning to optimize liquidity.</p>
          <button
            onClick={handleApplySchedule}
            className="mt-3 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
          >
            {hasAppliedSchedule ? "Schedule Applied" : "Apply Schedule"}
          </button>
        </div>
      </div>

      {/* Confirm Button */}
      <button 
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full py-6 rounded-[32px] font-black text-base uppercase tracking-widest shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
          isProcessing ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700'
        }`}
      >
        {isProcessing ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full"
            />
            Processing...
          </>
        ) : (
          <>
            Confirm Payment <CheckCircle2 size={20} strokeWidth={3} />
          </>
        )}
      </button>
    </div>
  );
}
