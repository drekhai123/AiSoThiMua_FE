import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://aisothimua.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/aduconcachienxu/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
