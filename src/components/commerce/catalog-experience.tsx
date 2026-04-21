"use client"

import { useDeferredValue, useState } from "react"
import { Filter } from "lucide-react"

import { ProductCard } from "@/components/commerce/product-card"
import { ProductFilters } from "@/components/commerce/product-filters"
import { QuickViewDialog } from "@/components/commerce/quick-view-dialog"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  defaultCatalogFilters,
  filterProducts,
  getAvailableColors,
  getCatalogBounds,
  sortLabels,
  sortProducts,
  toggleValue,
} from "@/lib/catalog"
import type { CatalogSort, Product, ProductFit, ShirtSize } from "@/types/product"

type CatalogExperienceProps = {
  products: Product[]
  eyebrow?: string
  title: string
  description: string
  initialSearch?: string
  initialSort?: CatalogSort
  initialOnlySale?: boolean
}

export function CatalogExperience({
  products,
  eyebrow = "Catalogo SABLE",
  title,
  description,
  initialSearch = "",
  initialSort = "featured",
  initialOnlySale = false,
}: CatalogExperienceProps) {
  const bounds = getCatalogBounds(products)
  const [filters, setFilters] = useState(() => ({
    ...defaultCatalogFilters,
    search: initialSearch,
    onlySale: initialOnlySale,
    priceRange: [bounds.minPrice, bounds.maxPrice] as [number, number],
  }))
  const [sort, setSort] = useState<CatalogSort>(initialSort)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const deferredSearch = useDeferredValue(filters.search)
  const filteredProducts = sortProducts(
    filterProducts(products, { ...filters, search: deferredSearch }),
    sort
  )
  const availableColors = getAvailableColors(products)

  function resetFilters() {
    setFilters({
      ...defaultCatalogFilters,
      search: "",
      onlySale: false,
      priceRange: [bounds.minPrice, bounds.maxPrice],
    })
    setSort("featured")
  }

  return (
    <section id="catalogo" className="section-space bg-background">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="flex flex-col gap-4 rounded-[2rem] border border-black/8 bg-white p-4 shadow-[0_20px_80px_rgba(20,20,20,0.04)] lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <input
              value={filters.search}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  search: event.target.value,
                }))
              }
              placeholder="Buscar por nombre, color, fit o categoria..."
              className="h-12 w-full rounded-full border border-border bg-muted/20 px-5 text-sm outline-none focus:border-foreground/30"
            />
          </div>
          <div className="flex gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full lg:hidden"
                >
                  <Filter />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm bg-background p-0">
                <SheetHeader className="border-b border-border/70 p-6">
                  <SheetTitle className="font-display text-3xl tracking-[-0.04em]">
                    Filtros
                  </SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  <ProductFilters
                    filters={filters}
                    availableColors={availableColors}
                    priceBounds={bounds}
                    onToggleSize={(size) =>
                      setFilters((current) => ({
                        ...current,
                        sizes: toggleValue(current.sizes, size),
                      }))
                    }
                    onToggleColor={(color) =>
                      setFilters((current) => ({
                        ...current,
                        colors: toggleValue(current.colors, color),
                      }))
                    }
                    onToggleFit={(fit) =>
                      setFilters((current) => ({
                        ...current,
                        fits: toggleValue(current.fits, fit),
                      }))
                    }
                    onAvailabilityChange={(value) =>
                      setFilters((current) => ({ ...current, availability: value }))
                    }
                    onPriceChange={(type, value) =>
                      setFilters((current) => ({
                        ...current,
                        priceRange:
                          type === "min"
                            ? [Math.max(bounds.minPrice, value), current.priceRange[1]]
                            : [current.priceRange[0], Math.min(bounds.maxPrice, value)],
                      }))
                    }
                    onToggleSale={() =>
                      setFilters((current) => ({
                        ...current,
                        onlySale: !current.onlySale,
                      }))
                    }
                    onReset={resetFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sort} onValueChange={(value) => setSort(value as CatalogSort)}>
              <SelectTrigger className="h-12 rounded-full px-5">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sortLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[19rem_1fr]">
          <div className="hidden xl:block">
            <ProductFilters
              filters={filters}
              availableColors={availableColors}
              priceBounds={bounds}
              onToggleSize={(size: ShirtSize) =>
                setFilters((current) => ({
                  ...current,
                  sizes: toggleValue(current.sizes, size),
                }))
              }
              onToggleColor={(color) =>
                setFilters((current) => ({
                  ...current,
                  colors: toggleValue(current.colors, color),
                }))
              }
              onToggleFit={(fit: ProductFit) =>
                setFilters((current) => ({
                  ...current,
                  fits: toggleValue(current.fits, fit),
                }))
              }
              onAvailabilityChange={(value) =>
                setFilters((current) => ({ ...current, availability: value }))
              }
              onPriceChange={(type, value) =>
                setFilters((current) => ({
                  ...current,
                  priceRange:
                    type === "min"
                      ? [Math.max(bounds.minPrice, value), current.priceRange[1]]
                      : [current.priceRange[0], Math.min(bounds.maxPrice, value)],
                }))
              }
              onToggleSale={() =>
                setFilters((current) => ({
                  ...current,
                  onlySale: !current.onlySale,
                }))
              }
              onReset={resetFilters}
            />
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} resultados para tu seleccion
              </p>
            </div>

            {filteredProducts.length ? (
              <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <Reveal key={product.id} delay={index * 0.02}>
                    <ProductCard
                      product={product}
                      onQuickView={(currentProduct) => setSelectedProduct(currentProduct)}
                    />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-border bg-white px-6 py-14 text-center">
                <p className="font-display text-4xl tracking-[-0.04em]">
                  No encontramos resultados
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                  Cambia el rango de precio, limpia filtros o prueba otra
                  combinacion de talla, color y fit.
                </p>
                <Button
                  type="button"
                  className="mt-6 rounded-full"
                  onClick={resetFilters}
                >
                  Restablecer filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewDialog
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProduct(null)
          }
        }}
      />
    </section>
  )
}
