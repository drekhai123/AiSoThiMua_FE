"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X, Gift, TrendingUp, Sparkles } from "lucide-react";

interface DepositSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  bonus: number;
  total: number;
}

export default function DepositSuccessModal({
  isOpen,
  onClose,
  amount,
  bonus,
  total,
}: DepositSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateNumbers, setAnimateNumbers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setAnimateNumbers(true), 200);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setShowConfetti(false);
      setAnimateNumbers(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: [
      "bg-purple-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-cyan-500",
    ][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiParticles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute w-2 h-2 ${particle.color} rounded-full animate-confetti`}
              style={{
                left: `${particle.left}%`,
                top: "-10px",
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                transform: `rotate(${particle.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modal-enter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-500 rounded-full p-6">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
            Nạp tiền thành công! 🎉
          </h2>
          <p className="text-gray-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Cá đã được cộng vào ví của bạn
          </p>
        </div>

        {/* Amount Details */}
        <div className="space-y-4 mb-8">
          {/* Main Amount */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Số Cá nạp</span>
              </div>
              <div className="text-right">
                <p
                  className={`text-3xl font-bold text-white ${
                    animateNumbers ? "animate-number-count" : ""
                  }`}
                >
                  {amount}
                </p>
                <p className="text-purple-400 text-sm font-semibold">Cá</p>
              </div>
            </div>
          </div>

          {/* Bonus */}
          {bonus > 0 && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Bonus thưởng</span>
                </div>
                <div className="text-right">
                  <p
                    className={`text-3xl font-bold text-yellow-400 ${
                      animateNumbers ? "animate-number-count" : ""
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    +{bonus}
                  </p>
                  <p className="text-yellow-400 text-sm font-semibold">Cá</p>
                </div>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/50 rounded-xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-green-400" />
                <span className="text-white font-bold text-lg">Tổng nhận được</span>
              </div>
              <div className="text-right">
                <p
                  className={`text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent ${
                    animateNumbers ? "animate-number-count" : ""
                  }`}
                  style={{ animationDelay: "0.4s" }}
                >
                  {total}
                </p>
                <p className="text-green-400 text-sm font-semibold">Cá</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all font-semibold text-lg shadow-lg hover:shadow-purple-500/50 hover:scale-105 transform"
          >
            Tuyệt vời! 🎊
          </button>
          <button
            onClick={() => {
              onClose();
              window.location.href = "/products";
            }}
            className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-medium"
          >
            Mua sắm ngay
          </button>
        </div>

        {/* Fun Message */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm animate-fade-in" style={{ animationDelay: "0.6s" }}>
            ✨ Bạn đã sẵn sàng khám phá các sản phẩm tuyệt vời!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes modal-enter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes number-count {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-number-count {
          animation: number-count 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
