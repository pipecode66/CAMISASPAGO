import type { CartItem } from "@/types/product"

export const shippingMethods = ["standard", "express"] as const

export type ShippingMethod = (typeof shippingMethods)[number]

export type CheckoutPayload = {
  contact: {
    email: string
    firstName: string
    lastName: string
    phone: string
  }
  shipping: {
    department: string
    city: string
    address: string
    apartment?: string
    notes?: string
    method: ShippingMethod
  }
  cartItems: CartItem[]
  couponCode?: string
}
