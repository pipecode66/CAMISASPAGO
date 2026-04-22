"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { Reveal } from "@/components/shared/reveal"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.96),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(120,120,120,0.16),_transparent_24%),linear-gradient(135deg,_rgba(252,252,252,1)_0%,_rgba(239,239,239,1)_44%,_rgba(214,214,214,1)_100%)]" />
      <div className="container relative py-8 lg:py-10">
        <Reveal className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-[#d8d8d8] p-3 shadow-[0_30px_120px_rgba(18,18,18,0.14)]"
          >
            <div className="absolute inset-3 z-10 rounded-[2rem] bg-[linear-gradient(90deg,rgba(20,18,17,0.12)_0%,rgba(20,18,17,0)_35%,rgba(20,18,17,0.1)_100%)]" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#d2d2d2] sm:aspect-[5/4] lg:aspect-[16/9]">
              <Image
                src="/images/hero/editorial-01.png"
                alt="Hero editorial de camisetas premium streetwear."
                fill
                className="object-cover object-center lg:object-[center_26%]"
                priority
                sizes="100vw"
              />
            </div>

            <div className="absolute left-7 top-7 z-20 rounded-full border border-white/60 bg-white/92 px-5 py-3 shadow-[0_16px_40px_rgba(15,15,15,0.08)] backdrop-blur">
              <div className="relative h-8 w-[9.2rem] overflow-hidden sm:h-9 sm:w-[10.5rem]">
                <Image
                  src="/images/branding/sable-logo-wordmark-v1.png"
                  alt="SABLE"
                  fill
                  className="object-cover object-center"
                  sizes="168px"
                />
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
