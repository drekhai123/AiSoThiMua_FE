"use client";

import { useState } from "react";
import { Order } from "@/types/order";
import Image from "next/image";
import {
  X,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  CreditCard,
  Mail,
  Calendar,
  Download,
  MessageSquare,
  MapPin,
  User,
  Key,
  Lock,
  Copy,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
} from "lucide-react";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_CONFIG = {
  pending: { color: "text-yellow-400", bg: "bg-yellow-500/10", icon: Clock },
  processing: { color: "text-blue-400", bg: "bg-blue-500/10", icon: Loader },
  completed: { color: "text-green-400", bg: "bg-green-500/10", icon: CheckCircle },
  cancelled: { color: "text-red-400", bg: "bg-red-500/10", icon: XCircle },
};

const STATUS_LABELS = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

export default function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  if (!isOpen || !order) return null;

  const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.icon || Package;
  const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const togglePasswordVisibility = (itemId: string) => {
    setShowPassword(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + " Cá";
  };

  // Timeline events
  const timelineEvents = [
    { status: "pending", label: "Đơn hàng đã được tạo", date: order.createdAt, completed: true },
    { status: "processing", label: "Đang xử lý đơn hàng", date: order.status !== "pending" ? order.updatedAt : null, completed: order.status !== "pending" },
    { status: "completed", label: "Đơn hàng hoàn thành", date: order.status === "completed" ? order.updatedAt : null, completed: order.status === "completed" },
  ];

  if (order.status === "cancelled") {
    timelineEvents.push({ status: "cancelled", label: "Đơn hàng đã bị hủy", date: order.updatedAt, completed: true });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Chi tiết đơn hàng</h2>
            <p className="text-gray-400">{order.orderNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6 space-y-6">
          {/* Status & Timeline */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-full ${statusConfig?.bg}`}>
                <StatusIcon className={`w-6 h-6 ${statusConfig?.color}`} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {STATUS_LABELS[order.status as keyof typeof STATUS_LABELS]}
                </h3>
                <p className="text-gray-400 text-sm">Cập nhật: {formatDate(order.updatedAt)}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.completed ? "bg-green-500/20 border-2 border-green-500" : "bg-slate-700 border-2 border-slate-600"
                      }`}>
                      {event.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className={`w-0.5 h-12 ${event.completed ? "bg-green-500/40" : "bg-slate-700"}`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`font-medium ${event.completed ? "text-white" : "text-gray-500"}`}>
                      {event.label}
                    </p>
                    {event.date && (
                      <p className="text-gray-400 text-sm mt-1">{formatDate(event.date)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Sản phẩm ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <div className="relative w-16 h-16 bg-white/5 rounded-lg p-2 flex-shrink-0">
                    <Image
                      src={item.productLogo}
                      alt={item.productName}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium mb-1">{item.productName}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span>Số lượng: {item.quantity}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-4 border-t border-slate-600 flex items-center justify-between">
              <span className="text-gray-300 font-medium">Tổng cộng:</span>
              <span className="text-2xl font-bold text-white">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {/* Account Credentials - Only show for completed orders */}
          {order.status === "completed" && order.items.some(item => item.accountCredentials) && (
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Key className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Thông tin tài khoản</h3>
                  <p className="text-green-300 text-sm">Vui lòng lưu trữ thông tin này một cách an toàn</p>
                </div>
              </div>

              <div className="space-y-6">
                {order.items.map((item) => (
                  item.accountCredentials && (
                    <div key={item.id} className="bg-slate-800/50 rounded-lg p-5 border border-slate-700">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-600">
                        <div className="relative w-10 h-10 bg-white/5 rounded-lg p-1.5">
                          <Image
                            src={item.productLogo}
                            alt={item.productName}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <h4 className="text-white font-medium">{item.productName}</h4>
                      </div>

                      <div className="space-y-3">
                        {/* Email */}
                        {item.accountCredentials.email && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-700/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                <Mail className="w-3 h-3" />
                                <span>Email</span>
                              </div>
                              <p className="text-white font-mono text-sm">{item.accountCredentials.email}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.accountCredentials!.email!, `email-${item.id}`)}
                              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                              title="Copy email"
                            >
                              {copiedField === `email-${item.id}` ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Password */}
                        {item.accountCredentials.password && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-700/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                <Lock className="w-3 h-3" />
                                <span>Mật khẩu</span>
                              </div>
                              <p className="text-white font-mono text-sm">
                                {showPassword[item.id] ? item.accountCredentials.password : '•'.repeat(item.accountCredentials.password.length)}
                              </p>
                            </div>
                            <button
                              onClick={() => togglePasswordVisibility(item.id)}
                              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                              title={showPassword[item.id] ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                              {showPassword[item.id] ? (
                                <EyeOff className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => copyToClipboard(item.accountCredentials!.password!, `password-${item.id}`)}
                              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                              title="Copy mật khẩu"
                            >
                              {copiedField === `password-${item.id}` ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* 2FA Code */}
                        {item.accountCredentials.twoFactorCode && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-700/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                <Shield className="w-3 h-3" />
                                <span>Mã 2FA</span>
                              </div>
                              <p className="text-white font-mono text-sm">{item.accountCredentials.twoFactorCode}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.accountCredentials!.twoFactorCode!, `2fa-${item.id}`)}
                              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                              title="Copy mã 2FA"
                            >
                              {copiedField === `2fa-${item.id}` ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Recovery Email */}
                        {item.accountCredentials.recoveryEmail && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-700/50 rounded-lg p-3">
                              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                                <Mail className="w-3 h-3" />
                                <span>Email khôi phục</span>
                              </div>
                              <p className="text-white font-mono text-sm">{item.accountCredentials.recoveryEmail}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.accountCredentials!.recoveryEmail!, `recovery-${item.id}`)}
                              className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                              title="Copy email khôi phục"
                            >
                              {copiedField === `recovery-${item.id}` ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )}

                        {/* Notes */}
                        {item.accountCredentials.notes && (
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-blue-300 text-xs font-medium mb-1">Lưu ý quan trọng</p>
                                <p className="text-blue-200 text-sm">{item.accountCredentials.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-200 text-xs">
                    <strong>Bảo mật:</strong> Vui lòng không chia sẽ thông tin tài khoản với bất kỳ ai. Đổi mật khẩu ngay sau khi nhận để đảm bảo an toàn.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order Date */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Ngày đặt hàng</span>
              </div>
              <p className="text-white">{formatDate(order.createdAt)}</p>
            </div>

            {/* Order Number */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <Package className="w-5 h-5" />
                <span className="font-medium">Mã đơn hàng</span>
              </div>
              <p className="text-white font-mono">{order.orderNumber}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {order.status === "completed" && (
              <button className="flex-1 px-4 py-3 bg-green-500/10 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/20 transition-all font-medium flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Tải hóa đơn
              </button>
            )}
            {order.status === "pending" && (
              <button className="flex-1 px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-medium">
                Hủy đơn hàng
              </button>
            )}
            <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
