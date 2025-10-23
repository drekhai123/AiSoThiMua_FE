import { Metadata } from "next";
import { generateMetadata, SEO_CONFIGS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  ...SEO_CONFIGS.news,
  canonical: "https://aisothimua.com/news",
});

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
