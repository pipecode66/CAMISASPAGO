import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle2, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "Compra confirmada",
  description: "Pagina de confirmacion para la compra de camisetas SABLE.",
}

type CheckoutSuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams
  const orderId = typeof params.order === "string" ? params.order : "SABLE-DEMO"
  const mode = typeof params.mode === "string" ? params.mode : "mock"

  return (
    <section className="section-space">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-black/8 bg-white px-8 py-14 text-center shadow-[0_24px_80px_rgba(20,20,20,0.06)]">
          <span className="mx-auto inline-flex size-18 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <CheckCircle2 className="size-8" />
          </span>
          <p className="mt-6 eyebrow">Orden confirmada</p>
          <h1 className="mt-3 font-display text-6xl tracking-[-0.06em]">
            Compra recibida
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            {mode === "mock"
              ? "Este flujo se completo en modo demostracion porque no se encontraron credenciales reales de Mercado Pago."
              : "Tu pago fue enviado al checkout de Mercado Pago y la orden quedo registrada para seguimiento."}
          </p>

          <div className="mt-8 rounded-[1.8rem] border border-border bg-muted/25 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Numero de orden
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[0.04em]">{orderId}</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button asChild className="rounded-full">
              <Link href="/camisetas">Seguir comprando</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href={siteConfig.whatsappUrl}>
                <MessageCircle />
                Soporte por WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
