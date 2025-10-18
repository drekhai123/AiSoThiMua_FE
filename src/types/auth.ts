// Auth form data types

export interface RegisterFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// Form errors type
export interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

// User type
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  balance: number; // Số dư Cá
  createdAt: Date;
  updatedAt: Date;
}

// Auth response types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}
