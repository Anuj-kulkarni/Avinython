import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Send,
  Bot,
  User,
  ChevronDown,
  DollarSign,
  Package,
  Calendar,
  ArrowRight,
  Zap,
  Target,
  TrendingDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const FORECAST_DATA = [
  { month: "Apr", actual: 210000, forecast: 215000, optimal: 205000 },
  { month: "May", actual: 0, forecast: 245000, optimal: 235000 },
  { month: "Jun", actual: 0, forecast: 280000, optimal: 265000 },
  { month: "Jul", actual: 0, forecast: 320000, optimal: 298000 },
  { month: "Aug", actual: 0, forecast: 355000, optimal: 330000 },
];

const INVENTORY_PREDICTION = [
  { week: "Week 1", cement: 450, steel: 320, sand: 280 },
  { week: "Week 2", cement: 380, steel: 290, sand: 240 },
  { week: "Week 3", cement: 290, steel: 260, sand: 200 },
  { week: "Week 4", cement: 180, steel: 230, sand: 150 },
  { week: "Week 5", cement: 50, steel: 200, sand: 100 },
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    type: "ai" as const,
    text: "Hello! I'm your AI construction assistant. I can help you with budget forecasts, material planning, and project insights. What would you like to know?",
    timestamp: new Date().toISOString()
  }
];

const QUICK_QUESTIONS = [
  "How much cement needed next week?",
  "Predict next month's budget",
  "Which suppliers are best for steel?",
  "When should I hire more workers?"
];

type ChatMessage = {
  id: number;
  type: "ai" | "user";
  text: string;
  timestamp: string;
};

