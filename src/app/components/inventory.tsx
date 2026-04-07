import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight, 
  BrainCircuit, 
  Package, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell
} from "recharts";
import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const INVENTORY_DATA = [
  { id: 1, name: "Cement (OPC)", quantity: 1250, unit: "Bags", site: "Tower A", status: "Normal", trend: "+12%" },
  { id: 2, name: "Steel Rebars (12mm)", quantity: 45, unit: "Tons", site: "Site B", status: "Low", trend: "-5%" },
  { id: 3, name: "Sand (Fine)", quantity: 800, unit: "Cubic Ft", site: "Tower A", status: "Normal", trend: "+2%" },
  { id: 4, name: "Red Bricks", quantity: 15000, unit: "Units", site: "West Wing", status: "Normal", trend: "0%" },
  { id: 5, name: "Coarse Aggregate", quantity: 120, unit: "Cubic Ft", site: "Site B", status: "Low", trend: "-18%" },
  { id: 6, name: "Timber (Formwork)", quantity: 340, unit: "Units", site: "West Wing", status: "Normal", trend: "+8%" },
];

const PREDICTION_DATA = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 150 },
  { day: "Wed", usage: 180 },
  { day: "Thu", usage: 220 },
  { day: "Fri", usage: 200 },
  { day: "Sat", usage: 140 },
  { day: "Sun", usage: 90 },
];

export function Inventory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleApproveOrder = (materialName: string) => {
    toast.success(`Order approved for ${materialName}`);
  };

  const handleAddToCart = (materialName: string) => {
    toast.success(`${materialName} added to cart`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage materials across all construction sites.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toast.info("Filter panel can be connected here")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} /> Filters
          </button>
          <button
            onClick={() => navigate("/inventory/add")}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-xl text-sm font-semibold hover:bg-blue-600 shadow-md shadow-blue-100 transition-colors"
          >
            <Plus size={16} /> Add Material
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search materials..."
                  className="w-full bg-gray-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-gray-400">Showing {INVENTORY_DATA.length} materials</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Material Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Site Location</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {INVENTORY_DATA.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                            <Package size={16} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{item.quantity.toLocaleString()} {item.unit}</span>
                          <span className={`text-[10px] flex items-center gap-0.5 ${item.trend.startsWith('+') ? 'text-green-500' : item.trend.startsWith('-') ? 'text-red-500' : 'text-gray-400'}`}>
                            {item.trend.startsWith('+') ? <ArrowUpRight size={10} /> : item.trend.startsWith('-') ? <ArrowDownRight size={10} /> : null}
                            {item.trend} usage
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 px-2.5 py-1 bg-gray-100 rounded-lg">{item.site}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.status === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status === 'Normal' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toast.info(`Actions for ${item.name}`)}
                          className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Inventory Insights Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <BrainCircuit size={18} />
              </div>
              <h3 className="font-bold text-[#111827]">AI Reorder Suggestions</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-orange-800 uppercase">Priority: High</span>
                  <span className="text-[10px] bg-orange-200 text-orange-900 px-1.5 py-0.5 rounded">Predictive</span>
                </div>
                <h4 className="text-sm font-bold text-orange-900">Reorder Cement (OPC)</h4>
                <p className="text-xs text-orange-800/80 mt-1">AI predicts shortage in 3.4 days. Suggested qty: 1,500 bags.</p>
                <button
                  onClick={() => handleApproveOrder("Cement (OPC)")}
                  className="mt-3 w-full py-2 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Approve Order
                </button>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-800 uppercase">Priority: Normal</span>
                </div>
                <h4 className="text-sm font-bold text-blue-900">Steel Rebars (12mm)</h4>
                <p className="text-xs text-blue-800/80 mt-1">Usage trend increasing. Reorder by next Monday to avoid delays.</p>
                <button
                  onClick={() => handleAddToCart("Steel Rebars (12mm)")}
                  className="mt-3 w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm min-w-0">
            <h3 className="font-bold text-[#111827] mb-4">Predicted Usage Trend</h3>
            <p className="text-xs text-gray-500 mb-6 italic">Next 7 days prediction for Cement usage (Tower A)</p>
            <div className="h-[200px] w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={PREDICTION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#F9FAFB' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="usage" radius={[4, 4, 0, 0]}>
                    {PREDICTION_DATA.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={entry.usage > 180 ? '#F97316' : '#3B82F6'} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#3B82F6] opacity-80 rounded-sm"></div> Normal
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#F97316] opacity-80 rounded-sm"></div> High Usage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => navigate("/inventory/add")}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-[#3B82F6] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-transform active:scale-90 z-50"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
