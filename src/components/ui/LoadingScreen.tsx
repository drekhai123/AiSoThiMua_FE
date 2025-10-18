"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onLoadingComplete?.();
            }, 300);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with Animation */}
        <div className="relative">
          {/* Spinning Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-spin blur-sm" 
               style={{ width: '160px', height: '160px', margin: '-10px' }}>
          </div>
          
          {/* Logo Container */}
          <div className="relative w-36 h-36 bg-slate-900 rounded-full flex items-center justify-center animate-pulse">
            <div className="relative w-24 h-24">
              <Image
                src="/logos/ASTM.svg"
                alt="ASTM Logo"
                fill
                className="object-contain animate-bounce"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
            Đang tải...
          </h2>
          <p className="text-gray-400 text-sm">
            Vui lòng đợi trong giây lát
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage */}
        <div className="text-purple-400 font-semibold text-lg">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}
