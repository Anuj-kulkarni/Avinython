import { 
  ChevronLeft, 
  Building2, 
  User, 
  Phone,
  Mail,
  MapPin,
  Package,
  DollarSign,
  Star,
  Save,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { createSupplierRecord } from "../../data/repository";

const MATERIAL_OPTIONS = [
  "Cement", "Concrete", "Steel", "Iron Rods", "Sand", "Gravel", 
  "Bricks", "Paint", "Coatings", "Equipment", "Tools", "Tiles", 
  "Wood", "Glass", "Plumbing", "Electrical"
];

const COST_LEVELS = ["Low", "Medium", "High"];

export function AddSupplier() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    materials: [] as string[],
    costLevel: "Medium",
    rating: 4.0
  });

  const handleMaterialToggle = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.materials.length === 0) {
      toast.error("Please select at least one material");
      return;
    }
    await createSupplierRecord({
      name: formData.companyName.trim(),
      contact: formData.contactPerson.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      location: `${formData.city.trim()}, ${formData.state.trim()}`,
      materials: formData.materials,
      rating: formData.rating,
      orders: 0,
      avgCost: formData.costLevel as "Low" | "Medium" | "High",
      reliability: 90,
      isRecommended: false,
    });
    toast.success("Supplier added successfully!", {
      description: `${formData.companyName} has been added to your suppliers`,
    });
    setTimeout(() => navigate("/suppliers"), 600);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/suppliers" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Add Supplier</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">Company Information</h3>
              <p className="text-[10px] text-gray-500 font-bold">Basic supplier details</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Company Name *
              </label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Contact Person *
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="Primary contact name"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Phone Number *
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500" size={18} />
                <input 
                  type="tel" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Email Address *
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Address *
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-4 text-gray-400 transition-colors group-focus-within:text-indigo-500" size={18} />
                <textarea 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm resize-none"
                  placeholder="Street address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  City *
                </label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  State *
                </label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-300 transition-all shadow-sm"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Materials & Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Package size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">Materials & Pricing</h3>
              <p className="text-[10px] text-gray-500 font-bold">Products and cost information</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Materials Supplied */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Materials Supplied *
              </label>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_OPTIONS.map((material) => (
                  <button
                    key={material}
                    type="button"
                    onClick={() => handleMaterialToggle(material)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                      formData.materials.includes(material)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {formData.materials.includes(material) && <span className="mr-1">✓</span>}
                    {material}
                  </button>
                ))}
              </div>
              {formData.materials.length > 0 && (
                <p className="text-[10px] text-indigo-600 font-bold ml-1">
                  {formData.materials.length} material{formData.materials.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {/* Cost Level */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Average Cost Level
              </label>
              <div className="flex gap-2">
                {COST_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, costLevel: level})}
                    className={`flex-1 px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
                      formData.costLevel === level
                        ? level === 'Low'
                          ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-100'
                          : level === 'Medium'
                          ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg shadow-yellow-100'
                          : 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <DollarSign size={14} className="inline mr-1" />
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Rating */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Initial Rating
              </label>
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={28} 
                          className={`transition-colors ${
                            star <= formData.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-2xl font-black text-gray-900">{formData.rating.toFixed(1)}</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold text-center">
                  Set an initial quality rating for this supplier
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 pt-4"
        >
          <button 
            type="button"
            onClick={() => navigate("/suppliers")}
            className="flex-1 py-5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-[2] py-5 bg-indigo-600 text-white text-sm font-black rounded-3xl shadow-2xl shadow-indigo-100 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            Add Supplier <Save size={20} strokeWidth={3} />
          </button>
        </motion.div>
      </form>
    </div>
  );
}
