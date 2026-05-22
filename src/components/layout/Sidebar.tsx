import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/orders", label: "Pedidos", icon: ClipboardList },
  { to: "/dashboard", label: "Relatório", icon: LayoutDashboard },
  { to: "/settings", label: "Configurações", icon: Settings },
] as const;

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-full w-56 flex-col border-r bg-card">
      <div className="border-b px-5 py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Sistema
        </p>
        <h1 className="text-xl font-bold text-primary">Printflow</h1>
        {user && (
          <p className="mt-2 truncate text-sm text-muted-foreground">
            {user.name}
          </p>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => {
            void logout();
          }}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
