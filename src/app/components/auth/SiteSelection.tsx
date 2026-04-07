import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  Sparkles, 
  MapPin, 
  Building2, 
  Search, 
  Navigation,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Input } from "../ui/input";

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
    <button
      onClick={onClick}
      className={`relative w-full bg-white rounded-[12px] shadow-sm p-5 text-left transition-all hover:shadow-md active:scale-[0.98] ${
        isSelected
          ? "border-2 border-[#3B82F6] ring-2 ring-[#3B82F6]/20"
          : "border border-gray-200"
      } ${site.isMostUsed ? "border-2 border-[#F97316]" : ""}`}
    >
      {/* Most Used Badge */}
      {site.isMostUsed && (
        <div className="absolute -top-2 right-4 bg-[#F97316] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Most Used
        </div>
      )}

      {/* Nearby Badge */}
      {site.isNearby && !site.isMostUsed && (
        <div className="absolute -top-2 right-4 bg-[#3B82F6] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Navigation className="w-3 h-3" />
          Nearby
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-[12px] flex items-center justify-center flex-shrink-0 ${
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
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-gray-900 truncate">{site.name}</h3>
            {isSelected && (
              <CheckCircle2 className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{site.location}</span>
          </div>

          {/* Bottom Info */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Distance */}
            {site.distance !== undefined && (
              <span className="text-xs text-gray-400">
                {site.distance < 1
                  ? `${(site.distance * 1000).toFixed(0)}m away`
                  : `${site.distance.toFixed(1)}km away`}
              </span>
            )}

            {/* Status */}
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
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
    </button>
  );
}

export function SiteSelection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  // Mock sites data
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
      // Auto-select the nearest site (first site with isNearby or isMostUsed)
      const nearestSite = allSites.find(
        (site) => site.isNearby || site.isMostUsed
      );
      if (nearestSite) {
        setSelectedSiteId(nearestSite.id);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (selectedSiteId) {
      console.log("Selected site:", selectedSiteId);
      // Navigate to quick actions after site selection
      navigate("/quick-actions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="pt-12 pb-6 px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-[12px] mb-4 shadow-lg">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-gray-900 mb-2">Select Construction Site</h2>
        <p className="text-sm text-gray-500">
          Choose the site you want to work on
        </p>
      </div>

      {/* AI Location Detection Banner */}
      {isDetectingLocation ? (
        <div className="mx-6 mb-6">
          <div className="bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE] rounded-[12px] p-5 border border-[#3B82F6]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-800 mb-1">Detecting Location</p>
                <p className="text-xs text-gray-600">
                  Finding the nearest construction site...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-6 mb-6">
          <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] rounded-[12px] p-5 border border-[#F59E0B]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm text-gray-800 mb-1">AI Suggestion</p>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Gateway Tower</span> is your
                  most used site and it's nearby
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search sites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 rounded-[12px] border-gray-200 bg-white text-base"
          />
        </div>
      </div>

      {/* Sites List */}
      <div className="flex-1 px-6 pb-32 overflow-y-auto">
        {filteredSites.length > 0 ? (
          <div className="space-y-4">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isSelected={selectedSiteId === site.id}
                onClick={() => setSelectedSiteId(site.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No sites found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search
            </p>
          </div>
        )}
      </div>

      {/* Bottom Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg">
        <button
          onClick={handleContinue}
          disabled={!selectedSiteId}
          className={`w-full h-14 rounded-[12px] font-medium text-base transition-all ${
            selectedSiteId
              ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:shadow-lg active:scale-[0.98]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue to Dashboard
        </button>
        {selectedSiteId && (
          <p className="text-xs text-center text-gray-400 mt-3">
            You can change site anytime from the dashboard
          </p>
        )}
      </div>
    </div>
  );
}