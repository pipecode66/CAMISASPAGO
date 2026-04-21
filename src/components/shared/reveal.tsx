"use client"

import type { PropsWithChildren } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
}>

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
