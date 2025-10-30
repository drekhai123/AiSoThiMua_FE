import { httpClient } from "./http/client";
import { API_ENDPOINTS } from "@/config/api";
import type { Category } from "@/types/models/category.model";
import type {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  GetCategoriesParams,
} from "@/types/api/request/category.request";
import type { CategoryProductCount } from "@/types/api/response/category.response";

// GET /categories - Lấy tất cả categories
export const getCategories = async (
  params?: GetCategoriesParams
): Promise<Category[]> => {
  const response = await httpClient.get<any>("/categories", { params: params as any });
  // Nếu API trả về format { data, message, isSuccess }, extract data
  return Array.isArray(response) ? response : response.data || [];
};

// GET /categories/tree - Lấy cây phân cấp categories
export const getCategoryTree = async (): Promise<Category[]> => {
  const response = await httpClient.get<any>("/categories/tree");
  return Array.isArray(response) ? response : response.data || [];
};

// GET /categories/:id - Lấy category theo ID
export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await httpClient.get<any>(`/categories/${id}`);
  return response.data || response;
};

// GET /categories/slug/:slug - Lấy category theo slug
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await httpClient.get<any>(`/categories/slug/${slug}`);
  return response.data || response;
};

// GET /categories/:id/product-count - Đếm số sản phẩm
export const getProductCount = async (
  id: string
): Promise<CategoryProductCount> => {
  const response = await httpClient.get<any>(`/categories/${id}/product-count`);
  return response.data || response;
};

// POST /categories - Tạo category mới (Admin only)
export const createCategory = async (
  data: CreateCategoryRequest
): Promise<Category> => {
  const response = await httpClient.post<any>("/categories", data);
  return response.data || response;
};

// PATCH /categories/:id - Cập nhật category (Admin only)
export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequest
): Promise<Category> => {
  const response = await httpClient.patch<any>(`/categories/${id}`, data);
  return response.data || response;
};

// PATCH /categories/:id/toggle-active - Bật/tắt trạng thái (Admin only)
export const toggleCategoryActive = async (id: string): Promise<Category> => {
  const response = await httpClient.patch<any>(`/categories/${id}/toggle-active`);
  return response.data || response;
};

// DELETE /categories/:id - Xóa category (Admin only)
export const deleteCategory = async (
  id: string
): Promise<{ message: string }> => {
  const response = await httpClient.delete<any>(`/categories/${id}`);
  return response.data || response;
};
