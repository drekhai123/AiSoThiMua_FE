/**
 * Category Response DTOs
 */

import type { Category } from "../../models/category.model";

export interface CategoryProductCount {
  categoryId: string;
  productCount: number;
}

export interface DeleteCategoryResponse {
  message: string;
}
