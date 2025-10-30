"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Zap, TrendingUp, Package } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, event?: React.MouseEvent) => void;
  onBuyNow?: (product: Product, event?: React.MouseEvent) => void;
}

const ProductCard = ({ product, onAddToCart, onBuyNow }: ProductCardProps) => {
  return (
    <Card
      className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 group animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full"
    >
      <CardHeader className="flex-shrink-0">
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
            {/* Discount Badge */}
            {product.discount && product.originalPrice && (
              <div className="px-2 py-1 bg-red-500 rounded text-white text-xs font-bold">
                -{product.discount}%
              </div>
            )}
          </div>
          <div className="h-6">
            {product.badge && (
              <Badge className="bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm text-white border-0">
                {product.badge}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-white group-hover:text-purple-400 transition-colors text-xl min-h-[56px] flex items-start">
          {product.name}
        </CardTitle>
        <CardDescription className="text-gray-300 line-clamp-2 min-h-[48px]">
          {product.description}
        </CardDescription>

        {/* Sold & Stock Info */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700">
          {product.sold && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <TrendingUp className="w-3 h-3" />
              <span suppressHydrationWarning>{product.sold.toLocaleString()} đã bán</span>
            </div>
          )}
          {product.stock !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              <Package className="w-3 h-3" />
              <span className="text-gray-400">SL:</span>
              {product.stock === "unlimited" ? (
                <span className="text-green-400 font-semibold">99,999</span>
              ) : product.stock === "made-to-order" ? (
                <span className="text-blue-400">Làm theo đơn</span>
              ) : product.stock === "pre-order" ? (
                <span className="text-orange-400">Đặt hàng trước</span>
              ) : (
                <span className={`font-semibold ${typeof product.stock === 'number' && product.stock < 10 ? "text-red-400" : "text-gray-400"}`}>
                  {product.stock}
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="mb-4 min-h-[44px]">
          {/* Original Price (if discount) */}
          {product.originalPrice && product.discount && (
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-gray-500 line-through text-lg" suppressHydrationWarning>
                {product.originalPrice.toLocaleString("vi-VN")}
              </span>
              <span className="text-gray-500 text-xs">Cá</span>
            </div>
          )}
          {/* Current Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white" suppressHydrationWarning>
              {(product.price || 0).toLocaleString("vi-VN")}
            </span>
            <span className="text-purple-400 font-semibold">Cá</span>
            <span className="text-gray-400 text-sm">{product.duration}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={(e) => onAddToCart?.(product, e)}
            variant="outline"
            className="flex-1 bg-slate-700 border-slate-600 hover:bg-slate-600 hover:scale-105 text-white transition-all font-medium h-10"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Giỏ hàng
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/products/${product.id}`;
            }}
            className="flex-1 bg-gradient-to-l from-purple-600 to-blue-600 shadow-sm hover:shadow-md hover:shadow-lg hover:scale-105 text-white transition-all font-medium h-10 group"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
