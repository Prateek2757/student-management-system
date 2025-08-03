import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { useAuth } from "@/contexts/AuthContext";
  import { Camera, Mail, Calendar } from "lucide-react";
  import { useRef } from "react";
  import { format } from "date-fns";
  import { toast } from "sonner";

  
  export default function Profile() {
    const { user } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // TODO: Replace with actual upload API
        toast.success("Profile picture uploaded!");
      }
    };
  
  console.log(user);
  
  
    const initials = user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  console.log(user?.createdAt,"kkkk");
  
    const formattedDate = user?.createdAt
      ? format(new Date(user.createdAt), "MMMM dd, yyyy")
      : "";
  
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl border-0">
          <CardHeader className="text-center">
            <div className="relative mx-auto w-28 h-28">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow-md">
                  {initials}
                </div>
              )}
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 rounded-full w-9 h-9 shadow-md"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
  
            <CardTitle className="mt-4 text-2xl font-semibold text-foreground">
              {user?.name}
            </CardTitle>
            <CardDescription className="capitalize text-sm text-muted-foreground">
              {user?.role}
            </CardDescription>
          </CardHeader>
  
          <CardContent className="mt-4 space-y-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
  
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Joined on {formattedDate}</span>
            </div>
  
            <div className="pt-4 border-t mt-4 text-center text-muted-foreground text-xs">
              Keep your profile up to date for better communication and identity.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }