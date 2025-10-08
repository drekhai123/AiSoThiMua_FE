import { Package, Truck, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Package,
    title: "Sản phẩm chất lượng cao",
    description: "Nhiều sản phẩm đa dạng",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    icon: Truck,
    title: "Cung cấp sản phẩm nhanh chóng",
    description: "Cung cấp sản phẩm kịp thời cho vấn đề của bạn",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    icon: HeadphonesIcon,
    title: "Hỗ trợ khách hàng",
    description: "Luôn sẵn sàng hỗ trợ bạn",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`${feature.bgColor} border-none hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.iconBg} mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
