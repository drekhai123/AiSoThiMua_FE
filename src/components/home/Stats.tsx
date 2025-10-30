import { Users, Package, Star, Headphones } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Khách hàng tin tưởng",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Package,
    value: "50+",
    label: "Sản phẩm AI & Tech",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Star,
    value: "99.9%",
    label: "Tỷ lệ hài lòng",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Hỗ trợ khách hàng",
    color: "from-green-500 to-emerald-500",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

