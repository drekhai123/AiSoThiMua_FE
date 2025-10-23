"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Eye, Share2, Facebook, Twitter, Link as LinkIcon, List } from "lucide-react";
import Link from "next/link";

// Mock news data (same as news page)
const NEWS_DATA = [
  {
    id: "1",
    title: "Ra mắt ChatGPT Pro - Gói cao cấp với O1 và O1 Mini",
    excerpt: "OpenAI vừa chính thức công bố gói ChatGPT Pro với giá 200$/tháng, mang đến truy cập không giới hạn vào các mô hình AI tiên tiến nhất.",
    content: `
<h2>ChatGPT Pro - Gói cao cấp mới từ OpenAI</h2>
<p>OpenAI vừa chính thức ra mắt gói <strong>ChatGPT Pro</strong> với mức giá <strong>200$/tháng</strong>, hướng đến các chuyên gia và doanh nghiệp cần sử dụng AI ở mức độ chuyên nghiệp.</p>

<h3>Tính năng nổi bật</h3>
<ul>
  <li>Truy cập không giới hạn vào <strong>GPT-4</strong></li>
  <li>Sử dụng mô hình <strong>O1</strong> và <strong>O1 Mini</strong> mới nhất</li>
  <li>Tốc độ xử lý ưu tiên cao nhất</li>
  <li>Khả năng xử lý complex reasoning tasks</li>
  <li>API access với rate limit cao hơn</li>
</ul>

<h3>So sánh với ChatGPT Plus</h3>
<p>ChatGPT Pro khác biệt so với ChatGPT Plus ($20/tháng) ở các điểm sau:</p>
<ul>
  <li><strong>Model access</strong>: Pro có thêm O1, O1 Mini</li>
  <li><strong>Speed</strong>: Ưu tiên cao nhất trong giờ cao điểm</li>
  <li><strong>Usage limits</strong>: Không giới hạn số lần sử dụng</li>
  <li><strong>Support</strong>: Priority customer support</li>
</ul>

<h3>Ai nên sử dụng ChatGPT Pro?</h3>
<p>Gói Pro phù hợp với:</p>
<ul>
  <li>Developers và researchers cần xử lý tác vụ phức tạp</li>
  <li>Doanh nghiệp tích hợp AI vào workflow</li>
  <li>Content creators chuyên nghiệp</li>
  <li>Người dùng power user cần unlimited access</li>
</ul>

<p>Với mức giá 200$/tháng, ChatGPT Pro là lựa chọn đắt đỏ nhưng mang lại giá trị cao cho những ai thực sự cần sức mạnh xử lý AI tối đa.</p>
    `,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    category: "AI Tools",
    author: "Admin",
    date: "2024-01-20",
    readTime: "5 phút đọc",
    views: 1250,
    seo: {
      metaTitle: "Ra mắt ChatGPT Pro - Gói cao cấp với O1 và O1 Mini | ASTM",
      metaDescription: "OpenAI vừa chính thức công bố gói ChatGPT Pro với giá 200$/tháng, mang đến truy cập không giới hạn vào các mô hình AI tiên tiến nhất như O1, O1 Mini và GPT-4.",
      metaKeywords: "chatgpt pro, openai, gpt-4, o1, ai tools, chatgpt plus",
      slug: "ra-mat-chatgpt-pro",
      ogImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    },
  },
  {
    id: "2",
    title: "Midjourney V6 - Bước tiến mới trong tạo ảnh AI",
    excerpt: "Phiên bản Midjourney V6 mới nhất mang đến chất lượng hình ảnh vượt trội với độ chi tiết và hiểu prompt tốt hơn.",
    content: `
<h2>Midjourney V6 - Cải tiến vượt bậc</h2>
<p>Midjourney vừa ra mắt phiên bản V6 với những cải tiến đáng kể về chất lượng hình ảnh và khả năng hiểu prompt của người dùng.</p>

<h3>Những cải tiến chính</h3>
<ul>
  <li><strong>Chất lượng hình ảnh cao hơn</strong> - Độ phân giải và chi tiết tốt hơn đáng kể</li>
  <li><strong>Hiểu prompt tốt hơn</strong> - AI hiểu ý định người dùng chính xác hơn</li>
  <li><strong>Xử lý text trong ảnh</strong> - Cải thiện khả năng tạo text trên hình ảnh</li>
  <li><strong>Realistic rendering</strong> - Hình ảnh chân thực hơn</li>
</ul>

<h3>Cách sử dụng V6</h3>
<p>Để sử dụng Midjourney V6, thêm <code>--v 6</code> vào cuối prompt của bạn:</p>
<pre>/imagine a beautiful sunset over mountains --v 6</pre>

<p>Midjourney V6 đang mở ra kỷ nguyên mới cho AI art generation!</p>
    `,
    image: "https://images.unsplash.com/photo-1686191128892-3b0e6d8e2f4a?w=1200",
    category: "AI Image",
    author: "Admin",
    date: "2024-01-18",
    readTime: "4 phút đọc",
    views: 980,
    seo: {
      metaTitle: "Midjourney V6 - Bước tiến mới trong tạo ảnh AI | ASTM",
      metaDescription: "Phiên bản Midjourney V6 mới nhất mang đến chất lượng hình ảnh vượt trội với độ chi tiết và hiểu prompt tốt hơn. Tìm hiểu những cải tiến đáng chú ý.",
      metaKeywords: "midjourney v6, ai image, text to image, midjourney, ai art",
      slug: "midjourney-v6-buoc-tien-moi",
      ogImage: "https://images.unsplash.com/photo-1686191128892-3b0e6d8e2f4a?w=1200",
    },
  },
];

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params?.id as string;
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  const news = NEWS_DATA.find((n) => n.id === newsId);

  // Extract Table of Contents from HTML content
  useEffect(() => {
    if (!news) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(news.content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");

    const tocItems: TocItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || "";
      const id = `heading-${index}`;
      heading.id = id;
      
      tocItems.push({
        id,
        text,
        level: parseInt(heading.tagName[1]),
      });
    });

    setToc(tocItems);
  }, [news]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const headings = toc.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveSection(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (!news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Không tìm thấy bài viết</h2>
          <Link
            href="/news"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition-all inline-block"
          >
            Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = news.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Đã copy link!");
        break;
    }
  };

  // Generate JSON-LD schema for article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: news.title,
    image: news.image,
    datePublished: news.date,
    dateModified: news.date,
    author: {
      "@type": "Person",
      name: news.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ASTM - Ai Sở Thì Mua",
      logo: {
        "@type": "ImageObject",
        url: "https://aisothimua.com/logos/ASTM.svg",
      },
    },
    description: news.excerpt,
    articleBody: news.content.replace(/<[^>]*>/g, ""),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <article className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại
        </button>

        {/* Featured Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-full">
            {news.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          {news.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{news.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{new Date(news.date).toLocaleDateString("vi-VN")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{news.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            <span>{news.views.toLocaleString()} lượt xem</span>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-gray-400 font-medium">Chia sẻ:</span>
          <button
            onClick={() => handleShare("facebook")}
            className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-colors"
            title="Chia sẻ lên Facebook"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="p-2 bg-slate-800 hover:bg-sky-500 text-white rounded-lg transition-colors"
            title="Chia sẻ lên Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="p-2 bg-slate-800 hover:bg-purple-600 text-white rounded-lg transition-colors"
            title="Copy link"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content with Sidebar */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Article Content */}
          <div className="lg:col-span-9">
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
                prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8
                prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-gray-300 prose-ul:my-4
                prose-li:mb-2
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-purple-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Sticky Table of Contents Sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Mục lục</h3>
                  </div>
                  <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-sm ${
                          item.level === 3 ? "pl-6" : ""
                        } ${
                          activeSection === item.id
                            ? "bg-purple-600 text-white font-semibold"
                            : "text-gray-400 hover:text-white hover:bg-slate-700"
                        }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Related News */}
        <div className="mt-16 pt-8 border-t border-slate-700 lg:col-span-12">
          <h3 className="text-2xl font-bold text-white mb-6">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NEWS_DATA.filter((n) => n.id !== newsId && n.category === news.category)
              .slice(0, 2)
              .map((relatedNews) => (
                <Link
                  key={relatedNews.id}
                  href={`/news/${relatedNews.id}`}
                  className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={relatedNews.image}
                      alt={relatedNews.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {relatedNews.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedNews.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
          </article>
        </div>
      </main>
    </>
  );
}
