"use client"

import { useEffect, useEffectEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { formatPrice } from "@/lib/format"
import type { Product } from "@/types/product"

type AutoProductCarouselSectionProps = {
  products: Product[]
}

const TRANSITION_MS = 700

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

export function AutoProductCarouselSection({
  products,
}: AutoProductCarouselSectionProps) {
  const showcaseProducts = getShowcaseProducts(products)
  const [visibleCount, setVisibleCount] = useState(4)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const extendedProducts = showcaseProducts.length
    ? [...showcaseProducts, ...showcaseProducts.slice(0, visibleCount)]
    : []
  const trackWidth = visibleCount
    ? (extendedProducts.length / visibleCount) * 100
    : 100
  const itemWidth = extendedProducts.length ? 100 / extendedProducts.length : 100
  const translateX = extendedProducts.length ? activeIndex * itemWidth : 0

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
    setTransitionEnabled(true)
    setActiveIndex((currentIndex) => {
      if (showcaseProducts.length <= 1) {
        return 0
      }

      return currentIndex + 1
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

  useEffect(() => {
    if (!showcaseProducts.length || activeIndex !== showcaseProducts.length) {
      return
    }

    const resetTimer = window.setTimeout(() => {
      setTransitionEnabled(false)
      setActiveIndex(0)

      window.setTimeout(() => {
        setTransitionEnabled(true)
      }, 50)
    }, TRANSITION_MS)

    return () => {
      window.clearTimeout(resetTimer)
    }
  }, [activeIndex, showcaseProducts.length])

  if (!extendedProducts.length) {
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
          <div
            className="flex will-change-transform"
            style={{
              width: `${trackWidth}%`,
              transform: `translateX(-${translateX}%)`,
              transition: transitionEnabled
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : "none",
            }}
          >
            {extendedProducts.map((product, index) => (
              <article
                key={`${product.id}-${index}`}
                className="group shrink-0"
                style={{ width: `${itemWidth}%` }}
              >
                <Link href={`/camisetas/${product.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f1f1f1]">
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
          </div>
        </div>
      </div>
    </section>
  )
}
