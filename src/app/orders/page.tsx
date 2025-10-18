"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Order, OrderStatus } from "@/types/order";
import OrderCard from "@/components/orders/OrderCard";
import { Package, Search } from "lucide-react";

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    items: [
      {
        id: "1",
        productId: "1",
        productName: "ChatGPT Plus",
        productLogo: "/techlogos/openai.svg",
        price: 299000,
        duration: "/tháng",
        quantity: 1,
      },
    ],
    totalAmount: 299000,
    status: "completed",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    paymentMethod: "Chuyển khoản ngân hàng",
    deliveryEmail: "user@example.com",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    items: [
      {
        id: "2",
        productId: "6",
        productName: "Canva Pro",
        productLogo: "/techlogos/canva.svg",
        price: 249000,
        duration: "/tháng",
        quantity: 1,
      },
      {
        id: "3",
        productId: "8",
        productName: "YouTube Premium",
        productLogo: "/techlogos/youtube.svg",
        price: 179000,
        duration: "/tháng",
        quantity: 1,
      },
    ],
    totalAmount: 428000,
    status: "processing",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    paymentMethod: "Chuyển khoản ngân hàng",
    deliveryEmail: "user@example.com",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    items: [
      {
        id: "4",
        productId: "3",
        productName: "Midjourney Standard",
        productLogo: "/techlogos/midjourney.svg",
        price: 599000,
        duration: "/tháng",
        quantity: 1,
      },
    ],
    totalAmount: 599000,
    status: "pending",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    paymentMethod: "Chuyển khoản ngân hàng",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    items: [
      {
        id: "5",
        productId: "4",
        productName: "GitHub Copilot",
        productLogo: "/techlogos/github.svg",
        price: 199000,
        duration: "/tháng",
        quantity: 1,
      },
    ],
    totalAmount: 199000,
    status: "cancelled",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-11"),
    paymentMethod: "Chuyển khoản ngân hàng",
  },
];

const STATUS_FILTERS = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [orders] = useState<Order[]>(MOCK_ORDERS);

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  // Get order counts by status
  const orderCounts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };
  }, [orders]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Đơn hàng của tôi</h1>
          <p className="text-gray-400">
            Quản lý và theo dõi tất cả đơn hàng của bạn
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng theo mã hoặc tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedStatus(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedStatus === filter.value
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-lg shadow-purple-500/30"
                    : "bg-slate-800 text-gray-300 border-slate-700 hover:border-purple-500 hover:bg-slate-700"
                  }`}
              >
                {filter.label}
                {orderCounts[filter.value as keyof typeof orderCounts] > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/10 text-xs">
                    {orderCounts[filter.value as keyof typeof orderCounts]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-4">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || selectedStatus !== "all"
                ? "Không có đơn hàng nào phù hợp với bộ lọc của bạn"
                : "Bạn chưa có đơn hàng nào"}
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
            >
              Khám phá sản phẩm
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

