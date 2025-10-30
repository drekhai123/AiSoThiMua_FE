/**
 * Auth Service - Register
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  RegisterRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
} from "@/types/api/request/auth.request";
import type {
  RegisterResponse,
  VerifyOtpResponse,
  ResendOtpResponse,
} from "@/types/api/response/auth.response";

/**
 * Register new user
 */
export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await httpClient.post<RegisterResponse>(
    API_ENDPOINTS.register,
    data
  );
  return response;
}

/**
 * Verify OTP after registration
 */
export async function verifyOtp(
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> {
  const response = await httpClient.post<VerifyOtpResponse>(
    API_ENDPOINTS.verifyOtp,
    data
  );
  return response;
}

/**
 * Resend OTP
 */
export async function resendOtp(
  data: ResendOtpRequest
): Promise<ResendOtpResponse> {
  return httpClient.post<ResendOtpResponse>(API_ENDPOINTS.resendOtp, data);
}

