import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Target, 
  Plug, 
  Activity, 
  FileText, 
  Settings,
  ChevronRight,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Client Manager", url: "/clients", icon: Building2 },
  { title: "Caller Manager", url: "/callers", icon: Users },
  { title: "Lead Center", url: "/leads", icon: Target },
];

const systemNavItems = [
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Health Monitor", url: "/health", icon: Activity },
  { title: "Reports & Logs", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-header flex items-center justify-center shadow-purple-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-base">D-Code Studio</h1>
            <p className="text-xs text-muted-foreground">CRM Control Center</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-purple-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? "text-primary-foreground" : ""}`} />
                      <span className="font-medium">{item.title}</span>
                      {isActive(item.url) && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive(item.url)
                          ? "bg-primary text-primary-foreground shadow-purple-md"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive(item.url) ? "text-primary-foreground" : ""}`} />
                      <span className="font-medium">{item.title}</span>
                      {isActive(item.url) && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full gradient-header flex items-center justify-center">
            <span className="text-sm font-semibold text-white">SA</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Super Admin</p>
            <p className="text-xs text-muted-foreground truncate">admin@dcode.studio</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
