"use client"

import type { ProductColor } from "@/types/product"
import { cn } from "@/lib/utils"

type ColorSwatchesProps = {
  colors: ProductColor[]
  selectedColorName: string
  onSelect: (color: ProductColor) => void
  size?: "sm" | "md"
}

export function ColorSwatches({
  colors,
  selectedColorName,
  onSelect,
  size = "md",
}: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => {
        const isActive = color.name === selectedColorName

        return (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelect(color)}
            className={cn(
              "inline-flex items-center justify-center rounded-full border transition",
              size === "sm" ? "size-8" : "size-10",
              isActive
                ? "border-foreground bg-foreground/5"
                : "border-border hover:border-foreground/30"
            )}
            aria-label={`Seleccionar color ${color.name}`}
          >
            <span
              className={cn(
                "rounded-full border border-black/10 grayscale",
                size === "sm" ? "size-5" : "size-6"
              )}
              style={{ backgroundColor: color.hex }}
            />
          </button>
        )
      })}
    </div>
  )
}
