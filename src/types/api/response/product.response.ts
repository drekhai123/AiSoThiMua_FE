/**
 * Product Response DTOs
 */

import type { Product } from "../../models/product.model";
import type { ApiResponse } from "../../common/result";
import type { PaginationMeta } from "../../common/pagination";

// Get Products with pagination
export interface GetProductsResponseData {
  data: Product[];
  pagination: PaginationMeta;
}
export interface GetProductsResponse extends ApiResponse<GetProductsResponseData> {}

// Get Product Detail
export interface GetProductDetailResponse extends ApiResponse<Product> {}

// Create Product
export interface CreateProductResponse extends ApiResponse<Product> {}

// Update Product
export interface UpdateProductResponse extends ApiResponse<Product> {}

// Delete Product
export interface DeleteProductResponse extends ApiResponse<null> {}
