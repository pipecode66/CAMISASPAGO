import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-3",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="eyebrow text-accent-foreground/80">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl tracking-[-0.04em] text-balance text-foreground sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
