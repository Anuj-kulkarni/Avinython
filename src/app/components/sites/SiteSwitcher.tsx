import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Building2,
  Search,
  Navigation,
  Clock,
  CheckCircle2,
  ChevronRight,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Site {
  id: string;
  name: string;
  location: string;
  distance?: number;
  isNearby?: boolean;
  isMostUsed?: boolean;
  lastVisited?: string;
  status: "active" | "completed" | "on-hold";
}

interface SiteCardProps {
  site: Site;
  isSelected: boolean;
  onClick: () => void;
}

function SiteCard({ site, isSelected, onClick }: SiteCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "on-hold":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      className={`relative w-full bg-white rounded-xl shadow-sm p-5 text-left transition-all hover:shadow-md active:scale-[0.98] ${
        isSelected
          ? "border-2 border-[#3B82F6] ring-2 ring-[#3B82F6]/20"
          : "border border-gray-200"
      } ${site.isMostUsed ? "border-2 border-[#F97316]" : ""}`}
    >
      {/* AI Badge */}
      {site.isMostUsed && (
        <div className="absolute -top-2 right-4 bg-[#F97316] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Sparkles className="w-3 h-3" />
          AI Suggested
        </div>
      )}

      {/* Nearby Badge */}
      {site.isNearby && !site.isMostUsed && (
        <div className="absolute -top-2 right-4 bg-[#3B82F6] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Navigation className="w-3 h-3" />
          Nearby
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
            site.isMostUsed
              ? "bg-gradient-to-br from-[#F97316] to-[#EA580C]"
              : site.isNearby
              ? "bg-gradient-to-br from-[#3B82F6] to-[#2563EB]"
              : "bg-gradient-to-br from-gray-100 to-gray-200"
          }`}
        >
          <Building2
            className={`w-7 h-7 ${
              site.isMostUsed || site.isNearby ? "text-white" : "text-gray-600"
            }`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 truncate">{site.name}</h3>
            {isSelected && (
              <CheckCircle2 className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{site.location}</span>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Distance */}
            {site.distance !== undefined && (
              <span className="text-xs text-gray-500 font-bold">
                {site.distance < 1
                  ? `${(site.distance * 1000).toFixed(0)}m away`
                  : `${site.distance.toFixed(1)}km away`}
              </span>
            )}

            {/* Status */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wider ${getStatusColor(
                site.status
              )}`}
            >
              {site.status}
            </span>

            {/* Last Visited */}
            {site.lastVisited && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {site.lastVisited}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function SiteSwitcher() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState<string>("1");
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const [showRecent, setShowRecent] = useState(true);

  // Mock sites data - sorted by most used
  const allSites: Site[] = [
    {
      id: "1",
      name: "Gateway Tower Construction",
      location: "Sector 18, Noida",
      distance: 0.8,
      isNearby: true,
      isMostUsed: true,
      lastVisited: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Metro Station Expansion",
      location: "Connaught Place, Delhi",
      distance: 5.2,
      isNearby: false,
      isMostUsed: false,
      lastVisited: "Yesterday",
      status: "active",
    },
    {
      id: "3",
      name: "Residential Complex Phase 2",
      location: "Gurgaon, Haryana",
      distance: 12.5,
      isNearby: false,
      isMostUsed: false,
      lastVisited: "3 days ago",
      status: "active",
    },
    {
      id: "4",
      name: "Highway Overpass Project",
      location: "NH-8, Delhi-Jaipur",
      distance: 18.3,
      isNearby: false,
      isMostUsed: false,
      lastVisited: "1 week ago",
      status: "active",
    },
    {
      id: "5",
      name: "Corporate Office Building",
      location: "Cyber City, Gurgaon",
      distance: 15.7,
      isNearby: false,
      isMostUsed: false,
      lastVisited: "2 weeks ago",
      status: "on-hold",
    },
    {
      id: "6",
      name: "Shopping Mall Renovation",
      location: "Saket, Delhi",
      distance: 8.9,
      isNearby: false,
      isMostUsed: false,
      lastVisited: "3 weeks ago",
      status: "completed",
    },
  ];

  // Get recently used sites (top 3 with lastVisited)
  const recentSites = allSites
    .filter((site) => site.lastVisited)
    .slice(0, 3);

  // Filter sites based on search query
  const filteredSites = allSites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate location detection on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDetectingLocation(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSwitchSite = () => {
    if (selectedSiteId) {
      const site = allSites.find((s) => s.id === selectedSiteId);
      if (site) {
        toast.success(`Switched to ${site.name}`, {
          description: "Your dashboard has been updated",
        });
        navigate("/");
      }
    }
  };

  const currentSite = allSites.find((s) => s.id === selectedSiteId);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -ml-12 -mb-12" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white/30 active:scale-90 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Switch Site</h1>
              <p className="text-white/90 text-sm mt-1">
                Select a different construction site
              </p>
            </div>
          </div>

          {/* Current Site Card */}
          {currentSite && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30"
            >
              <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-2">
                Current Site
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">
                    {currentSite.name}
                  </h3>
                  <p className="text-xs text-white/80 truncate">
                    {currentSite.location}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* AI Location Detection Banner */}
      <div className="px-6 -mt-4 mb-6 relative z-10">
        <AnimatePresence mode="wait">
          {isDetectingLocation ? (
            <motion.div
              key="detecting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-5 border border-blue-200"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Navigation className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-bold text-gray-900 mb-1">
                    Detecting Location
                  </p>
                  <p className="text-sm text-gray-600">
                    Finding nearby construction sites...
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="suggestion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl shadow-lg border-2 border-[#F97316] p-5"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-bold text-orange-900 mb-1">
                    AI Suggestion
                  </p>
                  <p className="text-sm text-orange-700">
                    <span className="font-bold">Gateway Tower</span> is your most
                    visited site and within 1km of your current location
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search sites by name or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowRecent(e.target.value === "");
            }}
            className="w-full pl-12 pr-4 h-14 rounded-xl border-2 border-gray-200 bg-white text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Recently Used Sites Section */}
      {showRecent && !isDetectingLocation && (
        <div className="px-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-gray-500" />
            <h2 className="font-bold text-gray-900 uppercase tracking-wider text-xs">
              Recently Used
            </h2>
          </div>
          <div className="space-y-3">
            {recentSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isSelected={selectedSiteId === site.id}
                onClick={() => setSelectedSiteId(site.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Sites Section */}
      <div className="px-6 mb-6">
        {!showRecent && (
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-gray-500" />
            <h2 className="font-bold text-gray-900 uppercase tracking-wider text-xs">
              Search Results
            </h2>
          </div>
        )}
        {showRecent && !isDetectingLocation && (
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-gray-500" />
            <h2 className="font-bold text-gray-900 uppercase tracking-wider text-xs">
              All Sites
            </h2>
          </div>
        )}
        <div className="space-y-3">
          {filteredSites.length > 0 ? (
            filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isSelected={selectedSiteId === site.id}
                onClick={() => setSelectedSiteId(site.id)}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-500">No sites found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl z-20">
        <button
          onClick={handleSwitchSite}
          disabled={!selectedSiteId}
          className={`w-full h-14 rounded-xl font-bold text-base transition-all ${
            selectedSiteId
              ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:shadow-lg active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Switch to Selected Site
        </button>
        {selectedSiteId && selectedSiteId !== "1" && (
          <p className="text-xs text-center text-gray-500 mt-3">
            Your dashboard will be updated with the selected site data
          </p>
        )}
      </div>
    </div>
  );
}
