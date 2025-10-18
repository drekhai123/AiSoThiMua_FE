"use client";

import { useState } from "react";
import Image from "next/image";
import { Order, OrderStatusInfo, OrderItem } from "@/types/order";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Package,
  Eye,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const STATUS_INFO: Record<string, OrderStatusInfo> = {
  pending: {
    label: "Chờ xử lý",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    icon: "Clock",
  },
  processing: {
    label: "Đang xử lý",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    icon: "Loader",
  },
  completed: {
    label: "Hoàn thành",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    icon: "CheckCircle",
  },
  cancelled: {
    label: "Đã hủy",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    icon: "XCircle",
  },
};

const StatusIcon = ({ status }: { status: string }) => {
  const iconName = STATUS_INFO[status]?.icon;
  const className = `w-5 h-5 ${STATUS_INFO[status]?.color}`;

  switch (iconName) {
    case "Clock":
      return <Clock className={className} />;
    case "Loader":
      return <Loader className={`${className} animate-spin`} />;
    case "CheckCircle":
      return <CheckCircle className={className} />;
    case "XCircle":
      return <XCircle className={className} />;
    default:
      return <Package className={className} />;
  }
};

interface OrderCardProps {
  order: Order;
  onViewDetail?: (order: Order) => void;
}

export default function OrderCard({ order, onViewDetail }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const statusInfo = STATUS_INFO[order.status];

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

  const handleReviewClick = (item: OrderItem) => {
    setSelectedItem(item);
    setShowReviewModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white">
                {order.orderNumber}
              </h3>
              <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${statusInfo.bgColor}`}
              >
                <StatusIcon status={order.status} />
                <span className={`text-xs font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex items-center justify-between py-3 border-t border-slate-700">
          <div className="flex items-center gap-2 text-gray-300">
            <Package className="w-4 h-4" />
            <span className="text-sm">
              {order.items.length} sản phẩm
            </span>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Tổng tiền</p>
            <p className="text-xl font-bold text-white">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        {/* Quick View Items */}
        {order.items.length > 0 && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative w-10 h-10 rounded-lg p-1.5"
              >
                <Image
                  src={item.productLogo}
                  alt={item.productName}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-300">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Items List - Scrollable */}
      <div className="flex-1 px-4 pb-4">
        <div className="relative">
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin pr-1 relative">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 p-2 bg-slate-700/30 rounded-lg"
              >
                <div className="relative w-8 h-8 rounded-lg p-1 flex-shrink-0">
                  <Image
                    src={item.productLogo}
                    alt={item.productName}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium text-xs truncate">
                    {item.productName}
                  </h5>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">SL: {item.quantity}</span>
                    <span className="text-purple-400 font-semibold">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  {/* Rating & Review */}
                  {item.rating && item.review ? (
                    <div className="mt-1">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-2.5 h-2.5 ${star <= item.rating!
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                              }`}
                          />
                        ))}
                        <span className="text-yellow-400 text-xs ml-1">
                          {item.rating}/5
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs mt-1 line-clamp-1">
                        {item.review}
                      </p>
                      <button
                        onClick={() => handleReviewClick(item)}
                        className="text-purple-400 hover:text-purple-300 text-xs mt-1 transition-colors"
                      >
                        Xem đánh giá
                      </button>
                    </div>
                  ) : order.status === "completed" ? (
                    <button
                      onClick={() => handleReviewClick(item)}
                      className="mt-1 text-purple-400 hover:text-purple-300 text-xs transition-colors flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Đánh giá sản phẩm
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Fade overlay for scroll indication */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-800 to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-800 to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Expand/Collapse Button */}
        {order.items.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2 py-1 text-gray-400 hover:text-white text-xs transition-colors flex items-center justify-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Thu gọn
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Xem tất cả ({order.items.length} sản phẩm)
              </>
            )}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetail?.(order)}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            Chi tiết
          </button>
          {order.status === "pending" && (
            <button className="px-3 py-2 bg-red-500/10 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-medium text-sm">
              Hủy
            </button>
          )}
          {order.status === "completed" && (
            <button className="px-3 py-2 bg-green-500/10 border border-green-500 text-green-400 rounded-lg hover:bg-green-500/20 transition-all font-medium text-sm">
              Mua lại
            </button>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                  {selectedItem.rating ? "Đánh giá của bạn" : "Đánh giá sản phẩm"}
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-700/50 rounded-lg">
                <div className="relative w-12 h-12 rounded-lg p-2">
                  <Image
                    src={selectedItem.productLogo}
                    alt={selectedItem.productName}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-medium">{selectedItem.productName}</h4>
                  <p className="text-gray-400 text-sm">{formatPrice(selectedItem.price)}</p>
                </div>
              </div>

              {/* Review Content */}
              {selectedItem.rating && selectedItem.review ? (
                <div className="space-y-4">
                  {/* Rating Display */}
                  <div>
                    <label className="block text-white font-medium mb-2">Đánh giá của bạn:</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${star <= selectedItem.rating!
                            ? "text-yellow-400 fill-current"
                            : "text-gray-600"
                            }`}
                        />
                      ))}
                      <span className="text-yellow-400 font-semibold ml-2">
                        {selectedItem.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-white font-medium mb-2">Nhận xét:</label>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedItem.review}
                      </p>
                    </div>
                  </div>

                  {/* Review Date */}
                  {selectedItem.reviewedAt && (
                    <div>
                      <label className="block text-white font-medium mb-2">Ngày đánh giá:</label>
                      <p className="text-gray-400 text-sm">
                        {new Intl.DateTimeFormat("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(selectedItem.reviewedAt)}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        // TODO: Implement edit review
                        alert("Chức năng chỉnh sửa đánh giá sẽ được thêm sau!");
                      }}
                      className="flex-1 px-4 py-2 bg-blue-500/10 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all font-medium text-sm"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all font-medium text-sm"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm">
                    Hãy chia sẻ trải nghiệm của bạn về sản phẩm này để giúp người khác có quyết định mua hàng tốt hơn.
                  </p>

                  {/* Rating Input */}
                  <div>
                    <label className="block text-white font-medium mb-2">Đánh giá của bạn:</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="text-gray-400 hover:text-yellow-400 transition-colors"
                        >
                          <Star className="w-6 h-6" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text Input */}
                  <div>
                    <label className="block text-white font-medium mb-2">Nhận xét:</label>
                    <textarea
                      placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={() => {
                        // TODO: Implement submit review
                        alert("Chức năng gửi đánh giá sẽ được thêm sau!");
                        setShowReviewModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium text-sm"
                    >
                      Gửi đánh giá
                    </button>
                    <button
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-all font-medium text-sm"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
