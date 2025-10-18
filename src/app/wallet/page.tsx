"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet, Plus, TrendingUp, History, CreditCard, Gift } from "lucide-react";
import { DepositPackage, Transaction } from "@/types/wallet";

// Mock deposit packages
const DEPOSIT_PACKAGES: DepositPackage[] = [
  {
    id: "1",
    amount: 50,
    amountVND: 50000,
    bonus: 0,
  },
  {
    id: "2",
    amount: 100,
    amountVND: 100000,
    bonus: 5,
  },
  {
    id: "3",
    amount: 200,
    amountVND: 200000,
    bonus: 15,
    popular: true,
  },
  {
    id: "4",
    amount: 500,
    amountVND: 500000,
    bonus: 50,
    popular: true,
  },
  {
    id: "5",
    amount: 1000,
    amountVND: 1000000,
    bonus: 120,
  },
  {
    id: "6",
    amount: 2000,
    amountVND: 2000000,
    bonus: 300,
  },
];

// Mock transaction history
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: 200,
    amountVND: 200000,
    description: "Nạp tiền vào ví",
    status: "completed",
    createdAt: new Date("2024-01-20"),
    paymentMethod: "Chuyển khoản ngân hàng",
  },
  {
    id: "2",
    type: "purchase",
    amount: -299,
    amountVND: 0,
    description: "Mua ChatGPT Plus",
    status: "completed",
    createdAt: new Date("2024-01-19"),
    orderId: "ORD-2024-001",
  },
  {
    id: "3",
    type: "bonus",
    amount: 50,
    amountVND: 0,
    description: "Thưởng nạp tiền lần đầu",
    status: "completed",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    type: "deposit",
    amount: 500,
    amountVND: 500000,
    description: "Nạp tiền vào ví",
    status: "completed",
    createdAt: new Date("2024-01-15"),
    paymentMethod: "Chuyển khoản ngân hàng",
  },
];

