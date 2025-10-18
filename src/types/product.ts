export interface PricingPlan {
  duration: string; // "1 tháng", "3 tháng", "6 tháng", "1 năm"
  price: number; // Giá tính bằng Cá
  discount?: number; // % giảm giá so với mua từng tháng
  popular?: boolean; // Gói phổ biến nhất
}

export interface WarrantyPlan {
  duration: string; // "3 tháng", "6 tháng", "1 năm", "Trọn đời"
  price: number; // Giá bảo hành (Cá), 0 = miễn phí
  description: string; // Mô tả gói bảo hành
  popular?: boolean;
}

export interface AccountInfo {
  loginMethod: string; // "Email/Password", "Google OAuth", etc.
  includes: string[]; // Những gì khách hàng nhận được
  canChangeEmail?: boolean; // Có thể đổi email không
  has2FA?: boolean; // Có mã 2FA không
  notes?: string[]; // Các lưu ý khác
}

export interface Product {
  id: string;
  name: string;
  price: number;
  duration: string;
  pricingPlans?: PricingPlan[]; // Các gói giá khác nhau
  warrantyPlans?: WarrantyPlan[]; // Các gói bảo hành
  accountInfo?: AccountInfo; // Thông tin tài khoản
  allowUpgrade?: boolean; // Cho phép nâng cấp tài khoản hay không
  description: string;
  logo: string; // Path to logo image
  category: string | string[]; // Có thể là 1 hoặc nhiều danh mục
  techLogo: string; // Technology brand (OpenAI, Google, etc.)
  badge?: string;
  discount?: number;
  rating?: number;
  features?: string[];
  sold?: number; // Số lượng đã bán
  stock?: number | "unlimited" | "pre-order" | "made-to-order"; // Số lượng còn lại
}

export interface ProductFilters {
  search: string;
  category: string;
  techLogo: string;
  minPrice: number;
  maxPrice: number;
  sortBy: "price-asc" | "price-desc" | "name" | "popular";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
