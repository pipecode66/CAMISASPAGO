import { DEFAULT_MAX_PRICE } from "@/lib/constants"
import type {
  CatalogFilters,
  CatalogSort,
  Product,
  ProductCategory,
  ProductFit,
  ShirtSize,
} from "@/types/product"

export const categoryLabels: Record<ProductCategory, string> = {
  oversized: "Oversized",
  "regular-fit": "Regular fit",
  basicas: "Basicas",
  graficas: "Graficas",
  "edicion-limitada": "Edicion limitada",
  nuevas: "Nuevas",
}

export const fitLabels: Record<ProductFit, string> = {
  oversized: "Oversized",
  regular: "Regular",
}

export const sortLabels: Record<CatalogSort, string> = {
  featured: "Destacados",
  newest: "Mas recientes",
  "price-asc": "Precio menor a mayor",
  "price-desc": "Precio mayor a menor",
}

export const defaultCatalogFilters: CatalogFilters = {
  search: "",
  sizes: [],
  colors: [],
  fits: [],
  priceRange: [0, DEFAULT_MAX_PRICE],
  availability: "all",
  onlySale: false,
}

export function getCatalogBounds(products: Product[]) {
  const prices = products.map((product) => product.price)

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  }
}

export function getAvailableColors(products: Product[]) {
  return Array.from(
    new Set(products.flatMap((product) => product.colors.map((color) => color.name)))
  )
}

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
}

export function getSearchableText(product: Product) {
  return normalizeText(
    [
      product.name,
      product.shortDescription,
      product.category,
      product.fit,
      ...product.colors.map((color) => color.name),
      ...product.tags,
    ].join(" ")
  )
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  const searchTerm = normalizeText(filters.search)

  return products.filter((product) => {
    if (searchTerm && !getSearchableText(product).includes(searchTerm)) {
      return false
    }

    if (filters.sizes.length > 0) {
      const sizeMatch = filters.sizes.some((size) => product.sizes.includes(size))

      if (!sizeMatch) {
        return false
      }
    }

    if (filters.colors.length > 0) {
      const colorMatch = filters.colors.some((color) =>
        product.colors.some((productColor) => productColor.name === color)
      )

      if (!colorMatch) {
        return false
      }
    }

    if (filters.fits.length > 0 && !filters.fits.includes(product.fit)) {
      return false
    }

    if (
      product.price < filters.priceRange[0] ||
      product.price > filters.priceRange[1]
    ) {
      return false
    }

    if (filters.availability === "in-stock" && product.stock <= 0) {
      return false
    }

    if (filters.availability === "low-stock" && product.stock > 8) {
      return false
    }

    if (filters.onlySale && !product.isSale) {
      return false
    }

    return true
  })
}

export function sortProducts(products: Product[], sort: CatalogSort) {
  return [...products].sort((left, right) => {
    if (sort === "newest") {
      return Number(Boolean(right.isNewArrival)) - Number(Boolean(left.isNewArrival))
    }

    if (sort === "price-asc") {
      return left.price - right.price
    }

    if (sort === "price-desc") {
      return right.price - left.price
    }

    const featuredDelta =
      Number(Boolean(right.isFeatured || right.badge)) -
      Number(Boolean(left.isFeatured || left.badge))

    if (featuredDelta !== 0) {
      return featuredDelta
    }

    return right.stock - left.stock
  })
}

export function toggleValue<T>(array: T[], value: T) {
  return array.includes(value)
    ? array.filter((item) => item !== value)
    : [...array, value]
}

export function parseSizeParam(value?: string): ShirtSize[] {
  if (!value) {
    return []
  }

  return value
    .split(",")
    .map((item) => item.trim().toUpperCase())
    .filter((item): item is ShirtSize =>
      ["S", "M", "L", "XL", "XXL"].includes(item)
    )
}
