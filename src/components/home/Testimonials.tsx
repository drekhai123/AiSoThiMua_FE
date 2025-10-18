import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Nguyễn Văn A",
    role: "Developer",
    avatar: "/techlogos/openai.svg",
    rating: 5,
    comment: "Dịch vụ tuyệt vời! Giá cả hợp lý, hỗ trợ nhiệt tình. Đã mua ChatGPT Plus và rất hài lòng.",
  },
  {
    name: "Trần Thị B",
    role: "Designer",
    avatar: "/techlogos/midjourney.svg",
    rating: 5,
    comment: "Midjourney và Canva Pro giúp công việc của tôi hiệu quả hơn rất nhiều. Sẽ tiếp tục ủng hộ!",
  },
  {
    name: "Lê Minh C",
    role: "Content Creator",
    avatar: "/techlogos/canva.svg",
    rating: 5,
    comment: "Hệ thống Cá rất tiện lợi, nạp tiền được bonus nữa. Giao hàng nhanh chóng, chuyên nghiệp!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-gray-400 text-lg">
            Hàng nghìn đánh giá 5 sao từ khách hàng hài lòng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all group animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-purple-500/20 mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-300 leading-relaxed mb-6">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

