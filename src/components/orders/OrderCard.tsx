"use client";

import { useState } from "react";
import Image from "next/image";
import { Order, OrderStatusInfo } from "@/types/order";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  ChevronDown,
  ChevronUp,
  Package,
  CreditCard,
  Mail,
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
}

export default function OrderCard({ order }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    return price.toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all duration-300">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">
                {order.orderNumber}
              </h3>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}
              >
                <StatusIcon status={order.status} />
                <span className={`text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Order Summary */}
        <div className="flex items-center justify-between py-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-gray-300">
            <Package className="w-5 h-5" />
            <span>
              {order.items.length} sản phẩm
            </span>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Tổng tiền</p>
            <p className="text-2xl font-bold text-white">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        {/* Quick View Items */}
        {!isExpanded && order.items.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="relative w-12 h-12 rounded-lg p-2"
              >
                <Image
                  src={item.productLogo}
                  alt={item.productName}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-300">
                  +{order.items.length - 3}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-slate-700 bg-slate-800/50">
          <div className="p-6 space-y-6">
            {/* Items List */}
            <div>
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Sản phẩm
              </h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg"
                  >
                    <div className="relative w-16 h-16 rounded-lg p-2 flex-shrink-0">
                      <Image
                        src={item.productLogo}
                        alt={item.productName}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white font-medium mb-1">
                        {item.productName}
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-gray-400 text-sm">{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Phương thức thanh toán</span>
                </div>
                <p className="text-white">{order.paymentMethod}</p>
              </div>

              {order.deliveryEmail && (
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Email nhận hàng</span>
                  </div>
                  <p className="text-white">{order.deliveryEmail}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {order.status === "pending" && (
                <button className="flex-1 px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-medium">
                  Hủy đơn hàng
                </button>
              )}
              {order.status === "completed" && (
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium">
                  Mua lại
                </button>
              )}
              <button className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg hover:bg-slate-600 transition-all font-medium">
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

