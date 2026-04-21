import type { Metadata } from "next"
import { Cormorant_Garamond, Geist_Mono, Urbanist } from "next/font/google"

import { CartDrawer } from "@/components/commerce/cart-drawer"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { TopPromoBar } from "@/components/layout/top-promo-bar"
import { AppProviders } from "@/components/providers/app-providers"
import { siteConfig } from "@/data/site"

import "./globals.css"

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SABLE | Camisetas premium streetwear",
    template: "%s | SABLE",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "camisetas premium",
    "streetwear colombia",
    "mercado pago colombia",
    "next.js ecommerce",
  ],
  openGraph: {
    title: "SABLE | Camisetas premium streetwear",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/images/hero/editorial-01.png",
        width: 1200,
        height: 1500,
        alt: "Hero editorial de SABLE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SABLE | Camisetas premium streetwear",
    description: siteConfig.description,
    images: ["/images/hero/editorial-01.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${urbanist.variable} ${cormorant.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <TopPromoBar />
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CartDrawer />
          </div>
        </AppProviders>
      </body>
    </html>
  )
}
