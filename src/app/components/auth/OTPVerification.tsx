import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Sparkles, ArrowLeft, Smartphone, CheckCircle2 } from "lucide-react";

export function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isAutoDetecting, setIsAutoDetecting] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Simulate auto-detect OTP after 2 seconds
  useEffect(() => {
    const autoDetectTimeout = setTimeout(() => {
      setIsAutoDetecting(false);
    }, 2000);
    return () => clearTimeout(autoDetectTimeout);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      setTimeout(() => handleVerify(newOtp.join("")), 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = (otpCode: string) => {
    // Mock verification - navigate to role selection
    console.log("Verifying OTP:", otpCode);
    navigate("/role-selection");
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="pt-6 px-6 pb-4">
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Logo Section */}
      <div className="pt-4 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[12px] mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-gray-900 mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm text-[#3B82F6]">
          +91 98765 43210
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8">
        {/* AI Auto-Detection Alert */}
        {isAutoDetecting && (
          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-4 mb-6 border border-[#F59E0B]/20 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 mb-1">Auto-detecting OTP from SMS...</p>
                <p className="text-xs text-gray-600">AI is reading your messages</p>
              </div>
            </div>
          </div>
        )}

        {!isAutoDetecting && (
          <div className="bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] rounded-[12px] p-4 mb-6 border border-[#3B82F6]/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 mb-1">Enable Quick Login</p>
                <p className="text-xs text-gray-600">Skip OTP next time with biometric login</p>
              </div>
            </div>
          </div>
        )}

        {/* OTP Input Boxes */}
        <div className="bg-white rounded-[12px] shadow-sm p-6 mb-6">
          <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center border-2 border-gray-200 rounded-[12px] bg-gray-50 focus:border-[#3B82F6] focus:bg-white focus:outline-none transition-colors"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Timer and Resend */}
          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-gray-600">
                Resend OTP in <span className="text-[#3B82F6]">{timer}s</span>
              </p>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResend}
                className="text-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
              >
                Resend OTP
              </Button>
            )}
          </div>
        </div>

        {/* Verify Button */}
        <Button
          onClick={() => handleVerify(otp.join(""))}
          disabled={otp.some((digit) => digit === "")}
          className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify & Continue
        </Button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-xs text-gray-400">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={() => navigate("/voice-login")}
            className="text-[#3B82F6] hover:text-[#2563EB]"
          >
            Try another method
          </button>
        </p>
      </div>
    </div>
  );
}
