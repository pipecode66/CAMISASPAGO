import { DEFAULT_COUPON, FREE_SHIPPING_THRESHOLD } from "@/lib/constants"
import { shippingOptions } from "@/data/site"
import type { CartItem } from "@/types/product"
import type { ShippingMethod } from "@/types/checkout"

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCouponDiscount(subtotal: number, couponCode?: string) {
  if (!couponCode) {
    return 0
  }

  return couponCode.trim().toUpperCase() === DEFAULT_COUPON ? subtotal * 0.1 : 0
}

export function getShippingPrice(
  subtotalAfterDiscount: number,
  method: ShippingMethod
) {
  if (subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD) {
    return 0
  }

  return shippingOptions.find((option) => option.id === method)?.price ?? 0
}

export function getOrderTotals(
  items: CartItem[],
  shippingMethod: ShippingMethod,
  couponCode?: string
) {
  const subtotal = getCartSubtotal(items)
  const discount = getCouponDiscount(subtotal, couponCode)
  const subtotalAfterDiscount = subtotal - discount
  const shipping = getShippingPrice(subtotalAfterDiscount, shippingMethod)
  const total = subtotalAfterDiscount + shipping

  return {
    subtotal,
    discount,
    shipping,
    total,
    freeShippingRemaining: Math.max(
      0,
      FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount
    ),
  }
}

export function createOrderReference() {
  return `SABLE-${Date.now().toString(36).toUpperCase()}`
}
