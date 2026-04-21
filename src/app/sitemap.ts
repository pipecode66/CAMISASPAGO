import type { MetadataRoute } from "next"

import { siteConfig } from "@/data/site"
import { getCatalogProducts } from "@/server/catalog/repository"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalogProducts()

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/camisetas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/checkout`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...products.map((product) => ({
      url: `${siteConfig.url}/camisetas/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
