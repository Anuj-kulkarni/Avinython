import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sparkles, User, Phone, Lock, Zap, Mic } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to OTP screen if using OTP method
    if (loginMethod === "otp") {
      navigate("/otp-verification");
    } else {
      // Mock password login - navigate to dashboard
      navigate("/");
    }
  };

  const handleWorkerLogin = () => {
    // Quick worker login - navigate directly to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Logo Section */}
      <div className="pt-12 pb-8 px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[12px] mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-gray-900 mb-1">BuildAI</h1>
        <p className="text-gray-500 text-sm">AI-Powered Construction ERP</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-8">
        <div className="bg-white rounded-[12px] shadow-sm p-6 mb-6">
          <h2 className="text-gray-900 mb-2">Welcome Back</h2>

          {/* AI Smart Suggestions */}
          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-4 mb-6 border border-[#F59E0B]/20">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 mb-1">Last login: Site A</p>
                <p className="text-xs text-gray-600">Role: Site Engineer</p>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone-email" className="text-gray-700 mb-2 block">
                Phone Number / Email
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone-email"
                  type="text"
                  placeholder="+91 98765 43210 or email"
                  value={phoneEmail}
                  onChange={(e) => setPhoneEmail(e.target.value)}
                  className="pl-11 h-14 rounded-[12px] border-gray-200 bg-gray-50"
                />
              </div>
            </div>

            {loginMethod === "password" && (
              <div>
                <Label htmlFor="password" className="text-gray-700 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-14 rounded-[12px] border-gray-200 bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-14 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-[12px] mt-6"
            >
              {loginMethod === "password" ? "Login" : "Send OTP"}
            </Button>

            {/* Toggle Login Method */}
            <button
              type="button"
              onClick={() => setLoginMethod(loginMethod === "password" ? "otp" : "password")}
              className="w-full text-center text-sm text-[#3B82F6] hover:text-[#2563EB] py-2"
            >
              {loginMethod === "password" ? (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Login with OTP instead
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Login with Password instead
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Voice Login Card */}
        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[12px] shadow-lg p-5 mb-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white">Voice Login</h3>
              <p className="text-xs text-gray-400">Login using voice recognition</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => navigate("/voice-login")}
            className="w-full h-12 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-[12px]"
          >
            Try Voice Login
          </Button>
        </div>

        {/* Quick Worker Login */}
        <div className="bg-white rounded-[12px] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Worker Access</h3>
              <p className="text-xs text-gray-500">Quick login for on-site workers</p>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleWorkerLogin}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 text-gray-700 rounded-[12px]"
          >
            Continue as Worker
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-xs text-gray-400">
          Powered by AI • Secure & Encrypted
        </p>
      </div>
    </div>
  );
}