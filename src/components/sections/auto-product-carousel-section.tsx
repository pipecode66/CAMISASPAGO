"use client"

import { useEffect, useEffectEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { formatPrice } from "@/lib/format"
import type { Product } from "@/types/product"

type AutoProductCarouselSectionProps = {
  products: Product[]
}

function getVisibleCount(width: number) {
  if (width < 768) {
    return 1
  }

  if (width < 1280) {
    return 2
  }

  return 4
}

function getShowcaseProducts(products: Product[]) {
  const curatedProducts = products.filter(
    (product) => product.isFeatured || product.isNewArrival || Boolean(product.badge)
  )

  return (curatedProducts.length ? curatedProducts : products).slice(0, 12)
}

function getVisibleProducts(
  products: Product[],
  visibleCount: number,
  startIndex: number
) {
  if (!products.length || visibleCount <= 0) {
    return [] as Product[]
  }

  if (products.length <= visibleCount) {
    const paddedProducts = [...products]

    while (paddedProducts.length < visibleCount) {
      paddedProducts.push(products[paddedProducts.length % products.length])
    }

    return paddedProducts
  }

  return Array.from({ length: visibleCount }, (_, offset) => {
    const index = (startIndex + offset) % products.length

    return products[index]
  })
}

export function AutoProductCarouselSection({
  products,
}: AutoProductCarouselSectionProps) {
  const showcaseProducts = getShowcaseProducts(products)
  const [visibleCount, setVisibleCount] = useState(4)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const normalizedActiveIndex = showcaseProducts.length
    ? activeIndex % showcaseProducts.length
    : 0
  const visibleProducts = getVisibleProducts(
    showcaseProducts,
    visibleCount,
    normalizedActiveIndex
  )

  useEffect(() => {
    function syncVisibleCount() {
      setVisibleCount(getVisibleCount(window.innerWidth))
    }

    syncVisibleCount()
    window.addEventListener("resize", syncVisibleCount)

    return () => {
      window.removeEventListener("resize", syncVisibleCount)
    }
  }, [])

  const goToNextProduct = useEffectEvent(() => {
    setActiveIndex((currentIndex) => {
      if (!showcaseProducts.length) {
        return 0
      }

      return (currentIndex + 1) % showcaseProducts.length
    })
  })

  useEffect(() => {
    if (isPaused || showcaseProducts.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      goToNextProduct()
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPaused, showcaseProducts.length])

  if (!visibleProducts.length) {
    return null
  }

  return (
    <section className="bg-background pb-4 pt-1 md:pb-8">
      <div className="container">
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={`${visibleCount}-${normalizedActiveIndex}`}
              initial={{ opacity: 0, x: 38 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -38 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={
                visibleCount === 1
                  ? "grid grid-cols-1 gap-5"
                  : visibleCount === 2
                    ? "grid grid-cols-2 gap-5"
                    : "grid grid-cols-4 gap-5 xl:gap-6"
              }
            >
              {visibleProducts.map((product, index) => (
                <article key={`${product.id}-${index}`} className="group">
                  <Link href={`/camisetas/${product.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f2efe9]">
                      <Image
                        src={product.images[0]?.src ?? ""}
                        alt={product.images[0]?.alt ?? product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes={
                          visibleCount === 1
                            ? "100vw"
                            : visibleCount === 2
                              ? "50vw"
                              : "25vw"
                        }
                      />
                    </div>

                    <div className="space-y-4 px-2 py-5 text-center">
                      <div className="space-y-2">
                        <h3 className="product-name text-lg tracking-[-0.03em] text-foreground sm:text-[1.35rem]">
                          {product.name}
                        </h3>
                        <p className="text-sm font-semibold text-muted-foreground">
                          {formatPrice(product.price)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium tracking-[0.16em] text-muted-foreground">
                        {product.sizes.map((size) => (
                          <span key={size}>{size}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
