/**
 * Auth Request DTOs
 */

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

// Register
export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// OTP Verification
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

// Password Management
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Profile Updates
export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateAvatarRequest {
  avatar: string;
}

export interface UpdateFullNameRequest {
  fullName: string;
}
