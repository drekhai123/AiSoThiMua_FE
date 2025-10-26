/**
 * Services Layer - Main Export
 */

// HTTP Core
export * from "./http";

// Domain Services
export * from "./auth";
export * from "./products";

// Re-export commonly used types
export type { ApiResponse, ApiError, RequestConfig } from "./http/client";
export type { ServerFetchOptions } from "./http/server-fetch";

