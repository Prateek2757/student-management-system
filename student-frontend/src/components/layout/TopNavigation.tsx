import { useAuth } from "@/contexts/AuthContext";
import { useStudentContext } from "@/contexts/studentContext";
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SearchBarNavigation } from "./SearchBar";


export function TopNavigation() {
  const { user , logout } = useAuth();
  const { students } = useStudentContext();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<string[]>([]);
  const [hasNew, setHasNew] = useState(false);

  const todayKey = dayjs().format("YYYY-MM-DD");

  const isToday = (dateStr?: string) => {
    return dateStr && dayjs(dateStr).isSame(dayjs(), "day");
  };

  useEffect(() => {
    const newNotifications: string[] = [];

    students.forEach((student) => {
      if (isToday(student.createdAt)) {
        newNotifications.push(`🆕 ${student.name} registered for ${student.course}`);
      } else if (isToday(student.updatedAt) && !isToday(student.createdAt)) {
        newNotifications.push(`✏️ ${student.name}'s profile was updated`);
      }
    });

    if (user && isToday(user.createdAt) && user.role === "admin") {
      newNotifications.push(`✅ Welcome Admin ${user.name}, your account was created today`);
    }

    setNotifications(newNotifications);

    const readKey = `notif-read-${todayKey}`;
    const isRead = localStorage.getItem(readKey) === "true";
    setHasNew(!isRead && newNotifications.length > 0);
  }, [students, user, todayKey]);

  const handleNotificationOpen = (open: boolean) => {
    if (open) {
      const readKey = `notif-read-${todayKey}`;
      localStorage.setItem(readKey, "true");
      setHasNew(false);
    }
  };

  const handleProfileClick = () => {
    if (!user) return;
    const route = user.role === "admin" ? "admin" : "student";
    navigate(`/profile/${route}/${user._id}`);
  };

  const handleSignIn = () => navigate("/login");
  const handleSignUp = () => navigate("/register");

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger>
          <Menu className="h-4 w-4" />
        </SidebarTrigger>

        <div className="relative hidden md:block">
          <SearchBarNavigation />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* 🔔 Notification */}
        <DropdownMenu onOpenChange={handleNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {hasNew && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <DropdownMenuItem className="text-muted-foreground">
                No new notifications
              </DropdownMenuItem>
            ) : (
              notifications.map((note, index) => (
                <DropdownMenuItem key={index}>{note}</DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 👤 Profile / Guest */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                <AvatarFallback>
                  {user?.name?.slice(0, 2).toUpperCase() || "GU"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              {user?.name || "Guest"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user ? (
              <>
                <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={handleSignIn}>Sign In</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignUp}>Sign Up</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}