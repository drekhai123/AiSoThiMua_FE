import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Code, Palette, FileCode, Zap, Brain } from "lucide-react";

const products = [
  {
    icon: Bot,
    name: "ChatGPT Plus",
    price: "299.000đ",
    duration: "/tháng",
    description: "Truy cập không giới hạn GPT-4, tốc độ nhanh hơn",
    badge: "Phổ biến",
  },
  {
    icon: Palette,
    name: "Midjourney Pro",
    price: "599.000đ",
    duration: "/tháng",
    description: "Tạo hình ảnh AI chất lượng cao không giới hạn",
    badge: "Mới",
  },
  {
    icon: Code,
    name: "GitHub Copilot",
    price: "199.000đ",
    duration: "/tháng",
    description: "Trợ lý code AI cho developers",
    badge: null,
  },
  {
    icon: FileCode,
    name: "Claude Pro",
    price: "399.000đ",
    duration: "/tháng",
    description: "AI assistant mạnh mẽ từ Anthropic",
    badge: null,
  },
  {
    icon: Zap,
    name: "Notion AI",
    price: "179.000đ",
    duration: "/tháng",
    description: "Tăng năng suất làm việc với AI",
    badge: null,
  },
  {
    icon: Brain,
    name: "Jasper AI",
    price: "799.000đ",
    duration: "/tháng",
    description: "AI viết content chuyên nghiệp",
    badge: "Premium",
  },
];

const Products = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-muted-foreground text-lg">
            Các tài khoản AI và dịch vụ công nghệ hàng đầu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 group animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-lg bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    <product.icon className="w-6 h-6 text-white" />
                  </div>
                  {product.badge && (
                    <Badge className="bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm text-white border-0">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{product.price}</span>
                  <span className="text-gray-400">{product.duration}</span>
                </div>
                <Button className="w-full bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm hover:shadow-md text-white transition-all font-medium">
                  Mua ngay
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
