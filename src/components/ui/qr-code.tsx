"use client";

import { useEffect, useRef } from "react";

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export default function QRCode({ value, size = 200, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simple QR code pattern (this is a mock implementation)
    // In a real app, you'd use a proper QR code library like qrcode.js
    const cellSize = size / 25; // 25x25 grid
    const padding = 10;

    // Clear canvas
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Draw border
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(padding, padding, size - padding * 2, size - padding * 2);

    // Draw QR pattern (simplified)
    ctx.fillStyle = "#000000";

    // Corner squares
    const drawCornerSquare = (x: number, y: number) => {
      const squareSize = cellSize * 7;
      ctx.fillRect(x, y, squareSize, squareSize);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
      ctx.fillStyle = "#000000";
      ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
    };

    // Top-left corner
    drawCornerSquare(padding + cellSize, padding + cellSize);
    // Top-right corner
    drawCornerSquare(padding + cellSize * 17, padding + cellSize);
    // Bottom-left corner
    drawCornerSquare(padding + cellSize, padding + cellSize * 17);

    // Draw some random pattern in the middle (simplified)
    for (let i = 0; i < 100; i++) {
      const x = padding + cellSize * (Math.floor(Math.random() * 20) + 2);
      const y = padding + cellSize * (Math.floor(Math.random() * 20) + 2);

      if (Math.random() > 0.5) {
        ctx.fillRect(x, y, cellSize, cellSize);
      }
    }

    // Add text
    ctx.fillStyle = "#000000";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("2FA Setup", size / 2, size - 5);

  }, [value, size]);

  return (
    <div className={`inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="border border-slate-300 rounded-lg"
      />
    </div>
  );
}
