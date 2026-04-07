import { 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Users, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  BrainCircuit,
  CreditCard,
  TrendingUp,
  BarChart2
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const WORKER_DATA = [
  { id: 1, name: "Robert Wilson", role: "Site Supervisor", daysWorked: 26, wage: 80, status: "Paid", avatar: "https://i.pravatar.cc/150?u=robert" },
  { id: 2, name: "Marcus Chen", role: "Masonry Specialist", daysWorked: 22, wage: 65, status: "Pending", avatar: "https://i.pravatar.cc/150?u=marcus" },
  { id: 3, name: "Sarah Jenkins", role: "Quality Inspector", daysWorked: 20, wage: 90, status: "Paid", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { id: 4, name: "David Miller", role: "Construction Worker", daysWorked: 24, wage: 45, status: "Pending", avatar: "https://i.pravatar.cc/150?u=david" },
  { id: 5, name: "Elena Gomez", role: "Electrician", daysWorked: 18, wage: 75, status: "Paid", avatar: "https://i.pravatar.cc/150?u=elena" },
];

export function WorkerPayments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Weekly");

  return (
    <div className="space-y-6 pb-24">
      {/* Header with Search */}
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Payments</h1>
          <Link 
            to="/payments/analytics" 
            className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-orange-600 shadow-sm"
          >
            <BarChart2 size={18} />
          </Link>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search workers..."
              className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white border border-gray-100 p-1 rounded-2xl shadow-sm">
            {['Weekly', 'Monthly'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Wage Shield */}
      <section className="bg-indigo-50 border border-indigo-100 rounded-[32px] p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-200 transition-all duration-700" />
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <BrainCircuit size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-indigo-900/60">AI Payment Auditor</span>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 animate-pulse shrink-0" />
            <p className="text-xs font-bold text-indigo-900 leading-relaxed">David Miller worked <span className="text-orange-600 underline underline-offset-2">overtime</span> 3 times this week. AI suggests adjusting bonus.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 animate-pulse shrink-0" />
            <p className="text-xs font-bold text-indigo-900 leading-relaxed">Abnormal payment spike detected for Tower A. Review requested before processing.</p>
          </div>
        </div>
      </section>

      {/* Worker List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Worker Roster</h3>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">42 active workers</span>
        </div>
        
        {WORKER_DATA.map((worker) => (
          <Link 
            key={worker.id}
            to={`/payments/process/${worker.id}`}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-sm border-2 border-white ring-1 ring-gray-100 group-hover:ring-blue-200 transition-all">
              <img src={worker.avatar} alt={worker.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className="text-sm font-black text-gray-900 truncate">{worker.name}</h4>
                <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                  worker.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {worker.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{worker.role}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-900">${worker.daysWorked * worker.wage}</span>
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300 ml-1 group-hover:text-blue-500 transition-colors" />
          </Link>
        ))}
      </div>

      {/* Floating Action Button (Batch Pay) */}
      <button 
        onClick={() => {
          toast.info("Opening batch payment workflow");
          navigate("/payment-workflow");
        }}
        className="fixed bottom-24 right-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-[24px] shadow-xl shadow-orange-100 flex items-center gap-3 px-6 py-4 active:scale-95 transition-transform z-50 border-4 border-white"
      >
        <CheckCircle2 size={24} strokeWidth={3} />
        <span className="text-sm font-black uppercase tracking-widest">Process Batch</span>
      </button>
    </div>
  );
}
