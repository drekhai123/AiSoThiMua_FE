/**
 * Server Fetch Utilities cho Server Components
 * Sử dụng native fetch với revalidate options
 */

import { API_BASE_URL } from "@/config/api";

export interface ServerFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  revalidate?: number | false; // Số giây hoặc false để tắt cache
  tags?: string[]; // Cache tags cho revalidateTag
}

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  isSuccess: boolean;
  error: string | null;
  statusCode?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/**
 * Build URL với query params
 */
function buildUrl(endpoint: string, params?: Record<string, any>): string {
  const url = new URL(
    endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Build headers
 */
function buildHeaders(customHeaders?: HeadersInit): Headers {
  const headers = new Headers(customHeaders);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

/**
 * Handle response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    let errorData: any;

    if (isJson) {
      errorData = await response.json();
    } else {
      errorData = { message: response.statusText };
    }

    const error: ApiError = {
      message: errorData.message || "An error occurred",
      statusCode: response.status,
      errors: errorData.errors,
    };

    throw error;
  }

  if (isJson) {
    const data = await response.json();
    return data;
  }

  return response as any;
}

/**
 * Server fetch với revalidate support
 */
export async function serverFetch<T = any>(
  endpoint: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  const { params, revalidate, tags, ...fetchOptions } = options;

  const url = buildUrl(endpoint, params);
  const headers = buildHeaders(fetchOptions.headers);

  const fetchConfig: RequestInit = {
    ...fetchOptions,
    headers,
  };

  // Add Next.js revalidate options
  if (revalidate !== undefined) {
    (fetchConfig as any).next = {
      revalidate,
      ...(tags && { tags }),
    };
  }

  try {
    const response = await fetch(url, fetchConfig);
    return handleResponse<T>(response);
  } catch (error: any) {
    throw error;
  }
}

/**
 * GET request cho server
 */
export function serverGet<T = any>(
  endpoint: string,
  options?: ServerFetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, { ...options, method: "GET" });
}

/**
 * POST request cho server
 */
export function serverPost<T = any>(
  endpoint: string,
  data?: any,
  options?: ServerFetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request cho server
 */
export function serverPut<T = any>(
  endpoint: string,
  data?: any,
  options?: ServerFetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request cho server
 */
export function serverDelete<T = any>(
  endpoint: string,
  options?: ServerFetchOptions
): Promise<T> {
  return serverFetch<T>(endpoint, { ...options, method: "DELETE" });
}

/**
 * Helper để fetch với authentication token
 * Token phải được truyền vào từ cookies hoặc headers
 */
export function serverFetchWithAuth<T = any>(
  endpoint: string,
  token: string,
  options?: ServerFetchOptions
): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return serverFetch<T>(endpoint, {
    ...options,
    headers,
  });
}

