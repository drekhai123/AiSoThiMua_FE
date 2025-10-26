/**
 * Products Domain - Data Transfer Objects
 */

export interface ProductDTO {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categoryName?: string;
  stock: number;
  sold: number;
  featured: boolean;
  status: "active" | "inactive" | "out_of_stock";
  tags?: string[];
  specifications?: Record<string, any>;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "sold" | "name";
  sortOrder?: "asc" | "desc";
  featured?: boolean;
  status?: "active" | "inactive" | "out_of_stock";
}

export interface GetProductsResponse {
  data: ProductDTO[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface GetProductDetailResponse {
  data: ProductDTO;
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  stock: number;
  featured?: boolean;
  status?: "active" | "inactive";
  tags?: string[];
  specifications?: Record<string, any>;
}

export interface CreateProductResponse {
  data: ProductDTO;
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  _id?: string;
}

export interface UpdateProductResponse {
  data: ProductDTO;
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface DeleteProductResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

