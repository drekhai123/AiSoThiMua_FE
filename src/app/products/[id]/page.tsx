"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/types";
import { Toast } from "@/components/ui/toast";
import { FlyToCart } from "@/components/animations/FlyToCart";
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  CheckCircle,
  Star,
  Shield,
  Headphones,
  Clock,
  Tag,
  Heart,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Package,
  Key,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Review, ReviewStats } from "@/types/review";

// Sample products data (same as products page)
const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "ChatGPT Plus",
    price: 299,
    duration: "1 tháng",
    pricingPlans: [
      { duration: "1 tháng", price: 299 },
      { duration: "3 tháng", price: 850, discount: 5, popular: true },
      { duration: "6 tháng", price: 1650, discount: 8 },
      { duration: "1 năm", price: 3200, discount: 11 },
    ],
    warrantyPlans: [
      { duration: "Không bảo hành", price: 0, description: "Không bao gồm bảo hành" },
      { duration: "3 tháng", price: 30, description: "Hỗ trợ kỹ thuật, đổi tài khoản lỗi", popular: true },
      { duration: "6 tháng", price: 50, description: "Bảo hành mở rộng, ưu tiên hỗ trợ" },
      { duration: "1 năm", price: 80, description: "Bảo hành toàn diện, hỗ trợ VIP" },
    ],
    accountInfo: {
      loginMethod: "Email & Password",
      includes: [
        "Email tài khoản",
        "Mật khẩu",
        "Mã 2FA (Google Authenticator)",
        "Email khôi phục",
      ],
      canChangeEmail: false,
      has2FA: true,
      notes: [
        "Không được đổi email tài khoản",
        "Có thể đổi mật khẩu sau khi nhận",
        "Hướng dẫn setup 2FA chi tiết",
      ],
    },
    allowUpgrade: true, // Cho phép nâng cấp
    description: "Truy cập không giới hạn GPT-4, tốc độ nhanh hơn, ưu tiên phản hồi",
    logo: "/techlogos/openai.svg",
    category: ["AI Chat", "Productivity"],
    techLogo: "OpenAI",
    badge: "Phổ biến",
    sold: 2500,
    stock: "unlimited",
  },
  {
    id: "2",
    name: "ChatGPT Pro",
    price: 899,
    duration: "/tháng",
    description: "Gói cao cấp với O1, O1 Mini và GPT-4 không giới hạn",
    logo: "/techlogos/openai.svg",
    category: "AI Chat",
    techLogo: "OpenAI",
    badge: "Premium",
  },
  {
    id: "3",
    name: "Midjourney Standard",
    price: 599,
    duration: "1 tháng",
    pricingPlans: [
      { duration: "1 tháng", price: 599 },
      { duration: "3 tháng", price: 1700, discount: 5, popular: true },
      { duration: "1 năm", price: 6500, discount: 9 },
    ],
    warrantyPlans: [
      { duration: "Không bảo hành", price: 0, description: "Không bao gồm bảo hành" },
      { duration: "3 tháng", price: 60, description: "Hỗ trợ kỹ thuật cơ bản", popular: true },
      { duration: "Trọn đời", price: 150, description: "Bảo hành vĩnh viễn, hỗ trợ ưu tiên" },
    ],
    description: "Tạo hình ảnh AI chất lượng cao, 15 giờ Fast GPU/tháng",
    logo: "/techlogos/midjourney.svg",
    category: ["AI Image", "Design"],
    techLogo: "Midjourney",
    sold: 1500,
    stock: 45,
  },
  {
    id: "4",
    name: "GitHub Copilot",
    price: 199,
    duration: "/tháng",
    description: "Trợ lý code AI cho developers, tích hợp VS Code",
    logo: "/techlogos/github.svg",
    category: "Developer Tools",
    techLogo: "GitHub Copilot",
    badge: "Mới",
  },
  {
    id: "5",
    name: "Claude Pro",
    price: 399,
    duration: "/tháng",
    description: "AI assistant mạnh mẽ từ Anthropic với context dài",
    logo: "/techlogos/claude.svg",
    category: "AI Chat",
    techLogo: "Claude",
  },
  {
    id: "6",
    name: "Canva Pro",
    price: 249,
    duration: "1 tháng",
    pricingPlans: [
      { duration: "1 tháng", price: 249 },
      { duration: "3 tháng", price: 710, discount: 5 },
      { duration: "1 năm", price: 2750, discount: 8, popular: true },
    ],
    description: "Thiết kế đồ họa chuyên nghiệp với AI, templates không giới hạn",
    logo: "/techlogos/canva.svg",
    category: ["Design", "Productivity"],
    techLogo: "Canva",
    badge: "Phổ biến",
  },
  {
    id: "7",
    name: "Google Gemini Advanced",
    price: 449,
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
    price: 179,
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
    price: 159,
    duration: "/tháng",
    accountInfo: {
      loginMethod: "Email & Password",
      includes: [
        "Email tài khoản",
        "Mật khẩu",
      ],
      canChangeEmail: true,
      has2FA: false,
      notes: [
        "Có thể đổi email sang email của bạn",
        "Có thể đổi mật khẩu tự do",
        "Hướng dẫn đổi email chi tiết",
      ],
    },
    allowUpgrade: true, // Cho phép nâng cấp
    description: "Chỉnh sửa video chuyên nghiệp với AI, không watermark",
    logo: "/techlogos/capcut.svg",
    category: "Video Editing",
    techLogo: "Capcut",
    sold: 680,
    stock: "unlimited",
  },
  {
    id: "10",
    name: "Grok Premium",
    price: 699,
    duration: "/tháng",
    description: "AI chatbot của X (Twitter) với real-time data",
    logo: "/techlogos/grok.svg",
    category: "AI Chat",
    techLogo: "Grok AI",
    badge: "Premium",
  },
  {
    id: "11",
    name: "Warp Pro",
    price: 349,
    duration: "/tháng",
    description: "Terminal hiện đại với AI assistant cho developers",
    logo: "/techlogos/warp.svg",
    category: "Developer Tools",
    techLogo: "Warp.dev",
  },
  {
    id: "12",
    name: "Notion AI",
    price: 199,
    duration: "/tháng",
    description: "Tăng năng suất làm việc với AI writing assistant",
    logo: "/techlogos/notion.svg",
    category: "Productivity",
    techLogo: "Notion",
  },
];

