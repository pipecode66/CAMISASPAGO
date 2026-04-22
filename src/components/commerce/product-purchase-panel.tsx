"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageCircle, ShieldCheck, Truck } from "lucide-react"
import { toast } from "sonner"

import { ColorSwatches } from "@/components/commerce/color-swatches"
import { PriceBlock } from "@/components/commerce/price-block"
import { QuantityStepper } from "@/components/commerce/quantity-stepper"
import { SizeSelector } from "@/components/commerce/size-selector"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { sizeGuideRows } from "@/data/site"
import { useCartStore } from "@/store/cart-store"
import type { Product } from "@/types/product"

type ProductPurchasePanelProps = {
  product: Product
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "")
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.includes("M") ? "M" : product.sizes[0]
  )
  const [quantity, setQuantity] = useState(1)

  const activeColor =
    product.colors.find((color) => color.name === selectedColor) ?? product.colors[0]

  function addCurrentItem() {
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
  }

  function handleAddToCart() {
    addCurrentItem()
    toast.success("Agregado al carrito", {
      description: (
        <span>
          <span className="product-name">{product.name}</span> / {selectedSize} /{" "}
          {activeColor.name}
        </span>
      ),
    })
  }

  function handleBuyNow() {
    addCurrentItem()
    router.push("/checkout")
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="eyebrow">PDP premium</p>
        <div className="space-y-3">
          <h1 className="product-name font-display text-5xl tracking-[-0.05em] text-balance">
            {product.name}
          </h1>
          <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>{product.stock > 0 ? "Disponible" : "Agotado"}</span>
          <span>/</span>
          <span>Fit {product.fit}</span>
          <span>/</span>
          <span>{product.material}</span>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">{product.description}</p>
      </div>

      <div className="space-y-6 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.05)]">
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

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-full"
            onClick={handleBuyNow}
          >
            Comprar ahora
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { icon: ShieldCheck, title: "Pago seguro", text: "Checkout protegido y listo para Mercado Pago." },
          { icon: Truck, title: "Envios nacionales", text: "Cobertura a toda Colombia con seguimiento." },
          { icon: MessageCircle, title: "Atencion por WhatsApp", text: "Acompanamiento antes y despues de tu compra." },
          { icon: ShieldCheck, title: "Cambios faciles", text: "Proceso simple para talla, color o reposicion." },
        ].map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-black/8 bg-white p-5"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-muted">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 font-medium">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_24px_80px_rgba(20,20,20,0.05)]">
        <h2 className="font-display text-3xl tracking-[-0.04em]">Tabla de tallas</h2>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/35 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Talla</th>
                <th className="px-4 py-3 font-medium">Pecho</th>
                <th className="px-4 py-3 font-medium">Largo</th>
                <th className="px-4 py-3 font-medium">Manga</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuideRows.map((row) => (
                <tr key={row.size} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{row.size}</td>
                  <td className="px-4 py-3">{row.chest}</td>
                  <td className="px-4 py-3">{row.length}</td>
                  <td className="px-4 py-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="rounded-[2rem] border border-black/8 bg-white px-6 py-3 shadow-[0_24px_80px_rgba(20,20,20,0.05)]"
      >
        <AccordionItem value="description">
          <AccordionTrigger>Descripcion</AccordionTrigger>
          <AccordionContent>
            <p>{product.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger>Cuidados</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              {product.care.map((careItem) => (
                <li key={careItem}>{careItem}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>Envios</AccordionTrigger>
          <AccordionContent>
            Enviamos a toda Colombia. Bogota y principales ciudades tienen entrega
            estimada entre 1 y 3 dias habiles; otras zonas entre 3 y 6 dias habiles.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="returns">
          <AccordionTrigger>Cambios y devoluciones</AccordionTrigger>
          <AccordionContent>
            Puedes solicitar cambio por talla o color dentro de los primeros 7 dias.
            Para devoluciones por garantia evaluamos cada caso y acompanamos todo el
            proceso por WhatsApp.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="payments">
          <AccordionTrigger>Metodos de pago</AccordionTrigger>
          <AccordionContent>
            Checkout preparado para Mercado Pago Colombia con tarjetas, PSE y
            billeteras digitales disponibles segun configuracion de cuenta.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
