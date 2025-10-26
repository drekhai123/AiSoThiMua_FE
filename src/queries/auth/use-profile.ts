/**
 * Auth Query - User Profile
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile } from "@/services/auth";
import type { UpdateProfileRequest } from "@/services/auth/dto";

/**
 * Query key factory
 */
export const profileKeys = {
  all: ["auth", "profile"] as const,
  detail: () => [...profileKeys.all, "detail"] as const,
};

/**
 * Hook to get user profile
 */
export function useProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: () => getProfile(),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.statusCode === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
}

/**
 * Hook to update profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: () => {
      // Invalidate profile query to refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
  });
}

