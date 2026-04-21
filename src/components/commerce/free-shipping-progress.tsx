import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants"
import { formatPrice } from "@/lib/format"

type FreeShippingProgressProps = {
  subtotal: number
  className?: string
}

export function FreeShippingProgress({
  subtotal,
  className,
}: FreeShippingProgressProps) {
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="text-muted-foreground">
          {remaining > 0
            ? `Te faltan ${formatPrice(remaining)} para envio gratis`
            : "Ya tienes envio gratis en esta compra"}
        </p>
        <span className="font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
