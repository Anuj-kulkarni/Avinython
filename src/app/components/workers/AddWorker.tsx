import { 
  ChevronLeft, 
  User, 
  Briefcase, 
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  Save
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { createWorkerRecord } from "../../data/repository";

const ROLES = ["Mason", "Electrician", "Plumber", "Carpenter", "Painter", "Site Supervisor", "Laborer", "Welder"];

export function AddWorker() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "Mason",
    contact: "",
    email: "",
    address: "",
    joiningDate: new Date().toISOString().split('T')[0],
    hourlyRate: "",
    status: "Active"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hourlyRate = Number(formData.hourlyRate);
    if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
      toast.error("Enter a valid hourly rate");
      return;
    }

    await createWorkerRecord({
      name: formData.name.trim(),
      role: formData.role,
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      joiningDate: formData.joiningDate,
      hourlyRate,
      status: formData.status as "Active" | "Inactive",
      hoursThisWeek: 0,
      rating: 4.5,
    });

    toast.success("Worker added successfully!", {
      description: `${formData.name} has been added to the team`,
    });
    setTimeout(() => navigate("/workers"), 600);
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/workers" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Add Worker</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <User size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">Personal Information</h3>
              <p className="text-[10px] text-gray-500 font-bold">Basic worker details</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Full Name *
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Role *
              </label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <select 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm appearance-none cursor-pointer"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  required
                >
                  {ROLES.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Contact Number *
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="tel" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                  placeholder="+91 98765 43210"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                  placeholder="worker@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Address
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-4 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <textarea 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm resize-none"
                  placeholder="Enter residential address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Employment Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0F172A]">Employment Details</h3>
              <p className="text-[10px] text-gray-500 font-bold">Work and payment information</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Joining Date */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Joining Date *
              </label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="date" 
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm cursor-pointer"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Hourly Rate (₹) *
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500" size={18} />
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-300 transition-all shadow-sm"
                  placeholder="500"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                Employment Status
              </label>
              <div className="flex gap-2">
                {['Active', 'Inactive'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({...formData, status})}
                    className={`flex-1 px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${
                      formData.status === status
                        ? status === 'Active'
                          ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-100'
                          : 'bg-gray-600 border-gray-600 text-white shadow-lg shadow-gray-100'
                        : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    {status === 'Active' ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 size={14} />
                        {status}
                      </span>
                    ) : (
                      status
                    )}
                  </button>
                ))}
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
            onClick={() => navigate("/workers")}
            className="flex-1 py-5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-[2] py-5 bg-blue-600 text-white text-sm font-black rounded-3xl shadow-2xl shadow-blue-100 active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            Add Worker <Save size={20} strokeWidth={3} />
          </button>
        </motion.div>
      </form>
    </div>
  );
}
