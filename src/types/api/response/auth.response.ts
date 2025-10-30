/**
 * Auth Response DTOs
 */

import type { User } from "../../models/user.model";
import type { ApiResponse } from "../../common/result";

// Login
export interface LoginResponseData {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  requires2FA: boolean;
}

export interface LoginResponse extends ApiResponse<LoginResponseData> {}

// Register
export interface RegisterResponseData {
  message: string;
  userId: string;
}
export interface RegisterResponse extends ApiResponse<RegisterResponseData> {}

// OTP Verification  
export interface VerifyOtpResponseData {
  message: string;
  verified: boolean;
}
export interface VerifyOtpResponse extends ApiResponse<VerifyOtpResponseData> {}

export interface ResendOtpResponse extends ApiResponse<null> {}

// Password Management
export interface ForgotPasswordResponse extends ApiResponse<null> {}
export interface ResetPasswordResponse extends ApiResponse<null> {}
export interface ChangePasswordResponse extends ApiResponse<null> {}

// Profile
export interface GetProfileResponse extends ApiResponse<User> {}
export interface UpdateProfileResponse extends ApiResponse<User> {}

export interface UpdateAvatarResponseData {
  user: User;
}
export interface UpdateAvatarResponse extends ApiResponse<UpdateAvatarResponseData> {}

export interface UpdateFullNameResponseData {
  user: User;
}
export interface UpdateFullNameResponse extends ApiResponse<UpdateFullNameResponseData> {}

export interface LogoutResponse extends ApiResponse<null> {}
