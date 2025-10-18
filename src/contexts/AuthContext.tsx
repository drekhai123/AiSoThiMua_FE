"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock user data
    const mockUser: User = {
      id: "1",
      fullName: "Người dùng Demo",
      email: email,
      phone: "0123456789",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      balance: 500, // Mock 500 Cá (~500,000 VNĐ)
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", "mock-jwt-token");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

