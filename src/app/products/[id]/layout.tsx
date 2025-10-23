import { Metadata } from "next";

// This would ideally fetch from API, but for now we use a static approach
// In a real scenario, you'd use generateMetadata async function

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: productId } = await params;

  // In production, fetch product data from API
  // const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`).then(res => res.json())

  // For now, return dynamic metadata based on ID
  return {
    title: `Chi tiết sản phẩm | ASTM - Ai Sở Thì Mua`,
    description: `Xem chi tiết thông tin, giá cả và đánh giá sản phẩm tại ASTM. Mua tài khoản AI Tools giá rẻ, uy tín, giao hàng nhanh chóng.`,
    keywords: "ai tools, chatgpt, midjourney, mua tai khoan ai, gia re",
    openGraph: {
      type: "website",
      title: `Chi tiết sản phẩm | ASTM`,
      description: `Xem chi tiết thông tin, giá cả và đánh giá sản phẩm tại ASTM`,
      images: [
        {
          url: "https://aisothimua.com/og-product.png",
          width: 1200,
          height: 630,
        },
      ],
      url: `https://aisothimua.com/products/${productId}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Chi tiết sản phẩm | ASTM`,
      description: `Xem chi tiết thông tin, giá cả và đánh giá sản phẩm`,
      images: ["https://aisothimua.com/og-product.png"],
    },
    alternates: {
      canonical: `https://aisothimua.com/products/${productId}`,
    },
  };
}

export default async function ProductDetailLayout({ children }: Props) {
  return <>{children}</>;
}
