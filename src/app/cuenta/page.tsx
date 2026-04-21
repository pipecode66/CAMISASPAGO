import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/data/site"

export const metadata: Metadata = {
  title: "Cuenta",
  description: "Espacio de cuenta y soporte para clientes de SABLE.",
}

export default function AccountPage() {
  return (
    <section className="section-space">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-black/8 bg-white px-8 py-14 text-center shadow-[0_24px_80px_rgba(20,20,20,0.06)]">
          <p className="eyebrow">Cuenta SABLE</p>
          <h1 className="mt-3 font-display text-5xl tracking-[-0.05em]">
            Tu espacio de cliente
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            La cuenta queda lista para futuras integraciones con historial de pedidos,
            wishlist sincronizada y login social. Mientras tanto, el soporte directo
            via WhatsApp cubre seguimiento, cambios y novedades.
          </p>
          <Button asChild className="mt-8 rounded-full">
            <Link href={siteConfig.whatsappUrl}>Hablar con soporte</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
