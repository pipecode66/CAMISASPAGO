"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

import { Reveal } from "@/components/shared/reveal"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.92),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(162,141,118,0.24),_transparent_24%),linear-gradient(135deg,_rgba(245,242,236,1)_0%,_rgba(233,229,221,1)_44%,_rgba(216,209,199,1)_100%)]" />
      <div className="container relative grid gap-12 py-14 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:py-20">
        <Reveal className="space-y-8">
          <div className="space-y-5">
            <span className="eyebrow rounded-full border border-black/8 bg-white/70 px-4 py-2 backdrop-blur">
              Premium streetwear essentials
            </span>
            <h1 className="max-w-3xl font-display text-6xl leading-none tracking-[-0.06em] text-balance text-foreground sm:text-7xl xl:text-[6.8rem]">
              Camisetas con actitud
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Siluetas limpias, algodon pesado y un lenguaje visual contemporaneo
              para vestir todos los dias con presencia.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/camisetas">
                Comprar ahora
                <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-black/10 bg-white/70 px-7 backdrop-blur"
            >
              <Link href="#coleccion">
                <Play />
                Ver coleccion
              </Link>
            </Button>
          </div>

          <div className="grid max-w-lg grid-cols-3 gap-3">
            {[
              { label: "Algodon premium", value: "280 gsm" },
              { label: "Envio nacional", value: "48 h" },
              { label: "Cambios faciles", value: "7 dias" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.7rem] border border-black/8 bg-white/72 px-4 py-5 shadow-[0_25px_80px_rgba(20,20,20,0.06)] backdrop-blur"
              >
                <p className="text-lg font-semibold">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-[#d7d0c6] p-3 shadow-[0_30px_120px_rgba(28,28,28,0.16)]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#d0cabf]">
              <Image
                src="/images/hero/editorial-01.png"
                alt="Hero editorial de camisetas premium streetwear."
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="absolute -bottom-5 left-0 hidden max-w-xs rounded-[1.9rem] border border-black/8 bg-white/90 p-5 shadow-[0_18px_70px_rgba(10,10,10,0.12)] backdrop-blur md:block"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Nuevo drop
            </p>
            <p className="mt-2 font-display text-3xl tracking-[-0.04em]">
              Streetwear premium para todos los dias
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
