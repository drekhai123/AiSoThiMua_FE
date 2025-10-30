import { UserPlus, Wallet, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Đăng ký tài khoản",
    description: "Tạo tài khoản miễn phí chỉ trong 30 giây",
    color: "from-purple-500 to-pink-500",
    number: "01",
  },
  {
    icon: Wallet,
    title: "Nạp tiền vào ví",
    description: "Chuyển VNĐ thành Cá, nhận bonus lên đến 15%",
    color: "from-blue-500 to-cyan-500",
    number: "02",
  },
  {
    icon: ShoppingBag,
    title: "Mua sắm & Nhận hàng",
    description: "Chọn sản phẩm, thanh toán và chúng tôi xử lí đơn hàng nhanh chóng",
    color: "from-green-500 to-emerald-500",
    number: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Cách thức hoạt động
          </h2>
          <p className="text-gray-400 text-lg">
            3 bước đơn giản để bắt đầu sử dụng dịch vụ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-in fade-in slide-in-from-bottom-4 h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector Line (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
              )}

              <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 hover:border-purple-500 transition-all group relative flex flex-col">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

