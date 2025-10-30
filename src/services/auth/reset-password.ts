/**
 * Auth Service - Reset Password
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  ResetPasswordRequest,
  ChangePasswordRequest,
} from "@/types/api/request/auth.request";
import type {
  ResetPasswordResponse,
  ChangePasswordResponse,
} from "@/types/api/response/auth.response";

/**
 * Reset password using token from email
 */
export async function resetPassword(
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> {
  return httpClient.post<ResetPasswordResponse>(
    API_ENDPOINTS.resetPassword,
    data
  );
}

/**
 * Change password (requires authentication)
 */
export async function changePassword(
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  return httpClient.post<ChangePasswordResponse>(
    API_ENDPOINTS.changePassword,
    data
  );
}

