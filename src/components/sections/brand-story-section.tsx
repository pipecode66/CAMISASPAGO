import Image from "next/image"

import { SectionHeading } from "@/components/shared/section-heading"

export function BrandStorySection() {
  return (
    <section id="nosotros" className="section-space">
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Nuestra mirada"
            title="Una marca propia pensada para vender camisetas con identidad."
            description="SABLE mezcla un lenguaje visual limpio, una actitud urbana contenida y una experiencia de compra pensada para conversion, confianza y deseo."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "14", label: "Referencias activas" },
              { value: "24/7", label: "Atencion digital" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.6rem] border border-black/8 bg-white p-5 shadow-[0_18px_60px_rgba(20,20,20,0.04)]"
              >
                <p className="font-display text-4xl tracking-[-0.05em]">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-black/8 bg-[#ded6cc] p-3 shadow-[0_24px_100px_rgba(20,20,20,0.08)]">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/hero/editorial-02.png"
              alt="Escena editorial de la marca SABLE."
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
