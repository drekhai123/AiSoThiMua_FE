/**
 * Auth Service - Update Avatar
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type { UpdateAvatarRequest, UpdateAvatarResponse } from "./dto";

/**
 * Update user avatar
 */
export async function updateAvatar(data: UpdateAvatarRequest): Promise<UpdateAvatarResponse> {
  try {
    const response = await httpClient.patch<UpdateAvatarResponse>(
      API_ENDPOINTS.updateAvatar,
      data
    );

    // Update user data in localStorage if successful
    if (response.isSuccess && response.data?.user) {
      if (typeof window !== "undefined") {
        const existingUser = localStorage.getItem("user");
        let updatedUser = response.data.user;
        
        if (existingUser) {
          try {
            const parsedUser = JSON.parse(existingUser);
            // Merge to preserve any extra fields
            updatedUser = { ...parsedUser, ...response.data.user };
          } catch (e) {
            console.error("Failed to parse existing user:", e);
          }
        }
        
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }

    return response;
  } catch (error: any) {
    console.error("Update avatar error:", error);
    throw new Error(error?.message || "Failed to update avatar");
  }
}
