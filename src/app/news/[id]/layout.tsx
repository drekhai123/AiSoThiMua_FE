import { Metadata } from "next";

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const newsId = params.id;
  
  // In production, fetch news data from API
  // const news = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${newsId}`).then(res => res.json())
  
  // For now, return dynamic metadata
  return {
    title: `Chi tiết tin tức | ASTM - Ai Sở Thì Mua`,
    description: `Đọc bài viết chi tiết về AI Tools, công nghệ và cập nhật mới nhất từ cộng đồng ASTM.`,
    keywords: "tin tuc ai, chatgpt, midjourney, ai tools vietnam, blog ai",
    openGraph: {
      type: "article",
      title: `Chi tiết tin tức | ASTM`,
      description: `Đọc bài viết chi tiết về AI Tools và công nghệ`,
      images: [
        {
          url: "https://aisothimua.com/og-news.png",
          width: 1200,
          height: 630,
        },
      ],
      url: `https://aisothimua.com/news/${newsId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Chi tiết tin tức | ASTM`,
      description: `Đọc bài viết chi tiết về AI Tools và công nghệ`,
      images: ["https://aisothimua.com/og-news.png"],
    },
    alternates: {
      canonical: `https://aisothimua.com/news/${newsId}`,
    },
  };
}

export default function NewsDetailLayout({ children }: Props) {
  return <>{children}</>;
}
