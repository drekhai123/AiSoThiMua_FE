import { Wallet, Gift, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const WalletPromo = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
                <Wallet className="w-4 h-4 text-purple-400" />
                <span className="text-purple-400 font-semibold text-sm">Hệ thống ví Cá</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Thanh toán dễ dàng với{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  đơn vị Cá
                </span>
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Nạp tiền vào ví, nhận ngay Cá để mua sắm.
                Càng nạp nhiều, càng nhận được bonus hấp dẫn lên đến <span className="text-green-400 font-semibold">15%</span>!
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Quy đổi dễ dàng</p>
                    <p className="text-gray-400 text-sm">1,000 VNĐ = 1 Cá</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Gift className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Nhận bonus hấp dẫn</p>
                    <p className="text-gray-400 text-sm">Từ 5% đến 15% khi nạp tiền</p>
                  </div>
                </div>
              </div>

              <Link
                href="/wallet"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                Nạp tiền ngay
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Pricing Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Nạp</p>
                  <p className="text-4xl font-bold text-white mb-1">200</p>
                  <p className="text-purple-400 font-semibold mb-3">Cá</p>
                  <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-xs font-medium">+15 Cá bonus</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500 rounded-lg p-6 shadow-lg">
                <div className="text-center">
                  <p className="text-purple-100 text-sm mb-2">Nạp</p>
                  <p className="text-4xl font-bold text-white mb-1">500</p>
                  <p className="text-purple-100 font-semibold mb-3">Cá</p>
                  <div className="p-2 bg-white/20 rounded-lg">
                    <p className="text-white text-xs font-bold">+50 Cá bonus</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Nạp</p>
                  <p className="text-4xl font-bold text-white mb-1">1,000</p>
                  <p className="text-purple-400 font-semibold mb-3">Cá</p>
                  <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-xs font-medium">+120 Cá bonus</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-all">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">Nạp</p>
                  <p className="text-4xl font-bold text-white mb-1">2,000</p>
                  <p className="text-purple-400 font-semibold mb-3">Cá</p>
                  <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-xs font-medium">+300 Cá bonus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletPromo;

