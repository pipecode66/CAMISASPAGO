"use client"

import type { ShirtSize } from "@/types/product"
import { cn } from "@/lib/utils"

type SizeSelectorProps = {
  sizes: ShirtSize[]
  selectedSize: ShirtSize
  onSelect: (size: ShirtSize) => void
  compact?: boolean
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  compact = false,
}: SizeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className={cn(
            "rounded-full border text-center font-medium transition",
            compact ? "min-w-10 px-3 py-2 text-xs" : "min-w-12 px-4 py-3 text-sm",
            selectedSize === size
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-white text-foreground hover:border-foreground/30"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
