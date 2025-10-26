"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { validatePassword, validatePasswordMatch } from "@/validations";
import { resetPassword } from "@/services/auth";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  // Get token from URL
  useEffect(() => {
    const tokenParam = searchParams.get("token");

    if (!tokenParam) {
      // No token, redirect to forgot password
      router.replace("/forgot-password");
      return;
    }

    setToken(tokenParam);
  }, [searchParams, router]);

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validate confirm password
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setApiError("Token không hợp lệ");
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      // Call reset password API
      const response = await resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (!response.isSuccess) {
        throw new Error(response.message || "Đặt lại mật khẩu thất bại");
      }

      // Show success screen
      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi. Vui lòng thử lại.";
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear API error
    if (apiError) {
      setApiError("");
    }
  };

  // Don't render until we verify token exists
  if (!token) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show success screen after password reset
  if (success) {
    return (
      <div className="w-full max-w-md relative">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-green-500/10 border-2 border-green-500 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-400" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Đặt lại mật khẩu thành công!
            </h1>
            <p className="text-gray-400">
              Mật khẩu của bạn đã được cập nhật
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-green-300 text-sm">
              <CheckCircle className="w-5 h-5" />
              <p>Bạn có thể đăng nhập với mật khẩu mới ngay bây giờ</p>
            </div>
          </div>

          {/* Redirect Info */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              Đang tự động chuyển đến trang đăng nhập...
            </p>
            <div className="inline-flex items-center gap-2 text-purple-400">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="font-semibold">3 giây...</span>
            </div>
          </div>

          {/* Manual Login Button */}
          <Link
            href="/login"
            className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center rounded-lg font-semibold transition-all"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md relative">
      {/* Card Container */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Đặt lại mật khẩu
          </h1>
          <p className="text-gray-400">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

        {/* Email Display */}
        {/* <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <p className="text-sm text-gray-400">Tài khoản</p>
          <p className="text-sm font-semibold text-purple-400 mt-1">{email}</p>
        </div> */}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{apiError}</p>
              </div>
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Mật khẩu mới
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-slate-700/50 text-white ${errors.password ? "border-red-500" : "border-purple-600"
                  }`}
                placeholder="••••••••"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-slate-700/50 text-white ${errors.confirmPassword ? "border-red-500" : "border-purple-600"
                  }`}
                placeholder="••••••••"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </div>
            ) : (
              "Đặt lại mật khẩu"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm pt-4">
          <Link
            href="/login"
            className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-blue-700 transition-colors"
          >
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
      </p>
    </div>
  );
}
