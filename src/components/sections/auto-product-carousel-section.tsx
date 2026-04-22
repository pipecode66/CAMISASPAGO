"use client"

import { useEffect, useEffectEvent, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { fitLabels } from "@/lib/catalog"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/types/product"

type AutoProductCarouselSectionProps = {
  products: Product[]
}

function getPageSize(width: number) {
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

function chunkProducts(products: Product[], pageSize: number) {
  if (!products.length || pageSize <= 0) {
    return []
  }

  const paddedProducts = [...products]

  if (paddedProducts.length > pageSize) {
    const remainder = paddedProducts.length % pageSize

    if (remainder !== 0) {
      paddedProducts.push(...products.slice(0, pageSize - remainder))
    }
  }

  const pages: Product[][] = []

  for (let index = 0; index < paddedProducts.length; index += pageSize) {
    pages.push(paddedProducts.slice(index, index + pageSize))
  }

  return pages
}

export function AutoProductCarouselSection({
  products,
}: AutoProductCarouselSectionProps) {
  const showcaseProducts = getShowcaseProducts(products)
  const [pageSize, setPageSize] = useState(4)
  const [activePage, setActivePage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const pages = chunkProducts(showcaseProducts, pageSize)
  const normalizedActivePage = pages.length ? activePage % pages.length : 0

  useEffect(() => {
    function syncPageSize() {
      setPageSize(getPageSize(window.innerWidth))
    }

    syncPageSize()
    window.addEventListener("resize", syncPageSize)

    return () => {
      window.removeEventListener("resize", syncPageSize)
    }
  }, [])

  const goToNextPage = useEffectEvent(() => {
    setActivePage((currentPage) => {
      if (!pages.length) {
        return 0
      }

      return (currentPage + 1) % pages.length
    })
  })

  useEffect(() => {
    if (isPaused || pages.length <= 1) {
      return
    }

    const intervalId = window.setInterval(() => {
      goToNextPage()
    }, 5000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPaused, pages.length])

  if (!pages.length) {
    return null
  }

  const activeProducts = pages[normalizedActivePage]

  return (
    <section className="bg-background pb-6 pt-1 md:pb-10">
      <div className="container">
        <div className="overflow-hidden rounded-[2.5rem] border border-black/8 bg-white shadow-[0_28px_90px_rgba(20,20,20,0.06)]">
          <div className="flex flex-col gap-4 border-b border-black/8 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="eyebrow">Catalogo en movimiento</p>
              <h2 className="font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                Rota cada 5 segundos con distintas referencias
              </h2>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() =>
                    setActivePage((currentPage) =>
                      currentPage % pages.length === 0
                        ? pages.length - 1
                        : (currentPage % pages.length) - 1
                    )
                  }
                  aria-label="Ver productos anteriores"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() =>
                    setActivePage((currentPage) => ((currentPage % pages.length) + 1) % pages.length)
                  }
                  aria-label="Ver productos siguientes"
                >
                  <ChevronRight />
                </Button>
              </div>

              <Button asChild variant="ghost" className="rounded-full px-0 hover:bg-transparent">
                <Link href="/camisetas">
                  Ver catalogo completo
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${pageSize}-${normalizedActivePage}`}
                initial={{ opacity: 0, x: 52 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -52 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={
                  pageSize === 1
                    ? "grid grid-cols-1 gap-px bg-black/8"
                    : pageSize === 2
                      ? "grid grid-cols-2 gap-px bg-black/8"
                      : "grid grid-cols-4 gap-px bg-black/8"
                }
              >
                {activeProducts.map((product, index) => (
                  <article
                    key={`${product.id}-${index}`}
                    className="group bg-white"
                  >
                    <Link href={`/camisetas/${product.slug}`} className="block">
                      <div className="relative aspect-[4/5] overflow-hidden bg-[#f2efe9]">
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#5b544b] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-white">
                          {fitLabels[product.fit]}
                        </span>
                        <Image
                          src={product.images[0]?.src ?? ""}
                          alt={product.images[0]?.alt ?? product.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          sizes={
                            pageSize === 1
                              ? "100vw"
                              : pageSize === 2
                                ? "50vw"
                                : "25vw"
                          }
                        />
                      </div>

                      <div className="space-y-4 px-4 py-5 text-center sm:px-5">
                        <div className="space-y-2">
                          <h3 className="product-name text-lg tracking-[-0.03em] text-foreground sm:text-[1.4rem]">
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

            {pages.length > 1 ? (
              <div className="flex items-center justify-center gap-2 border-t border-black/8 px-5 py-4">
                {pages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    type="button"
                    onClick={() => setActivePage(index)}
                    className={`h-2.5 rounded-full transition ${
                      index === normalizedActivePage
                        ? "w-8 bg-foreground"
                        : "w-2.5 bg-foreground/20 hover:bg-foreground/35"
                    }`}
                    aria-label={`Ir al grupo ${index + 1} del catalogo rotativo`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
