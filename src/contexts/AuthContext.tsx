"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/auth";
import { login as loginService, register as registerService, getCurrentUser, getToken } from "@/services/auth";
import type { RegisterRequest } from "@/services/auth/dto";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ requiresOtp: boolean }>;
  logout: () => void;
  refreshUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const token = getToken();
      const savedUser = getCurrentUser();

      if (token && savedUser) {
        try {
          // Map saved user to User type
          const userData: User = {
            id: savedUser.id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            phone: savedUser.phone,
            avatar: savedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedUser.id}`,
            balance: savedUser.balance ? parseFloat(savedUser.balance) : 0,
            createdAt: savedUser.createdAt ? new Date(savedUser.createdAt) : new Date(),
            updatedAt: savedUser.updatedAt ? new Date(savedUser.updatedAt) : new Date(),
          };
          setUser(userData);
        } catch (error) {
          console.error("Failed to load user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });

      if (!response.isSuccess) {
        throw new Error(response.message || "Đăng nhập thất bại");
      }

      // Map UserDTO to User type
      const userData: User = {
        id: response.data.user.id,
        fullName: response.data.user.fullName,
        email: response.data.user.email,
        phone: response.data.user.phone,
        avatar: response.data.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.data.user.id}`,
        balance: response.data.user.balance ? parseFloat(response.data.user.balance) : 0,
        createdAt: new Date(response.data.user.createdAt),
        updatedAt: new Date(response.data.user.updatedAt),
      };

      setUser(userData);
      // Token is already saved by login service
    } catch (error) {
      throw error;
    }
  };
  const register = async (data: RegisterRequest): Promise<{ requiresOtp: boolean }> => {
    try {
      const response = await registerService(data);

      if (!response.isSuccess) {
        throw new Error(response.message || "Đăng ký thất bại");
      }

      // API luôn yêu cầu verify OTP sau khi đăng ký
      return { requiresOtp: true };
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = () => {
    console.log("refreshUser() called in AuthContext");
    const savedUser = getCurrentUser();
    console.log("Saved user from localStorage:", savedUser);
    if (savedUser) {
      try {
        const userData: User = {
          id: savedUser.id,
          fullName: savedUser.fullName,
          email: savedUser.email,
          phone: savedUser.phone,
          avatar: savedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${savedUser.id}`,
          balance: savedUser.balance ? parseFloat(savedUser.balance) : 0,
          createdAt: savedUser.createdAt ? new Date(savedUser.createdAt) : new Date(),
          updatedAt: savedUser.updatedAt ? new Date(savedUser.updatedAt) : new Date(),
        };
        console.log("Setting user in context to:", userData);
        console.log("Avatar being set:", userData.avatar);
        setUser(userData);
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    }
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
        register,
        logout,
        refreshUser,
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

