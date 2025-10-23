"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Nguyễn Văn A",
      amount: 498000,
      status: "completed",
      date: "2025-10-22",
    },
    {
      id: "ORD-002",
      customerName: "Trần Thị B",
      amount: 399000,
      status: "pending",
      date: "2025-10-22",
    },
    {
      id: "ORD-003",
      customerName: "Lê Văn C",
      amount: 798000,
      status: "completed",
      date: "2025-10-21",
    },
    {
      id: "ORD-004",
      customerName: "Phạm Thị D",
      amount: 249000,
      status: "cancelled",
      date: "2025-10-21",
    },
    {
      id: "ORD-005",
      customerName: "Hoàng Văn E",
      amount: 449000,
      status: "pending",
      date: "2025-10-20",
    },
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Đơn hàng gần đây
        </h3>
        <p className="text-sm text-neutral-400">5 đơn hàng mới nhất</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-medium text-white">{order.customerName}</p>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <p className="text-sm text-neutral-400">
                {order.id} • {order.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-white">
                {order.amount.toLocaleString()} Cá
              </p>
              <button className="p-2 hover:bg-neutral-700 rounded-lg transition-colors">
                <Eye className="w-4 h-4 text-neutral-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">
          Xem tất cả đơn hàng →
        </button>
      </div>
    </div>
  );
}
