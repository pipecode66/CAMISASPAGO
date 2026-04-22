"use client"

import { useState } from "react"
import Image from "next/image"

import type { ProductImage } from "@/types/product"
import { cn } from "@/lib/utils"

type ProductGalleryProps = {
  name: string
  images: ProductImage[]
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [origin, setOrigin] = useState("50% 50%")

  const activeImage = images[activeIndex] ?? images[0]

  return (
    <div className="grid gap-4 lg:grid-cols-[6rem_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[1.2rem] border bg-[#f1f1f1] lg:w-full",
              index === activeIndex ? "border-foreground" : "border-black/8"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>

      <div className="order-1 overflow-hidden rounded-[2rem] border border-black/8 bg-[#f1f1f1]">
        <div
          className="group relative aspect-[4/5] overflow-hidden"
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            const x = ((event.clientX - bounds.left) / bounds.width) * 100
            const y = ((event.clientY - bounds.top) / bounds.height) * 100

            setOrigin(`${x}% ${y}%`)
          }}
          onMouseLeave={() => setOrigin("50% 50%")}
        >
          <Image
            src={activeImage.src}
            alt={activeImage.alt || `${name} imagen ${activeIndex + 1}`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.18]"
            style={{ transformOrigin: origin }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  )
}
