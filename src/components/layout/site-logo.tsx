import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  inverted?: boolean
  compact?: boolean
}

export function SiteLogo({
  className,
  inverted = false,
  compact = false,
}: SiteLogoProps) {
  if (inverted) {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-3 text-sm font-semibold tracking-[0.34em] uppercase text-white",
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

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center justify-center",
        className
      )}
      aria-label="SABLE"
    >
      <span
        className={cn(
          "relative overflow-hidden",
          compact ? "h-8 w-[8.8rem]" : "h-10 w-[10.5rem]"
        )}
      >
        <Image
          src="/images/branding/sable-logo-wordmark-v1.png"
          alt="SABLE"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 140px, 168px"
        />
      </span>
    </Link>
  )
}
