import { Shield, Zap, Heart, TrendingUp, Award, CheckCircle, Star, Code, Palette, Smartphone } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về AiSoThiMua - Cung cấp tài khoản AI & thiết kế website chuyên nghiệp",
  description: "Nền tảng cung cấp tài khoản AI & công nghệ hàng đầu và thiết kế website chuyên nghiệp tại Việt Nam. Với hơn 10,000+ khách hàng tin tưởng, cam kết mang đến giải pháp công nghệ tốt nhất.",
  keywords: ["tài khoản AI", "thiết kế website", "công nghệ", "AI tools", "web design", "OpenAI", "Canva", "GitHub"],
  openGraph: {
    title: "Về AiSoThiMua - Nền tảng AI & thiết kế website hàng đầu",
    description: "Cung cấp tài khoản AI, công nghệ cao cấp và dịch vụ thiết kế website chuyên nghiệp với 10,000+ khách hàng tin tưởng.",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: Shield,
    title: "Tài khoản AI & Tech",
    description: "Cung cấp tài khoản các nền tảng AI và công nghệ cao cấp với giá tốt nhất",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "Thiết kế Website",
    description: "Thiết kế website chuyên nghiệp, hiện đại, tối ưu SEO và trải nghiệm người dùng",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Thiết kế giao diện đẹp mắt, thân thiện và dễ sử dụng cho mọi nền tảng",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Smartphone,
    title: "Web Responsive",
    description: "Website hoạt động mượt mà trên mọi thiết bị: Desktop, Tablet, Mobile",
    color: "from-green-500 to-emerald-500",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Giao hàng nhanh chóng",
    description: "Nhận tài khoản ngay sau thanh toán, website giao trong 7-14 ngày",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: Heart,
    title: "Hỗ trợ tận tâm",
    description: "Đội ngũ hỗ trợ 24/7, tư vấn nhiệt tình và chuyên nghiệp",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Giá cả hợp lý",
    description: "Cam kết giá tốt nhất thị trường, nhiều ưu đãi hấp dẫn",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Award,
    title: "Chất lượng đảm bảo",
    description: "Sản phẩm chất lượng cao, bảo hành và hỗ trợ lâu dài",
    color: "from-blue-500 to-indigo-500",
  },
];

const STATS = [
  { number: "10,000+", label: "Khách hàng tin tưởng" },
  { number: "50+", label: "Sản phẩm AI & Tech" },
  { number: "99.9%", label: "Tỷ lệ hài lòng" },
  { number: "24/7", label: "Hỗ trợ khách hàng" },
];

const WHY_CHOOSE_US = [
  "Tài khoản chính hãng, uy tín 100%",
  "Website thiết kế chuẩn SEO, load nhanh",
  "Giá cả minh bạch, không phí ẩn",
  "Hệ thống thanh toán an toàn với đơn vị Cá",
  "Bảo hành & hỗ trợ kỹ thuật lâu dài",
  "Vô vàn ưu đãi hấp dẫn",
];

const TECH_PARTNERS = [
  { name: "OpenAI", logo: "/techlogos/openai.svg" },
  { name: "Canva", logo: "/techlogos/canva.svg" },
  { name: "GitHub", logo: "/techlogos/github.svg" },
  { name: "Google", logo: "/techlogos/gemini.svg" },
  { name: "YouTube", logo: "/techlogos/youtube.svg" },
  { name: "Notion", logo: "/techlogos/notion.svg" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Về AiSoThiMua
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Chúng tôi là nền tảng cung cấp <span className="text-purple-400 font-semibold">tài khoản AI & công nghệ</span> hàng đầu
              và <span className="text-blue-400 font-semibold">thiết kế website chuyên nghiệp</span> tại Việt Nam.
              Với hơn <span className="text-purple-400 font-semibold">10,000+ khách hàng</span> tin tưởng,
              chúng tôi cam kết mang đến giải pháp công nghệ tốt nhất cho bạn.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold shadow-lg">
                Hãy cùng chúng tôi khám phá ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-y border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-gray-400 text-lg">
              Cung cấp giải pháp toàn diện cho nhu cầu công nghệ của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Tại sao chọn chúng tôi?
            </h3>
            <p className="text-gray-400">
              Những giá trị cốt lõi mà chúng tôi mang lại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all duration-300 group text-center"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform mx-auto`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Cam kết của chúng tôi
              </h2>
              <p className="text-gray-400 text-lg">
                6 lý do bạn nên tin tưởng và sử dụng dịch vụ của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_CHOOSE_US.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg hover:border-green-500/50 transition-all"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-white font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Các hãng công nghệ chính
            </h2>
            <p className="text-gray-400 text-lg">
              Chúng tôi cung cấp sản phẩm từ các hãng công nghệ hàng đầu
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {TECH_PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 rounded-lg hover:scale-110 transition-transform group"
              >
                <div className="relative w-16 h-16 opacity-50 group-hover:opacity-100 transition-all">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Sứ mệnh</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Mang công nghệ AI, các công cụ hiện đại và dịch vụ thiết kế web chuyên nghiệp đến gần hơn
                với người dùng Việt Nam. Chúng tôi tin rằng mọi cá nhân và doanh nghiệp đều xứng đáng được
                tiếp cận công nghệ tốt nhất với giá cả hợp lý, thanh toán dễ dàng bằng đơn vị Cá.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Tầm nhìn</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Trở thành nền tảng số 1 tại Việt Nam trong việc cung cấp tài khoản AI, công nghệ và
                dịch vụ thiết kế website. Chúng tôi hướng tới việc xây dựng một hệ sinh thái công nghệ
                toàn diện, nơi cá nhân và doanh nghiệp có thể dễ dàng tiếp cận và phát triển trong kỷ nguyên số.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-gray-400 text-lg">
              Những con người đam mê công nghệ và tận tâm với khách hàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Team Member Card 1 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all group">
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src="/team/member.png"
                  alt="Thành viên 1"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Đoàn Tuấn Khải</h3>
                <p className="text-purple-400 text-sm mb-2">CEO & Founder</p>
                <p className="text-gray-400 text-sm">Chuyên gia về AI và công nghệ</p>
              </div>
            </div>

            {/* Team Member Card 2 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all group">
              <div className="aspect-square relative overflow-hidden">
                {/* <Image
                  src=""
                  alt="Thành viên 2"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                /> */}
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Đang còn trống</h3>
                <p className="text-blue-400 text-sm mb-2">Lead Developer</p>
                <p className="text-gray-400 text-sm">Chuyên viên phát triển</p>
              </div>
            </div>

            {/* Team Member Card 3 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all group">
              <div className="aspect-square relative overflow-hidden">
                {/* <Image
                  src="/team/member.png"
                  alt="Thành viên 3"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                /> */}
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Đang còn trống</h3>
                <p className="text-green-400 text-sm mb-2">UI/UX Designer</p>
                <p className="text-gray-400 text-sm">Chuyên viên thiết kế</p>
              </div>
            </div>

            {/* Team Member Card 4 */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all group">
              <div className="aspect-square relative overflow-hidden">
                {/* <Image
                  src="/team/member.png"
                  alt="Thành viên 4"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                /> */}
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-white mb-1">Đang còn trống</h3>
                <p className="text-orange-400 text-sm mb-2">Customer Support</p>
                <p className="text-gray-400 text-sm">Hỗ trợ khách hàng</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Tham gia cùng hàng nghìn khách hàng đã tin tưởng sử dụng tài khoản AI và dịch vụ thiết kế website của chúng tôi
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-all font-semibold shadow-lg">
                Đăng ký ngay
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all font-semibold">
                Xem sản phẩm
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
}

