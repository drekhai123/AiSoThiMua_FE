import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
}: StatsCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-600/10 rounded-lg">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trendUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {trendUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-neutral-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
