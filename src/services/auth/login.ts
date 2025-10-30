/**
 * Auth Service - Login
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type { LoginRequest } from "@/types/api/request/auth.request";
import type { LoginResponse } from "@/types/api/response/auth.response";

/**
 * Login user
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await httpClient.post<LoginResponse>(
    API_ENDPOINTS.login,
    data
  );

  // Save tokens to localStorage
  if (response.isSuccess && response.data.tokens) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
  }

  return response;
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: Call API logout endpoint if exists
    // await httpClient.post(API_ENDPOINTS.logout);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): any | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Get current token
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

