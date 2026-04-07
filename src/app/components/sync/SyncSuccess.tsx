import { CheckCircle2, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SyncSuccessProps {
  show: boolean;
  onClose: () => void;
  itemsSynced?: number;
}

export function SyncSuccess({ show, onClose, itemsSynced = 0 }: SyncSuccessProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Success Card */}
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-90 transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-8 text-center">
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  All Data Synced Successfully
                </h2>
                <p className="text-gray-600 mb-6">
                  {itemsSynced > 0 ? (
                    <>
                      <span className="font-bold text-green-600">{itemsSynced}</span>{" "}
                      {itemsSynced === 1 ? "item has" : "items have"} been synced to the
                      server. Your data is now up to date.
                    </>
                  ) : (
                    "Your data has been successfully synced to the server. Everything is up to date."
                  )}
                </p>
              </motion.div>

              {/* AI Insight Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-[#F97316] p-4 mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-orange-900 mb-1">
                      Smart Sync Complete
                    </h3>
                    <p className="text-xs text-orange-700">
                      Critical items were prioritized and synced first
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Success Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 active:scale-95 transition-all shadow-lg"
              >
                Continue Working
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact version for toast-style notification
export function SyncSuccessToast({
  show,
  onClose,
  itemsSynced = 0,
}: SyncSuccessProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-4">
                {/* Success Icon */}
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-1">
                    Sync Complete!
                  </h3>
                  <p className="text-sm text-white/90">
                    {itemsSynced > 0
                      ? `${itemsSynced} ${itemsSynced === 1 ? "item" : "items"} synced successfully`
                      : "All data synced successfully"}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Progress Bar Animation */}
            <div className="h-1.5 bg-white/30">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                onAnimationComplete={onClose}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
