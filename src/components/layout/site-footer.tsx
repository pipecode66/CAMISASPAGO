import Link from "next/link"

import { SiteLogo } from "@/components/layout/site-logo"
import { footerColumns, siteConfig } from "@/data/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-black/6 bg-[#101010] text-white">
      <div className="container space-y-12 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="space-y-5">
            <SiteLogo inverted />
            <p className="max-w-sm text-sm leading-7 text-white/68">
              Camisetas premium con una mirada editorial, producidas para rotacion
              diaria, coleccion y compra online de alta conversion.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-xs font-semibold tracking-[0.24em] uppercase text-white/48">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/72 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-5">
            <Link href={siteConfig.instagramUrl}>Instagram</Link>
            <Link href={siteConfig.tiktokUrl}>TikTok</Link>
            <Link href={siteConfig.whatsappUrl}>WhatsApp</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
