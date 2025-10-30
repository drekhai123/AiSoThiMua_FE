/**
 * Product Request DTOs
 */

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

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  _id?: string;
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
