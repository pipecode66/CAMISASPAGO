import { trustPoints } from "@/data/site"

type TrustSectionProps = {
  compact?: boolean
}

export function TrustSection({ compact = false }: TrustSectionProps) {
  return (
    <section className={compact ? "" : "section-space pt-0"}>
      <div className="container">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {trustPoints.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(20,20,20,0.05)]"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
