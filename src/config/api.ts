// API Configuration
// Fail fast if API URL is not configured to prevent accidental production calls
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined in environment variables. " +
    "Please set NEXT_PUBLIC_API_URL in your .env file."
  );
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  register: "/auth/register",
  verifyOtp: "/auth/verify-email-otp",
  resendOtp: "/auth/resend-verification",
  login: "/auth/login",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",

  // User
  profile: "/users/profile",
  updateProfile: "/users/profile",
  updateAvatar: "/users/profile/avatar",
  updateFullName: "/users/profile/fullName",

  // Products
  products: "/products",
  productDetail: (id: string) => `/products/${id}`,

  // Categories
  categories: "/categories",
  categoryTree: "/categories/tree",
  categoryDetail: (id: string) => `/categories/${id}`,
  categoryBySlug: (slug: string) => `/categories/slug/${slug}`,
  categoryProductCount: (id: string) => `/categories/${id}/product-count`,
  categoryToggleActive: (id: string) => `/categories/${id}/toggle-active`,

  // Orders
  orders: "/orders",
  orderDetail: (id: string) => `/orders/${id}`,

  // Wallet
  wallet: "/wallet",
  deposit: "/wallet/deposit",
  transactions: "/wallet/transactions",

  // Upload
  uploadImage: "/upload-image",
};

// Helper function to build full URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
