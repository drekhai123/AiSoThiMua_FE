/**
 * Auth Query - Password Management
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  resetPassword,
  changePassword,
} from "@/services/auth";
import type {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from "@/types/api/request/auth.request";


/**
 * Hook to request forgot password
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => forgotPassword(data),
  });
}

/**
 * Hook to reset password with token
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => resetPassword(data),
  });
}

/**
 * Hook to change password (authenticated users)
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
}

