import { Toaster } from "sonner";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { RoleProvider } from "./components/dashboard/RoleSwitcher";
import { OfflineProvider } from "./components/offline/OfflineContext";

export default function App() {
  return (
    <OfflineProvider>
      <RoleProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '16px',
              fontWeight: '600',
              fontSize: '14px',
            },
          }}
        />
      </RoleProvider>
    </OfflineProvider>
  );
}
