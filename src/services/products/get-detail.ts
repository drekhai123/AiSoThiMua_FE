/**
 * Products Service - Get Detail
 */

import { httpClient } from "../http/client";
import { serverGet } from "../http/server-fetch";
import { API_ENDPOINTS } from "@/config/api";
import type { GetProductDetailResponse } from "./dto";

/**
 * Get product detail by ID (Client-side)
 */
export async function getProductDetail(
  id: string
): Promise<GetProductDetailResponse> {
  return httpClient.get<GetProductDetailResponse>(
    API_ENDPOINTS.productDetail(id)
  );
}

/**
 * Get product detail by ID (Server-side với revalidate)
 */
export async function getProductDetailServer(
  id: string,
  revalidate: number | false = 60 // Cache 60 seconds mặc định
): Promise<GetProductDetailResponse> {
  return serverGet<GetProductDetailResponse>(
    API_ENDPOINTS.productDetail(id),
    {
      revalidate,
      tags: ["products", `product-${id}`],
    }
  );
}

/**
 * Get product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<GetProductDetailResponse> {
  // API phải support query by slug
  return httpClient.get<GetProductDetailResponse>(API_ENDPOINTS.products, {
    params: { slug },
  });
}