export function AIInsightsDashboard() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      text: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "ai" as const,
        text: aiResponse,
        timestamp: new Date().toISOString()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes("cement") && lowerQ.includes("week")) {
      return "Based on current project velocity and upcoming tasks, you'll need approximately 180 bags of cement next week. I recommend ordering 200 bags to maintain a safety buffer. Star Cement Industries offers the best price at ₹350/bag with 2-day delivery.";
    } else if (lowerQ.includes("budget") || lowerQ.includes("month")) {
      return "Next month's forecasted spending is ₹245,000 with a confidence of 87%. This is 8% higher than current month. Main drivers: increased steel requirements (₹85k) and labor costs (₹95k). I can help optimize this by ₹10k through bulk supplier deals.";
    } else if (lowerQ.includes("supplier") && lowerQ.includes("steel")) {
      return "Steel Corp Ltd is your best option for steel. They have a 4.9★ rating, medium pricing (₹55/kg), and 96% reliability. They've completed 243 orders with you and offer volume discounts for orders above 500kg.";
    } else if (lowerQ.includes("worker") || lowerQ.includes("hire")) {
      return "Based on project timeline analysis, you should hire 3 additional masons by April 8th and 2 electricians by April 15th. This will prevent delays in Tower B construction which is currently 12% behind schedule.";
    } else {
      return "I've analyzed your request. Based on historical data and current trends, I recommend reviewing your inventory levels and upcoming project milestones. Would you like me to provide specific recommendations for any area?";
    }
  };

  const handleOrderNow = () => {
    toast.info("Opening suppliers for urgent material order");
    navigate("/suppliers");
  };

  return (
    <div className="space-y-6 pb-[400px]">
      {/* Header */}
      <div className="sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-200 animate-pulse">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">AI Insights</h1>
            <p className="text-xs text-gray-500 font-bold">Powered by BuildAI Intelligence</p>
          </div>
        </div>
      </div>

      {/* AI Status Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-[32px] p-6 text-white shadow-2xl shadow-purple-200 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
        
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-white/90">AI Model Active</span>
            </div>
            <h3 className="text-lg font-black mb-2">Real-Time Monitoring</h3>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              Analyzing 1,247 data points across inventory, budget, and workforce to provide intelligent recommendations
            </p>
          </div>
          <div className="shrink-0 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
            <Bot size={28} />
          </div>
        </div>
      </motion.div>

      {/* AI Insight Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Active Predictions</h3>
        
        {/* Budget Prediction Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-[32px] p-6 shadow-lg relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-2xl -mr-10 -mt-10" />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <TrendingUp size={22} />
              </div>
              <div>
                <h4 className="text-sm font-black text-green-900">Budget Prediction</h4>
                <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Next Month Forecast</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tight shadow-lg">
              87% Confident
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-green-900">₹2.45L</span>
              <span className="text-sm font-bold text-green-700">projected spend</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Current</p>
                <p className="text-lg font-black text-green-900">₹2.10L</p>
              </div>
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-green-100">
                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Variance</p>
                <p className="text-lg font-black text-green-900">+16.7%</p>
              </div>
            </div>

            <div className="p-3 bg-green-100 rounded-2xl flex items-start gap-2">
              <Lightbulb size={14} className="text-green-700 mt-0.5 shrink-0" />
              <p className="text-[10px] text-green-900 font-bold leading-relaxed">
                Increase driven by steel procurement (₹85k) and additional workforce (₹60k)
              </p>
            </div>
          </div>
        </motion.div>

        {/* Material Shortage Alert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-[32px] p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl -mr-10 -mt-10" />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg animate-pulse">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h4 className="text-sm font-black text-orange-900">Material Shortage Alert</h4>
                <p className="text-[10px] text-orange-700 font-bold uppercase tracking-wider">Critical Items</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tight shadow-lg">
              Urgent
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-orange-600" />
                  <div>
                    <p className="text-xs font-black text-orange-900">Cement</p>
                    <p className="text-[10px] text-orange-700 font-bold">Site A</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-orange-900">50 bags</p>
                  <p className="text-[10px] text-orange-700 font-bold">3 days left</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-orange-600" />
                  <div>
                    <p className="text-xs font-black text-orange-900">Steel Rods</p>
                    <p className="text-[10px] text-orange-700 font-bold">Site B</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-orange-900">120 kg</p>
                  <p className="text-[10px] text-orange-700 font-bold">5 days left</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleOrderNow}
              className="w-full py-3 bg-orange-600 text-white text-xs font-black rounded-2xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Order Now <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* Cost Optimization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-[32px] p-6 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl -mr-10 -mt-10" />
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Target size={22} />
              </div>
              <div>
                <h4 className="text-sm font-black text-blue-900">Cost Optimization</h4>
                <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider">AI Suggestions</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tight shadow-lg">
              Save ₹24k
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="space-y-2">
              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingDown size={14} className="text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-blue-900">Bulk Purchase Discount</p>
                    <p className="text-[10px] text-blue-700 font-bold mt-1">Order 500+ bags from Star Cement for 12% discount</p>
                  </div>
                  <span className="text-xs font-black text-green-600">₹8.4k</span>
                </div>
              </div>

              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingDown size={14} className="text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-blue-900">Alternative Supplier</p>
                    <p className="text-[10px] text-blue-700 font-bold mt-1">Switch sand supplier to BuildMax (same quality, lower cost)</p>
                  </div>
                  <span className="text-xs font-black text-green-600">₹6.2k</span>
                </div>
              </div>

              <div className="p-3 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100">
                <div className="flex items-start gap-2 mb-2">
                  <TrendingDown size={14} className="text-blue-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-black text-blue-900">Worker Schedule Optimization</p>
                    <p className="text-[10px] text-blue-700 font-bold mt-1">Reduce overtime by 15% through better shift planning</p>
                  </div>
                  <span className="text-xs font-black text-green-600">₹9.4k</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Predictive Dashboard Link */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.location.hash = "/ai-insights/forecasting"}
          className="w-full bg-orange-600 p-6 rounded-[32px] text-white flex items-center justify-between shadow-xl shadow-orange-100 active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <TrendingUp size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-lg font-black leading-tight">AI Forecasting</h4>
              <p className="text-xs text-orange-100 font-bold">View detailed predictive analytics</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all">
            <ArrowRight size={20} />
          </div>
        </motion.button>
      </div>

      {/* Forecasted Spending Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
            <TrendingUp size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#0F172A]">Spending Forecast</h3>
            <p className="text-[10px] text-gray-500 font-bold">Next 5 months prediction</p>
          </div>
        </div>
        
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={FORECAST_DATA}>
              <defs key="defs-forecast">
                <linearGradient id="forecastGradient-unique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid key="grid-forecast" strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                key="xaxis-forecast"
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} 
                dy={10} 
              />
              <YAxis 
                key="yaxis-forecast"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} 
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip 
                key="tooltip-forecast"
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
                  fontSize: '12px',
                  fontWeight: 600
                }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, '']}
              />
              <Legend 
                key="legend-forecast"
                wrapperStyle={{ fontSize: '10px', fontWeight: 700 }}
                iconType="circle"
              />
              <Line 
                key="line-forecast"
                type="monotone" 
                dataKey="forecast" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={{ fill: '#8B5CF6', r: 5 }}
                name="AI Forecast"
                strokeDasharray="5 5"
              />
              <Line 
                key="line-optimal"
                type="monotone" 
                dataKey="optimal" 
                stroke="#10B981" 
                strokeWidth={3} 
                dot={{ fill: '#10B981', r: 5 }}
                name="Optimal Budget"
              />
              <Line 
                key="line-actual"
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ fill: '#3B82F6', r: 5 }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Prediction Chart */}
      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Package size={16} />
          </div>
          <div>
            <h3 className="text-sm font-black text-[#0F172A]">Inventory Prediction</h3>
            <p className="text-[10px] text-gray-500 font-bold">5-week material forecast</p>
          </div>
        </div>
        
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={INVENTORY_PREDICTION}>
              <defs key="defs-inventory">
                <linearGradient id="cementGradient-unique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="steelGradient-unique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="sandGradient-unique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.3}/>
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid key="grid-inventory" strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                key="xaxis-inventory"
                dataKey="week" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} 
                dy={10} 
              />
              <YAxis 
                key="yaxis-inventory"
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                key="tooltip-inventory"
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
                  fontSize: '12px',
                  fontWeight: 600
                }}
                formatter={(value: any) => [`${value} units`, '']}
              />
              <Legend 
                key="legend-inventory"
                wrapperStyle={{ fontSize: '10px', fontWeight: 700 }}
                iconType="circle"
              />
              <Area 
                key="area-cement"
                type="monotone" 
                dataKey="cement" 
                stroke="#3B82F6" 
                fill="url(#cementGradient-unique)" 
                strokeWidth={2}
                name="Cement (bags)"
              />
              <Area 
                key="area-steel"
                type="monotone" 
                dataKey="steel" 
                stroke="#94A3B8" 
                fill="url(#steelGradient-unique)" 
                strokeWidth={2}
                name="Steel (kg)"
              />
              <Area 
                key="area-sand"
                type="monotone" 
                dataKey="sand" 
                stroke="#FBBF24" 
                fill="url(#sandGradient-unique)" 
                strokeWidth={2}
                name="Sand (tons)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Chatbot - Fixed at Bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-20 left-0 right-0 max-w-md mx-auto z-30 px-5"
      >
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-[32px] shadow-2xl overflow-hidden border-4 border-white">
          {/* Chat Header */}
          <button
            onClick={() => setIsChatExpanded(!isChatExpanded)}
            className="w-full p-5 flex items-center justify-between text-white active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Bot size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black">AI Assistant</h4>
                <p className="text-[10px] text-white/80 font-bold">Ask me anything</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isChatExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          {/* Chat Messages */}
          <AnimatePresence>
            {isChatExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white"
              >
                <div className="max-h-[300px] overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'ai' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                          <Bot size={16} />
                        </div>
                      )}
                      <div className={`max-w-[75%] p-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-xs font-bold leading-relaxed">{message.text}</p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
                          <User size={16} className="text-gray-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2 justify-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div 
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                  {QUICK_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSendMessage(question)}
                      className="px-3 py-2 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-xl whitespace-nowrap hover:bg-indigo-100 active:scale-95 transition-all border border-indigo-100"
                    >
                      {question}
                    </button>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask AI anything..."
                      className="flex-1 bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim()}
                      className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-90 transition-transform"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
