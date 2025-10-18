"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FlyToCartProps {
  productLogo: string;
  productName: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
}

export function FlyToCart({
  productLogo,
  productName,
  startPosition,
  endPosition,
  onComplete,
}: FlyToCartProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  const deltaX = endPosition.x - startPosition.x;
  const deltaY = endPosition.y - startPosition.y;

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: `${startPosition.x}px`,
        top: `${startPosition.y}px`,
        animation: `flyToCart 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)`,
        transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`,
      }}
    >
      <div className="w-16 h-16 rounded-lg p-2 shadow-2xl">
        <Image
          src={productLogo}
          alt={productName}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <style jsx>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(${deltaX}px, ${deltaY}px) scale(0.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

