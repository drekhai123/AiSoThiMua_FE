import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateFullName,
  validatePasswordMatch,
} from "./validators";
import type {
  RegisterFormData,
  LoginFormData,
  FormErrors,
} from "@/types";

/**
 * Validate register form
 */
export const validateRegisterForm = (data: RegisterFormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate full name
  if (!validateFullName(data.fullName)) {
    errors.fullName = "Họ tên phải có ít nhất 2 ký tự";
  }

  // Validate phone
  if (!validatePhone(data.phone)) {
    errors.phone = "Số điện thoại không hợp lệ";
  }

  // Validate email
  if (!validateEmail(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Validate password
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  // Validate confirm password
  if (!validatePasswordMatch(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";
  }

  return errors;
};

/**
 * Validate login form
 */
export const validateLoginForm = (data: LoginFormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate email
  if (!validateEmail(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  // Validate password exists
  if (data.password.trim().length === 0) {
    errors.password = "Vui lòng nhập mật khẩu";
  }

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
