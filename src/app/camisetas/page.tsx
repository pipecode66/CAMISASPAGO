import type { Metadata } from "next"

import { CatalogExperience } from "@/components/commerce/catalog-experience"
import { TrustSection } from "@/components/sections/trust-section"
import { getCatalogProducts } from "@/server/catalog/repository"
import type { CatalogSort } from "@/types/product"

export const metadata: Metadata = {
  title: "Camisetas",
  description: "Catalogo premium de camisetas SABLE con filtros, quick view y checkout funcional.",
}

type CatalogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams
  const products = await getCatalogProducts()

  const search = typeof params.search === "string" ? params.search : ""
  const initialSort =
    typeof params.sort === "string" ? (params.sort as CatalogSort) : "featured"
  const initialOnlySale = params.sale === "true"

  return (
    <>
      <CatalogExperience
        products={products}
        eyebrow="Shop camisetas"
        title="Todo el drop premium en una sola vista."
        description="Navega por talla, color, fit, precio, disponibilidad y ordena segun tu criterio de compra."
        initialSearch={search}
        initialSort={initialSort}
        initialOnlySale={initialOnlySale}
      />
      <TrustSection />
    </>
  )
}
