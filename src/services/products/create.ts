/**
 * Products Service - Create, Update, Delete
 */

import { httpClient } from "../http/client";
import { API_ENDPOINTS } from "@/config/api";
import type {
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@/types/api/response/product.response";
import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/api/request/product.request";

/**
 * Create new product
 */
export async function createProduct(
  data: CreateProductRequest
): Promise<CreateProductResponse> {
  return httpClient.post<CreateProductResponse>(API_ENDPOINTS.products, data);
}

/**
 * Update product
 */
export async function updateProduct(
  id: string,
  data: UpdateProductRequest
): Promise<UpdateProductResponse> {
  return httpClient.put<UpdateProductResponse>(
    API_ENDPOINTS.productDetail(id),
    data
  );
}

/**
 * Delete product
 */
export async function deleteProduct(id: string): Promise<DeleteProductResponse> {
  return httpClient.delete<DeleteProductResponse>(
    API_ENDPOINTS.productDetail(id)
  );
}

/**
 * Update product status
 */
export async function updateProductStatus(
  id: string,
  status: "active" | "inactive" | "out_of_stock"
): Promise<UpdateProductResponse> {
  return updateProduct(id, { status: status as "active" | "inactive" });
}

/**
 * Update product stock
 */
export async function updateProductStock(
  id: string,
  stock: number
): Promise<UpdateProductResponse> {
  return updateProduct(id, { stock });
}

