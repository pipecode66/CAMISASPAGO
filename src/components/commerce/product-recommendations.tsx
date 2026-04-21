"use client"

import { useState } from "react"

import { ProductCard } from "@/components/commerce/product-card"
import { QuickViewDialog } from "@/components/commerce/quick-view-dialog"
import { Reveal } from "@/components/shared/reveal"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Product } from "@/types/product"

type ProductRecommendationsProps = {
  title: string
  description: string
  products: Product[]
}

export function ProductRecommendations({
  title,
  description,
  products,
}: ProductRecommendationsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section className="section-space pt-0">
      <div className="container space-y-8">
        <SectionHeading title={title} description={description} />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.03}>
              <ProductCard product={product} onQuickView={setSelectedProduct} />
            </Reveal>
          ))}
        </div>
      </div>

      <QuickViewDialog
        product={selectedProduct}
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProduct(null)
          }
        }}
      />
    </section>
  )
}
