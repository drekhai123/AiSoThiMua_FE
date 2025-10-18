import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">Ưu đãi đặc biệt</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sẵn sàng trải nghiệm công nghệ AI?
          </h2>

          <p className="text-purple-100 text-lg mb-8 leading-relaxed">
            Đăng ký ngay hôm nay để nhận <span className="font-bold text-white">50 Cá miễn phí</span> và
            bắt đầu hành trình khám phá các công nghệ AI hàng đầu thế giới
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              Đăng ký miễn phí
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold text-lg"
            >
              Xem sản phẩm
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 flex items-center justify-center gap-8 text-purple-100 text-sm">
            <div className="flex items-center gap-2">
              ✓ Miễn phí đăng ký
            </div>
            <div className="flex items-center gap-2">
              ✓ Tặng 50 Cá
            </div>
            <div className="flex items-center gap-2">
              ✓ Không cần thẻ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

