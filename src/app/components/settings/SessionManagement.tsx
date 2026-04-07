import { useState } from "react";
import { AlertTriangle, Smartphone, Monitor, Tablet, MapPin, Clock, Shield, LogOut, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Device {
  id: string;
  deviceType: "mobile" | "desktop" | "tablet";
  deviceName: string;
  location: string;
  lastActive: string;
  ipAddress: string;
  browser: string;
  isSuspicious: boolean;
  isCurrent: boolean;
}

export function SessionManagement() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      deviceType: "mobile",
      deviceName: "iPhone 14 Pro",
      location: "Mumbai, Maharashtra",
      lastActive: "Active now",
      ipAddress: "192.168.1.45",
      browser: "Safari 17.2",
      isSuspicious: false,
      isCurrent: true,
    },
    {
      id: "2",
      deviceType: "desktop",
      deviceName: "Windows Desktop",
      location: "Mumbai, Maharashtra",
      lastActive: "2 hours ago",
      ipAddress: "192.168.1.102",
      browser: "Chrome 122",
      isSuspicious: false,
      isCurrent: false,
    },
    {
      id: "3",
      deviceType: "tablet",
      deviceName: "iPad Pro 12.9",
      location: "Pune, Maharashtra",
      lastActive: "Yesterday at 8:45 PM",
      ipAddress: "103.45.212.89",
      browser: "Safari 17.1",
      isSuspicious: false,
      isCurrent: false,
    },
    {
      id: "4",
      deviceType: "mobile",
      deviceName: "Unknown Device",
      location: "Bangalore, Karnataka",
      lastActive: "3 days ago",
      ipAddress: "45.123.87.201",
      browser: "Chrome 121",
      isSuspicious: true,
      isCurrent: false,
    },
  ]);

  const handleLogoutDevice = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    toast.success("Device logged out successfully");
  };

  const handleLogoutAllDevices = () => {
    toast.success("Logged out from all devices");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-5 h-5" />;
      case "desktop":
        return <Monitor className="w-5 h-5" />;
      case "tablet":
        return <Tablet className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const suspiciousCount = devices.filter(d => d.isSuspicious).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex-1">
              <h1 className="font-bold">Session Management</h1>
              <p className="text-xs text-gray-500">{devices.length} active devices</p>
            </div>
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* AI Security Alert */}
        {suspiciousCount > 0 && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">AI Security Alert</h3>
                <p className="text-sm text-white/90 mt-1">
                  {suspiciousCount} suspicious {suspiciousCount === 1 ? "device" : "devices"} detected with unusual login pattern
                </p>
                <button
                  onClick={() => navigate("/settings/security")}
                  className="mt-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors font-bold"
                >
                  Review Security
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout All Button */}
        <button
          onClick={handleLogoutAllDevices}
          className="w-full bg-red-500 text-white rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-red-600 transition-colors font-bold"
        >
          <LogOut className="w-5 h-5" />
          Logout from All Devices
        </button>

        {/* Devices List */}
        <div className="space-y-3">
          <h2 className="font-bold text-gray-900 px-1">Active Devices</h2>

          {devices.map((device) => (
            <div
              key={device.id}
              className={`bg-white rounded-xl overflow-hidden ${
                device.isSuspicious ? "ring-2 ring-orange-500" : ""
              }`}
            >
              <div className="p-4">
                {/* Device Header */}
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-xl ${
                    device.isCurrent
                      ? "bg-blue-50 text-blue-500"
                      : device.isSuspicious
                      ? "bg-orange-50 text-orange-500"
                      : "bg-gray-50 text-gray-600"
                  }`}>
                    {getDeviceIcon(device.deviceType)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{device.deviceName}</h3>
                        <p className="text-xs text-gray-500">{device.browser}</p>
                      </div>
                      {device.isCurrent && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-bold">
                          <Check className="w-3 h-3" />
                          Current
                        </span>
                      )}
                      {device.isSuspicious && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-500 rounded-lg text-xs font-bold">
                          <AlertTriangle className="w-3 h-3" />
                          Suspicious
                        </span>
                      )}
                    </div>

                    {/* Device Details */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{device.lastActive}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span>{device.ipAddress}</span>
                      </div>
                    </div>

                    {/* AI Suspicious Device Warning */}
                    {device.isSuspicious && (
                      <div className="mt-3 p-3 bg-orange-50 rounded-xl">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs text-orange-900 font-bold">AI detected unusual activity</p>
                            <p className="text-xs text-orange-700 mt-1">
                              Login from new location • Different usage pattern • Unfamiliar device
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Logout Button */}
                    {!device.isCurrent && (
                      <button
                        onClick={() => handleLogoutDevice(device.id)}
                        className={`mt-3 w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${
                          device.isSuspicious
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {device.isSuspicious ? "Logout & Block" : "Logout Device"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900">Security Tips</h3>
              <ul className="text-xs text-blue-800 mt-2 space-y-1">
                <li>• Regularly review your active devices</li>
                <li>• Logout from unfamiliar devices immediately</li>
                <li>• Enable two-factor authentication for extra security</li>
                <li>• Use strong, unique passwords</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
