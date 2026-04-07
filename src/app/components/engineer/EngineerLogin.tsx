import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Phone, Zap, MapPin, Clock } from "lucide-react";

export function EngineerLogin() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleOTPLogin = () => {
    navigate("/engineer/site-selection");
  };

  const handleQuickLogin = () => {
    navigate("/engineer/site-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col">
      {/* Logo & Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <span className="font-bold text-blue-600 text-2xl">BA</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-bold text-gray-900 text-2xl mb-2">Site Engineer Login</h1>
            <p className="text-gray-600">Access your construction sites</p>
          </div>

          {/* AI Suggestion - Last Used Site */}
          <div className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="bg-orange-600 rounded-lg p-2 flex-shrink-0">
                <Zap className="text-white" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 mb-1">Last Used Site</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={14} className="text-orange-600" />
                  <span>Riverdale Tower, Sector 42</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Login Hint */}
          <div className="mb-6 bg-blue-50 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock size={14} className="text-blue-600" />
              <span>Last login: Today at 8:45 AM</span>
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <Phone size={20} />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* OTP Login Button */}
          <button
            onClick={handleOTPLogin}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] mb-3"
          >
            Send OTP
          </button>

          {/* Quick Login Button */}
          <button
            onClick={handleQuickLogin}
            className="w-full py-4 bg-white hover:bg-gray-50 text-blue-600 font-bold rounded-xl border-2 border-blue-600 transition-all active:scale-[0.98]"
          >
            Continue as Engineer
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link to="/engineer/guide" className="text-blue-600 font-semibold hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
