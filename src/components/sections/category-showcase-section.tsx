"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import { categoryShowcase } from "@/data/site"

export function CategoryShowcaseSection() {
  return (
    <section id="coleccion" className="section-space bg-background">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Edit de categorias"
          title="Seis lecturas visuales de una sola obsesion: la camiseta perfecta."
          description="Cada bloque interpreta el producto desde un mood diferente para que la navegacion se sienta editorial, clara y vendible."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryShowcase.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.04}>
              <Link
                href={`/camisetas?search=${encodeURIComponent(category.name)}`}
                className="group relative block overflow-hidden rounded-[2rem] border border-black/8 bg-[#ece8e2] p-3"
              >
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={category.image}
                    alt={`Categoria ${category.name}`}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-x-7 bottom-7 rounded-[1.5rem] border border-white/40 bg-white/90 p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-3xl tracking-[-0.04em] text-foreground">
                        {category.name}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
