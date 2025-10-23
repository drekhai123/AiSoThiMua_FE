"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
} from "lucide-react";

interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: "deposit";
  amount: number;
  status: "success" | "pending" | "failed";
  method: "bank_transfer" | "momo" | "zalopay";
  description: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN-001",
      userId: "U001",
      userName: "Nguyễn Văn A",
      type: "deposit",
      amount: 5000,
      status: "success",
      method: "bank_transfer",
      description: "Nạp tiền vào ví qua chuyển khoản ngân hàng",
      createdAt: "2025-10-22 14:30",
    },
    {
      id: "TXN-002",
      userId: "U002",
      userName: "Trần Thị B",
      type: "deposit",
      amount: 3000,
      status: "success",
      method: "momo",
      description: "Nạp tiền vào ví qua MoMo",
      createdAt: "2025-10-22 13:15",
    },
    {
      id: "TXN-003",
      userId: "U003",
      userName: "Lê Văn C",
      type: "deposit",
      amount: 10000,
      status: "pending",
      method: "bank_transfer",
      description: "Nạp tiền vào ví qua chuyển khoản ngân hàng",
      createdAt: "2025-10-21 16:45",
    },
    {
      id: "TXN-004",
      userId: "U004",
      userName: "Phạm Thị D",
      type: "deposit",
      amount: 2000,
      status: "success",
      method: "zalopay",
      description: "Nạp tiền vào ví qua ZaloPay",
      createdAt: "2025-10-21 10:20",
    },
    {
      id: "TXN-005",
      userId: "U001",
      userName: "Nguyễn Văn A",
      type: "deposit",
      amount: 7500,
      status: "success",
      method: "momo",
      description: "Nạp tiền vào ví qua MoMo",
      createdAt: "2025-10-20 09:30",
    },
    {
      id: "TXN-006",
      userId: "U005",
      userName: "Hoàng Văn E",
      type: "deposit",
      amount: 15000,
      status: "failed",
      method: "bank_transfer",
      description: "Nạp tiền vào ví qua chuyển khoản ngân hàng",
      createdAt: "2025-10-20 08:00",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getTypeColor = (type: Transaction["type"]) => {
    return "bg-green-500/10 text-green-500";
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    return <ArrowDownLeft className="w-4 h-4" />;
  };

  const getTypeText = (type: Transaction["type"]) => {
    return "Nạp tiền";
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-neutral-500/10 text-neutral-500";
    }
  };

  const getStatusText = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return "Thành công";
      case "pending":
        return "Đang xử lý";
      case "failed":
        return "Thất bại";
    }
  };

  const getMethodText = (method: Transaction["method"]) => {
    switch (method) {
      case "bank_transfer":
        return "Ngân hàng";
      case "momo":
        return "MoMo";
      case "zalopay":
        return "ZaloPay";
    }
  };


  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "success", label: "Thành công" },
    { value: "pending", label: "Đang xử lý" },
    { value: "failed", label: "Thất bại" },
  ];

  const totalAmount = filteredTransactions
    .filter((txn) => txn.status === "success")
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Quản lý Nạp tiền
          </h1>
          <p className="text-neutral-400">
            Tổng số: {transactions.length} giao dịch nạp tiền
          </p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
          <p className="text-sm text-neutral-400 mb-1">Tổng tiền nạp</p>
          <p className="text-2xl font-bold text-green-500">
            {totalAmount.toLocaleString()} Cá
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã giao dịch hoặc tên người dùng..."
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

      {/* Transactions Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Mã GD
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Người dùng
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Số tiền (Cá)
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Phương thức
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Mô tả
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{txn.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{txn.userName}</p>
                      <p className="text-xs text-neutral-400">{txn.userId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-500">
                      +{txn.amount.toLocaleString()} Cá
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral-400">
                      {getMethodText(txn.method)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        txn.status
                      )}`}
                    >
                      {getStatusText(txn.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-400">
                      {txn.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {txn.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            Không tìm thấy giao dịch nạp tiền nào
          </div>
        )}
      </div>
    </div>
  );
}
