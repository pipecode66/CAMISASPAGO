import { products } from "@/data/products"

export async function getCatalogProducts() {
  return products
}

export async function getFeaturedProducts() {
  return products.filter((product) => product.isFeatured).slice(0, 8)
}

export async function getNewArrivalProducts() {
  return products.filter((product) => product.isNewArrival).slice(0, 6)
}

export async function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export async function getRelatedProducts(slug: string) {
  const current = products.find((product) => product.slug === slug)

  if (!current) {
    return []
  }

  return products
    .filter(
      (product) =>
        product.slug !== slug &&
        (product.fit === current.fit || product.category === current.category)
    )
    .slice(0, 4)
}

export async function getRecommendedProducts(slug: string) {
  return products.filter((product) => product.slug !== slug).slice(4, 8)
}
