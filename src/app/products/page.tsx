"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import Pagination from "@/components/products/Pagination";
import { Toast } from "@/components/ui/toast";
import { FlyToCart } from "@/components/animations/FlyToCart";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";

// Sample products data (Giá tính bằng Cá)
const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "ChatGPT Plus",
    price: 299, // Cá
    duration: "/tháng",
    description: "Truy cập không giới hạn GPT-4, tốc độ nhanh hơn, ưu tiên phản hồi",
    logo: "/techlogos/openai.svg",
    category: ["AI Chat", "Productivity"], // Nhiều danh mục
    techLogo: "OpenAI",
    badge: "Phổ biến",
    sold: 2500,
    stock: "unlimited",
  },
  {
    id: "2",
    name: "ChatGPT Pro",
    price: 899, // Cá
    duration: "/tháng",
    description: "Gói cao cấp với O1, O1 Mini và GPT-4 không giới hạn",
    logo: "/techlogos/openai.svg",
    category: ["AI Chat", "Productivity"], // Nhiều danh mục
    techLogo: "OpenAI",
    badge: "Premium",
  },
  {
    id: "3",
    name: "Midjourney Standard",
    price: 599, // Cá
    duration: "/tháng",
    description: "Tạo hình ảnh AI chất lượng cao, 15 giờ Fast GPU/tháng",
    logo: "/techlogos/midjourney.svg",
    category: "AI Image",
    techLogo: "Midjourney",
    sold: 1500,
    stock: 45,
  },
  {
    id: "4",
    name: "GitHub Copilot",
    price: 199, // Cá
    duration: "/tháng",
    description: "Trợ lý code AI cho developers, tích hợp VS Code",
    logo: "/techlogos/github.svg",
    category: ["Developer Tools", "Productivity"], // Nhiều danh mục
    techLogo: "GitHub Copilot",
    badge: "Mới",
  },
  {
    id: "5",
    name: "Claude Pro",
    price: 399, // Cá
    duration: "/tháng",
    description: "AI assistant mạnh mẽ từ Anthropic với context dài",
    logo: "/techlogos/claude.svg",
    category: "AI Chat",
    techLogo: "Claude",
  },
  {
    id: "6",
    name: "Canva Pro",
    price: 249, // Cá
    duration: "/tháng",
    description: "Thiết kế đồ họa chuyên nghiệp với AI, templates không giới hạn",
    logo: "/techlogos/canva.svg",
    category: ["Design", "Productivity"], // Nhiều danh mục
    techLogo: "Canva",
    badge: "Phổ biến",
    sold: 1800,
    stock: "unlimited",
  },
  {
    id: "7",
    name: "Google Gemini Advanced",
    price: 449, // Cá
    duration: "/tháng",
    description: "AI model tiên tiến nhất từ Google với Gemini Ultra",
    logo: "/techlogos/gemini.svg",
    category: "AI Chat",
    techLogo: "Google Gemini",
    badge: "Mới",
  },
  {
    id: "8",
    name: "YouTube Premium",
    price: 179, // Cá
    duration: "/tháng",
    description: "Xem video không quảng cáo, nghe nhạc background, tải offline",
    logo: "/techlogos/youtube.svg",
    category: "Entertainment",
    techLogo: "Youtube",
    badge: "Phổ biến",
  },
  {
    id: "9",
    name: "Capcut Pro",
    price: 159, // Cá
    duration: "/tháng",
    description: "Chỉnh sửa video chuyên nghiệp với AI, không watermark",
    logo: "/techlogos/capcut.svg",
    category: "Video Editing",
    techLogo: "Capcut",
  },
  {
    id: "10",
    name: "Grok Premium",
    price: 699, // Cá
    duration: "/tháng",
    description: "AI chatbot của X (Twitter) với real-time data",
    logo: "/techlogos/grok.svg",
    category: "AI Chat",
    techLogo: "Grok AI",
    badge: "Premium",
    sold: 350,
    stock: "pre-order",
  },
  {
    id: "11",
    name: "Warp Pro",
    price: 349, // Cá
    duration: "/tháng",
    description: "Terminal hiện đại với AI assistant cho developers",
    logo: "/techlogos/warp.svg",
    category: "Developer Tools",
    techLogo: "Warp.dev",
    sold: 450,
    stock: "made-to-order",
  },
  {
    id: "12",
    name: "Notion AI",
    price: 199, // Cá
    duration: "/tháng",
    description: "Tăng năng suất làm việc với AI writing assistant",
    logo: "/techlogos/notion.svg",
    category: ["Productivity", "AI Chat"], // Nhiều danh mục
    techLogo: "Notion",
  },
];

