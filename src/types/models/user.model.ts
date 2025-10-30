/**
 * User Model
 */

export interface User {
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

// Alias for API compatibility
export type UserDTO = User;
