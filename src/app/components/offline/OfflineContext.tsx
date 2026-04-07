import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface OfflineItem {
  id: string;
  type: "material" | "payment" | "worker" | "invoice" | "delivery" | "scan";
  data: any;
  timestamp: string;
  priority: "critical" | "high" | "normal";
}

interface OfflineContextType {
  isOnline: boolean;
  offlineItems: OfflineItem[];
  addOfflineItem: (item: Omit<OfflineItem, "id" | "timestamp">) => void;
  removeOfflineItem: (id: string) => void;
  syncOfflineItems: () => Promise<void>;
  clearOfflineItems: () => void;
  isSyncing: boolean;
  lastSyncTime: string | null;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineItems, setOfflineItems] = useState<OfflineItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const syncOfflineItems = useCallback(async () => {
    if (!isOnline || offlineItems.length === 0 || isSyncing) {
      return;
    }

    setIsSyncing(true);

    try {
      // Sort by priority (critical first)
      const sortedItems = [...offlineItems].sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, normal: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      // Simulate syncing each item
      for (const item of sortedItems) {
        // In a real app, you would make API calls here
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Synced item:", item);
      }

      // Clear offline items after successful sync
      setOfflineItems([]);
      const now = new Date().toISOString();
      setLastSyncTime(now);
      localStorage.setItem("buildai_last_sync", now);
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, offlineItems, isSyncing]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load offline items from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("buildai_offline_items");
    if (stored) {
      try {
        setOfflineItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse offline items:", e);
      }
    }

    const lastSync = localStorage.getItem("buildai_last_sync");
    if (lastSync) {
      setLastSyncTime(lastSync);
    }
  }, []);

  // Save offline items to localStorage whenever they change
  useEffect(() => {
    if (offlineItems.length > 0) {
      localStorage.setItem("buildai_offline_items", JSON.stringify(offlineItems));
    } else {
      localStorage.removeItem("buildai_offline_items");
    }
  }, [offlineItems]);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && offlineItems.length > 0) {
      void syncOfflineItems();
    }
  }, [isOnline, offlineItems.length, syncOfflineItems]);

  const addOfflineItem = (item: Omit<OfflineItem, "id" | "timestamp">) => {
    const newItem: OfflineItem = {
      ...item,
      id: `OFFLINE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setOfflineItems((prev) => [...prev, newItem]);
  };

  const removeOfflineItem = (id: string) => {
    setOfflineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearOfflineItems = () => {
    setOfflineItems([]);
    localStorage.removeItem("buildai_offline_items");
  };

  const value: OfflineContextType = {
    isOnline,
    offlineItems,
    addOfflineItem,
    removeOfflineItem,
    syncOfflineItems,
    clearOfflineItems,
    isSyncing,
    lastSyncTime,
  };

  return (
    <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error("useOffline must be used within an OfflineProvider");
  }
  return context;
}
