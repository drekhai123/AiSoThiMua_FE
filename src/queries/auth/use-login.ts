/**
 * Auth Query - Login
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "@/services/auth";
import type { LoginRequest } from "@/types/api/request/auth.request";

/**
 * Hook to login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

/**
 * Hook to logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear all queries on logout
      queryClient.clear();
    },
  });
}

