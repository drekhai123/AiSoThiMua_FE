/**
 * Auth Service - Update Full Name
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type { UpdateFullNameRequest, UpdateFullNameResponse } from "./dto";

/**
 * Update user full name
 */
export async function updateFullName(data: UpdateFullNameRequest): Promise<UpdateFullNameResponse> {
  try {
    const response = await httpClient.patch<UpdateFullNameResponse>(
      API_ENDPOINTS.updateFullName,
      data
    );

    // Update user data in localStorage if successful
    if (response.isSuccess && response.data?.user) {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    }

    return response;
  } catch (error: any) {
    console.error("Update full name error:", error);
    throw new Error(error?.message || "Failed to update full name");
  }
}

