import { Metadata } from "next";

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  canonical?: string;
  noindex?: boolean;
}

const SITE_NAME = "ASTM - Ai Sở Thì Mua";
const SITE_URL = "https://aisothimua.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    canonical,
    noindex = false,
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex ? "noindex, nofollow" : "index, follow",
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
    openGraph: {
      type: ogType,
      locale: "vi_VN",
      url: canonical || SITE_URL,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@aisothimua",
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

// Predefined SEO configs for common pages
export const SEO_CONFIGS = {
  home: {
    title: "Trang chủ - Mua tài khoản AI Tools giá rẻ, uy tín",
    description:
      "Mua tài khoản ChatGPT Plus, Midjourney, Claude Pro, GitHub Copilot giá rẻ nhất thị trường. Giao hàng tức thì, bảo hành chu đáo, hỗ trợ 24/7. Thanh toán an toàn với Cá.",
    keywords: "chatgpt plus giá rẻ, midjourney giá rẻ, claude pro, github copilot, ai tools việt nam, mua tài khoản ai",
  },
  products: {
    title: "Sản phẩm - Danh sách AI Tools & Dịch vụ",
    description:
      "Khám phá hơn 50+ sản phẩm AI Tools chính hãng: ChatGPT Plus/Pro, Midjourney, Claude Pro, Canva Pro, GitHub Copilot và nhiều hơn nữa. Giá tốt nhất thị trường.",
    keywords: "ai tools, chatgpt, midjourney, claude, github copilot, canva pro, ai image generator",
  },
  news: {
    title: "Tin tức & Cập nhật - Cộng đồng AI Tools",
    description:
      "Cập nhật tin tức mới nhất về AI, hướng dẫn sử dụng ChatGPT, Midjourney, tips & tricks, so sánh các công cụ AI. Blog về AI và công nghệ.",
    keywords: "tin tức ai, hướng dẫn chatgpt, midjourney tutorial, ai news vietnam, blog ai tools",
  },
  about: {
    title: "Giới thiệu - Về ASTM",
    description:
      "ASTM - Ai Sở Thì Mua là nền tảng hàng đầu Việt Nam cung cấp tài khoản AI Tools chính hãng. Uy tín, nhanh chóng, hỗ trợ tận tình 24/7.",
    keywords: "về astm, giới thiệu astm, ai tools vietnam, mua ai tools",
  },
  contact: {
    title: "Liên hệ - Hỗ trợ & Thiết kế Website",
    description:
      "Liên hệ với ASTM để được tư vấn, hỗ trợ kỹ thuật hoặc đặt thiết kế website chuyên nghiệp. Hotline: +84 901267368. Email: aisothimua@gmail.com",
    keywords: "liên hệ astm, hỗ trợ ai tools, thiết kế website, tư vấn ai",
  },
};

// Schema.org JSON-LD generators
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/ASTM.svg`,
    description: "Nền tảng mua bán tài khoản AI Tools hàng đầu Việt Nam",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-123-456-789",
      contactType: "Customer Support",
      availableLanguage: ["Vietnamese", "English"],
    },
    sameAs: [
      "https://facebook.com/aisothimua",
      "https://twitter.com/aisothimua",
      "https://t.me/aisothimua",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "VND",
      availability: product.availability || "https://schema.org/InStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0,
      },
    }),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  content: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/ASTM.svg`,
      },
    },
    description: article.description,
    articleBody: article.content,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateReviewSchema(review: {
  itemName: string;
  ratingValue: number;
  bestRating?: number;
  reviewCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Product",
      name: review.itemName,
    },
    ratingValue: review.ratingValue,
    bestRating: review.bestRating || 5,
    reviewCount: review.reviewCount,
  };
}
