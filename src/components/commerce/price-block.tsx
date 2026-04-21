import { formatPrice } from "@/lib/format"

type PriceBlockProps = {
  price: number
  compareAtPrice?: number
  className?: string
}

export function PriceBlock({ price, compareAtPrice, className }: PriceBlockProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tracking-[-0.03em] text-foreground">
          {formatPrice(price)}
        </span>
        {compareAtPrice ? (
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(compareAtPrice)}
          </span>
        ) : null}
      </div>
    </div>
  )
}
