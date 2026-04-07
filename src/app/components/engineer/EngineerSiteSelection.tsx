import { useState } from "react";
import { Link } from "react-router";
import { Search, MapPin, CheckCircle, Clock, Navigation } from "lucide-react";

interface Site {
  id: string;
  name: string;
  location: string;
  status: "active" | "completed";
  distance: string;
  isMostUsed?: boolean;
  isNearest?: boolean;
}

const sites: Site[] = [
  {
    id: "1",
    name: "Riverdale Tower",
    location: "Sector 42, Gurgaon",
    status: "active",
    distance: "2.3 km",
    isMostUsed: true,
    isNearest: true,
  },
  {
    id: "2",
    name: "Green Valley Apartments",
    location: "Dwarka, New Delhi",
    status: "active",
    distance: "12.5 km",
  },
  {
    id: "3",
    name: "Skyline Plaza",
    location: "Noida Sector 18",
    status: "active",
    distance: "18.2 km",
  },
  {
    id: "4",
    name: "Metro Heights",
    location: "Faridabad",
    status: "completed",
    distance: "25.6 km",
  },
];

export function EngineerSiteSelection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg mb-6">
        <h1 className="font-bold text-white text-2xl mb-2">Select Construction Site</h1>
        <p className="text-blue-100">Choose a site to access</p>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sites..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Sites List */}
      <div className="px-6 space-y-3">
        {filteredSites.map((site) => (
          <Link
            key={site.id}
            to={`/engineer/dashboard/${site.id}`}
            className="block bg-white rounded-xl p-5 shadow-sm border-2 border-gray-200 hover:border-blue-400 transition-all active:scale-[0.98]"
          >
            {/* AI Badges */}
            {(site.isNearest || site.isMostUsed) && (
              <div className="flex gap-2 mb-3">
                {site.isNearest && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                    <Navigation size={12} />
                    Nearest Site
                  </div>
                )}
                {site.isMostUsed && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                    <Clock size={12} />
                    Most Used
                  </div>
                )}
              </div>
            )}

            {/* Site Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{site.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{site.location}</span>
                </div>
              </div>
              {site.status === "active" ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  Active
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">
                  <CheckCircle size={12} />
                  Completed
                </div>
              )}
            </div>

            {/* Distance */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-600">Distance from you</span>
              <span className="text-sm font-bold text-blue-600">{site.distance}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredSites.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={24} />
          </div>
          <p className="font-bold text-gray-900 mb-1">No sites found</p>
          <p className="text-sm text-gray-600">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