// Product features by ID
const PRODUCT_FEATURES: Record<string, string[]> = {
  "1": [
    "Truy cập GPT-4 không giới hạn",
    "Tốc độ phản hồi nhanh hơn",
    "Ưu tiên trong giờ cao điểm",
    "Hỗ trợ DALL-E 3 tạo hình ảnh",
    "Truy cập GPT-4 Turbo mới nhất",
  ],
  "2": [
    "Tất cả tính năng của Plus",
    "Truy cập O1 và O1 Mini không giới hạn",
    "Ưu tiên cao nhất mọi lúc",
    "Tính năng Advanced Voice Mode",
    "Hỗ trợ kỹ thuật ưu tiên",
  ],
  "3": [
    "15 giờ Fast GPU mỗi tháng",
    "Tạo hình ảnh chất lượng 4K",
    "Unlimited Relaxed generations",
    "Commercial usage rights",
    "Truy cập mọi model mới nhất",
  ],
  "4": [
    "Code suggestions thông minh",
    "Tích hợp VS Code, JetBrains",
    "Hỗ trợ đa ngôn ngữ lập trình",
    "Chat AI trong editor",
    "Code review và suggestions",
  ],
  "5": [
    "Context window lên đến 200K tokens",
    "Phân tích code và documents",
    "Trả lời chi tiết và chính xác",
    "Hỗ trợ upload files",
    "Vision capabilities",
  ],
  "6": [
    "100M+ templates cao cấp",
    "Background remover AI",
    "Magic resize và Magic edit",
    "Brand kit không giới hạn",
    "Cloud storage 1TB",
  ],
  "7": [
    "Gemini Ultra - model mạnh nhất",
    "Tích hợp Google Workspace",
    "Multimodal: text, image, code",
    "Context dài, hiểu sâu",
    "2TB Google One storage",
  ],
  "8": [
    "Xem video không quảng cáo",
    "YouTube Music Premium",
    "Tải video offline",
    "Background play trên mobile",
    "Exclusive content & features",
  ],
  "9": [
    "Chỉnh sửa video AI-powered",
    "Không watermark",
    "4K export quality",
    "Cloud storage không giới hạn",
    "Templates cao cấp",
  ],
  "10": [
    "Real-time X data access",
    "Uncensored AI responses",
    "Priority response time",
    "Extended context window",
    "Advanced reasoning",
  ],
  "11": [
    "AI command suggestions",
    "Terminal workflows",
    "Team collaboration",
    "Cloud sync settings",
    "Custom themes & fonts",
  ],
  "12": [
    "AI writing assistant",
    "Summarize và translate",
    "Generate content ideas",
    "Auto-fill tables",
    "Unlimited AI usage",
  ],
};