const TRANSACTION_ICONS = {
  deposit: { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
  purchase: { icon: CreditCard, color: "text-red-400", bg: "bg-red-500/10" },
  refund: { icon: Plus, color: "text-blue-400", bg: "bg-blue-500/10" },
  bonus: { icon: Gift, color: "text-yellow-400", bg: "bg-yellow-500/10" },
};

export default function WalletPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [customError, setCustomError] = useState("");

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const handleDeposit = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowDepositModal(true);
    // TODO: Implement deposit logic
  };

  const calculateBonus = (amount: number) => {
    if (amount >= 2000) return Math.floor(amount * 0.15);
    if (amount >= 1000) return Math.floor(amount * 0.12);
    if (amount >= 500) return Math.floor(amount * 0.10);
    if (amount >= 200) return Math.floor(amount * 0.075);
    if (amount >= 100) return Math.floor(amount * 0.05);
    return 0;
  };

  const handleCustomDeposit = () => {
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount < 20) {
      setCustomError("Số tiền tối thiểu là 20 Cá (20,000 VNĐ)");
      return;
    }
    setCustomError("");
    // TODO: Implement custom deposit logic
    console.log("Custom deposit:", amount, "Cá");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Ví của tôi</h1>
          <p className="text-gray-400">
            Quản lý số dư và giao dịch của bạn
          </p>
        </div>

        {/* Balance Card */}
        <div className="mb-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-6 h-6 text-white" />
                <p className="text-purple-100 text-lg">Số dư hiện tại</p>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-5xl font-bold text-white">
                  {user?.balance?.toLocaleString() || 0}
                </h2>
                <span className="text-2xl font-semibold text-purple-100">Cá</span>
              </div>
              <p className="text-purple-100 mt-2">
                ≈ {((user?.balance || 0) * 1000).toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        </div>

        {/* Quy đổi Info */}
        <div className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Gift className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-3 text-lg">Quy đổi & Ưu đãi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">
                    <span className="text-purple-400 font-bold text-lg">1,000 VNĐ = 1 Cá</span>
                  </p>
                  <p className="text-gray-400 text-xs">Tối thiểu nạp: 20,000 VNĐ (20 Cá)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-300 text-sm">• Nạp từ 100 Cá: <span className="text-green-400 font-semibold">+5%</span></p>
                  <p className="text-gray-300 text-sm">• Nạp từ 200 Cá: <span className="text-green-400 font-semibold">+7.5%</span></p>
                  <p className="text-gray-300 text-sm">• Nạp từ 500 Cá: <span className="text-green-400 font-semibold">+10%</span></p>
                  <p className="text-gray-300 text-sm">• Nạp từ 1,000 Cá: <span className="text-green-400 font-semibold">+12%</span></p>
                  <p className="text-gray-300 text-sm">• Nạp từ 2,000 Cá: <span className="text-green-400 font-semibold">+15%</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deposit Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Custom Amount */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Nạp tiền tùy chỉnh
              </h2>
              <p className="text-gray-400 mb-6">
                Nhập số Cá bạn muốn nạp (tối thiểu 20 Cá)
              </p>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      Số Cá muốn nạp
                    </label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setCustomError("");
                      }}
                      placeholder="Nhập số Cá (tối thiểu 20)"
                      min="20"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                    />
                    {customError && (
                      <p className="text-red-400 text-sm mt-2">{customError}</p>
                    )}
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-1">Số tiền cần thanh toán:</p>
                        <p className="text-3xl font-bold text-white">
                          {customAmount ? (parseFloat(customAmount) * 1000).toLocaleString() : "0"}đ
                        </p>
                      </div>
                      {customAmount && parseFloat(customAmount) >= 20 && (
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-green-400 text-sm flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            Bonus: +{calculateBonus(parseFloat(customAmount))} Cá
                          </p>
                          <p className="text-white font-semibold mt-1">
                            Tổng nhận: {parseFloat(customAmount) + calculateBonus(parseFloat(customAmount))} Cá
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCustomDeposit}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold text-lg"
                >
                  Nạp tiền ngay
                </button>
              </div>
            </div>

            {/* Deposit Packages */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Gói nạp tiền nhanh
              </h2>
              <p className="text-gray-400 mb-6">
                Chọn gói có sẵn để nạp tiền nhanh chóng
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEPOSIT_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative p-5 rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${pkg.popular
                      ? "border-purple-500 bg-gradient-to-br from-purple-500/10 to-blue-500/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                      }`}
                    onClick={() => handleDeposit(pkg.id)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
                        PHỔ BIẾN
                      </div>
                    )}

                    <div className="text-center">
                      <div className="mb-3">
                        <p className="text-3xl font-bold text-white mb-1">
                          {pkg.amount}
                        </p>
                        <p className="text-purple-400 font-semibold text-sm">Cá</p>
                      </div>

                      {pkg.bonus > 0 && (
                        <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-yellow-400 text-xs font-medium flex items-center justify-center gap-1">
                            <Gift className="w-3 h-3" />
                            +{pkg.bonus} Cá
                          </p>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-xl font-bold text-white mb-1">
                          {pkg.amountVND.toLocaleString()}đ
                        </p>
                        {pkg.bonus > 0 && (
                          <p className="text-green-400 text-xs">
                            Nhận: {pkg.amount + pkg.bonus} Cá
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <History className="w-5 h-5" />
                Lịch sử giao dịch
              </h3>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {MOCK_TRANSACTIONS.map((tx) => {
                  const iconConfig = TRANSACTION_ICONS[tx.type];
                  const Icon = iconConfig.icon;

                  return (
                    <div
                      key={tx.id}
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${iconConfig.bg}`}>
                          <Icon className={`w-5 h-5 ${iconConfig.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium mb-1">
                            {tx.description}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {formatDate(tx.createdAt)}
                          </p>
                          {tx.paymentMethod && (
                            <p className="text-gray-500 text-xs mt-1">
                              {tx.paymentMethod}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-bold ${tx.amount > 0 ? "text-green-400" : "text-red-400"
                              }`}
                          >
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount} Cá
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${tx.status === "completed"
                              ? "bg-green-500/10 text-green-400"
                              : tx.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                              }`}
                          >
                            {tx.status === "completed"
                              ? "Hoàn thành"
                              : tx.status === "pending"
                                ? "Đang xử lý"
                                : "Thất bại"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

