import { useState } from "react";
import { ChevronLeft, CheckCircle2, Shield, User, Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const ROLE_OPTIONS = [
  { id: "admin", label: "Admin", icon: Shield, color: "text-red-600", bg: "bg-red-100" },
  { id: "engineer", label: "Site Engineer", icon: User, color: "text-blue-600", bg: "bg-blue-100" },
  { id: "accountant", label: "Accountant", icon: Settings, color: "text-green-600", bg: "bg-green-100" },
];

export function AssignRoleScreen() {
  const navigate = useNavigate();
  const { roleId } = useParams();
  const [selectedRole, setSelectedRole] = useState(roleId ?? "engineer");

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 active:scale-95 transition-transform">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Assign Role</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <p className="text-sm text-gray-600">Choose a role for this user and apply changes.</p>

        {ROLE_OPTIONS.map((role) => {
          const Icon = role.icon;
          const active = selectedRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                active ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${role.bg} rounded-xl p-2`}>
                  <Icon className={`w-5 h-5 ${role.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{role.label}</p>
                  <p className="text-xs text-gray-500">{role.id}</p>
                </div>
                {active && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={() => navigate("/role-management")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold active:scale-95 transition-transform"
        >
          Save Assignment
        </button>
      </div>
    </div>
  );
}
