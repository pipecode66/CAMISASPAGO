"use client"

import { RefreshCw } from "lucide-react"

import { fitLabels } from "@/lib/catalog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CatalogFilters, ProductFit, ShirtSize } from "@/types/product"

type ProductFiltersProps = {
  filters: CatalogFilters
  availableColors: string[]
  priceBounds: { minPrice: number; maxPrice: number }
  onToggleSize: (size: ShirtSize) => void
  onToggleColor: (color: string) => void
  onToggleFit: (fit: ProductFit) => void
  onAvailabilityChange: (value: CatalogFilters["availability"]) => void
  onPriceChange: (type: "min" | "max", value: number) => void
  onToggleSale: () => void
  onReset: () => void
}

const allSizes: ShirtSize[] = ["S", "M", "L", "XL", "XXL"]
const allFits: ProductFit[] = ["oversized", "regular"]

export function ProductFilters({
  filters,
  availableColors,
  priceBounds,
  onToggleSize,
  onToggleColor,
  onToggleFit,
  onAvailabilityChange,
  onPriceChange,
  onToggleSale,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6 rounded-[2rem] border border-black/8 bg-white p-5 shadow-[0_24px_80px_rgba(20,20,20,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Filtros</p>
          <h3 className="mt-2 font-display text-3xl tracking-[-0.04em]">Refina el drop</h3>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          <RefreshCw />
          Limpiar
        </Button>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Talla
        </h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onToggleSize(size)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                filters.sizes.includes(size)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-muted/25 hover:border-foreground/30"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onToggleColor(color)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                filters.colors.includes(color)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-white hover:border-foreground/30"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Fit
        </h4>
        <div className="grid gap-2">
          {allFits.map((fit) => (
            <button
              key={fit}
              type="button"
              onClick={() => onToggleFit(fit)}
              className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                filters.fits.includes(fit)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/30"
              }`}
            >
              {fitLabels[fit]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Precio
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Min
            </span>
            <input
              type="number"
              value={filters.priceRange[0]}
              min={priceBounds.minPrice}
              max={filters.priceRange[1]}
              onChange={(event) => onPriceChange("min", Number(event.target.value))}
              className="h-11 w-full rounded-[1rem] border border-border bg-white px-4 text-sm outline-none focus:border-foreground/30"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Max
            </span>
            <input
              type="number"
              value={filters.priceRange[1]}
              min={filters.priceRange[0]}
              max={priceBounds.maxPrice}
              onChange={(event) => onPriceChange("max", Number(event.target.value))}
              className="h-11 w-full rounded-[1rem] border border-border bg-white px-4 text-sm outline-none focus:border-foreground/30"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Disponibilidad
        </h4>
        <div className="grid gap-2">
          {[
            { value: "all", label: "Todos" },
            { value: "in-stock", label: "Disponibles" },
            { value: "low-stock", label: "Ultimas unidades" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onAvailabilityChange(option.value as CatalogFilters["availability"])
              }
              className={`rounded-[1.25rem] border px-4 py-3 text-left text-sm transition ${
                filters.availability === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-[1.25rem] border border-border px-4 py-3">
        <Checkbox checked={filters.onlySale} onCheckedChange={onToggleSale} />
        <span className="text-sm font-medium">Mostrar solo prendas en sale</span>
      </label>
    </div>
  )
}
