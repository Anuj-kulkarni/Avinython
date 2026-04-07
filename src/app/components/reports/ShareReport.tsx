import { useState } from "react";
import { Mail, Download, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function ShareReport() {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const fileName = `daily_report_${new Date().toISOString().split('T')[0]}.pdf`;

  const handleShare = (method: string) => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      toast.success(`Report shared via ${method}!`);
      navigate("/reports");
    }, 1500);
  };

  const handleDownload = () => {
    toast.success("Report downloaded successfully!");
    navigate("/reports");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/reports/preview")}
          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-90 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-[#0F172A]">Share Report</h1>
          <p className="text-sm text-gray-500 font-semibold mt-1">Choose sharing method</p>
        </div>
      </div>

      {/* File Name Display */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <FileText className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">File Name</p>
            <p className="text-sm font-bold text-gray-900 break-all">{fileName}</p>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Share Options</h2>

        {/* WhatsApp Share */}
        <button
          onClick={() => handleShare("WhatsApp")}
          disabled={isSharing}
          className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 text-white"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="text-left flex-1">
              <p className="font-black text-gray-900 text-base">WhatsApp</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Share via WhatsApp</p>
            </div>
          </div>
        </button>

        {/* Email Share */}
        <button
          onClick={() => handleShare("Email")}
          disabled={isSharing}
          className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Mail className="text-white" size={36} />
            </div>
            <div className="text-left flex-1">
              <p className="font-black text-gray-900 text-base">Email</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Send via email</p>
            </div>
          </div>
        </button>

        {/* Download Option */}
        <button
          onClick={handleDownload}
          disabled={isSharing}
          className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Download className="text-white" size={36} />
            </div>
            <div className="text-left flex-1">
              <p className="font-black text-gray-900 text-base">Download</p>
              <p className="text-sm text-gray-500 font-semibold mt-1">Save to device</p>
            </div>
          </div>
        </button>
      </div>

      {/* Info Text */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-blue-700 font-semibold text-center">
          Report will be shared as a PDF document
        </p>
      </div>
    </div>
  );
}
