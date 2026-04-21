import { BrandStorySection } from "@/components/sections/brand-story-section"
import { CategoryShowcaseSection } from "@/components/sections/category-showcase-section"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { TrustSection } from "@/components/sections/trust-section"
import { CatalogExperience } from "@/components/commerce/catalog-experience"
import { ProductRecommendations } from "@/components/commerce/product-recommendations"
import { getCatalogProducts, getNewArrivalProducts } from "@/server/catalog/repository"

export default async function HomePage() {
  const [products, newArrivals] = await Promise.all([
    getCatalogProducts(),
    getNewArrivalProducts(),
  ])

  return (
    <>
      <HeroSection />
      <CategoryShowcaseSection />
      <ProductRecommendations
        title="Nuevos ingresos con lenguaje editorial."
        description="Una seleccion para empujar descubrimiento temprano y dar contexto visual al resto del catalogo."
        products={newArrivals}
      />
      <CatalogExperience
        products={products}
        title="Catalogo de camisetas listo para vender."
        description="Filtros funcionales, busqueda activa, quick view y CTA directos para una experiencia de compra premium y de alta conversion."
      />
      <TrustSection />
      <BrandStorySection />
      <NewsletterSection />
    </>
  )
}
