import { 
  ChevronLeft, 
  ChevronDown, 
  Calendar, 
  Truck, 
  Warehouse, 
  Sparkles,
  Info
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { createInventoryRecord } from "../../data/repository";

export function AddMaterial() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "Bags",
    site: "",
    supplier: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = Number(formData.quantity);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      toast.error("Enter a valid quantity");
      return;
    }

    const status = quantity < 100 ? "Low" : "Normal";

    await createInventoryRecord({
      name: formData.name,
      quantity,
      unit: formData.unit,
      site: formData.site,
      supplier: formData.supplier,
      date: formData.date,
      status,
      trend: "0%",
    });

    toast.success("Material added successfully!");
    setTimeout(() => navigate("/inventory"), 600);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/inventory" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Add Material</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Card */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-100 transition-all duration-700" />
          
          <div className="space-y-6 relative z-10">
            {/* Material Name Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Material Name</label>
              <div className="relative group">
                <Warehouse className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <select 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-10 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                >
                  <option value="">Select a material</option>
                  <option value="Cement OPC">Cement (OPC)</option>
                  <option value="Steel Rebars">Steel Rebars (12mm)</option>
                  <option value="Fine Sand">Fine Sand</option>
                  <option value="Red Bricks">Red Bricks</option>
                  <option value="Coarse Aggregate">Coarse Aggregate</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Quantity & Unit Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Quantity</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Unit</label>
                <div className="relative group">
                  <select 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-4 pr-10 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer"
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    required
                  >
                    <option value="Bags">Bags</option>
                    <option value="Tons">Tons</option>
                    <option value="Cubic Ft">Cubic Ft</option>
                    <option value="Units">Units</option>
                    <option value="Liters">Liters</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Site Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Site Location</label>
              <div className="relative group">
                <select 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-4 pr-10 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer"
                  value={formData.site}
                  onChange={(e) => setFormData({...formData, site: e.target.value})}
                  required
                >
                  <option value="">Select a site</option>
                  <option value="Tower A">Tower A</option>
                  <option value="Site B">Site B</option>
                  <option value="West Wing">West Wing</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Supplier Name (With AI Suggestion) */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Supplier Name</label>
              <div className="relative group">
                <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Enter supplier"
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-12 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, supplier: "Star Cement Industries"})}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600 bg-orange-50 p-2 rounded-xl active:scale-90 transition-transform"
                  title="AI Suggestion"
                >
                  <Sparkles size={16} strokeWidth={3} />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-1 flex items-center gap-1">
                <Info size={10} className="text-blue-500" /> AI suggests based on past orders
              </p>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">Delivery Date</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="date" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm cursor-pointer"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Section (Auto-calculate) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 p-6 rounded-[32px] text-white shadow-xl shadow-blue-100 flex items-start gap-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-md">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white/90">Optimal Order Size</h4>
            <p className="text-xs mt-1.5 leading-relaxed font-bold">AI calculated that <span className="text-orange-300">500 units</span> is the best balance between storage cost and project demand for the next 14 days.</p>
            <button 
              type="button"
              onClick={() => setFormData({...formData, quantity: "500"})}
              className="mt-3 text-[10px] font-black uppercase tracking-widest py-1.5 px-3 bg-white text-blue-600 rounded-lg active:scale-95 transition-transform"
            >
              Apply AI Quantity
            </button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-[2] py-5 bg-blue-600 text-white text-sm font-black rounded-3xl shadow-2xl shadow-blue-100 active:scale-95 transition-transform"
          >
            Save Material
          </button>
        </div>
      </form>
    </div>
  );
}
