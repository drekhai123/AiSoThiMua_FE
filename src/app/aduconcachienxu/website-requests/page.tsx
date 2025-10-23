"use client";

import { useState } from "react";
import { Search, Mail, Phone, Globe, Briefcase, CheckCircle, Clock, XCircle, DollarSign } from "lucide-react";

interface WebsiteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  websiteType: string;
  budget: string;
  description: string;
  status: "new" | "quoted" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

export default function WebsiteRequestsPage() {
  const [requests, setRequests] = useState<WebsiteRequest[]>([
    {
      id: "WEB-001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      companyName: "ABC Fashion",
      websiteType: "Website bán hàng",
      budget: "10-20 triệu",
      description: "Cần thiết kế website bán hàng online cho cửa hàng thời trang. Yêu cầu: Responsive, tích hợp thanh toán, quản lý sản phẩm, đơn hàng.",
      status: "new",
      createdAt: "2025-10-22 15:30",
    },
    {
      id: "WEB-002",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
      companyName: "Tech Solutions Co.",
      websiteType: "Website công ty",
      budget: "15-30 triệu",
      description: "Thiết kế website giới thiệu công ty công nghệ với các chức năng: Portfolio, Tin tức, Tuyển dụng, Liên hệ. Cần có admin panel.",
      status: "quoted",
      createdAt: "2025-10-22 14:15",
    },
    {
      id: "WEB-003",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0923456789",
      companyName: "Green Farm",
      websiteType: "Website landing page",
      budget: "5-10 triệu",
      description: "Cần landing page để quảng cáo sản phẩm nông sản sạch. Yêu cầu đẹp mắt, chuyển đổi cao, tích hợp form đăng ký.",
      status: "in_progress",
      createdAt: "2025-10-21 16:45",
    },
    {
      id: "WEB-004",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0934567890",
      companyName: "Beauty Spa",
      websiteType: "Website dịch vụ",
      budget: "8-15 triệu",
      description: "Website đặt lịch hẹn spa/salon tóc. Cần chức năng booking, quản lý lịch hẹn, thanh toán online.",
      status: "quoted",
      createdAt: "2025-10-21 10:20",
    },
    {
      id: "WEB-005",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0945678901",
      companyName: "EduTech",
      websiteType: "Website giáo dục",
      budget: "20-40 triệu",
      description: "Nền tảng học online với video, bài tập, quiz, quản lý học viên. Tương tự Udemy.",
      status: "completed",
      createdAt: "2025-10-20 09:30",
    },
    {
      id: "WEB-006",
      name: "Vũ Thị F",
      email: "vuthif@example.com",
      phone: "0956789012",
      companyName: "FoodHub",
      websiteType: "Website đặt món",
      budget: "Thỏa thuận",
      description: "App đặt đồ ăn như GrabFood. Cần web admin + mobile app.",
      status: "cancelled",
      createdAt: "2025-10-19 08:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.websiteType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: WebsiteRequest["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500";
      case "quoted":
        return "bg-yellow-500/10 text-yellow-500";
      case "in_progress":
        return "bg-purple-500/10 text-purple-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getStatusIcon = (status: WebsiteRequest["status"]) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "quoted":
        return <DollarSign className="w-4 h-4" />;
      case "in_progress":
        return <Briefcase className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: WebsiteRequest["status"]) => {
    switch (status) {
      case "new":
        return "Mới";
      case "quoted":
        return "Đã báo giá";
      case "in_progress":
        return "Đang thực hiện";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
    }
  };

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "new", label: "Mới" },
    { value: "quoted", label: "Đã báo giá" },
    { value: "in_progress", label: "Đang thực hiện" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const requestCounts = {
    all: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    quoted: requests.filter((r) => r.status === "quoted").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
    cancelled: requests.filter((r) => r.status === "cancelled").length,
  };

  const handleStatusChange = (requestId: string, newStatus: WebsiteRequest["status"]) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: newStatus } : r
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Quản lý Thiết kế Website
          </h1>
          <p className="text-neutral-400">
            Tổng số: {requests.length} yêu cầu
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-center">
            <p className="text-sm text-neutral-400 mb-1">Mới</p>
            <p className="text-2xl font-bold text-blue-500">{requestCounts.new}</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 text-center">
            <p className="text-sm text-neutral-400 mb-1">Đang làm</p>
            <p className="text-2xl font-bold text-purple-500">{requestCounts.in_progress}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
            <p className="text-sm text-neutral-400 mb-1">Hoàn thành</p>
            <p className="text-2xl font-bold text-green-500">{requestCounts.completed}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, công ty hoặc loại website..."
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

      {/* Requests List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {request.name}
                  </h3>
                  {request.companyName && (
                    <span className="text-sm text-neutral-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {request.companyName}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusIcon(request.status)}
                    {getStatusText(request.status)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{request.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{request.websiteType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Ngân sách: {request.budget}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-500 block mb-1">{request.id}</span>
                <span className="text-xs text-neutral-500">{request.createdAt}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {request.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {request.status === "new" && (
                <>
                  <button
                    onClick={() => handleStatusChange(request.id, "quoted")}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Đã báo giá
                  </button>
                  <button
                    onClick={() => handleStatusChange(request.id, "cancelled")}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Từ chối
                  </button>
                </>
              )}
              {request.status === "quoted" && (
                <>
                  <button
                    onClick={() => handleStatusChange(request.id, "in_progress")}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Bắt đầu thực hiện
                  </button>
                  <button
                    onClick={() => handleStatusChange(request.id, "cancelled")}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                </>
              )}
              {request.status === "in_progress" && (
                <button
                  onClick={() => handleStatusChange(request.id, "completed")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                >
                  Hoàn thành
                </button>
              )}
              {(request.status === "completed" || request.status === "cancelled") && (
                <button
                  onClick={() => handleStatusChange(request.id, "new")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Mở lại
                </button>
              )}
              <a
                href={`mailto:${request.email}?subject=Re: ${request.websiteType} - ${request.id}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Liên hệ
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          Không tìm thấy yêu cầu nào
        </div>
      )}
    </div>
  );
}
