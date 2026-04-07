import { useState } from "react";
import { ChevronLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const PERMISSION_OPTIONS = [
  "User Management",
  "Payment Approval",
  "Site Management",
  "Reports & Analytics",
  "Inventory Access",
  "Delivery Tracking",
];

export function EditPermissionsScreen() {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [selected, setSelected] = useState<string[]>(
    roleId === "admin"
      ? PERMISSION_OPTIONS.slice(0, 4)
      : roleId === "engineer"
      ? ["Site Management", "Inventory Access", "Delivery Tracking"]
      : ["Payment Approval", "Reports & Analytics"],
  );

  const togglePermission = (permission: string) => {
    setSelected((prev) =>
      prev.includes(permission) ? prev.filter((item) => item !== permission) : [...prev, permission],
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 active:scale-95 transition-transform">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Edit Permissions</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <p className="text-sm text-gray-600">
          Role: <span className="font-semibold text-gray-900">{roleId ?? "unknown"}</span>
        </p>

        <div className="space-y-2">
          {PERMISSION_OPTIONS.map((permission) => (
            <label
              key={permission}
              className="flex items-center gap-3 bg-white rounded-xl p-4 border-2 border-gray-200"
            >
              <input
                type="checkbox"
                checked={selected.includes(permission)}
                onChange={() => togglePermission(permission)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-gray-800">{permission}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate("/role-management")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold active:scale-95 transition-transform inline-flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Permissions
        </button>
      </div>
    </div>
  );
}
