import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutProvider from "@/components/providers/LayoutProvider";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { generateMetadata, SEO_CONFIGS, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = generateMetadata({
  ...SEO_CONFIGS.home,
  canonical: "https://aisothimua.com",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = "G-FQ4YK3F82M";

  return (
    <html lang="vi" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema()),
          }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased dark`}
      >
        <GoogleAnalytics gaId={gaId} />
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
