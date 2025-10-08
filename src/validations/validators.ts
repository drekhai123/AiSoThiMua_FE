// Common validation patterns

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Vietnam phone number
 * Accepts formats: 0912345678, +84912345678
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)(\d{9,10})$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

/**
 * Validate password strength
 * Must have: at least 8 characters, 1 lowercase, 1 uppercase, 1 number
 */
export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 chữ thường";
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 chữ hoa";
  }
  if (!/(?=.*\d)/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 chữ số";
  }
  return null;
};

/**
 * Validate full name
 * Must have at least 2 characters
 */
export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validate required field
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Validate if passwords match
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
