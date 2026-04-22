import Image from "next/image"

import { getOrderTotals } from "@/lib/checkout"
import { formatPrice } from "@/lib/format"
import type { ShippingMethod } from "@/types/checkout"
import type { CartItem } from "@/types/product"

type OrderSummaryProps = {
  items: CartItem[]
  shippingMethod: ShippingMethod
  couponCode?: string
}

export function OrderSummary({
  items,
  shippingMethod,
  couponCode,
}: OrderSummaryProps) {
  const totals = getOrderTotals(items, shippingMethod, couponCode)

  return (
    <aside className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.06)]">
      <div className="space-y-5">
        <div>
          <p className="eyebrow">Resumen del pedido</p>
          <h3 className="mt-2 font-display text-3xl tracking-[-0.04em]">
            Total listo para pago
          </h3>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-[1.5rem] bg-muted/35 p-3"
            >
              <div className="relative aspect-[4/5] w-20 overflow-hidden rounded-[1rem] bg-[#ece7df]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="product-name font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.colorName} / {item.size}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Cantidad {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-dashed border-border pt-5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(totals.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Descuento</span>
            <span>{totals.discount ? `-${formatPrice(totals.discount)}` : formatPrice(0)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Envio</span>
            <span>{totals.shipping ? formatPrice(totals.shipping) : "Gratis"}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
