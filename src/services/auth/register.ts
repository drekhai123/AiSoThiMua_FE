/**
 * Auth Service - Register
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
} from "./dto";

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

  // Register không trả về token, cần verify OTP trước
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

  // VerifyOTP chỉ xác nhận email, không trả về token
  // User cần login sau khi verify
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

