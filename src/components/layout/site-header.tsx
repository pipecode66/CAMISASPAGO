"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User } from "lucide-react"

import { SearchDialog } from "@/components/layout/search-dialog"
import { SiteLogo } from "@/components/layout/site-logo"
import { navigationItems } from "@/data/site"
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
    <header className="sticky top-10 z-40 border-b border-black/6 bg-background/88 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-3">
        <div className="flex items-center gap-2 lg:hidden">
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
                <SiteLogo />
                <SheetTitle className="sr-only">Menu principal</SheetTitle>
                <SheetDescription>
                  Explora la coleccion premium de camisetas SABLE.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-4 py-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium tracking-[0.08em] uppercase transition hover:bg-muted",
                      pathname === item.href && "bg-muted"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <SiteLogo />
          <nav className="flex items-center gap-6">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-[0.76rem] font-medium tracking-[0.18em] uppercase text-muted-foreground transition hover:text-foreground",
                    isActive && "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <SiteLogo className="lg:hidden" />

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
    </header>
  )
}
