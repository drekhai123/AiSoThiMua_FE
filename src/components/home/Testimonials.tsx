"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    name: "Hồ Hoàng Huy",
    role: "Lập trình viên",
    avatar: "/techlogos/openai.svg",
    rating: 5,
    comment: "Dịch vụ tuyệt vời! Giá cả hợp lý, hỗ trợ nhiệt tình. Đã mua ChatGPT Plus và rất hài lòng.",
  },
  {
    name: "Trần Thị Ngọc",
    role: "Thiết kế viên",
    avatar: "/techlogos/midjourney.svg",
    rating: 5,
    comment: "Midjourney và Canva Pro giúp công việc của tôi hiệu quả hơn rất nhiều. Sẽ tiếp tục ủng hộ!",
  },
  {
    name: "Lê Minh Khôi",
    role: "Nhà sáng tạo nội dung",
    avatar: "/techlogos/canva.svg",
    rating: 5,
    comment: "Hệ thống Cá rất tiện lợi, nạp tiền được bonus nữa. Giao hàng nhanh chóng, chuyên nghiệp!",
  },
  {
    name: "Phạm Thị Diệp",
    role: "Quản lý marketing",
    avatar: "/techlogos/notion.svg",
    rating: 5,
    comment: "Website thiết kế đẹp, chuyên nghiệp. Team hỗ trợ rất nhiệt tình, giao đúng deadline!",
  },
  {
    name: "Hoàng Văn Đạt",
    role: "Kỹ sư phần mềm",
    avatar: "/techlogos/github.svg",
    rating: 5,
    comment: "Mua tài khoản GitHub Pro giá rẻ hơn nhiều so với mua trực tiếp. Dịch vụ ổn định, giao ngay lập tức!",
  },
  {
    name: "Võ Thị Hoài Thu",
    role: "Học sinh",
    avatar: "/techlogos/gemini.svg",
    rating: 5,
    comment: "Google Gemini giúp mình học tập hiệu quả hơn. Giá sinh viên phải chăng, hỗ trợ nhiệt tình!",
  },
  {
    name: "Đỗ Minh Triết",
    role: "Freelancer",
    avatar: "/techlogos/youtube.svg",
    rating: 5,
    comment: "YouTube Premium không quảng cáo, nghe nhạc offline rất tiện. Giá cả quá tốt!",
  },
  {
    name: "Bùi Thị Huyền",
    role: "Chủ doanh nghiệp",
    avatar: "/techlogos/openai.svg",
    rating: 5,
    comment: "Website bán hàng giúp doanh thu tăng 300%. Đội ngũ thiết kế rất chuyên nghiệp và tận tâm!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-gray-400 text-lg">
            Hàng nghìn đánh giá 5 sao từ khách hàng hài lòng
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView + 2)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[calc(33.333%-16px)] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500 transition-all group flex flex-col"
                >
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-purple-500/20 mb-4" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Comment - Fixed height */}
                  <p className="text-gray-300 leading-relaxed mb-6 flex-grow min-h-[120px]">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-700 mt-auto">
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

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? "w-8 bg-gradient-to-r from-purple-600 to-blue-600"
                    : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

