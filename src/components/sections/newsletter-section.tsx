"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { SectionHeading } from "@/components/shared/section-heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { newsletterSchema } from "@/lib/schemas"

type NewsletterValues = {
  email: string
}

export function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: NewsletterValues) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("No pudimos registrar tu correo")
      }

      toast.success("Te registraste al drop list. Revisa tu correo.")
      reset()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ocurrio un error inesperado"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="section-space">
      <div className="container">
        <div className="grid gap-10 rounded-[2.5rem] border border-black/8 bg-[#111111] px-6 py-10 text-white shadow-[0_24px_100px_rgba(17,17,17,0.18)] lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-14">
          <SectionHeading
            eyebrow="10% OFF EN TU PRIMERA ORDEN"
            title="Entra antes al siguiente drop de camisetas."
            description="Suscribete para recibir lanzamientos, reposiciones y beneficios exclusivos de la comunidad SABLE."
            className="[&_h2]:text-white [&_p]:text-white/68"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 self-center">
            <div className="rounded-[1.5rem] border border-white/12 bg-white/6 p-2">
              <Input
                {...register("email")}
                placeholder="tuemail@correo.com"
                className="h-14 border-none bg-transparent px-4 text-base text-white placeholder:text-white/38 shadow-none focus-visible:ring-0"
              />
            </div>
            {errors.email ? (
              <p className="text-sm text-[#ffb4b4]">{errors.email.message}</p>
            ) : null}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-full bg-white text-primary hover:bg-white/90"
            >
              {isSubmitting ? "Suscribiendo..." : "Suscribirme"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
