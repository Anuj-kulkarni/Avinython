import { useParams, useNavigate } from "react-router";
import { Users, CheckCircle, XCircle, Search } from "lucide-react";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  role: string;
  hasSeen: boolean;
  seenAt?: string;
}

const users: User[] = [
  { id: "1", name: "Rajesh Kumar", role: "Site Engineer", hasSeen: true, seenAt: "9:45 AM" },
  { id: "2", name: "Priya Singh", role: "Site Engineer", hasSeen: true, seenAt: "9:50 AM" },
  { id: "3", name: "Amit Sharma", role: "Worker", hasSeen: true, seenAt: "10:15 AM" },
  { id: "4", name: "Sunita Patil", role: "Accountant", hasSeen: true, seenAt: "10:20 AM" },
  { id: "5", name: "Vikram Desai", role: "Worker", hasSeen: false },
  { id: "6", name: "Neha Gupta", role: "Site Engineer", hasSeen: true, seenAt: "11:00 AM" },
  { id: "7", name: "Rahul Verma", role: "Worker", hasSeen: false },
  { id: "8", name: "Anjali Reddy", role: "Accountant", hasSeen: true, seenAt: "11:30 AM" },
  { id: "9", name: "Suresh Yadav", role: "Worker", hasSeen: false },
  { id: "10", name: "Kavita Joshi", role: "Site Engineer", hasSeen: true, seenAt: "12:00 PM" },
];

export function ReadStatusTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "seen" | "not-seen">("all");

  const seenCount = users.filter((u) => u.hasSeen).length;
  const notSeenCount = users.filter((u) => !u.hasSeen).length;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "seen" && user.hasSeen) ||
      (filter === "not-seen" && !user.hasSeen);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={() => navigate(`/announcements/${id}`)}
          className="text-white mb-4 hover:underline text-sm font-semibold"
        >
          ← Back
        </button>
        <h1 className="font-bold text-white text-2xl mb-2">Read Status</h1>
        <p className="text-blue-100">Track who viewed this announcement</p>
      </div>

      {/* Summary Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Users size={24} className="text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            <p className="text-xs text-gray-600 mt-1">Total Users</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{seenCount}</p>
            <p className="text-xs text-gray-600 mt-1">Seen</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200 text-center">
            <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <XCircle size={24} className="text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{notSeenCount}</p>
            <p className="text-xs text-gray-600 mt-1">Pending</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 font-medium focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-6 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            All ({users.length})
          </button>
          <button
            onClick={() => setFilter("seen")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              filter === "seen"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Seen ({seenCount})
          </button>
          <button
            onClick={() => setFilter("not-seen")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              filter === "not-seen"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Pending ({notSeenCount})
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="px-6 space-y-2">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl p-4 shadow-sm border-2 border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    user.hasSeen ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                {user.hasSeen ? (
                  <>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-xs font-bold text-green-700">Seen</span>
                    </div>
                    {user.seenAt && (
                      <span className="text-xs text-gray-500 mt-1">{user.seenAt}</span>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-lg">
                    <XCircle size={14} className="text-orange-600" />
                    <span className="text-xs font-bold text-orange-700">Not Seen</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="font-bold text-gray-900 mb-1">No users found</p>
            <p className="text-sm text-gray-600">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
