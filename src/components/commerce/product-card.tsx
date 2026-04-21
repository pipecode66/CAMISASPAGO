"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, Heart, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { PriceBlock } from "@/components/commerce/price-block"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"
import type { Product, ShirtSize } from "@/types/product"

type ProductCardProps = {
  product: Product
  onQuickView: (product: Product) => void
}

function getDefaultSize(sizes: ShirtSize[]) {
  return sizes.includes("M") ? "M" : sizes[0]
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const toggleWishlist = useWishlistStore((state) => state.toggle)
  const isWishlisted = useWishlistStore((state) => state.productIds.includes(product.id))

  function handleQuickBuy() {
    const size = getDefaultSize(product.sizes)
    const color = product.colors[0]

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src ?? "",
      price: product.price,
      quantity: 1,
      size,
      colorName: color.name,
      colorHex: color.hex,
      stock: product.stock,
    })

    toast.success(`${product.name} agregado al carrito`, {
      description: `Talla ${size} · ${color.name}`,
    })
  }

  return (
    <motion.article
      layout
      className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_60px_rgba(20,20,20,0.04)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative overflow-hidden bg-[#ece7df]">
        <Link href={`/camisetas/${product.slug}`} className="block">
          <div className="relative aspect-[4/5]">
            <Image
              src={product.images[0]?.src ?? ""}
              alt={product.images[0]?.alt ?? product.name}
              fill
              className="object-cover transition duration-500 group-hover:opacity-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
            <Image
              src={product.images[1]?.src ?? product.images[0]?.src ?? ""}
              alt={product.images[1]?.alt ?? product.name}
              fill
              className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            />
          </div>
        </Link>

        <div className="absolute inset-x-4 top-4 flex items-start justify-between">
          {product.badge ? (
            <Badge className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] tracking-[0.18em] uppercase text-foreground shadow-none">
              {product.badge}
            </Badge>
          ) : (
            <span />
          )}

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/90 hover:bg-white"
            onClick={() => toggleWishlist(product.id)}
            aria-label="Agregar a favoritos"
          >
            <Heart className={isWishlisted ? "fill-current" : ""} />
          </Button>
        </div>

        <div className="absolute inset-x-4 bottom-4 grid gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
          <Button
            type="button"
            className="h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleQuickBuy}
          >
            <ShoppingBag />
            Compra rapida
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-white/60 bg-white/92 backdrop-blur hover:bg-white"
            onClick={() => onQuickView(product)}
          >
            <Eye />
            Vista rapida
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/camisetas/${product.slug}`}
                className="font-medium tracking-[-0.03em] text-foreground"
              >
                {product.name}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.shortDescription}
              </p>
            </div>
          </div>
          <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>

        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-medium tracking-[0.16em] uppercase text-muted-foreground"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
