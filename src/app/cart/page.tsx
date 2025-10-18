"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Wallet,
  CheckCircle,
  AlertCircle,
  Tag,
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const applyPromoCode = () => {
    // Mock promo code validation
    if (promoCode.toUpperCase() === "SALE20") {
      setDiscount(0.2); // 20% discount
      setPromoApplied(true);
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setPromoApplied(false);
    setDiscount(0);
  };

  const handleCheckout = async () => {
    const totalPrice = getTotalPrice();
    const finalPrice = Math.round(totalPrice * (1 - discount));

    // Check if user has enough balance
    if (!user || user.balance < finalPrice) {
      alert("Số dư không đủ! Vui lòng nạp thêm tiền vào ví.");
      router.push("/wallet");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Call API to create order and deduct balance
    console.log("Processing payment:", {
      items,
      totalPrice: finalPrice,
      discount,
      promoCode: promoApplied ? promoCode : null,
    });

    setIsProcessing(false);
    clearCart();
    router.push("/orders");
  };

  const subtotal = getTotalPrice();
  const discountAmount = Math.round(subtotal * discount);
  const total = subtotal - discountAmount;

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Giỏ hàng</h1>
          <p className="text-gray-400">
            Bạn có {getTotalItems()} sản phẩm trong giỏ hàng
          </p>
        </div>

        {items.length === 0 ? (
          // Empty Cart
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800 mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-400 mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold"
            >
              Khám phá sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start gap-6">
                    {/* Product Logo */}
                    <div className="w-24 h-24 rounded-lg p-3 flex-shrink-0">
                      <Image
                        src={item.logo}
                        alt={item.name}
                        width={72}
                        height={72}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 text-sm">Số lượng:</span>
                          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white font-semibold min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 hover:bg-slate-600 rounded flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-gray-400 text-sm mb-1">
                            {item.price.toLocaleString()} Cá × {item.quantity}
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {(item.price * item.quantity).toLocaleString()} Cá
                          </p>
                          <p className="text-purple-400 text-sm">
                            {item.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-medium"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Xóa toàn bộ giỏ hàng
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Thông tin đơn hàng
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-gray-300 font-medium mb-2">
                    Mã giảm giá
                  </label>
                  {!promoApplied ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={applyPromoCode}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium"
                      >
                        Áp dụng
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">{promoCode}</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Thử mã: <span className="text-purple-400 font-medium">SALE20</span> để giảm 20%
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Tạm tính:</span>
                    <span className="font-semibold">
                      {subtotal.toLocaleString()} Cá
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex items-center justify-between text-green-400">
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Giảm giá ({discount * 100}%):
                      </span>
                      <span className="font-semibold">
                        -{discountAmount.toLocaleString()} Cá
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-slate-700"></div>

                  <div className="flex items-center justify-between text-white text-xl">
                    <span className="font-bold">Tổng cộng:</span>
                    <div className="text-right">
                      <p className="font-bold text-2xl">
                        {total.toLocaleString()} Cá
                      </p>
                      <p className="text-gray-400 text-sm">
                        ≈ {(total * 1000).toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Balance */}
                <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Số dư ví:</span>
                    <span className="text-white font-semibold">
                      {user?.balance?.toLocaleString() || 0} Cá
                    </span>
                  </div>
                  {user && user.balance < total && (
                    <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Số dư không đủ. Vui lòng nạp thêm tiền.</span>
                    </div>
                  )}
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3">
                  {user && user.balance >= total ? (
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Thanh toán ngay
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push("/wallet")}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-5 h-5" />
                      Nạp tiền vào ví
                    </button>
                  )}

                  <button
                    onClick={() => router.push("/products")}
                    className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all font-medium"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>

                {/* Payment Info */}
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">
                        Thanh toán an toàn
                      </h4>
                      <p className="text-gray-300 text-xs">
                        Thanh toán bằng số dư Cá trong ví của bạn.
                        Giao dịch được mã hóa và bảo mật 100%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

