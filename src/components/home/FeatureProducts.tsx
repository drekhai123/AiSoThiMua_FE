"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Top selling products of the month
const products = [
  {
    id: "1",
    name: "ChatGPT Plus",
    price: 299,
    duration: "/tháng",
    description: "Truy cập không giới hạn GPT-4, tốc độ nhanh hơn",
    logo: "/techlogos/openai.svg",
    badge: "Bán chạy #1",
    sold: 2500,
    rank: 1,
  },
  {
    id: "8",
    name: "YouTube Premium",
    price: 179,
    duration: "/tháng",
    description: "Xem video không quảng cáo, nghe nhạc background",
    logo: "/techlogos/youtube.svg",
    badge: "Bán chạy #2",
    sold: 2100,
    rank: 2,
  },
  {
    id: "6",
    name: "Canva Pro",
    price: 249,
    duration: "/tháng",
    description: "Thiết kế đồ họa chuyên nghiệp với AI",
    logo: "/techlogos/canva.svg",
    badge: "Bán chạy #3",
    sold: 1800,
    rank: 3,
  },
  {
    id: "3",
    name: "Midjourney Standard",
    price: 599,
    duration: "/tháng",
    description: "Tạo hình ảnh AI chất lượng cao, 15 giờ Fast GPU",
    logo: "/techlogos/midjourney.svg",
    sold: 1500,
    rank: 4,
  },
  {
    id: "4",
    name: "GitHub Copilot",
    price: 199,
    duration: "/tháng",
    description: "Trợ lý code AI cho developers, tích hợp VS Code",
    logo: "/techlogos/github.svg",
    sold: 1200,
    rank: 5,
  },
  {
    id: "5",
    name: "Claude Pro",
    price: 399,
    duration: "/tháng",
    description: "AI assistant mạnh mẽ từ Anthropic với context dài",
    logo: "/techlogos/claude.svg",
    sold: 980,
    rank: 6,
  },
];

const FeatureProducts = () => {
  const router = useRouter();

  const handleViewDetail = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleQuickBuy = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-full mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold">Top tháng này</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sản phẩm bán chạy nhất
          </h2>
          <p className="text-muted-foreground text-lg">
            Những sản phẩm được khách hàng lựa chọn nhiều nhất trong tháng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 group animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <div className="relative w-12 h-12">
                        <Image
                          src={product.logo}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Rank Badge */}
                    {product.rank <= 3 && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${product.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white" :
                        product.rank === 2 ? "bg-gradient-to-r from-gray-300 to-gray-400 text-slate-900" :
                          "bg-gradient-to-r from-orange-400 to-amber-600 text-white"
                        }`}>
                        #{product.rank}
                      </div>
                    )}
                  </div>
                  {product.badge && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 shadow-sm text-white border-0">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-300 line-clamp-2">
                  {product.description}
                </CardDescription>

                {/* Sold Info */}
                <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span suppressHydrationWarning>{product.sold.toLocaleString()} đã bán</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white" suppressHydrationWarning>{product.price.toLocaleString()}</span>
                  <span className="text-purple-400 font-semibold">Cá</span>
                  <span className="text-gray-400 text-sm">{product.duration}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetail(product.id)}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </button>
                  <button
                    onClick={() => handleQuickBuy(product.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-medium flex items-center justify-center gap-2 hover:scale-105 shadow-md"
                  >
                    <Zap className="w-4 h-4" />
                    Mua ngay
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/products")}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
