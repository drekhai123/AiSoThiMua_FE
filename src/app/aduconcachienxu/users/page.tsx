"use client";

import { useState } from "react";
import { Search, Plus, Edit, Trash2, Mail, Phone, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "U001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      role: "user",
      status: "active",
      createdAt: "2025-01-15",
    },
    {
      id: "U002",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
      role: "user",
      status: "active",
      createdAt: "2025-02-20",
    },
    {
      id: "U003",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0923456789",
      role: "admin",
      status: "active",
      createdAt: "2025-01-10",
    },
    {
      id: "U004",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0934567890",
      role: "user",
      status: "inactive",
      createdAt: "2025-03-05",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: User["role"]) => {
    return role === "admin"
      ? "bg-purple-500/10 text-purple-500"
      : "bg-blue-500/10 text-blue-500";
  };

  const getStatusColor = (status: User["status"]) => {
    return status === "active"
      ? "bg-green-500/10 text-green-500"
      : "bg-red-500/10 text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý Users</h1>
          <p className="text-neutral-400">
            Tổng số: {users.length} người dùng
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          <span>Thêm User</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-600"
        />
      </div>

      {/* Users Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-800/50 border-b border-neutral-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  ID
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Thông tin
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Liên hệ
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Vai trò
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Trạng thái
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-300">
                  Ngày tạo
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-300">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {user.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role === "admin" && (
                        <Shield className="w-3 h-3" />
                      )}
                      {user.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </button>
                      <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            Không tìm thấy người dùng nào
          </div>
        )}
      </div>
    </div>
  );
}
