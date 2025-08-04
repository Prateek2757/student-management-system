// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  updateProfileImage: (profileImage: File) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Auto-login if token/userData is present
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = res.data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setUser(user);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    const res = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      role,
    });

    const { token, user } = res.data;

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setUser(user);
  };

  const updateProfileImage = async (profileImage: File) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not authenticated");

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    const res = await axios.put(
      `${API_URL}/auth/uploads/profile-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = res.data.user;
    console.log(updatedUser);
    
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
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
    updateProfileImage,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};