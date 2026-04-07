import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Mic, MicOff, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function VoiceLogin() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate speech recognition
  const simulateSpeechRecognition = () => {
    const phrases = [
      "Ramesh",
      "Ramesh Gateway",
      "Ramesh Gateway Tower",
      "Ramesh Gateway Tower Construction",
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < phrases.length) {
        setDetectedText(phrases[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsListening(false);
        setIsProcessing(true);

        // Process and verify
        setTimeout(() => {
          setIsProcessing(false);
          setShowSuccess(true);

          // Navigate after success animation
          setTimeout(() => {
            navigate("/otp-verification");
          }, 1500);
        }, 1500);
      }
    }, 800);

    return () => clearInterval(interval);
  };

  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
      setDetectedText("");
    } else {
      setIsListening(true);
      setDetectedText("");
      simulateSpeechRecognition();
    }
  };

  const handleClose = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden flex flex-col">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-[#3B82F6]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#F97316]/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Close Button */}
      <div className="relative z-10 pt-6 px-6">
        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[20px] flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Instruction Text */}
        <AnimatePresence mode="wait">
          {!showSuccess && (
            <motion.div
              key="instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-white mb-3">Voice Login</h2>
              <p className="text-white/60 text-base max-w-xs mx-auto">
                {isProcessing
                  ? "Verifying your identity..."
                  : "Say your name and site to login"}
              </p>
            </motion.div>
          )}

          {showSuccess && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-16"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-white mb-2">Verified!</h2>
              <p className="text-white/60 text-base">Welcome back, Ramesh</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Microphone Button with Waveform */}
        {!showSuccess && (
          <div className="relative flex items-center justify-center mb-16">
            {/* Waveform Animation */}
            <AnimatePresence>
              {isListening && (
                <>
                  {/* Outer Rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="absolute inset-0 rounded-full border-2 border-[#3B82F6]"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{
                        scale: [1, 2, 2.5],
                        opacity: [0.6, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut",
                      }}
                      style={{
                        width: "140px",
                        height: "140px",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-70px",
                        marginTop: "-70px",
                      }}
                    />
                  ))}

                  {/* Waveform Bars */}
                  <div className="absolute flex items-center justify-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`wave-${i}`}
                        className="w-1 bg-gradient-to-t from-[#3B82F6] to-[#60A5FA] rounded-full"
                        animate={{
                          height: [20, 60, 20],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </AnimatePresence>

            {/* Microphone Button */}
            <motion.button
              onClick={handleMicToggle}
              disabled={isProcessing}
              className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-gradient-to-br from-[#EF4444] to-[#DC2626] shadow-2xl shadow-red-500/50"
                  : "bg-gradient-to-br from-[#3B82F6] to-[#2563EB] shadow-2xl shadow-blue-500/50"
              } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              whileTap={!isProcessing ? { scale: 0.95 } : {}}
              animate={
                isProcessing
                  ? {
                      scale: [1, 1.05, 1],
                    }
                  : {}
              }
              transition={
                isProcessing
                  ? {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : {}
              }
            >
              {isListening ? (
                <MicOff className="w-12 h-12 text-white" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </motion.button>
          </div>
        )}

        {/* Detected Text Display */}
        <AnimatePresence>
          {detectedText && !showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[12px] p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/60 mb-1">Detected</p>
                    <p className="text-white text-lg">{detectedText}</p>
                  </div>
                </div>

                {/* Processing Indicator */}
                {isProcessing && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={`dot-${i}`}
                          className="w-2 h-2 bg-[#3B82F6] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </motion.div>
                    <span className="text-sm text-white/60">
                      Analyzing voice pattern
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Helper Text */}
        {!isListening && !detectedText && !showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm">
              Tap the microphone to start
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation Link */}
      {!showSuccess && (
        <div className="relative z-10 pb-8 px-6 text-center">
          <button
            onClick={handleClose}
            className="text-white/60 text-sm hover:text-white/80 transition-colors"
          >
            Use traditional login instead
          </button>
        </div>
      )}
    </div>
  );
}
