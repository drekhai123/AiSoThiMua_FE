/**
 * Category Model
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  isActive: boolean;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  products?: any[];
  createdAt: string;
  updatedAt: string;
}
