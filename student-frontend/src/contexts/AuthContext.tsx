import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      // Handle if createdAt is a prototype property
      setUser({ ...parsedUser, createdAt: parsedUser.createdAt });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
        role,
      });

      const { token, user } = res.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));
      setUser(user);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};