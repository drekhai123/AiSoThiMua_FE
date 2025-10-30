/**
 * API Result Types - Matching Backend Format
 * 
 * Backend format:
 * {
 *   isSuccess: boolean;
 *   message: string;
 *   data: T;
 *   error: string | null;
 * }
 */

/**
 * Standard API Response format (from backend)
 */
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  message: string;
  data: T;
  error: string | null;
}

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
  field?: string;
}

/**
 * Type-safe Result pattern (for client-side error handling)
 */
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };
