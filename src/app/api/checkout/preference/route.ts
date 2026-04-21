import { NextResponse } from "next/server"
import { z } from "zod"

import { createOrderReference, getOrderTotals } from "@/lib/checkout"
import { getMercadoPagoPreference, isMercadoPagoConfigured } from "@/lib/mercadopago"
import { getCatalogProducts } from "@/server/catalog/repository"
import { shirtSizes } from "@/types/product"
import { shippingMethods } from "@/types/checkout"

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(10),
  size: z.enum(shirtSizes),
  colorName: z.string().min(1),
})

const checkoutRequestSchema = z.object({
  contact: z.object({
    email: z.email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    phone: z.string().min(7),
  }),
  shipping: z.object({
    department: z.string().min(2),
    city: z.string().min(2),
    address: z.string().min(6),
    apartment: z.string().optional(),
    notes: z.string().optional(),
    method: z.enum(shippingMethods),
  }),
  cartItems: z.array(cartItemSchema).min(1),
  couponCode: z.string().optional(),
})

function createMercadoPagoItems(
  items: Array<{
    title: string
    quantity: number
    unitPrice: number
    pictureUrl: string
  }>,
  discountedSubtotal: number
) {
  const originalSubtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  )

  if (discountedSubtotal >= originalSubtotal || originalSubtotal === 0) {
    return items.map((item) => ({
      id: item.title.toLowerCase().replace(/\s+/g, "-"),
      title: item.title,
      quantity: item.quantity,
      currency_id: "COP",
      unit_price: item.unitPrice,
      picture_url: item.pictureUrl,
    }))
  }

  const ratio = discountedSubtotal / originalSubtotal

  return items.map((item, index) => {
    const isLast = index === items.length - 1
    const lineTotal = isLast
      ? Math.max(
          item.quantity,
          discountedSubtotal -
            items
              .slice(0, index)
              .reduce(
                (total, current) =>
                  total +
                  Math.max(1, Math.round(current.unitPrice * ratio)) *
                    current.quantity,
                0
              )
        )
      : Math.max(1, Math.round(item.unitPrice * ratio)) * item.quantity

    return {
      id: item.title.toLowerCase().replace(/\s+/g, "-"),
      title: item.title,
      quantity: item.quantity,
      currency_id: "COP",
      unit_price: Math.max(1, Math.round(lineTotal / item.quantity)),
      picture_url: item.pictureUrl,
    }
  })
}

export async function POST(request: Request) {
  try {
    const payload = checkoutRequestSchema.parse(await request.json())
    const products = await getCatalogProducts()
    const orderReference = createOrderReference()

    const canonicalItems = payload.cartItems.map((item) => {
      const product = products.find((entry) => entry.id === item.productId)

      if (!product) {
        throw new Error("Uno de los productos ya no esta disponible")
      }

      return {
        id: `${product.id}:${item.size}:${item.colorName}`,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0]?.src ?? "",
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        colorName: item.colorName,
        colorHex:
          product.colors.find((color) => color.name === item.colorName)?.hex ?? "#111111",
        stock: product.stock,
      }
    })

    const totals = getOrderTotals(
      canonicalItems,
      payload.shipping.method,
      payload.couponCode
    )
    const successUrl = new URL("/checkout/exito", request.url)
    successUrl.searchParams.set("order", orderReference)
    successUrl.searchParams.set("mode", isMercadoPagoConfigured() ? "mercadopago" : "mock")

    if (!isMercadoPagoConfigured()) {
      return NextResponse.json({
        mode: "mock",
        redirectTo: successUrl.toString(),
      })
    }

    const preference = getMercadoPagoPreference()
    const preferenceItems = createMercadoPagoItems(
      canonicalItems.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        pictureUrl: item.image,
      })),
      totals.subtotal - totals.discount
    )

    if (totals.shipping > 0) {
      preferenceItems.push({
        id: "envio-sable",
        title: "Envio nacional SABLE",
        quantity: 1,
        currency_id: "COP",
        unit_price: totals.shipping,
        picture_url: canonicalItems[0]?.image ?? "/images/hero/editorial-01.png",
      })
    }

    const response = await preference.create({
      body: {
        items: preferenceItems,
        payer: {
          email: payload.contact.email,
          name: payload.contact.firstName,
          surname: payload.contact.lastName,
        },
        back_urls: {
          success: successUrl.toString(),
          failure: successUrl.toString(),
          pending: successUrl.toString(),
        },
        auto_return: "approved",
        external_reference: orderReference,
        statement_descriptor: "SABLE STORE",
        notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL,
        payment_methods: {
          installments: 12,
        },
        metadata: {
          source: "nextjs-demo-store",
          department: payload.shipping.department,
          city: payload.shipping.city,
          address: payload.shipping.address,
          phone: payload.contact.phone,
          couponCode: payload.couponCode,
        },
      },
      requestOptions: {
        idempotencyKey: orderReference,
      },
    })

    if (!response.init_point) {
      throw new Error("Mercado Pago no devolvio la URL del checkout")
    }

    return NextResponse.json({
      mode: "mercadopago",
      initPoint: response.init_point,
      preferenceId: response.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Revisa los datos del checkout antes de continuar" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No fue posible iniciar el checkout",
      },
      { status: 500 }
    )
  }
}
