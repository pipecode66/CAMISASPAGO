"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { ColorSwatches } from "@/components/commerce/color-swatches"
import { PriceBlock } from "@/components/commerce/price-block"
import { QuantityStepper } from "@/components/commerce/quantity-stepper"
import { SizeSelector } from "@/components/commerce/size-selector"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCartStore } from "@/store/cart-store"
import type { Product } from "@/types/product"

type QuickViewDialogProps = {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: QuickViewDialogProps) {
  if (!product) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <QuickViewDialogContent key={product.id} product={product} onOpenChange={onOpenChange} />
    </Dialog>
  )
}

function QuickViewDialogContent({
  product,
  onOpenChange,
}: {
  product: Product
  onOpenChange: (open: boolean) => void
}) {
  const addItem = useCartStore((state) => state.addItem)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "")
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.includes("M") ? "M" : product.sizes[0]
  )
  const [quantity, setQuantity] = useState(1)

  const activeColor =
    product.colors.find((color) => color.name === selectedColor) ?? product.colors[0]
  const activeImage = product.images[selectedImage] ?? product.images[0]

  function handleAddToCart() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src ?? "",
      price: product.price,
      quantity,
      size: selectedSize,
      colorName: activeColor.name,
      colorHex: activeColor.hex,
      stock: product.stock,
    })

    toast.success("Producto agregado al carrito", {
      description: (
        <span>
          <span className="product-name">{product.name}</span> / {selectedSize} /{" "}
          {activeColor.name}
        </span>
      ),
    })
    onOpenChange(false)
  }

  return (
    <DialogContent className="max-h-[92vh] max-w-5xl overflow-auto rounded-[2rem] border border-black/8 bg-white p-5 sm:p-6">
      <DialogHeader className="sr-only">
        <DialogTitle className="product-name">{product.name}</DialogTitle>
      </DialogHeader>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#f1f1f1]">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(index)}
                className="relative aspect-[4/5] overflow-hidden rounded-[1rem] border border-black/8 bg-[#f1f1f1]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Vista rapida</p>
            <h3 className="product-name font-display text-4xl tracking-[-0.05em]">
              {product.name}
            </h3>
            <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} />
            <p className="text-sm leading-7 text-muted-foreground">
              {product.description}
            </p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>Fit {product.fit}</span>
              <span>/</span>
              <span>{product.stock > 8 ? "Stock disponible" : `Quedan ${product.stock}`}</span>
            </div>
          </div>

          <div className="space-y-5 rounded-[1.75rem] border border-black/8 bg-muted/25 p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground">{activeColor.name}</span>
              </div>
              <ColorSwatches
                colors={product.colors}
                selectedColorName={activeColor.name}
                onSelect={(color) => setSelectedColor(color.name)}
              />
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium">Talla</span>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium">Cantidad</span>
              <QuantityStepper
                value={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
            </div>

            <Button
              type="button"
              className="h-12 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              Agregar al carrito
            </Button>

            <Button
              asChild
              type="button"
              variant="outline"
              className="h-12 w-full rounded-full"
            >
              <Link href={`/camisetas/${product.slug}`}>Ver detalle completo</Link>
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
