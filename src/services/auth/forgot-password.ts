/**
 * Auth Service - Forgot Password
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type { ForgotPasswordRequest } from "@/types/api/request/auth.request";
import type { ForgotPasswordResponse } from "@/types/api/response/auth.response";

/**
 * Request password reset
 */
export async function forgotPassword(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> {
  return httpClient.post<ForgotPasswordResponse>(
    API_ENDPOINTS.forgotPassword,
    data
  );
}

