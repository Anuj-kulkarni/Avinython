import { 
  ChevronLeft, 
  Upload, 
  Camera, 
  FileText, 
  Sparkles,
  X,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { createId } from "../../data/localDb";
import { createOrUpdateInvoiceRecord } from "../../data/repository";

export function UploadInvoice() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    invoiceId: "",
    supplier: "",
    amount: "",
    date: "",
    category: "Materials"
  });

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      // Simulate AI processing
      setIsProcessing(true);
      setTimeout(() => {
        setFormData({
          invoiceId: `INV-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          supplier: "Star Cement Industries",
          amount: "12450",
          date: new Date().toISOString().split('T')[0],
          category: "Materials"
        });
        setIsProcessing(false);
        toast.success("Invoice data extracted!", {
          description: "Review and confirm the details below",
        });
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      toast.error("Please upload an invoice image");
      return;
    }
    const amount = Number(formData.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Enter a valid invoice amount");
      return;
    }

    await createOrUpdateInvoiceRecord({
      id: formData.invoiceId.trim() || createId("INV"),
      supplier: formData.supplier.trim(),
      amount,
      date: formData.date,
      category: formData.category,
      status: "Pending",
    });

    toast.success("Invoice saved successfully!");
    setTimeout(() => navigate("/invoices"), 600);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({
      invoiceId: "",
      supplier: "",
      amount: "",
      date: "",
      category: "Materials"
    });
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Top Header */}
      <div className="flex items-center gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <Link to="/invoices" className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-sm active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Upload Invoice</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        {!imagePreview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-[40px] border-2 border-dashed transition-all relative overflow-hidden ${
              isDragging ? 'border-purple-400 bg-purple-50' : 'border-gray-200'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="p-12 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-purple-50 rounded-[28px] flex items-center justify-center">
                  <Upload size={36} className="text-purple-600" strokeWidth={2} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-black text-[#0F172A]">Upload Invoice Image</h3>
                <p className="text-xs text-gray-500 font-bold max-w-[280px]">
                  AI will automatically extract supplier, amount, and date from your invoice
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-4 bg-purple-600 text-white text-sm font-black rounded-2xl shadow-lg shadow-purple-100 active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <Camera size={20} strokeWidth={3} />
                  Take Photo
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleFileSelect(file);
                    };
                    input.click();
                  }}
                  className="w-full py-4 bg-white border-2 border-gray-100 text-gray-900 text-sm font-black rounded-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <ImageIcon size={20} strokeWidth={3} />
                  Choose from Gallery
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <FileText size={12} />
                Supports JPG, PNG, PDF
              </div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden relative"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
              >
                <X size={20} strokeWidth={3} />
              </button>

              {/* Image Preview */}
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Invoice preview" 
                  className="w-full h-full object-contain"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
                    />
                    <div className="text-center">
                      <p className="text-white text-sm font-black">AI Processing...</p>
                      <p className="text-white/70 text-xs font-bold mt-1">Extracting invoice data</p>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Badge */}
              {!isProcessing && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                  <Sparkles size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">AI Detected</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Auto-Filled Form Fields */}
        {imagePreview && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#0F172A]">Auto-Extracted Data</h3>
                <p className="text-[10px] text-gray-500 font-bold">Review and edit if needed</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Invoice ID */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Invoice ID
                </label>
                <div className="relative group">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-purple-500" size={18} />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-300 transition-all shadow-sm"
                    value={formData.invoiceId}
                    onChange={(e) => setFormData({...formData, invoiceId: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Supplier Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Supplier Name
                </label>
                <div className="relative group">
                  <Truck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-purple-500" size={18} />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-300 transition-all shadow-sm"
                    value={formData.supplier}
                    onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Amount
                </label>
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-purple-500" size={18} />
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-300 transition-all shadow-sm"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Invoice Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-purple-500" size={18} />
                  <input 
                    type="date" 
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-purple-100 focus:bg-white focus:border-purple-300 transition-all shadow-sm cursor-pointer"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Category
                </label>
                <div className="flex gap-2 flex-wrap">
                  {['Materials', 'Equipment', 'Services', 'Labor'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.category === cat
                          ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100'
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        {imagePreview && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 pt-4"
          >
            <button 
              type="button"
              onClick={() => navigate("/invoices")}
              className="flex-1 py-5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-5 bg-purple-600 text-white text-sm font-black rounded-3xl shadow-2xl shadow-purple-100 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Save Invoice <CheckCircle2 size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}
      </form>
    </div>
  );
}
