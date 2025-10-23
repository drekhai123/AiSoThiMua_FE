import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aisothimua.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    // Fetch products
    const productsRes = await fetch(`${apiUrl}/api/products/`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    const products = productsRes.ok ? await productsRes.json() : [];

    const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updated_at || product.created_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Fetch news
    const newsRes = await fetch(`${apiUrl}/api/news/`, {
      next: { revalidate: 3600 },
    });
    const news = newsRes.ok ? await newsRes.json() : [];

    const newsPages: MetadataRoute.Sitemap = news.map((item: any) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: new Date(item.updated_at || item.created_at),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...newsPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return static pages if API fails
    return staticPages;
  }
}
