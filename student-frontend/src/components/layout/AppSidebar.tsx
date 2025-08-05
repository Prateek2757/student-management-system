import { useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  User,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext"; // ✅ Import useAuth

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Add Student", url: "/add-student", icon: UserPlus },
];

const userNavItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ Grab user and logout from context
  const isCollapsed = sidebarState === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3" onClick={() => navigate("/")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-semibold">StudentMS</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
                      isActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.profileImage || "/placeholder.svg"}
              alt={user?.name || "User"}
            />
            <AvatarFallback>
              {(
                (user?.name?.[0] || "") + (user?.name?.[1] || "")
              ).toUpperCase() || "US"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || "Unknown User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email || "unknown@example.com"}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            title="Logout"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
