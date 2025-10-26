"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp, resendOtp } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState<string | null>(null);
  const [type, setType] = useState<"register" | "reset">("register");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if user came from registration or forgot password
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const typeParam = searchParams.get("type") as "register" | "reset" | null;

    if (!emailParam) {
      // No email parameter, redirect to register
      router.replace("/register");
      return;
    }

    setEmail(emailParam);
    setType(typeParam || "register");
  }, [searchParams, router]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Vui lòng nhập đầy đủ 6 số");
      return;
    }

    if (!email) {
      setError("Email không hợp lệ");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (type === "reset") {
        // For password reset, just redirect with OTP token
        sessionStorage.setItem("resetToken", otpValue);
        sessionStorage.setItem("resetEmail", email);
        router.push("/reset-password");
      } else {
        // For registration, verify OTP
        const response = await verifyOtp({
          email,
          otp: otpValue,
        });

        if (!response.isSuccess) {
          throw new Error(response.message || "Mã OTP không đúng hoặc đã hết hạn");
        }

        // Show success message
        setSuccessMessage(response.data.message || response.message || "Xác thực email thành công! Đang chuyển đến trang đăng nhập...");

        // Redirect to login page after successful verification
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Mã OTP không đúng hoặc đã hết hạn";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // Resend OTP
  const handleResendOtp = async () => {
    if (!email) return;

    setResendLoading(true);
    setError("");
    setResendSuccess(false);

    try {
      const response = await resendOtp({ email });

      if (!response.isSuccess) {
        throw new Error(response.message || "Gữi lại OTP thất bại");
      }

      setResendSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Không thể gửi lại OTP. Vui lòng thử lại sau.";
      setError(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  // Don't render until we verify email exists
  if (!email) {
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

  return (
    <div className="w-full max-w-md relative">
      {/* Back Button */}
      <Link
        href={type === "reset" ? "/forgot-password" : "/register"}
        className="absolute -top-12 left-0 flex items-center gap-2 text-white hover:text-purple-400 transition-colors group"
      >
        <div className="p-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg group-hover:shadow-xl group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-200">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        </div>
        <span className="font-medium">Quay lại</span>
      </Link>

      {/* Card Container */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {type === "reset" ? "Xác thực đặt lại mật khẩu" : "Xác thực OTP"}
          </h1>
          <p className="text-gray-400">
            Nhập mã OTP gồm 6 số được gửi đến email của bạn
          </p>
        </div>

        {/* Email Notice */}
        <div className="flex items-center gap-3 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-300">
              Mã OTP đã được gửi đến
            </p>
            <p className="text-sm font-semibold text-purple-400 mt-1">
              {email}
            </p>
          </div>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-purple-600 focus:ring-purple-500 focus:border-transparent"
                  } bg-slate-700/50 text-white`}
                suppressHydrationWarning
              />
            ))}
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 text-green-400">✅</div>
                <p className="text-green-300 text-sm font-semibold">
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !!successMessage}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xác thực...
              </div>
            ) : successMessage ? (
              "Đang chuyển hướng..."
            ) : (
              "Xác thực"
            )}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center text-sm space-y-2">
          {resendSuccess && (
            <p className="text-green-400">✓ Mã OTP đã được gửi lại!</p>
          )}
          <div>
            <span className="text-gray-400">Không nhận được mã? </span>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="font-medium bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent hover:from-purple-800 hover:to-blue-700 transition-colors disabled:opacity-50"
            >
              {resendLoading ? "Đang gửi..." : "Gửi lại"}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Mã OTP có hiệu lực trong 15 phút
      </p>
    </div>
  );
}
