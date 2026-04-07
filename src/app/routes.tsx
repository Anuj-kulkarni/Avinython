import { createBrowserRouter, createHashRouter } from "react-router";
import { Root } from "./components/layout";
import { Dashboard } from "./components/dashboard";
import { ERPDashboard } from "./components/erp/ERPDashboard";
import { Inventory } from "./components/inventory/InventoryList";
import { AddMaterial } from "./components/inventory/AddMaterial";
import { InventoryAnalytics } from "./components/inventory/InventoryAnalytics";
import { WorkerPayments } from "./components/payments/WorkerPayments";
import { WorkerPaymentManagement } from "./components/payments/WorkerPaymentManagement";
import { PaymentProcessing } from "./components/payments/PaymentProcessing";
import { PaymentAnalytics } from "./components/payments/PaymentAnalytics";
import { InvoiceList } from "./components/invoices/InvoiceList";
import { UploadInvoice } from "./components/invoices/UploadInvoice";
import { WorkerList } from "./components/workers/WorkerList";
import { AddWorker } from "./components/workers/AddWorker";
import { SupplierList } from "./components/suppliers/SupplierList";
import { SupplierManagement } from "./components/suppliers/SupplierManagement";
import { AddSupplier } from "./components/suppliers/AddSupplier";
import { SupplierDetail } from "./components/suppliers/SupplierDetail";
import { SupplierDeliveryTracking } from "./components/suppliers/SupplierDeliveryTracking";
import { AIInsightsDashboard } from "./components/ai/AIInsightsDashboard";
import { NotificationsPanel } from "./components/notifications/NotificationsPanel";
import { Settings } from "./components/settings/Settings";
import { SessionManagement } from "./components/settings/SessionManagement";
import { SecuritySettings } from "./components/settings/SecuritySettings";
import { AccessControl } from "./components/settings/AccessControl";
import { AIForecasting } from "./components/dashboard/AIForecasting";
import { MaterialScanner } from "./components/scanner/MaterialScanner";
import { ScanConfirmation } from "./components/scanner/ScanConfirmation";
import { ScanHistory } from "./components/scanner/ScanHistory";
import { DeliveryTracking } from "./components/delivery/DeliveryTracking";
import { DeliveryStatus } from "./components/delivery/DeliveryStatus";
import { DeliveryConfirmation } from "./components/delivery/DeliveryConfirmation";
import { SiteManagement } from "./components/sites/SiteManagement";
import { SiteSwitcher } from "./components/sites/SiteSwitcher";
import { SiteDashboard } from "./components/sites/SiteDashboard";
import { QuickEntry } from "./components/engineers/QuickEntry";
import { Login } from "./components/auth/Login";
import { OTPVerification } from "./components/auth/OTPVerification";
import { RoleSelection } from "./components/auth/RoleSelection";
import { SiteSelection } from "./components/auth/SiteSelection";
import { VoiceLogin } from "./components/auth/VoiceLogin";
import { SecurityAlert } from "./components/auth/SecurityAlert";
import { QuickActionLogin } from "./components/auth/QuickActionLogin";
import { OfflineDemo } from "./components/offline/OfflineDemo";
import { DataSyncScreen } from "./components/sync/DataSyncScreen";
import { OfflineDataEntry } from "./components/offline/OfflineDataEntry";
import { OfflineWorkflow } from "./components/offline/OfflineWorkflow";

import { RoleBasedDashboard } from "./components/dashboard/RoleBasedDashboard";
import { AlertsList } from "./components/alerts/AlertsList";
import { PhaseTracking } from "./components/phases/PhaseTracking";
import { EngineerLogin } from "./components/engineer/EngineerLogin";
import { EngineerSiteSelection } from "./components/engineer/EngineerSiteSelection";
import { EngineerDashboard } from "./components/engineer/EngineerDashboard";
import { DeliveryTrackingMap } from "./components/delivery/DeliveryTrackingMap";
import { PhaseUpdate } from "./components/phases/PhaseUpdate";
import { DataSyncPanel } from "./components/sync/DataSyncPanel";
import { EngineerGuide } from "./components/engineer/EngineerGuide";
import { SupplierPaymentManagement } from "./components/payments/SupplierPaymentManagement";
import { InvoiceManagement } from "./components/invoices/InvoiceManagementScreen";
import { InvoiceDetail } from "./components/invoices/InvoiceDetailScreen";
import { RoleAccessManagement } from "./components/roles/RoleAccessManagement";
import { AssignRoleScreen } from "./components/roles/AssignRoleScreen";
import { EditPermissionsScreen } from "./components/roles/EditPermissionsScreen";
import { AdminDashboard, EngineerDashboardRole, AccountantDashboardRole } from "./components/roles/RoleBasedDashboards";
import { PaymentWorkflow } from "./components/payments/PaymentWorkflow";
import { DailyReportDashboard } from "./components/reports/DailyReportDashboard";
import { ReportPreview } from "./components/reports/ReportPreview";
import { ShareReport } from "./components/reports/ShareReport";
import { ReportSettings } from "./components/reports/ReportSettings";
import { SyncSettings } from "./components/sync/SyncSettings";
import { AnnouncementsScreen } from "./components/announcements/AnnouncementsScreen";
import { CreateAnnouncement } from "./components/announcements/CreateAnnouncement";
import { AnnouncementDetail } from "./components/announcements/AnnouncementDetail";
import { ReadStatusTracking } from "./components/announcements/ReadStatusTracking";
import { AnnouncementsDemo } from "./components/announcements/AnnouncementsDemo";
import { AnnouncementsIntegrationGuide } from "./components/announcements/AnnouncementsIntegrationGuide";