// Mock reviews data
const MOCK_REVIEWS: Record<string, Review[]> = {
  "1": [
    {
      id: "1",
      userId: "user1",
      userName: "Nguyễn Văn A",
      userAvatar: "/techlogos/openai.svg",
      rating: 5,
      comment: "ChatGPT Plus rất tuyệt vời! Hỗ trợ công việc của tôi hiệu quả hơn rất nhiều. Tốc độ phản hồi nhanh và chính xác.",
      createdAt: new Date("2024-01-15"),
      helpful: 24,
      productId: "1",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Trần Thị B",
      userAvatar: "/techlogos/openai.svg",
      rating: 5,
      comment: "Giá rất hợp lý so với mua trực tiếp. Shop hỗ trợ nhiệt tình, giao hàng nhanh chóng!",
      createdAt: new Date("2024-01-18"),
      helpful: 18,
      productId: "1",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Lê Minh C",
      userAvatar: "/techlogos/openai.svg",
      rating: 4,
      comment: "Sản phẩm tốt, đúng như mô tả. Chỉ tiếc là chưa có gói gia đình để chia sẻ.",
      createdAt: new Date("2024-01-20"),
      helpful: 12,
      productId: "1",
    },
    {
      id: "4",
      userId: "user4",
      userName: "Phạm Hoàng D",
      userAvatar: "/techlogos/openai.svg",
      rating: 5,
      comment: "Lần đầu mua tài khoản qua shop, ban đầu hơi lo lắng nhưng nhận được hàng rất nhanh và chất lượng. Sẽ ủng hộ tiếp!",
      createdAt: new Date("2024-01-22"),
      helpful: 15,
      productId: "1",
    },
  ],
};

// Generate reviews for all products
const generateDefaultReviews = (productId: string, productName: string): Review[] => [
  {
    id: `${productId}-1`,
    userId: `user${productId}1`,
    userName: "Người dùng hài lòng",
    userAvatar: `/techlogos/openai.svg`,
    rating: 5,
    comment: `${productName} rất tuyệt vời! Giá tốt, giao hàng nhanh, hỗ trợ nhiệt tình.`,
    createdAt: new Date("2024-01-15"),
    helpful: 10,
    productId,
  },
  {
    id: `${productId}-2`,
    userId: `user${productId}2`,
    userName: "Khách hàng VIP",
    userAvatar: `/techlogos/openai.svg`,
    rating: 4,
    comment: "Sản phẩm chất lượng, đúng như mô tả. Sẽ quay lại ủng hộ!",
    createdAt: new Date("2024-01-18"),
    helpful: 8,
    productId,
  },
];

const getReviews = (productId: string, productName: string): Review[] => {
  return MOCK_REVIEWS[productId] || generateDefaultReviews(productId, productName);
};

