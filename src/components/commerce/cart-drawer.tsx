"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"

import { FreeShippingProgress } from "@/components/commerce/free-shipping-progress"
import { QuantityStepper } from "@/components/commerce/quantity-stepper"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { getCartSubtotal } from "@/lib/checkout"
import { formatPrice } from "@/lib/format"
import { useCartStore } from "@/store/cart-store"

export function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const subtotal = getCartSubtotal(items)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : closeCart())}>
      <SheetContent
        side="right"
        className="w-full max-w-none border-l border-border/60 bg-white p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-b border-border/70 px-6 py-5">
          <SheetTitle className="font-display text-3xl tracking-[-0.04em]">
            Tu carrito
          </SheetTitle>
          <SheetDescription>
            Edita cantidades, revisa el subtotal y continua al checkout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col overflow-hidden">
          {items.length ? (
            <>
              <div className="border-b border-border/70 px-6 py-5">
                <FreeShippingProgress subtotal={subtotal} />
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-black/8 bg-muted/20 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative aspect-[4/5] w-24 overflow-hidden rounded-[1rem] bg-[#ece7df]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="product-name font-medium tracking-[-0.03em]">
                              {item.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.colorName} / {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground transition hover:text-foreground"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(value) => updateQuantity(item.id, value)}
                            max={item.stock}
                          />
                          <p className="font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SheetFooter className="border-t border-border/70 bg-background/70 px-6 py-5">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 rounded-full"
                      onClick={closeCart}
                    >
                      Seguir comprando
                    </Button>
                    <Button
                      asChild
                      className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link href="/checkout" onClick={closeCart}>
                        Ir a pagar
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
              <div className="space-y-2">
                <p className="font-display text-4xl tracking-[-0.05em]">
                  Tu carrito esta vacio
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  Explora la coleccion y agrega camisetas para comenzar tu compra.
                </p>
              </div>
              <Button asChild className="rounded-full">
                <Link href="/camisetas" onClick={closeCart}>
                  Explorar camisetas
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
