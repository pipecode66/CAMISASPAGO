"use client"

import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  className,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-white p-1",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus />
      </Button>
      <span className="min-w-10 text-center text-sm font-medium">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-full"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus />
      </Button>
    </div>
  )
}
