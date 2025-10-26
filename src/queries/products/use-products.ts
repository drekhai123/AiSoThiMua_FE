/**
 * Products Query - Get List
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, searchProducts } from "@/services/products";
import type { GetProductsParams, GetProductsResponse } from "@/services/products/dto";

/**
 * Query key factory
 */
export const productsKeys = {
  all: ["products"] as const,
  lists: () => [...productsKeys.all, "list"] as const,
  list: (params?: GetProductsParams) => [...productsKeys.lists(), params] as const,
  details: () => [...productsKeys.all, "detail"] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
};

/**
 * Hook to get products list
 */
export function useProducts(params?: GetProductsParams) {
  return useQuery({
    queryKey: productsKeys.list(params),
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to search products
 */
export function useSearchProducts(query: string, params?: Omit<GetProductsParams, "search">) {
  return useQuery({
    queryKey: [...productsKeys.lists(), "search", query, params],
    queryFn: () => searchProducts(query, params),
    enabled: query.length > 0, // Only run when query is not empty
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to get featured products
 */
export function useFeaturedProducts(limit: number = 8) {
  return useProducts({
    featured: true,
    limit,
    status: "active",
  });
}

/**
 * Hook to prefetch products (useful for navigation)
 */
export function usePrefetchProducts() {
  const queryClient = useQueryClient();

  return (params?: GetProductsParams) => {
    return queryClient.prefetchQuery({
      queryKey: productsKeys.list(params),
      queryFn: () => getProducts(params),
      staleTime: 1000 * 60 * 5,
    });
  };
}

