/**
 * Products Mutations - Create, Update, Delete
 * Sử dụng @tanstack/react-query
 */

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
  updateProductStock,
} from "@/services/products";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/services/products/dto";
import { productsKeys } from "./use-products";

/**
 * Hook to create product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProduct(data),
    onSuccess: () => {
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

/**
 * Hook to update product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) =>
      updateProduct(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific product and list
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

/**
 * Hook to delete product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (_, id) => {
      // Remove from cache and invalidate list
      queryClient.removeQueries({ queryKey: productsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

/**
 * Hook to update product status
 */
export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "inactive" | "out_of_stock";
    }) => updateProductStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

/**
 * Hook to update product stock
 */
export function useUpdateProductStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) =>
      updateProductStock(id, stock),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

