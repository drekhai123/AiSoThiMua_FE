/**
 * Auth Service - User Profile
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  UpdateProfileRequest,
} from "@/types/api/request/auth.request";
import type { GetProfileResponse, UpdateProfileResponse } from "@/types/api/response/auth.response";

/**
 * Get user profile
 */
export async function getProfile(): Promise<GetProfileResponse> {
  return httpClient.get<GetProfileResponse>(API_ENDPOINTS.profile);
}

/**
 * Update user profile
 */
export async function updateProfile(
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> {
  const response = await httpClient.put<UpdateProfileResponse>(
    API_ENDPOINTS.updateProfile,
    data
  );

  // Update localStorage if successful
  if (response.isSuccess && response.data) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  }

  return response;
}

