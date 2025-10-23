"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Đã có lỗi xảy ra
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Xin lỗi vì sự bất tiện này. Chúng tôi đang làm việc để khắc phục vấn đề.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-white font-semibold mb-2">Error Details:</h3>
            <pre className="text-red-400 text-sm overflow-x-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-gray-400 text-xs mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Thử lại
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
