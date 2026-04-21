"use client"

import { useEffect, useEffectEvent, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { promoMessages } from "@/data/site"

export function TopPromoBar() {
  const [index, setIndex] = useState(0)

  const advance = useEffectEvent(() => {
    setIndex((current) => (current + 1) % promoMessages.length)
  })

  useEffect(() => {
    const timer = window.setInterval(() => {
      advance()
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="container flex h-10 items-center justify-center overflow-hidden text-center text-[0.7rem] font-medium tracking-[0.18em] uppercase sm:text-xs">
        <AnimatePresence mode="wait">
          <motion.span
            key={promoMessages[index]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {promoMessages[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}
