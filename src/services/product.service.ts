import { httpClient } from '@/services/http/client';
import type { Product, PricingPlan, WarrantyPlan, AccountInfo } from '@/types/models/product.model';
import type { ApiResponse } from '@/types/common/result';

export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  logo: string;
  categoryIds?: string[];
  badge?: string;
  rating?: number;
  features?: string[];
  sold?: number;
  stock?: string;
  accountInfo?: AccountInfo;
  pricingPlans?: PricingPlan[];
  warrantyPlans?: WarrantyPlan[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface ProductFilters {
  categoryId?: string;
  categorySlug?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  planType?: 'NEW_ACCOUNT' | 'UPGRADE';
  sortBy?: 'price' | 'rating' | 'sold' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Get all products with optional filters
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const url = `/products${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await httpClient.get<ApiResponse<Product[]>>(url);
  return response.data;
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product> {
  const response = await httpClient.get<ApiResponse<Product>>(`/products/${id}`);
  return response.data;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await httpClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
  return response.data;
}

/**
 * Get popular products
 */
export async function getPopularProducts(limit: number = 10): Promise<Product[]> {
  const response = await httpClient.get<ApiResponse<Product[]>>(`/products/popular?limit=${limit}`);
  return response.data;
}

/**
 * Get products by category ID
 */
export async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const response = await httpClient.get<ApiResponse<Product[]>>(`/products/category/id/${categoryId}`);
  return response.data;
}

/**
 * Get products by category slug
 */
export async function getProductsByCategorySlug(categorySlug: string): Promise<Product[]> {
  const response = await httpClient.get<ApiResponse<Product[]>>(`/products/category/slug/${categorySlug}`);
  return response.data;
}

/**
 * Create a new product (Admin only)
 */
export async function createProduct(data: CreateProductRequest): Promise<Product> {
  const response = await httpClient.post<ApiResponse<Product>>('/products', data);
  return response.data;
}

/**
 * Update product (Admin only)
 */
export async function updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
  const response = await httpClient.patch<ApiResponse<Product>>(`/products/${id}`, data);
  return response.data;
}

/**
 * Update product stock (Admin only)
 */
export async function updateProductStock(id: string, stock: string): Promise<Product> {
  const response = await httpClient.patch<ApiResponse<Product>>(`/products/${id}/stock`, { stock });
  return response.data;
}

/**
 * Delete product (Admin only)
 */
export async function deleteProduct(id: string): Promise<void> {
  await httpClient.delete(`/products/${id}`);
}
