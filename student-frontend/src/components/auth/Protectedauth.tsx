// src/components/auth/ProtectedRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: "admin" | "student";
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // Optional role-based check
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <>{children}</>;
}