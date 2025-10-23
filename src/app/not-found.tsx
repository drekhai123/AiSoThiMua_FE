import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text mb-4">
            404
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Không tìm thấy trang
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 mb-8">
          <h2 className="text-white font-semibold text-xl mb-4">
            Bạn có thể thử:
          </h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5 text-purple-400" />
              Quay lại trang trước
            </li>
            <li className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5 text-blue-400" />
              Về trang chủ
            </li>
            <li className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-green-400" />
              Tìm kiếm sản phẩm
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </div>
  );
}
