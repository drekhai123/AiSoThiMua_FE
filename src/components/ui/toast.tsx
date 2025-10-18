"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, show, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-24 right-4 z-[100] animate-in slide-in-from-top-5 fade-in">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px]">
        <div className="p-1 bg-white/20 rounded-full">
          <CheckCircle className="w-5 h-5" />
        </div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

