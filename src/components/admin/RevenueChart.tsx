"use client";

import { useState, useEffect } from "react";

export default function RevenueChart() {
  const [revenueData, setRevenueData] = useState([
    { month: "T1", value: 45 },
    { month: "T2", value: 52 },
    { month: "T3", value: 48 },
    { month: "T4", value: 61 },
    { month: "T5", value: 55 },
    { month: "T6", value: 67 },
    { month: "T7", value: 73 },
    { month: "T8", value: 69 },
    { month: "T9", value: 78 },
    { month: "T10", value: 85 },
    { month: "T11", value: 82 },
    { month: "T12", value: 95 },
  ]);

  const maxValue = Math.max(...revenueData.map((d) => d.value));

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-1">
          Doanh thu theo tháng
        </h3>
        <p className="text-sm text-neutral-400">Biểu đồ doanh thu năm 2025</p>
      </div>

      <div className="flex items-end justify-between gap-2 h-64">
        {revenueData.map((data, index) => {
          const heightPercent = (data.value / maxValue) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-300 cursor-pointer"
                  style={{ height: `${heightPercent}%` }}
                  title={`${data.month}: ${data.value}M`}
                />
              </div>
              <span className="text-xs text-neutral-400">{data.month}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-neutral-400">Đơn vị: Triệu VNĐ</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-sm" />
            <span className="text-neutral-400">Doanh thu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
