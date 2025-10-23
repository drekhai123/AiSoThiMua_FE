import { Metadata } from "next";
import { generateMetadata, SEO_CONFIGS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  ...SEO_CONFIGS.products,
  canonical: "https://aisothimua.com/products",
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
