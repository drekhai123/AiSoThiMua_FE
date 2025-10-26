/**
 * Products Service - Get List
 */

import { httpClient } from "../http/client";
import { serverGet } from "../http/server-fetch";
import { API_ENDPOINTS } from "@/config/api";
import type { GetProductsParams, GetProductsResponse } from "./dto";

/**
 * Get products list (Client-side)
 */
export async function getProducts(
  params?: GetProductsParams
): Promise<GetProductsResponse> {
  return httpClient.get<GetProductsResponse>(API_ENDPOINTS.products, {
    params: params as any,
  });
}

/**
 * Get products list (Server-side với revalidate)
 */
export async function getProductsServer(
  params?: GetProductsParams,
  revalidate: number | false = 60 // Cache 60 seconds mặc định
): Promise<GetProductsResponse> {
  return serverGet<GetProductsResponse>(API_ENDPOINTS.products, {
    params: params as any,
    revalidate,
    tags: ["products"],
  });
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<GetProductsResponse> {
  return getProducts({
    featured: true,
    limit,
    status: "active",
  });
}

/**
 * Search products
 */
export async function searchProducts(
  query: string,
  params?: Omit<GetProductsParams, "search">
): Promise<GetProductsResponse> {
  return getProducts({
    ...params,
    search: query,
  });
}

