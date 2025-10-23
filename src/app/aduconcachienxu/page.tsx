"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/StatsCard";
import RecentOrders from "@/components/admin/RecentOrders";
import RevenueChart from "@/components/admin/RevenueChart";
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalTransactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // Simulating API call
    setTimeout(() => {
      setStats({
        totalUsers: 1234,
        totalOrders: 567,
        totalRevenue: 45678900,
        totalTransactions: 890,
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-neutral-400">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400">Tổng quan hệ thống</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng người dùng"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Tổng đơn hàng"
          value={stats.totalOrders.toLocaleString()}
          icon={ShoppingBag}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Doanh thu (Cá)"
          value={`${(stats.totalRevenue / 1000).toFixed(1)}K`}
          icon={DollarSign}
          trend="+23%"
          trendUp={true}
        />
        <StatsCard
          title="Giao dịch"
          value={stats.totalTransactions.toLocaleString()}
          icon={TrendingUp}
          trend="+5%"
          trendUp={true}
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <RecentOrders />
      </div>
    </div>
  );
}
