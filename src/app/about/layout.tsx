import { Metadata } from "next";
import { generateMetadata, SEO_CONFIGS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  ...SEO_CONFIGS.about,
  canonical: "https://aisothimua.com/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
