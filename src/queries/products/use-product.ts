/**
 * Products Query - Get Detail
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductDetail } from "@/services/products";
import { productsKeys } from "./use-products";

/**
 * Hook to get product detail by ID
 */
export function useProduct(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductDetail(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

/**
 * Hook to prefetch product detail (useful for hover/navigation)
 */
export function usePrefetchProduct() {
  const queryClient = useQueryClient();

  return (id: string) => {
    return queryClient.prefetchQuery({
      queryKey: productsKeys.detail(id),
      queryFn: () => getProductDetail(id),
      staleTime: 1000 * 60 * 10,
    });
  };
}