// Categories and tech logos for filters
const CATEGORIES = ["AI Chat", "AI Image", "Developer Tools", "Design", "Entertainment", "Video Editing", "Productivity"];

const TECH_LOGOS = [
  { name: "OpenAI", logo: "/techlogos/openai.svg" },
  { name: "Canva", logo: "/techlogos/canva.svg" },
  { name: "Warp.dev", logo: "/techlogos/warp.svg" },
  { name: "GitHub Copilot", logo: "/techlogos/github.svg" },
  { name: "Google Gemini", logo: "/techlogos/gemini.svg" },
  { name: "Capcut", logo: "/techlogos/capcut.svg" },
  { name: "Grok AI", logo: "/techlogos/grok.svg" },
  { name: "Youtube", logo: "/techlogos/youtube.svg" },
];

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTechLogo, setSelectedTechLogo] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [flyingProduct, setFlyingProduct] = useState<{
    logo: string;
    name: string;
    startPos: { x: number; y: number };
  } | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Support both single and multiple categories
      const productCategories = Array.isArray(product.category) ? product.category : [product.category];
      const matchesCategory = selectedCategory === "all" || productCategories.includes(selectedCategory);

      const matchesTechLogo = selectedTechLogo === "all" || product.techLogo === selectedTechLogo;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesTechLogo && matchesPrice;
    });
  }, [searchTerm, selectedCategory, selectedTechLogo, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    handleFilterChange();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleFilterChange();
  };

  const handleTechLogoChange = (techLogo: string) => {
    setSelectedTechLogo(techLogo);
    handleFilterChange();
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    handleFilterChange();
  };

  const handleAddToCart = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      // Get cart icon position
      const cartIcon = document.querySelector('[data-cart-icon]');
      const cartRect = cartIcon?.getBoundingClientRect();

      if (cartRect) {
        setFlyingProduct({
          logo: product.logo,
          name: product.name,
          startPos: {
            x: rect.left + rect.width / 2 - 32,
            y: rect.top + rect.height / 2 - 32,
          },
        });
      }
    }

    addToCart(product);
    setToastMessage(`Đã thêm ${product.name} vào giỏ hàng`);
    setShowToast(true);
  };

  const handleBuyNow = (product: Product, event?: React.MouseEvent) => {
    if (event) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const cartIcon = document.querySelector('[data-cart-icon]');
      const cartRect = cartIcon?.getBoundingClientRect();

      if (cartRect) {
        setFlyingProduct({
          logo: product.logo,
          name: product.name,
          startPos: {
            x: rect.left + rect.width / 2 - 32,
            y: rect.top + rect.height / 2 - 32,
          },
        });
      }
    }

    addToCart(product);

    // Delay navigation to show animation
    setTimeout(() => {
      router.push("/cart");
    }, 400);
  };

  const getCartIconPosition = () => {
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - 32,
        y: rect.top + rect.height / 2 - 32,
      };
    }
    return { x: 0, y: 0 };
  };

  return (
    <main className="min-h-screen py-20">
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Flying Product Animation */}
      {flyingProduct && (
        <FlyToCart
          productLogo={flyingProduct.logo}
          productName={flyingProduct.name}
          startPosition={flyingProduct.startPos}
          endPosition={getCartIconPosition()}
          onComplete={() => setFlyingProduct(null)}
        />
      )}

      {/* Page Header */}
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tất cả sản phẩm
          </h1>
          <p className="text-muted-foreground text-lg">
            Khám phá các tài khoản AI và dịch vụ công nghệ hàng đầu
          </p>
        </div>
      </div>

      {/* Two Column Layout: Sidebar + Products */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters - Aligned to left */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <ProductFilters
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onTechLogoChange={handleTechLogoChange}
              onPriceRangeChange={handlePriceRangeChange}
              categories={CATEGORIES}
              techLogos={TECH_LOGOS}
            />
          </div>

          {/* Products Content */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-400">
                Hiển thị <span className="text-white font-semibold">{currentProducts.length}</span> trong{" "}
                <span className="text-white font-semibold">{filteredProducts.length}</span> sản phẩm
              </p>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(product, event) => handleAddToCart(product, event)}
                      onBuyNow={(product, event) => handleBuyNow(product, event)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
