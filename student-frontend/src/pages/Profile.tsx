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
import { useRef, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Profile() {
  const { user, updateProfileImage } = useAuth(); // use it from context
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);
      await updateProfileImage(file);
      toast.success("Profile image updated");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM dd, yyyy")
    : "";

    console.log("Image URL:", `http://localhost:8080${user?.profileImage}`);

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="relative mx-auto w-28 h-28">
            {user?.profileImage ? (
              <img
                src={`http://localhost:8080${user.profileImage}`}
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
              disabled={loading}
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