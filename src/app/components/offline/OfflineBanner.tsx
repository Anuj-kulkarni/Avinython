import { WifiOff, Save, Info } from "lucide-react";

interface OfflineBannerProps {
  onSaveLocally?: () => void;
}

export function OfflineBanner({ onSaveLocally }: OfflineBannerProps) {
  return (
    <div className="bg-gray-50 p-4">
      {/* Offline Status Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-300 shadow-sm mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-yellow-600 rounded-full p-2 flex-shrink-0">
            <WifiOff className="text-white" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-gray-900 mb-1">You are offline</p>
            <p className="text-sm text-gray-700">No internet connection available</p>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="bg-white rounded-xl p-4 border-2 border-blue-200 shadow-sm mb-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
            <Info className="text-blue-600" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              Data will sync automatically when internet is available
            </p>
          </div>
        </div>
      </div>

      {/* Save Locally Button */}
      {onSaveLocally && (
        <button
          onClick={onSaveLocally}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          <Save size={20} />
          Save Locally
        </button>
      )}
    </div>
  );
}
