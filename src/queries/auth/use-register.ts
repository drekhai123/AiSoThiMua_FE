/**
 * Auth Query - Register & OTP
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register, verifyOtp, resendOtp } from "@/services/auth";
import type {
  RegisterRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
} from "@/services/auth/dto";

/**
 * Hook to register
 */
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      // Always require OTP verification after registration
      // No token is returned on registration
    },
  });
}

/**
 * Hook to verify OTP
 */
export function useVerifyOtp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => verifyOtp(data),
    onSuccess: () => {
      // Invalidate user-related queries after successful verification
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

/**
 * Hook to resend OTP
 */
export function useResendOtp() {
  return useMutation({
    mutationFn: (data: ResendOtpRequest) => resendOtp(data),
  });
}

