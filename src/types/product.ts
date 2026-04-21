export const productCategories = [
  "oversized",
  "regular-fit",
  "basicas",
  "graficas",
  "edicion-limitada",
  "nuevas",
] as const

export const productFits = ["oversized", "regular"] as const

export const productBadges = ["Nuevo", "Sale", "Best Seller"] as const

export const shirtSizes = ["S", "M", "L", "XL", "XXL"] as const

export type ProductCategory = (typeof productCategories)[number]
export type ProductFit = (typeof productFits)[number]
export type ProductBadge = (typeof productBadges)[number]
export type ShirtSize = (typeof shirtSizes)[number]

export type ProductImage = {
  src: string
  alt: string
}

export type ProductColor = {
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  images: ProductImage[]
  colors: ProductColor[]
  sizes: ShirtSize[]
  stock: number
  category: ProductCategory
  fit: ProductFit
  badge?: ProductBadge
  material: string
  care: string[]
  features: string[]
  tags: string[]
  isFeatured?: boolean
  isNewArrival?: boolean
  isSale?: boolean
}

export type CatalogFilters = {
  search: string
  sizes: ShirtSize[]
  colors: string[]
  fits: ProductFit[]
  priceRange: [number, number]
  availability: "all" | "in-stock" | "low-stock"
  onlySale: boolean
}

export type CatalogSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"

export type CartItem = {
  id: string
  productId: string
  slug: string
  name: string
  image: string
  price: number
  quantity: number
  size: ShirtSize
  colorName: string
  colorHex: string
  stock: number
}
