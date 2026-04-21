"use client"

import { startTransition, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, ShieldCheck, Truck } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { OrderSummary } from "@/components/commerce/order-summary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { paymentHighlights, shippingOptions } from "@/data/site"
import { checkoutSchema, type CheckoutFormValues } from "@/lib/schemas"
import { useCartStore } from "@/store/cart-store"

export function CheckoutForm() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      method: "standard",
      couponCode: "",
    },
  })

  const method = useWatch({ control, name: "method" }) ?? "standard"
  const couponCode = useWatch({ control, name: "couponCode" }) ?? ""

  async function onSubmit(values: CheckoutFormValues) {
    if (!items.length) {
      toast.error("Tu carrito esta vacio")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/checkout/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
          },
          shipping: {
            department: values.department,
            city: values.city,
            address: values.address,
            apartment: values.apartment,
            notes: values.notes,
            method: values.method,
          },
          couponCode: values.couponCode,
          cartItems: items,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error ?? "No fue posible iniciar el pago")
      }

      if (result.mode === "mock") {
        clearCart()
        startTransition(() => {
          router.push(result.redirectTo)
        })
        return
      }

      if (result.mode === "mercadopago" && result.initPoint) {
        window.location.assign(result.initPoint)
        return
      }

      throw new Error("No recibimos una respuesta valida del checkout")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ocurrio un error inesperado"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!items.length) {
    return (
      <div className="container section-space">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-black/8 bg-white px-8 py-16 text-center shadow-[0_24px_80px_rgba(20,20,20,0.06)]">
          <p className="font-display text-5xl tracking-[-0.05em]">Tu checkout esta vacio</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            Agrega camisetas al carrito para continuar con el flujo de compra y el
            pago preparado con Mercado Pago.
          </p>
          <Button asChild className="mt-8 rounded-full">
            <Link href="/camisetas">Volver al catalogo</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container section-space">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Checkout premium</p>
        <h1 className="mt-3 font-display text-5xl tracking-[-0.05em]">
          Completa tu compra
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Flujo listo para Mercado Pago Colombia. Si no existen credenciales, el
          sistema simula la compra para presentacion y validacion funcional.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_26rem]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.04)]">
            <h2 className="font-display text-3xl tracking-[-0.04em]">
              Datos de contacto
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Correo</label>
                <Input {...register("email")} placeholder="correo@dominio.com" />
                {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre</label>
                <Input {...register("firstName")} placeholder="Tu nombre" />
                {errors.firstName ? <p className="text-sm text-destructive">{errors.firstName.message}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Apellido</label>
                <Input {...register("lastName")} placeholder="Tu apellido" />
                {errors.lastName ? <p className="text-sm text-destructive">{errors.lastName.message}</p> : null}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Telefono</label>
                <Input {...register("phone")} placeholder="+57 300 123 4567" />
                {errors.phone ? <p className="text-sm text-destructive">{errors.phone.message}</p> : null}
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.04)]">
            <h2 className="font-display text-3xl tracking-[-0.04em]">
              Direccion de envio
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Departamento</label>
                <Input {...register("department")} placeholder="Cundinamarca" />
                {errors.department ? <p className="text-sm text-destructive">{errors.department.message}</p> : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ciudad</label>
                <Input {...register("city")} placeholder="Bogota" />
                {errors.city ? <p className="text-sm text-destructive">{errors.city.message}</p> : null}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Direccion</label>
                <Input {...register("address")} placeholder="Calle 85 # 11-20" />
                {errors.address ? <p className="text-sm text-destructive">{errors.address.message}</p> : null}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Apto / interior</label>
                <Input {...register("apartment")} placeholder="Opcional" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Notas</label>
                <Textarea
                  {...register("notes")}
                  placeholder="Referencia adicional para entrega"
                />
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.04)]">
            <h2 className="font-display text-3xl tracking-[-0.04em]">
              Metodo de envio
            </h2>
            <div className="mt-6 grid gap-3">
              {shippingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`rounded-[1.5rem] border p-5 transition ${
                    method === option.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <input
                    {...register("method")}
                    type="radio"
                    value={option.id}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{option.name}</p>
                      <p className="mt-1 text-sm opacity-70">{option.description}</p>
                    </div>
                    <p className="font-semibold">
                      {option.price.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.04)]">
            <h2 className="font-display text-3xl tracking-[-0.04em]">
              Pago y beneficios
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                { icon: CreditCard, title: "Mercado Pago", text: paymentHighlights[0] },
                { icon: ShieldCheck, title: "Seguridad", text: "Checkout cifrado y preparado para produccion." },
                { icon: Truck, title: "Entrega", text: "Rastreo y soporte por WhatsApp en Colombia." },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-border bg-muted/25 p-4"
                  >
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-white">
                      <Icon className="size-5" />
                    </span>
                    <p className="mt-4 font-medium">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">Cupon</label>
              <Input {...register("couponCode")} placeholder="Usa SABLE10" />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? "Procesando..." : "Pagar ahora"}
            </Button>
          </section>
        </form>

        <div className="xl:sticky xl:top-32 xl:self-start">
          <OrderSummary
            items={items}
            shippingMethod={method}
            couponCode={couponCode}
          />
        </div>
      </div>
    </div>
  )
}