const calculateReviewStats = (reviews: Review[]): ReviewStats => {
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  const distribution = reviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc] = (acc[review.rating as keyof typeof acc] || 0) + 1;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  return {
    averageRating,
    totalReviews,
    ratingDistribution: distribution,
  };
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [flyingProduct, setFlyingProduct] = useState<{
    logo: string;
    name: string;
    startPos: { x: number; y: number };
  } | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number>(0); // Index of selected pricing plan
  const [selectedWarranty, setSelectedWarranty] = useState<number>(0); // Index of selected warranty plan
  const [purchaseMode, setPurchaseMode] = useState<"new" | "upgrade">("new"); // Mua mới hoặc nâng cấp
  const [upgradeInfo, setUpgradeInfo] = useState({
    email: "",
    password: "",
    twoFactorCode: "",
  });

  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = PRODUCTS_DATA.find((p) => p.id === productId);
    setProduct(foundProduct || null);

    if (foundProduct) {
      const productReviews = getReviews(productId, foundProduct.name);
      setReviews(productReviews);
      setReviewStats(calculateReviewStats(productReviews));
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Không tìm thấy sản phẩm
          </h2>
          <button
            onClick={() => router.push("/products")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg"
          >
            Quay lại sản phẩm
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (event?: React.MouseEvent) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

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
    setToastMessage(`Đã thêm ${product.name} vào giỏ hàng`);
    setShowToast(true);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    addToCart(product);
    router.push("/cart");
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

  const features = PRODUCT_FEATURES[product.id] || [];

  // Get current price based on selected plan
  const basePlanPrice = product.pricingPlans
    ? product.pricingPlans[selectedPlan].price
    : product.price;

  const currentDuration = product.pricingPlans
    ? product.pricingPlans[selectedPlan].duration
    : product.duration;

  // Get warranty price
  const warrantyPrice = product.warrantyPlans && product.warrantyPlans[selectedWarranty]
    ? product.warrantyPlans[selectedWarranty].price
    : 0;

  // Total price = plan price + warranty price
  const currentPrice = basePlanPrice + warrantyPrice;

  return (
    <main className="min-h-screen py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Toast */}
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Flying Animation */}
      {flyingProduct && (
        <FlyToCart
          productLogo={flyingProduct.logo}
          productName={flyingProduct.name}
          startPosition={flyingProduct.startPos}
          endPosition={getCartIconPosition()}
          onComplete={() => setFlyingProduct(null)}
        />
      )}

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Image & Info */}
          <div>
            {/* Product Image */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-12 mb-6">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image
                  src={product.logo}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Product Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Discount Badge */}
              {product.discount && product.originalPrice && (
                <span className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold shadow-lg">
                  Giảm {product.discount}%
                </span>
              )}
              {(Array.isArray(product.category) ? product.category : [product.category]).map((cat, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium"
                >
                  {cat}
                </span>
              ))}
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                {product.techLogo}
              </span>
              {product.badge && (
                <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-sm font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {reviewStats?.averageRating.toFixed(1) || "5.0"}
                </p>
                <p className="text-gray-400 text-sm">Đánh giá</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {product.sold?.toLocaleString() || "0"}
                </p>
                <p className="text-gray-400 text-sm">Đã bán</p>
              </div>
            </div>

            {/* Stock Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">Số lượng:</span>
                </div>
                {product.stock === "unlimited" ? (
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 font-semibold text-sm">
                    99,999
                  </span>
                ) : product.stock === "made-to-order" ? (
                  <div className="text-right">
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-semibold text-sm">
                      Làm theo đơn hàng
                    </span>
                    <p className="text-gray-400 text-xs mt-1">Giao trong 3-5 ngày</p>
                  </div>
                ) : product.stock === "pre-order" ? (
                  <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 font-semibold text-sm">
                    Đặt hàng trước
                  </span>
                ) : typeof product.stock === "number" ? (
                  <span className={`px-3 py-1 rounded-full font-semibold text-sm ${product.stock < 10
                    ? "bg-red-500/10 border border-red-500/30 text-red-400"
                    : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                    }`}>
                    {product.stock}
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-gray-500/10 border border-gray-500/30 rounded-full text-gray-400 font-semibold text-sm">
                    Liên hệ
                  </span>
                )}
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-4">Cam kết của chúng tôi</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Bảo mật 100%</p>
                    <p className="text-gray-400 text-xs">Tài khoản chính hãng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Giao ngay</p>
                    <p className="text-gray-400 text-xs">Sau thanh toán</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Headphones className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Hỗ trợ 24/7</p>
                    <p className="text-gray-400 text-xs">Luôn sẵn sàng</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Tag className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Giá tốt nhất</p>
                    <p className="text-gray-400 text-xs">Cam kết hoàn tiền</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 border-2 rounded-full transition-all ${isFavorite
                    ? "bg-red-500/10 border-red-500 text-red-400"
                    : "bg-transparent border-slate-600 text-gray-400 hover:border-red-500 hover:text-red-400"
                    }`}
                  title={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                </button>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Purchase Mode Tabs - Only show if product allows upgrade */}
            {product.allowUpgrade && (
              <div className="mb-6">
                <div className="flex gap-2 p-1 bg-slate-800 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setPurchaseMode("new")}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${purchaseMode === "new"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Mua mới
                  </button>
                  <button
                    onClick={() => setPurchaseMode("upgrade")}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${purchaseMode === "upgrade"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Nâng cấp tài khoản
                  </button>
                </div>
              </div>
            )}


            {/* Pricing Plans Selection */}
            {product.pricingPlans && product.pricingPlans.length > 0 && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Chọn gói thời hạn
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.pricingPlans.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPlan(index)}
                      className={`relative px-4 py-2 rounded-lg border transition-all ${selectedPlan === index
                        ? "border-purple-500 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                        : "border-slate-600 bg-slate-800 text-gray-300 hover:border-purple-500"
                        }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-green-400 rounded-full"></span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold">{plan.duration}</span>
                        <span className="text-sm">•</span>
                        <span className="font-bold">{plan.price.toLocaleString()}</span>
                        <span className="text-xs">Cá</span>
                        {plan.discount && (
                          <span className="text-xs text-green-400">
                            (-{plan.discount}%)
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Warranty Plans Selection */}
            {product.warrantyPlans && product.warrantyPlans.length > 0 && (
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Chọn gói bảo hành
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.warrantyPlans.map((warranty, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedWarranty(index)}
                      className={`relative px-4 py-2 rounded-lg border transition-all ${selectedWarranty === index
                        ? "border-blue-500 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                        : "border-slate-600 bg-slate-800 text-gray-300 hover:border-blue-500"
                        }`}
                    >
                      {warranty.popular && (
                        <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-green-400 rounded-full"></span>
                      )}
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold">{warranty.duration}</span>
                        {warranty.price > 0 && (
                          <>
                            <span className="text-sm">•</span>
                            <span className="font-bold">+{warranty.price.toLocaleString()}</span>
                            <span className="text-xs">Cá</span>
                          </>
                        )}
                        {warranty.price === 0 && (
                          <span className="text-xs opacity-70">(Miễn phí)</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Warranty Description */}
                <div className="mt-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    {product.warrantyPlans[selectedWarranty].description}
                  </p>
                </div>
              </div>
            )}

            {/* Upgrade Form */}
            {purchaseMode === "upgrade" && (
              <div className="mb-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-orange-400" />
                  Thông tin tài khoản cần nâng cấp
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Nhập thông tin tài khoản hiện tại để chúng tôi tiến hành nâng cấp
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Email tài khoản <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={upgradeInfo.email}
                      onChange={(e) => setUpgradeInfo({ ...upgradeInfo, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">
                      Mật khẩu <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      value={upgradeInfo.password}
                      onChange={(e) => setUpgradeInfo({ ...upgradeInfo, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* 2FA Code */}
                  {product.accountInfo?.has2FA && (
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm">
                        Mã 2FA (nếu có)
                      </label>
                      <input
                        type="text"
                        value={upgradeInfo.twoFactorCode}
                        onChange={(e) => setUpgradeInfo({ ...upgradeInfo, twoFactorCode: e.target.value })}
                        placeholder="123456"
                        maxLength={6}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  {/* Info Note */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-300 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Thông tin của bạn được mã hóa và bảo mật tuyệt đối.
                        Chúng tôi sẽ nâng cấp tài khoản trong vòng 24 giờ.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
              <p className="text-gray-400 mb-2">Tổng giá</p>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Gói {currentDuration}:</span>
                  <span className="font-semibold">{basePlanPrice.toLocaleString()} Cá</span>
                </div>
                {warrantyPrice > 0 && (
                  <div className="flex items-center justify-between text-gray-300">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Bảo hành {product.warrantyPlans?.[selectedWarranty].duration}:
                    </span>
                    <span className="font-semibold">+{warrantyPrice.toLocaleString()} Cá</span>
                  </div>
                )}
                <div className="h-px bg-slate-700"></div>
              </div>

              {/* Original Price (if discount) */}
              {product.originalPrice && product.discount && (
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-gray-500 line-through text-2xl">
                    {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">Cá</span>
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                    -{product.discount}%
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-white">
                  {currentPrice.toLocaleString()}
                </span>
                <span className="text-2xl font-semibold text-purple-400">Cá</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                ≈ {(currentPrice * 1000).toLocaleString()} VNĐ
              </p>

              {product.pricingPlans && product.pricingPlans[selectedPlan].discount && (
                <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tiết kiệm {product.pricingPlans[selectedPlan].discount}% khi mua gói {currentDuration}
                  </p>
                </div>
              )}
            </div>


            {/* Features */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Tính năng nổi bật
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-6">
              {purchaseMode === "new" ? (
                <>
                  <button
                    onClick={handleBuyNow}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Zap className="w-5 h-5" />
                    Mua ngay
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e)}
                    className="w-full px-8 py-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white rounded-lg transition-all font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      // TODO: Implement upgrade logic
                      if (!upgradeInfo.email || !upgradeInfo.password) {
                        alert("Vui lòng nhập đầy đủ thông tin tài khoản!");
                        return;
                      }
                      console.log("Upgrade request:", { product, upgradeInfo, selectedPlan });
                      alert("Yêu cầu nâng cấp đã được gửi! Chúng tôi sẽ xử lý trong 24h.");
                    }}
                    disabled={!upgradeInfo.email || !upgradeInfo.password}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white rounded-lg transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <TrendingUp className="w-5 h-5" />
                    Gửi yêu cầu nâng cấp
                  </button>
                  <p className="text-gray-400 text-sm text-center">
                    Phí nâng cấp: <span className="text-white font-semibold">{currentPrice.toLocaleString()} Cá</span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description & Account Info Section */}
        <div className={`mt-16 ${purchaseMode === "upgrade" ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-8"}`}>
          {/* Account Info - Only show when purchaseMode is "new" */}
          {purchaseMode === "new" && product.accountInfo && (
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Key className="w-6 h-6 text-blue-400" />
                Thông tin tài khoản
              </h2>

              <div className="space-y-6">
                {/* Login Method */}
                <div>
                  <p className="text-gray-400 text-sm mb-2">Phương thức đăng nhập:</p>
                  <p className="text-white font-semibold text-lg">{product.accountInfo.loginMethod}</p>
                </div>

                {/* What's Included */}
                <div>
                  <p className="text-gray-400 text-sm mb-3">Bạn sẽ nhận được:</p>
                  <ul className="space-y-2">
                    {product.accountInfo.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-blue-500/30">
                  {product.accountInfo.canChangeEmail && (
                    <span className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Đổi được email
                    </span>
                  )}
                  {product.accountInfo.has2FA && (
                    <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Có 2FA
                    </span>
                  )}
                </div>

                {/* Notes */}
                {product.accountInfo.notes && product.accountInfo.notes.length > 0 && (
                  <div className="pt-4 border-t border-blue-500/30">
                    <p className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Lưu ý quan trọng:
                    </p>
                    <ul className="space-y-2">
                      {product.accountInfo.notes.map((note, idx) => (
                        <li key={idx} className="text-gray-300 text-sm pl-6">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description - Full width when upgrade mode */}
          <div className={`bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8 ${purchaseMode === "upgrade" ? "max-w-none" : ""
            }`}>
            <h2 className="text-2xl font-bold text-white mb-6">
              Mô tả chi tiết
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                Với <strong className="text-white">{product.name}</strong>, bạn sẽ có quyền truy cập đầy đủ vào
                tất cả các tính năng cao cấp của {product.techLogo}. Đây là giải pháp hoàn hảo cho những ai
                muốn tận dụng sức mạnh của công nghệ AI hiện đại trong công việc và học tập.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Review Stats */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Đánh giá sản phẩm
                </h3>

                {reviewStats && (
                  <>
                    {/* Average Rating */}
                    <div className="text-center mb-6 pb-6 border-b border-slate-700">
                      <div className="text-6xl font-bold text-white mb-2">
                        {reviewStats.averageRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${star <= Math.round(reviewStats.averageRating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-400">
                        {reviewStats.totalReviews} đánh giá
                      </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution];
                        const percentage = (count / reviewStats.totalReviews) * 100;

                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-white font-medium w-3">{rating}</span>
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </div>
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-gray-400 text-sm w-12 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Nhận xét từ khách hàng ({reviews.length})
                  </h3>
                  <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Mới nhất</option>
                    <option>Hữu ích nhất</option>
                    <option>Đánh giá cao</option>
                    <option>Đánh giá thấp</option>
                  </select>
                </div>

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <Image
                          src={review.userAvatar}
                          alt={review.userName}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-white font-semibold">
                              {review.userName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${star <= review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-600"
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-500 text-sm">
                                {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-4">
                          {review.comment}
                        </p>

                        {/* Helpful Button */}
                        <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">
                            Hữu ích ({review.helpful})
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Info about reviews */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">
                    Bạn chỉ có thể đánh giá sản phẩm sau khi mua hàng.
                    Đánh giá của bạn sẽ xuất hiện trong trang <strong className="text-white">Đơn hàng của tôi</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.filter((p) => {
              if (p.id === product.id) return false;

              const currentCategories = Array.isArray(product.category) ? product.category : [product.category];
              const productCategories = Array.isArray(p.category) ? p.category : [p.category];

              // Check if any category matches
              return currentCategories.some(cat => productCategories.includes(cat));
            })
              .slice(0, 4)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => router.push(`/products/${relatedProduct.id}`)}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4 hover:border-purple-500 transition-all cursor-pointer group"
                >
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src={relatedProduct.logo}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-white">
                      {relatedProduct.price}
                    </span>
                    <span className="text-purple-400 font-semibold text-sm">Cá</span>
                    <span className="text-gray-400 text-xs">{relatedProduct.duration}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}

