"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, KeyRound } from "lucide-react";
import { validateEmail } from "@/validations";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    // TODO: Implement forgot password API call
    console.log("Forgot password for:", email);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to OTP verification with email
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=reset`);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Back Button */}
      <Link
        href="/login"
        className="absolute -top-12 left-0 flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
      >
        <div className="p-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg group-hover:shadow-xl group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-200">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        </div>
        <span className="font-medium">Quay lại đăng nhập</span>
      </Link>
      
      {/* Card Container */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full">
            <KeyRound className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Quên mật khẩu?
          </h1>
          <p className="text-gray-400">
            Nhập email của bạn để nhận mã xác thực
          </p>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-purple-500/30 rounded-lg">
          <Mail className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-300">
              Chúng tôi sẽ gửi mã OTP đến email của bạn để xác thực và đặt lại mật khẩu mới
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-slate-700/50 text-white ${
                  error ? "border-red-500" : "border-purple-600"
                }`}
                placeholder="name@example.com"
                suppressHydrationWarning
              />
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
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
                Đang gửi...
              </div>
            ) : (
              "Gửi mã xác thực"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-slate-800 to-slate-900 text-gray-400">Hoặc</span>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Đã nhớ mật khẩu? </span>
          <Link
            href="/login"
            className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-blue-700 transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Nếu bạn không nhận được email, vui lòng kiểm tra thư mục spam
      </p>
    </div>
  );
}
