"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Smartphone,
  Key,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  QrCode,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import QRCode from "@/components/ui/qr-code";

interface TwoFactorSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
  isEnabled: boolean;
}

export default function TwoFactorPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"setup" | "verify" | "backup" | "complete">("setup");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [twoFactorData, setTwoFactorData] = useState<TwoFactorSetup>({
    secret: "",
    qrCode: "",
    backupCodes: [],
    isEnabled: false,
  });

  // Mock 2FA setup data
  useEffect(() => {
    if (step === "setup") {
      // Simulate generating 2FA setup
      setTwoFactorData({
        secret: "JBSWY3DPEHPK3PXP",
        qrCode: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiPjJGUQ==</text></svg>",
        backupCodes: [],
        isEnabled: false,
      });
    }
  }, [step]);

  const handleSetup2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to setup 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep("verify");
    } catch (error) {
      setError("Có lỗi xảy ra khi thiết lập 2FA");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Vui lòng nhập mã xác thực 6 số");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate backup codes
      const codes = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setStep("backup");
    } catch (error) {
      setError("Mã xác thực không đúng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to complete setup
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTwoFactorData(prev => ({ ...prev, isEnabled: true }));
      setStep("complete");
      setSuccess(true);
    } catch (error) {
      setError("Có lỗi xảy ra khi hoàn tất thiết lập");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to disable 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTwoFactorData(prev => ({ ...prev, isEnabled: false }));
      setStep("setup");
    } catch (error) {
      setError("Có lỗi xảy ra khi tắt 2FA");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: Show toast notification
  };

  const downloadBackupCodes = () => {
    const content = `Mã dự phòng xác thực 2 bước - ${user?.fullName || "User"}\n\n` +
      backupCodes.map((code, index) => `${index + 1}. ${code}`).join("\n") +
      `\n\nLưu ý: Mỗi mã chỉ sử dụng được một lần.\nNgày tạo: ${new Date().toLocaleDateString("vi-VN")}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Vui lòng đăng nhập
          </h2>
          <Link
            href="/login"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/profile"
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Xác thực 2 bước
                </h1>
                <p className="text-gray-400">
                  Bảo vệ tài khoản với xác thực 2 yếu tố
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Current Status */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${twoFactorData.isEnabled ? "bg-green-500/10" : "bg-gray-500/10"}`}>
                  <Shield className={`w-6 h-6 ${twoFactorData.isEnabled ? "text-green-400" : "text-gray-400"}`} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Trạng thái xác thực 2 bước
                  </h2>
                  <p className={`text-sm ${twoFactorData.isEnabled ? "text-green-400" : "text-gray-400"}`}>
                    {twoFactorData.isEnabled ? "Đã kích hoạt" : "Chưa kích hoạt"}
                  </p>
                </div>
              </div>
              {twoFactorData.isEnabled ? (
                <button
                  onClick={handleDisable2FA}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all font-medium disabled:opacity-50"
                >
                  {isLoading ? "Đang tắt..." : "Tắt 2FA"}
                </button>
              ) : (
                <button
                  onClick={handleSetup2FA}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50"
                >
                  {isLoading ? "Đang thiết lập..." : "Kích hoạt 2FA"}
                </button>
              )}
            </div>
          </div>

          {/* Setup Steps */}
          {step === "setup" && !twoFactorData.isEnabled && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Thiết lập xác thực 2 bước</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">Cài đặt ứng dụng xác thực</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Tải và cài đặt ứng dụng xác thực như Google Authenticator, Authy, hoặc Microsoft Authenticator trên điện thoại của bạn.
                    </p>
                    <div className="flex gap-2">
                      <a href="#" className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">
                        Google Authenticator
                      </a>
                      <a href="#" className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">
                        Authy
                      </a>
                      <a href="#" className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-sm hover:bg-blue-500/20 transition-colors">
                        Microsoft Authenticator
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">Quét mã QR</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Sử dụng ứng dụng xác thực để quét mã QR bên dưới.
                    </p>
                    <div className="flex gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <QRCode
                          value={`otpauth://totp/AiSoThiMua:${user?.email || 'user'}?secret=${twoFactorData.secret}&issuer=AiSoThiMua`}
                          size={128}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400 text-sm mb-3">
                          Quét mã QR bằng ứng dụng xác thực trên điện thoại của bạn
                        </p>
                        <button
                          onClick={() => setShowSecret(!showSecret)}
                          className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                        >
                          {showSecret ? "Ẩn mã bí mật" : "Không thể quét mã?"}
                        </button>

                        {showSecret && (
                          <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                            <p className="text-gray-400 text-sm mb-2">Nhập mã bí mật thủ công:</p>
                            <div className="flex items-center gap-2">
                              <code className="bg-slate-800 px-3 py-2 rounded text-white font-mono text-sm flex-1">
                                {twoFactorData.secret}
                              </code>
                              <button
                                onClick={() => copyToClipboard(twoFactorData.secret)}
                                className="p-2 hover:bg-slate-600 rounded transition-colors"
                                title="Sao chép mã bí mật"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                              Nhập mã này vào ứng dụng xác thực của bạn
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">Xác thực mã</h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Nhập mã 6 số từ ứng dụng xác thực để hoàn tất thiết lập.
                    </p>
                    <button
                      onClick={() => setStep("verify")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verification Step */}
          {step === "verify" && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Xác thực mã</h3>
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-gray-400">
                    Nhập mã 6 số từ ứng dụng xác thực của bạn
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Mã xác thực
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setVerificationCode(value);
                        setError("");
                      }}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("setup")}
                      className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={handleVerifyCode}
                      disabled={isLoading || verificationCode.length !== 6}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Đang xác thực..." : "Xác thực"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Backup Codes Step */}
          {step === "backup" && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Mã dự phòng</h3>
              <div className="space-y-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-300 font-semibold text-sm mb-1">Lưu ý quan trọng:</p>
                      <ul className="text-yellow-200 text-xs space-y-1">
                        <li>• Lưu các mã dự phòng ở nơi an toàn</li>
                        <li>• Mỗi mã chỉ sử dụng được một lần</li>
                        <li>• Có thể dùng khi mất điện thoại</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">Mã dự phòng của bạn:</h4>
                    <button
                      onClick={downloadBackupCodes}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-sm hover:bg-blue-500/20 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Tải xuống
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="bg-slate-800 px-3 py-2 rounded text-white text-center">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("verify")}
                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleCompleteSetup}
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Đang hoàn tất..." : "Hoàn tất"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Complete Step */}
          {step === "complete" && success && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Thiết lập thành công!
                </h3>
                <p className="text-gray-400 mb-6">
                  Xác thực 2 bước đã được kích hoạt cho tài khoản của bạn.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => router.push("/profile")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold"
                  >
                    Về trang cá nhân
                  </button>
                  <button
                    onClick={() => {
                      setStep("setup");
                      setSuccess(false);
                    }}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-semibold"
                  >
                    Thiết lập lại
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
