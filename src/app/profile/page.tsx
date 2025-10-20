"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import ImageUpload from "@/components/ui/image-upload";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Bell,
  Package,
  DollarSign,
  Star,
  Edit2,
  Lock,
  Save,
  X,
  CheckCircle,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [avatarUrl, setAvatarUrl] = useState<string>("/team/member.png");

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
      // Set default avatar if user has one
      setAvatarUrl(user.avatar || "/team/member.png");
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
    console.log("Save user data:", { ...formData, avatar: avatarUrl });
    setIsEditing(false);
  };

  const handleAvatarUpload = (url: string) => {
    setTempAvatarUrl(url);
    // Không tự động đóng modal, để user có thể preview và lưu
  };

  const handleAvatarError = (error: string) => {
    console.error("Avatar upload error:", error);
    // TODO: Show error toast
  };

  const handleSaveAvatar = () => {
    if (tempAvatarUrl) {
      setAvatarUrl(tempAvatarUrl);
      setShowAvatarModal(false);
      setTempAvatarUrl("");
      // TODO: Save avatar URL to user profile
    }
  };

  const handleOpenAvatarModal = () => {
    setTempAvatarUrl("");
    setShowAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
    setTempAvatarUrl("");
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        phone: user.phone || "",
        email: user.email,
      });
      setAvatarUrl(user.avatar || "/team/member.png");
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
                      src={typeof avatarUrl === 'string' && avatarUrl ? avatarUrl : "/team/member.png"}
                      alt={user?.fullName || "User"}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={handleOpenAvatarModal}
                    className="mt-3 w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-all"
                  >
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
                    <p className="text-white">
                      {user?.phone || "Chưa cập nhật"}
                    </p>
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
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-3 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all group"
                >
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

                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-500/10 rounded-lg">
                      <Shield className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Xác thực 2 bước</p>
                      <p className="text-gray-400 text-sm">Tính năng đang phát triển</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded">
                      Sắp ra mắt
                    </span>
                    <div className="w-11 h-6 bg-slate-600 rounded-full cursor-not-allowed opacity-50">
                      <div className="w-5 h-5 bg-white rounded-full mt-0.5 ml-0.5"></div>
                    </div>
                  </div>
                </div>
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

                <button
                  onClick={() => router.push("/notifications")}
                  className="w-full flex items-center gap-3 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all text-left"
                >
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

        {/* Avatar Upload Modal */}
        {showAvatarModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Đổi ảnh đại diện
                </h2>
                <button
                  onClick={handleCloseAvatarModal}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Avatar Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Current Avatar */}
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">Ảnh hiện tại:</p>
                    <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-600 shadow-lg">
                      <Image
                        src={typeof avatarUrl === 'string' && avatarUrl ? avatarUrl : "/team/member.png"}
                        alt="Current Avatar"
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* New Avatar Preview */}
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">Ảnh mới:</p>
                    <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/30">
                      {tempAvatarUrl ? (
                        <Image
                          src={tempAvatarUrl}
                          alt="New Avatar Preview"
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Upload Component */}
                <ImageUpload
                  onUpload={handleAvatarUpload}
                  onError={handleAvatarError}
                  currentImage={tempAvatarUrl || undefined}
                  placeholder="Chọn ảnh mới"
                  maxSize={2}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                />

                {/* Info */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5">ℹ️</div>
                    <div>
                      <p className="text-blue-300 font-semibold text-sm mb-1">Lưu ý:</p>
                      <ul className="text-blue-200 text-xs space-y-1">
                        <li>• Kích thước tối đa: 2MB</li>
                        <li>• Định dạng: JPG, PNG, WEBP</li>
                        <li>• Ảnh sẽ được tự động resize về kích thước phù hợp</li>
                        <li>• Nhấn &quot;Lưu&quot; để áp dụng ảnh mới</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseAvatarModal}
                    className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveAvatar}
                    disabled={!tempAvatarUrl}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
          </div>
        </div>
      )}
    </main>
  );
}

// Change Password Modal Component
interface ChangePasswordModalProps {
  onClose: () => void;
}

function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // Password validation
  const validatePassword = (password: string) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const passwordValidation = validatePassword(formData.newPassword);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (!isPasswordValid) {
      newErrors.newPassword = "Mật khẩu không đủ mạnh";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // TODO: Implement API call
      console.log("Changing password:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setErrors({ currentPassword: "Mật khẩu hiện tại không đúng" });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Đổi mật khẩu thành công!</h3>
        <p className="text-gray-400 text-sm">Mật khẩu đã được cập nhật.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Shield className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Đổi mật khẩu</h2>
            <p className="text-gray-400 text-sm">Cập nhật mật khẩu mới</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-white font-medium mb-2 text-sm">
            Mật khẩu hiện tại <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              className={`w-full px-3 py-2 pr-10 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${errors.currentPassword ? "border-red-500" : "border-slate-600"
                }`}
              placeholder="Nhập mật khẩu hiện tại"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.current ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-white font-medium mb-2 text-sm">
            Mật khẩu mới <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className={`w-full px-3 py-2 pr-10 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${errors.newPassword ? "border-red-500" : "border-slate-600"
                }`}
              placeholder="Nhập mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.new ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.newPassword}
            </p>
          )}

          {/* Password Requirements */}
          {formData.newPassword && (
            <div className="mt-2 space-y-1">
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className={`flex items-center gap-1 ${passwordValidation.length ? "text-green-400" : "text-gray-400"}`}>
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordValidation.length ? "bg-green-500" : "bg-slate-600"}`}>
                    {passwordValidation.length && <CheckCircle className="w-2 h-2 text-white" />}
                  </div>
                  8+ ký tự
                </div>
                <div className={`flex items-center gap-1 ${passwordValidation.uppercase ? "text-green-400" : "text-gray-400"}`}>
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordValidation.uppercase ? "bg-green-500" : "bg-slate-600"}`}>
                    {passwordValidation.uppercase && <CheckCircle className="w-2 h-2 text-white" />}
                  </div>
                  Chữ hoa
                </div>
                <div className={`flex items-center gap-1 ${passwordValidation.lowercase ? "text-green-400" : "text-gray-400"}`}>
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordValidation.lowercase ? "bg-green-500" : "bg-slate-600"}`}>
                    {passwordValidation.lowercase && <CheckCircle className="w-2 h-2 text-white" />}
                  </div>
                  Chữ thường
                </div>
                <div className={`flex items-center gap-1 ${passwordValidation.number ? "text-green-400" : "text-gray-400"}`}>
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center ${passwordValidation.number ? "bg-green-500" : "bg-slate-600"}`}>
                    {passwordValidation.number && <CheckCircle className="w-2 h-2 text-white" />}
                  </div>
                  Số
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-white font-medium mb-2 text-sm">
            Xác nhận mật khẩu <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`w-full px-3 py-2 pr-10 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${errors.confirmPassword ? "border-red-500" : "border-slate-600"
                }`}
              placeholder="Nhập lại mật khẩu mới"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium text-sm"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isLoading || !isPasswordValid || !formData.currentPassword || !formData.confirmPassword}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang cập nhật...
              </>
            ) : (
              "Đổi mật khẩu"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

