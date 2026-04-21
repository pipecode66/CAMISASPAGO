import type { Metadata } from "next"

import { CheckoutForm } from "@/components/commerce/checkout-form"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout elegante y funcional con integracion preparada para Mercado Pago Colombia.",
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