const makeRouter = import.meta.env.VITE_APP_TARGET === "desktop" ? createHashRouter : createBrowserRouter;

export const router = makeRouter([
  {
    path: "/engineer/guide",
    Component: EngineerGuide,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/voice-login",
    Component: VoiceLogin,
  },
  {
    path: "/otp-verification",
    Component: OTPVerification,
  },
  {
    path: "/role-selection",
    Component: RoleSelection,
  },
  {
    path: "/site-selection",
    Component: SiteSelection,
  },
  {
    path: "/security-alert",
    Component: SecurityAlert,
  },
  {
    path: "/quick-actions",
    Component: QuickActionLogin,
  },
  {
    path: "/engineer/login",
    Component: EngineerLogin,
  },
  {
    path: "/engineer/site-selection",
    Component: EngineerSiteSelection,
  },
  {
    path: "/engineer/dashboard/:siteId",
    Component: EngineerDashboard,
  },
  {
    path: "/worker-payments",
    Component: WorkerPaymentManagement,
  },
  {
    path: "/supplier-payments",
    Component: SupplierPaymentManagement,
  },
  {
    path: "/invoice-management",
    Component: InvoiceManagement,
  },
  {
    path: "/invoice-detail/:invoiceId",
    Component: InvoiceDetail,
  },
  {
    path: "/role-management",
    Component: RoleAccessManagement,
  },
  {
    path: "/assign-role/:roleId",
    Component: AssignRoleScreen,
  },
  {
    path: "/edit-permissions/:roleId",
    Component: EditPermissionsScreen,
  },
  {
    path: "/payment-workflow",
    Component: PaymentWorkflow,
  },
  {
    path: "/admin-dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/engineer-dashboard",
    Component: EngineerDashboardRole,
  },
  {
    path: "/accountant-dashboard",
    Component: AccountantDashboardRole,
  },
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: RoleBasedDashboard,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "inventory",
        children: [
          { index: true, Component: Inventory },
          { path: "add", Component: AddMaterial },
          { path: "analytics", Component: InventoryAnalytics },
        ]
      },
      {
        path: "payments",
        children: [
          { index: true, Component: WorkerPayments },
          { path: "process/:id", Component: PaymentProcessing },
          { path: "analytics", Component: PaymentAnalytics },
        ]
      },
      {
        path: "invoices",
        children: [
          { index: true, Component: InvoiceList },
          { path: "upload", Component: UploadInvoice },
        ]
      },
      {
        path: "workers",
        children: [
          { index: true, Component: WorkerList },
          { path: "add", Component: AddWorker },
        ]
      },
      {
        path: "suppliers",
        children: [
          { index: true, Component: SupplierManagement },
          { path: "add", Component: AddSupplier },
          { path: "detail/:id", Component: SupplierDetail },
          { path: "delivery-tracking", Component: SupplierDeliveryTracking },
        ]
      },
      {
        path: "ai-insights",
        children: [
          { index: true, Component: AIInsightsDashboard },
          { path: "forecasting", Component: AIForecasting },
        ]
      },
      {
        path: "notifications",
        Component: NotificationsPanel,
      },
      {
        path: "settings",
        children: [
          { index: true, Component: Settings },
          { path: "sessions", Component: SessionManagement },
          { path: "security", Component: SecuritySettings },
          { path: "access-control", Component: AccessControl },
        ]
      },
      {
        path: "quick-entry",
        Component: QuickEntry,
      },
      {
        path: "scanner",
        Component: MaterialScanner,
      },
      {
        path: "scan-confirm",
        Component: ScanConfirmation,
      },
      {
        path: "scan-history",
        Component: ScanHistory,
      },
      {
        path: "delivery-tracking",
        Component: DeliveryTracking,
      },
      {
        path: "delivery-status",
        Component: DeliveryStatus,
      },
      {
        path: "delivery-confirmation",
        Component: DeliveryConfirmation,
      },
      {
        path: "site-management",
        Component: SiteManagement,
      },
      {
        path: "site-switcher",
        Component: SiteSwitcher,
      },
      {
        path: "sites/:siteId",
        Component: SiteDashboard,
      },
      {
        path: "offline-demo",
        Component: OfflineDemo,
      },
      {
        path: "data-sync",
        Component: DataSyncScreen,
      },
      {
        path: "offline-data-entry",
        Component: OfflineDataEntry,
      },
      {
        path: "offline-workflow",
        Component: OfflineWorkflow,
      },
      {
        path: "alerts",
        Component: AlertsList,
      },
      {
        path: "phases",
        Component: PhaseTracking,
      },
      {
        path: "phase-update",
        Component: PhaseUpdate,
      },
      {
        path: "delivery-map",
        Component: DeliveryTrackingMap,
      },
      {
        path: "data-sync-panel",
        Component: DataSyncPanel,
      },
      {
        path: "sync-settings",
        Component: SyncSettings,
      },
      {
        path: "announcements-demo",
        Component: AnnouncementsDemo,
      },
      {
        path: "announcements-guide",
        Component: AnnouncementsIntegrationGuide,
      },
      {
        path: "announcements",
        children: [
          { index: true, Component: AnnouncementsScreen },
          { path: "create", Component: CreateAnnouncement },
          { path: ":id", Component: AnnouncementDetail },
          { path: ":id/read-status", Component: ReadStatusTracking },
        ]
      },
      {
        path: "reports",
        children: [
          { index: true, Component: DailyReportDashboard },
          { path: "preview", Component: ReportPreview },
          { path: "share", Component: ShareReport },
          { path: "settings", Component: ReportSettings },
        ]
      },
      {
        path: "*",
        Component: () => <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">Page Not Found</div>,
      },
    ],
  },
]);
