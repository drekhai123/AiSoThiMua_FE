"use client";

import { useState } from "react";
import { Search, Eye, Package, CheckCircle, XCircle, X, Edit2, Mail, Phone } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: string[];
  amount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus: "paid" | "unpaid";
  createdAt: string;
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Nguyễn Văn A",
      customerEmail: "nguyenvana@example.com",
      products: ["ChatGPT Plus", "GitHub Copilot"],
      amount: 498000,
      status: "completed",
      paymentStatus: "paid",
      createdAt: "2025-10-22",
    },
    {
      id: "ORD-002",
      customerName: "Trần Thị B",
      customerEmail: "tranthib@example.com",
      products: ["Claude Pro"],
      amount: 399000,
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2025-10-22",
    },
    {
      id: "ORD-003",
      customerName: "Lê Văn C",
      customerEmail: "levanc@example.com",
      products: ["Midjourney Standard", "Notion AI"],
      amount: 798000,
      status: "processing",
      paymentStatus: "paid",
      createdAt: "2025-10-21",
    },
    {
      id: "ORD-004",
      customerName: "Phạm Thị D",
      customerEmail: "phamthid@example.com",
      products: ["Canva Pro"],
      amount: 249000,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: "2025-10-21",
    },
    {
      id: "ORD-005",
      customerName: "Hoàng Văn E",
      customerEmail: "hoangvane@example.com",
      products: ["Google Gemini Advanced"],
      amount: 449000,
      status: "cancelled",
      paymentStatus: "unpaid",
      createdAt: "2025-10-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "processing":
        return "bg-yellow-500/10 text-yellow-500";
      case "pending":
        return "bg-orange-500/10 text-orange-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
      case "pending":
        return <Package className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "processing":
        return "Đang xử lý";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
    }
  };

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "pending", label: "Chờ xử lý" },
    { value: "processing", label: "Đang xử lý" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleChangeStatus = (newStatus: Order["status"]) => {
    if (!selectedOrder) return;
    
    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus }
        : order
    ));
    setShowStatusModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Quản lý Orders</h1>
        <p className="text-neutral-400">Tổng số: {orders.length} đơn hàng</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-blue-600"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Mã đơn
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Khách hàng
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Sản phẩm
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Tổng tiền
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Thanh toán
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Ngày đặt
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-300">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {order.customerEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-400">
                      {order.products.join(", ")}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">
                      {order.amount.toLocaleString('vi-VN')} Cá
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === "paid"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleViewDetail(order)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(order)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        title="Cập nhật trạng thái"
                      >
                        <Edit2 className="w-4 h-4 text-green-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            Không tìm thấy đơn hàng nào
          </div>
        )}
      </div>

      {/* Modal Chi tiết đơn hàng */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDetailModal(false)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Chi tiết đơn hàng</h3>
                <p className="text-sm text-neutral-400 mt-1">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-neutral-800 rounded-lg">
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Thông tin khách hàng */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Thông tin khách hàng</h4>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {selectedOrder.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{selectedOrder.customerName}</p>
                      <p className="text-sm text-neutral-400">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <a href={`mailto:${selectedOrder.customerEmail}`} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                      <Mail className="w-4 h-4" />
                      Gửi email
                    </a>
                  </div>
                </div>
              </div>

              {/* Sản phẩm */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Sản phẩm</h4>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg divide-y divide-neutral-700">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="p-4">
                      <p className="text-white font-medium">{product}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thông tin đơn hàng */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Thông tin đơn hàng</h4>
                <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Mã đơn</span>
                    <span className="text-white font-semibold">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Ngày đặt</span>
                    <span className="text-white">{selectedOrder.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Trạng thái</span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Thanh toán</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOrder.paymentStatus === "paid"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}>
                      {selectedOrder.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </span>
                  </div>
                  <div className="border-t border-neutral-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-white">Tổng tiền</span>
                      <span className="text-2xl font-bold text-blue-500">{selectedOrder.amount.toLocaleString('vi-VN')} Cá</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowDetailModal(false);
                    handleUpdateStatus(selectedOrder);
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cập nhật trạng thái
                </button>
                <a
                  href={`mailto:${selectedOrder.customerEmail}`}
                  className="flex-1 px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors text-center"
                >
                  Liên hệ khách hàng
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cập nhật trạng thái */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowStatusModal(false)}>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-800">
              <h3 className="text-xl font-bold text-white">Cập nhật trạng thái</h3>
              <p className="text-sm text-neutral-400 mt-1">Đơn hàng: {selectedOrder.id}</p>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-sm text-neutral-400 mb-4">Chọn trạng thái mới cho đơn hàng</p>
              
              <button
                onClick={() => handleChangeStatus("pending")}
                className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                  selectedOrder.status === "pending" 
                    ? "bg-orange-500/20 border-2 border-orange-500" 
                    : "bg-neutral-800 hover:bg-neutral-700 border-2 border-transparent"
                }`}
              >
                <Package className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-white">Chờ xử lý</p>
                  <p className="text-xs text-neutral-400">Đơn hàng mới, chưa xử lý</p>
                </div>
              </button>

              <button
                onClick={() => handleChangeStatus("processing")}
                className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                  selectedOrder.status === "processing" 
                    ? "bg-yellow-500/20 border-2 border-yellow-500" 
                    : "bg-neutral-800 hover:bg-neutral-700 border-2 border-transparent"
                }`}
              >
                <Package className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-white">Đang xử lý</p>
                  <p className="text-xs text-neutral-400">Đang chuẩn bị đơn hàng</p>
                </div>
              </button>

              <button
                onClick={() => handleChangeStatus("completed")}
                className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                  selectedOrder.status === "completed" 
                    ? "bg-green-500/20 border-2 border-green-500" 
                    : "bg-neutral-800 hover:bg-neutral-700 border-2 border-transparent"
                }`}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-white">Hoàn thành</p>
                  <p className="text-xs text-neutral-400">Đơn hàng đã giao thành công</p>
                </div>
              </button>

              <button
                onClick={() => handleChangeStatus("cancelled")}
                className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                  selectedOrder.status === "cancelled" 
                    ? "bg-red-500/20 border-2 border-red-500" 
                    : "bg-neutral-800 hover:bg-neutral-700 border-2 border-transparent"
                }`}
              >
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-white">Đã hủy</p>
                  <p className="text-xs text-neutral-400">Đơn hàng bị hủy</p>
                </div>
              </button>
            </div>
            <div className="p-6 border-t border-neutral-800">
              <button
                onClick={() => setShowStatusModal(false)}
                className="w-full px-4 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
