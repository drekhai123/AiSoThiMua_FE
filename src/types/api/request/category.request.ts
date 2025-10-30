/**
 * Category Request DTOs
 */

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
  parentId?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
  parentId?: string;
}

export interface GetCategoriesParams {
  includeInactive?: boolean;
  parentId?: string | null;
}
