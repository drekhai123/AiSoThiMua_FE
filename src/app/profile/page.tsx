"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Bell,
  CreditCard,
  Package,
  DollarSign,
  Star,
  Edit2,
  Lock,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  // Mock statistics
  const stats = {
    totalOrders: 4,
    totalSpent: 1525, // Số Cá đã chi tiêu
    balance: user?.balance || 0,
  };

  // Mock active subscriptions
  const activeSubscriptions = [
    {
      id: "1",
      name: "ChatGPT Plus",
      logo: "/techlogos/openai.svg",
      expiryDate: new Date("2024-02-15"),
      price: 299000,
    },
    {
      id: "2",
      name: "Canva Pro",
      logo: "/techlogos/canva.svg",
      expiryDate: new Date("2024-02-20"),
      price: 249000,
    },
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phone: user.phone || "",
        email: user.email,
      });
    }
  }, [user]);

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const handleSave = () => {
    // TODO: Implement update user info
    console.log("Save user data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phone: user.phone || "",
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return "Không xác định";
      }
      return new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(dateObj);
    } catch (error) {
      return "Không xác định";
    }
  };

  const getDaysRemaining = (date: Date) => {
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tài khoản của tôi
          </h1>
          <p className="text-gray-400">
            Quản lý thông tin cá nhân và tài khoản của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Thông tin cá nhân
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Lưu
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg shadow-purple-500/30">
                    <Image
                      src="/team/member.png"
                      alt={user?.fullName || "User"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="mt-3 w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-all">
                    Đổi ảnh
                  </button>
                </div>

                {/* Info Fields */}
                <div className="flex-1 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Họ và tên
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <p className="text-white text-lg font-semibold">
                        {user?.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <p className="text-white flex items-center gap-2">
                      {user?.email}
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/30">
                        Đã xác minh
                      </span>
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Số điện thoại
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Nhập số điện thoại"
                      />
                    ) : (
                      <p className="text-white">
                        {user?.phone || "Chưa cập nhật"}
                      </p>
                    )}
                  </div>

                  {/* Member Since */}
                  <div>
                    <label className="block text-gray-400 text-sm mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Thành viên từ
                    </label>
                    <p className="text-white">
                      {user?.createdAt ? formatDate(user.createdAt) : "Không xác định"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Bảo mật tài khoản
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all group">
                  <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all">
                    <Lock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">Đổi mật khẩu</p>
                    <p className="text-gray-400 text-sm">
                      Cập nhật mật khẩu mới
                    </p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all group">
                  <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">Xác thực 2 bước</p>
                    <p className="text-gray-400 text-sm">Chưa kích hoạt</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Sản phẩm đang sử dụng
              </h2>

              <div className="space-y-4">
                {activeSubscriptions.map((sub) => {
                  const daysLeft = getDaysRemaining(sub.expiryDate);
                  return (
                    <div
                      key={sub.id}
                      className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                    >
                      <div className="w-16 h-16 rounded-lg p-2 flex-shrink-0">
                        <Image
                          src={sub.logo}
                          alt={sub.name}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">
                          {sub.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Hết hạn: {formatDate(sub.expiryDate)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${daysLeft <= 7
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                            }`}
                        >
                          Còn {daysLeft} ngày
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Quick Actions */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Thống kê</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Số dư ví</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.balance}
                  </p>
                  <p className="text-purple-300 text-sm mt-1">Cá</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Package className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Đơn hàng</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalOrders}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Tổng chi tiêu</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {stats.totalSpent}
                  </p>
                  <p className="text-yellow-300 text-sm mt-1">Cá</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Hành động nhanh
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/wallet")}
                  className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all text-left"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="text-white font-medium">Nạp tiền vào ví</span>
                </button>

                <button
                  onClick={() => router.push("/orders")}
                  className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-left"
                >
                  <Package className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Xem đơn hàng</span>
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-left">
                  <Bell className="w-5 h-5 text-green-400" />
                  <span className="text-white">Cài đặt thông báo</span>
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Cần hỗ trợ?
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Liên hệ với chúng tôi để được giúp đỡ
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium">
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

