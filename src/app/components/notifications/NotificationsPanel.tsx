import { 
  Bell,
  Package,
  CreditCard,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  Building2,
  X,
  Filter
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

type NotificationCategory = "All" | "Inventory" | "Payments" | "Invoices" | "Workers" | "System";

interface Notification {
  id: string;
  category: NotificationCategory;
  type: "warning" | "error" | "success" | "info";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLink?: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "N001",
    category: "Inventory",
    type: "error",
    title: "Critical Stock Alert",
    message: "Cement inventory at Site A has dropped below minimum threshold. Only 50 bags remaining.",
    timestamp: "2 hours ago",
    isRead: false,
    actionLink: "/inventory"
  },
  {
    id: "N002",
    category: "Payments",
    type: "warning",
    title: "Payment Pending Approval",
    message: "Worker payment of ₹45,000 for Rajesh Kumar requires your approval.",
    timestamp: "3 hours ago",
    isRead: false,
    actionLink: "/payments"
  },
  {
    id: "N003",
    category: "Invoices",
    type: "error",
    title: "Invoice Overdue",
    message: "Invoice #INV-2024-002 from Steel Corp Ltd (₹78,500) is 5 days overdue.",
    timestamp: "5 hours ago",
    isRead: false,
    actionLink: "/invoices"
  },
  {
    id: "N004",
    category: "Inventory",
    type: "warning",
    title: "Low Stock Warning",
    message: "Steel rods inventory will run out in 5 days based on current usage rate.",
    timestamp: "6 hours ago",
    isRead: true,
    actionLink: "/inventory"
  },
  {
    id: "N005",
    category: "Payments",
    type: "success",
    title: "Payment Completed",
    message: "Successfully processed payment of ₹35,000 to Amit Singh.",
    timestamp: "1 day ago",
    isRead: true,
    actionLink: "/payments"
  },
  {
    id: "N006",
    category: "Workers",
    type: "info",
    title: "Worker Schedule Update",
    message: "3 additional masons required by April 8th to maintain project timeline.",
    timestamp: "1 day ago",
    isRead: true,
    actionLink: "/workers"
  },
  {
    id: "N007",
    category: "Invoices",
    type: "warning",
    title: "Duplicate Invoice Detected",
    message: "AI flagged invoice from TechBuild Solutions as potential duplicate.",
    timestamp: "2 days ago",
    isRead: true,
    actionLink: "/invoices"
  },
  {
    id: "N008",
    category: "System",
    type: "success",
    title: "Budget Forecast Updated",
    message: "AI has generated new budget predictions for next quarter with 87% confidence.",
    timestamp: "2 days ago",
    isRead: true,
    actionLink: "/ai-insights"
  },
  {
    id: "N009",
    category: "Inventory",
    type: "info",
    title: "Material Order Delivered",
    message: "200 bags of cement from Star Cement Industries delivered to Site A.",
    timestamp: "3 days ago",
    isRead: true,
    actionLink: "/inventory"
  },
  {
    id: "N010",
    category: "Payments",
    type: "warning",
    title: "Upcoming Payment Due",
    message: "Worker payments totaling ₹1,25,000 are due in 2 days.",
    timestamp: "3 days ago",
    isRead: true,
    actionLink: "/payments"
  },
];

const CATEGORY_CONFIG = {
  All: { icon: Bell, color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
  Inventory: { icon: Package, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  Payments: { icon: CreditCard, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  Invoices: { icon: FileText, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  Workers: { icon: Users, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  System: { icon: TrendingUp, color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
};

const TYPE_CONFIG = {
  error: { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  warning: { icon: Clock, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  success: { icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  info: { icon: Bell, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
};

export function NotificationsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>("All");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filteredNotifications = selectedCategory === "All" 
    ? notifications 
    : notifications.filter(n => n.category === selectedCategory);

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const unreadByCategory = (category: NotificationCategory) => 
    notifications.filter(n => n.category === category && !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-4 sticky top-0 bg-[#F8FAFC]/80 backdrop-blur-xl z-20 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-gray-500 font-bold mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-100 active:scale-95 transition-transform"
            >
              Mark All Read
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {(Object.keys(CATEGORY_CONFIG) as NotificationCategory[]).map((category) => {
            const config = CATEGORY_CONFIG[category];
            const Icon = config.icon;
            const categoryUnread = category === "All" ? unreadCount : unreadByCategory(category);
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold border whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? `${config.bgColor} ${config.borderColor} ${config.color} shadow-md`
                    : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
              >
                <Icon size={14} />
                {category}
                {categoryUnread > 0 && (
                  <span className={`ml-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${
                    isActive ? 'bg-white text-current' : 'bg-red-500 text-white'
                  }`}>
                    {categoryUnread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No notifications</p>
            <p className="text-xs text-gray-400 font-bold mt-2">You're all caught up!</p>
          </div>
        ) : (
          <>
            {/* Unread Notifications */}
            {filteredNotifications.filter(n => !n.isRead).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Unread</h3>
                {filteredNotifications.filter(n => !n.isRead).map((notification) => (
                  <NotificationCard 
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </div>
            )}

            {/* Read Notifications */}
            {filteredNotifications.filter(n => n.isRead).length > 0 && (
              <div className="space-y-3 mt-6">
                {filteredNotifications.filter(n => !n.isRead).length > 0 && (
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Earlier</h3>
                )}
                {filteredNotifications.filter(n => n.isRead).map((notification) => (
                  <NotificationCard 
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                    onDelete={deleteNotification}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NotificationCard({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}: { 
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const typeConfig = TYPE_CONFIG[notification.type];
  const TypeIcon = typeConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
      className={`bg-white rounded-[28px] border shadow-sm overflow-hidden transition-all group ${
        notification.isRead ? 'border-gray-100' : 'border-blue-200 bg-blue-50/30'
      }`}
    >
      <div className="flex items-start gap-4 p-5">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
          typeConfig.bgColor
        }`}>
          <TypeIcon size={20} className={typeConfig.color} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-black mb-1 ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                {notification.title}
              </h4>
              <p className={`text-xs leading-relaxed ${notification.isRead ? 'text-gray-500' : 'text-gray-700'} font-medium`}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => onDelete(notification.id)}
              className="w-8 h-8 bg-gray-100 hover:bg-red-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-bold">{notification.timestamp}</span>
              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tight ${
                CATEGORY_CONFIG[notification.category].bgColor
              } ${CATEGORY_CONFIG[notification.category].color}`}>
                {notification.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Mark Read
                </button>
              )}
              {notification.actionLink && (
                <Link
                  to={notification.actionLink}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-black rounded-lg hover:bg-gray-200 active:scale-95 transition-all"
                >
                  View
                </Link>
              )}
            </div>
          </div>

          {/* Unread Indicator */}
          {!notification.isRead && (
            <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
