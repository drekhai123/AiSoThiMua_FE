"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const PromoBanner = () => {
  const [api, setApi] = useState<CarouselApi>();

  const banners = [
    {
      id: 1,
      title: "🎉 Nạp lần đầu tặng 50 cá",
      description: "Cho 50 khách hàng đầu tiên - Đừng bỏ lỡ! (từ 10/10 đến 31/10)",
      bgGradient: "from-purple-600 to-blue-600"
    },
    {
      id: 2,
      title: "✨ Tặng Chatgpt Plus 1 tháng",
      description: "Khi đơn hàng từ 100 cá trở lên",
      bgGradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "🚀 Đang cập nhập thêm các sự kiện",
      description: "Đừng bỏ lỡ!",
      bgGradient: "from-indigo-600 to-purple-600"
    }
  ];

  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <section className="w-full bg-background pt-2 pb-2">
      <div className="container mx-auto px-4">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${banner.bgGradient} p-8 md:p-12 text-center`}>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90">
                    {banner.description}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default PromoBanner;
