"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      // Redirect to home page after successful login
      router.push("/");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute -top-12 left-0 flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
      >
        <div className="p-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg group-hover:shadow-xl group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-200">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        </div>
        <span className="font-medium">Về trang chủ</span>
      </Link>

      {/* Card Container */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
            Đăng nhập
          </h1>
          <p className="text-gray-600">
            Chào mừng bạn quay trở lại
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="name@example.com"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none"
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
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-600 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white cursor-pointer">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-white hover:text-gray-400 transition-colors"
            >
              Quên mật khẩu?
            </Link>
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
                Đang đăng nhập...
              </div>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-white">Hoặc</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border-2 border-purple-200 rounded-lg shadow-sm text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 hover:border-purple-300 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          {/* <button
            type="button"
            className="flex items-center justify-center px-4 py-2 border-2 border-blue-200 rounded-lg shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button> */}
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link
            href="/register"
            className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-blue-700 transition-colors"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Bằng việc đăng nhập, bạn đồng ý với{" "}
        <Link href="/terms" className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link href="/privacy" className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </p>
    </div>
  );
}
