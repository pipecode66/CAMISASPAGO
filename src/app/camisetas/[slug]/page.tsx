import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductGallery } from "@/components/commerce/product-gallery"
import { ProductPurchasePanel } from "@/components/commerce/product-purchase-panel"
import { ProductRecommendations } from "@/components/commerce/product-recommendations"
import { getProductBySlug, getRecommendedProducts, getRelatedProducts } from "@/server/catalog/repository"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Producto no encontrado",
    }
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      images: [product.images[0]?.src ?? "/images/hero/editorial-01.png"],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const [product, relatedProducts, recommendedProducts] = await Promise.all([
    getProductBySlug(slug),
    getRelatedProducts(slug),
    getRecommendedProducts(slug),
  ])

  if (!product) {
    notFound()
  }

  return (
    <>
      <section className="section-space">
        <div className="container grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery name={product.name} images={product.images} />
          <ProductPurchasePanel product={product} />
        </div>
      </section>

      <ProductRecommendations
        title="Productos relacionados"
        description="Mas opciones con el mismo lenguaje visual, fit o categoria."
        products={relatedProducts}
      />
      <ProductRecommendations
        title="Tambien te puede gustar"
        description="Una seleccion editorial pensada para completar el look."
        products={recommendedProducts}
      />
    </>
  )
}
