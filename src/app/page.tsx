import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Padding top để tránh bị navbar che */}
      <div className="pt-20 px-4">
        <main className="max-w-7xl mx-auto">
          <section className="py-12">
            <h1 className="text-4xl font-bold text-center mb-4">
              Chào mừng đến MyStore
            </h1>
            <p className="text-center text-gray-600 text-lg">
              Đây là trang chủ của bạn với Navbar phía trên
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold mb-2">Sản phẩm chất lượng</h3>
              <p className="text-gray-600">Hàng nghìn sản phẩm đa dạng</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Miễn phí vận chuyển toàn quốc</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-xl font-semibold mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Luôn sẵn sàng hỗ trợ bạn</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
