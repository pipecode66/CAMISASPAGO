import Link from "next/link"

import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  inverted?: boolean
}

export function SiteLogo({ className, inverted = false }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3 text-sm font-semibold tracking-[0.34em] uppercase",
        inverted ? "text-white" : "text-foreground",
        className
      )}
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full border border-current/20 bg-current/5 text-[0.72rem] tracking-[0.18em]">
        SB
      </span>
      <span>SABLE</span>
    </Link>
  )
}
