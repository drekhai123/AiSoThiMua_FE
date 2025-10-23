"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";

// Mock news data
const NEWS_DATA = [
  {
    id: "1",
    title: "Ra mắt ChatGPT Pro - Gói cao cấp với O1 và O1 Mini",
    excerpt: "OpenAI vừa chính thức công bố gói ChatGPT Pro với giá 200$/tháng, mang đến truy cập không giới hạn vào các mô hình AI tiên tiến nhất.",
    content: "Chi tiết đầy đủ về ChatGPT Pro...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "AI Tools",
    author: "Admin",
    date: "2024-01-20",
    readTime: "5 phút đọc",
    views: 1250,
  },
  {
    id: "2",
    title: "Midjourney V6 - Bước tiến mới trong tạo ảnh AI",
    excerpt: "Phiên bản Midjourney V6 mới nhất mang đến chất lượng hình ảnh vượt trội với độ chi tiết và hiểu prompt tốt hơn.",
    content: "Nội dung chi tiết về Midjourney V6...",
    image: "https://images.unsplash.com/photo-1686191128892-3b0e6d8e2f4a?w=800",
    category: "AI Image",
    author: "Admin",
    date: "2024-01-18",
    readTime: "4 phút đọc",
    views: 980,
  },
  {
    id: "3",
    title: "Hướng dẫn tối ưu ChatGPT cho công việc hàng ngày",
    excerpt: "Những mẹo và thủ thuật giúp bạn sử dụng ChatGPT hiệu quả hơn trong công việc, học tập và cuộc sống.",
    content: "Hướng dẫn chi tiết...",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
    category: "Hướng dẫn",
    author: "Admin",
    date: "2024-01-15",
    readTime: "8 phút đọc",
    views: 2100,
  },
  {
    id: "4",
    title: "GitHub Copilot X - Trợ lý code AI thế hệ mới",
    excerpt: "GitHub công bố Copilot X với khả năng hiểu ngữ cảnh và tạo code thông minh hơn nhiều lần.",
    content: "Chi tiết về GitHub Copilot X...",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "Developer Tools",
    author: "Admin",
    date: "2024-01-12",
    readTime: "6 phút đọc",
    views: 1500,
  },
  {
    id: "5",
    title: "So sánh ChatGPT Plus vs ChatGPT Pro - Nên chọn gói nào?",
    excerpt: "Phân tích chi tiết sự khác biệt giữa ChatGPT Plus và ChatGPT Pro để giúp bạn chọn gói phù hợp.",
    content: "So sánh chi tiết...",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    category: "So sánh",
    author: "Admin",
    date: "2024-01-10",
    readTime: "7 phút đọc",
    views: 1800,
  },
  {
    id: "6",
    title: "Canva Pro 2024 - Những tính năng mới đáng chú ý",
    excerpt: "Canva Pro 2024 ra mắt với hàng loạt tính năng AI mới giúp thiết kế đồ họa nhanh chóng và chuyên nghiệp hơn.",
    content: "Tính năng mới của Canva Pro...",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    category: "Design",
    author: "Admin",
    date: "2024-01-08",
    readTime: "5 phút đọc",
    views: 950,
  },
];

const CATEGORIES = ["Tất cả", "AI Tools", "AI Image", "Hướng dẫn", "So sánh", "Developer Tools", "Design"];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredNews = NEWS_DATA.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Tin tức & Cập nhật
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cập nhật thông tin mới nhất về các công cụ AI, hướng dẫn sử dụng và tin tức công nghệ
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tin tức..."
              className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.id}`}
              className="group bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {news.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(news.date).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {news.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Đọc thêm
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-gray-500">
                    {news.views.toLocaleString()} lượt xem
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Không tìm thấy tin tức
            </h3>
            <p className="text-gray-400">
              Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
