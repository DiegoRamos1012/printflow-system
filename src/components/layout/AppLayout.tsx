import { Outlet } from "react-router-dom";
import { AppFooter } from "@/components/layout/AppFooter";
import { Sidebar } from "@/components/layout/Sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
