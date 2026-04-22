"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User } from "lucide-react"

import { SearchDialog } from "@/components/layout/search-dialog"
import { SiteLogo } from "@/components/layout/site-logo"
import {
  desktopPrimaryNavLeft,
  desktopPrimaryNavRight,
  desktopSecondaryNav,
  navigationItems,
} from "@/data/site"
import { useCartStore } from "@/store/cart-store"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const itemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )
  const openCart = useCartStore((state) => state.openCart)

  return (
    <header className="sticky top-10 z-40 border-b border-black/6 bg-background/95 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                aria-label="Abrir menu"
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88vw] max-w-sm border-r border-border/60 bg-white px-0"
            >
              <SheetHeader className="border-b border-border/60 px-6 py-5">
                <SiteLogo compact />
                <SheetTitle className="sr-only">Menu principal</SheetTitle>
                <SheetDescription>
                  Explora la coleccion premium de camisetas SABLE.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4 py-6">
                {[...navigationItems, ...desktopSecondaryNav].map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium tracking-[0.08em] uppercase transition hover:bg-muted",
                      isNavActive(pathname, item.href) && "bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <SiteLogo compact />

        <div className="flex items-center gap-1">
          <SearchDialog />
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/cuenta" aria-label="Cuenta">
              <User />
            </Link>
          </Button>
          <Button
            aria-label="Abrir carrito"
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            onClick={openCart}
          >
            <ShoppingBag />
            {itemCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[0.65rem] font-semibold text-primary-foreground">
                {itemCount}
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="container grid grid-cols-[1fr_auto_1fr] items-center gap-8 py-4">
          <nav className="flex min-w-0 items-center gap-6 xl:gap-8">
            {desktopPrimaryNavLeft.map((item) => (
              <DesktopNavLink
                key={item.label}
                href={item.href}
                active={isNavActive(pathname, item.href)}
                accent={item.accent}
              >
                {item.label}
              </DesktopNavLink>
            ))}
          </nav>

          <div className="justify-self-center">
            <SiteLogo className="scale-[1.02]" />
          </div>

          <div className="flex items-center justify-end gap-5 xl:gap-7">
            <nav className="flex items-center gap-5 xl:gap-7">
              {desktopPrimaryNavRight.map((item) => (
                <DesktopNavLink
                  key={item.label}
                  href={item.href}
                  active={isNavActive(pathname, item.href)}
                  accent={item.label === "Guia de tallas"}
                >
                  {item.label}
                </DesktopNavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span
                aria-label="Colombia"
                className="inline-flex size-9 items-center justify-center rounded-full border border-black/8 bg-white text-[0.58rem] font-semibold tracking-[0.18em] text-foreground shadow-[0_8px_18px_rgba(15,15,15,0.08)]"
              >
                CO
              </span>
              <SearchDialog triggerClassName="rounded-full" />
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link href="/cuenta" aria-label="Cuenta">
                  <User className="size-4.5" />
                </Link>
              </Button>
              <Button
                aria-label="Abrir carrito"
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                onClick={openCart}
              >
                <ShoppingBag className="size-4.5" />
                <span className="sr-only">Carrito</span>
                <CartCountBadge count={itemCount} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-black/6">
          <div className="container flex items-center justify-between gap-8 overflow-x-auto py-4">
            {desktopSecondaryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-display text-[1.05rem] tracking-[-0.025em] whitespace-nowrap text-foreground/90 transition hover:text-foreground",
                  isNavActive(pathname, item.href) && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

function isNavActive(pathname: string, href: string) {
  const cleanHref = href.split("?")[0]?.split("#")[0] || href

  if (cleanHref === "/") {
    return pathname === "/"
  }

  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`)
}

function DesktopNavLink({
  href,
  active,
  accent = false,
  children,
}: {
  href: string
  active: boolean
  accent?: boolean
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display text-[1.06rem] tracking-[-0.025em] whitespace-nowrap text-foreground/78 transition hover:text-foreground",
        accent && "italic font-semibold",
        active && "text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

function CartCountBadge({ count }: { count: number }) {
  if (!count) {
    return null
  }

  return (
    <span className="absolute right-1 top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-[0.65rem] font-semibold text-background">
      {count}
    </span>
  )
}
