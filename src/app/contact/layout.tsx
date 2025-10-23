import { Metadata } from "next";
import { generateMetadata, SEO_CONFIGS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  ...SEO_CONFIGS.contact,
  canonical: "https://aisothimua.com/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
