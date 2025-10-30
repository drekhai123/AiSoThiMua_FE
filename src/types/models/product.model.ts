/**
 * Product Model
 */

export interface PricingPlan {
  id?: string;
  duration: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  planType?: 'NEW_ACCOUNT' | 'UPGRADE';
  popular?: boolean;
}

export interface WarrantyPlan {
  id?: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface AccountInfo {
  loginMethod: string;
  includes: string[];
  canChangeEmail?: boolean;
  has2FA?: boolean;
  notes?: string[];
}

export interface Product {
  _id: string;
  id?: string; // Alias for _id for compatibility
  name: string;
  slug: string;
  description: string;
  logo: string;
  categories?: Array<{ id: string; name: string; slug: string }>;
  category?: string; // For backward compatibility
  badge?: string;
  rating?: number;
  features?: string[];
  sold?: number;
  stock: string | number;
  accountInfo?: AccountInfo;
  pricingPlans?: PricingPlan[];
  warrantyPlans?: WarrantyPlan[];
  createdAt: string;
  updatedAt: string;
  
  // Additional fields for compatibility
  price?: number; // Default price from first pricing plan
  duration?: string; // Default duration from first pricing plan
  originalPrice?: number;
  discount?: number;
  techLogo?: string;
  allowUpgrade?: boolean;
  images?: string[]; // Alias for logo
}

// Alias for API compatibility
export type ProductDTO = Product;
