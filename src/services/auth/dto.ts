/**
 * Auth Domain - Data Transfer Objects
 */

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  balance?: string;
  isEmailVerified?: boolean;
  role: "user" | "admin";
  notificationsOptIn?: boolean;
  twoFactorEnabled?: boolean;
  pushNotificationToken?: string | null;
  isLocked?: boolean;
  lockedReason?: string | null;
  lockedAt?: string | null;
  lockedUntil?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  isSuccess: boolean;
  message: string;
  data: {
    user: UserDTO;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    requires2FA: boolean;
  };
  error: string | null;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  isSuccess: boolean;
  message: string;
  data: {
    message: string;
    userId: string;
  };
  error: string | null;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  isSuccess: boolean;
  message: string;
  data: {
    message: string;
    verified: boolean;
  };
  error: string | null;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface GetProfileResponse {
  data: UserDTO;
  isSuccess: boolean;
  message: string;
  error: string | null;
}

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateProfileResponse {
  isSuccess: boolean;
  message: string;
  data: UserDTO;
  error: string | null;
}

export interface UpdateAvatarRequest {
  avatar: string;
}

export interface UpdateAvatarResponse {
  isSuccess: boolean;
  message: string;
  data: {
    user: UserDTO;
  };
  error: string | null;
}

export interface UpdateFullNameRequest {
  fullName: string;
}

export interface UpdateFullNameResponse {
  isSuccess: boolean;
  message: string;
  data: {
    user: UserDTO;
  };
  error: string | null;
}

export interface LogoutResponse {
  isSuccess: boolean;
  message: string;
  error: string | null;
}

