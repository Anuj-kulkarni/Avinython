import { ChevronLeft, Shield, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";

interface Role {
  id: string;
  name: string;
  icon: typeof Shield;
  color: string;
  bgColor: string;
  permissions: string[];
}

export function RoleAccessManagement() {
  const navigate = useNavigate();

  const roles: Role[] = [
    {
      id: "admin",
      name: "Admin",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-100",
      permissions: [
        "Full System Access",
        "User Management",
        "Payment Approval",
        "Site Management",
        "Reports & Analytics",
      ],
    },
    {
      id: "engineer",
      name: "Site Engineer",
      icon: User,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      permissions: [
        "Material Scanning",
        "Usage Tracking",
        "Delivery Tracking",
        "Phase Updates",
        "Inventory View",
      ],
    },
    {
      id: "accountant",
      name: "Accountant",
      icon: Settings,
      color: "text-green-600",
      bgColor: "bg-green-100",
      permissions: [
        "Payment Management",
        "Invoice Processing",
        "Financial Reports",
        "Supplier Payments",
        "Worker Wages",
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Role Management</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <p className="text-gray-600 mb-4">
          Manage user roles and their permissions
        </p>

        <div className="space-y-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200"
              >
                {/* Role Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${role.bgColor} rounded-xl p-3`}>
                    <Icon className={`w-7 h-7 ${role.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{role.name}</h3>
                    <p className="text-sm text-gray-600">
                      {role.permissions.length} permissions
                    </p>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">Permissions</p>
                  <div className="space-y-2">
                    {role.permissions.map((permission, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full ${role.bgColor}`}></div>
                        <span className="text-gray-700">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/assign-role/${role.id}`)}
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold active:scale-95 transition-transform"
                  >
                    Assign Role
                  </button>
                  <button
                    onClick={() => navigate(`/edit-permissions/${role.id}`)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold active:scale-95 transition-transform"
                  >
                    Edit Permissions
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
