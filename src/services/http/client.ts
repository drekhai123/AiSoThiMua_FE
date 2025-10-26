/**
 * HTTP Client cho Browser/Client Components
 * Sử dụng fetch API với các interceptors tùy chỉnh
 */

import { API_BASE_URL } from "@/config/api";

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
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

class HttpClient {
  private baseURL: string;
  private defaultTimeout: number = 30000;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Lấy token từ localStorage
   */
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  /**
   * Build URL với query params
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint.startsWith("http") ? endpoint : `${this.baseURL}${endpoint}`);

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
  private buildHeaders(customHeaders?: HeadersInit): Headers {
    const headers = new Headers(customHeaders);

    // Set default headers
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Add authorization token
    const token = this.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Handle response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
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

      // Handle 401 - Unauthorized
      if (response.status === 401) {
        // Check if we're already on login/register pages
        const isAuthPage = typeof window !== "undefined" && (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register" ||
          window.location.pathname === "/forgot-password" ||
          window.location.pathname === "/reset-password"
        );

        // Only redirect if not on auth pages
        if (!isAuthPage && typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }

      throw error;
    }

    if (isJson) {
      const data = await response.json();
      return data;
    }

    return response as any;
  }

  /**
   * Generic request method
   */
  async request<T = any>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, timeout = this.defaultTimeout, headers: customHeaders, ...fetchConfig } = config;

    const url = this.buildUrl(endpoint, params);
    const headers = this.buildHeaders(customHeaders);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw {
          message: "Request timeout",
          statusCode: 408,
        } as ApiError;
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  /**
   * POST request
   */
  post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }

  /**
   * Upload file với FormData
   */
  upload<T = any>(
    endpoint: string,
    formData: FormData,
    config?: Omit<RequestConfig, "body">
  ): Promise<T> {
    const headers = new Headers(config?.headers);
    // Không set Content-Type để browser tự động set với boundary
    headers.delete("Content-Type");

    const token = this.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      headers,
      body: formData,
    });
  }
}

// Export singleton instance
export const httpClient = new HttpClient(API_BASE_URL);

// Export class for testing
export default HttpClient;

