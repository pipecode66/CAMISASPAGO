import {
  CreditCard,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react"

import type { ProductCategory } from "@/types/product"

export const siteConfig = {
  name: "SABLE",
  description:
    "Camisetas premium con sensibilidad editorial y actitud streetwear.",
  url: "https://sable-store.demo",
  whatsappUrl: "https://wa.me/573001234567?text=Hola%20SABLE%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n",
  instagramUrl: "https://instagram.com/sable.studio",
  tiktokUrl: "https://tiktok.com/@sable.studio",
  email: "hola@sable-store.demo",
} as const

export const promoMessages = [
  "Envios gratis por compras superiores a $180.000",
  "Pago seguro y rapido",
  "Entrega nacional",
]

export const navigationItems = [
  { label: "Inicio", href: "/" },
  { label: "Camisetas", href: "/camisetas" },
  { label: "Nuevos Ingresos", href: "/camisetas?sort=newest" },
  { label: "Coleccion", href: "/#coleccion" },
  { label: "Sale", href: "/camisetas?sale=true" },
  { label: "Nosotros", href: "/#nosotros" },
]

export const desktopPrimaryNavLeft = [
  { label: "Nuevo", href: "/camisetas?sort=newest" },
  { label: "Colombia", href: "/#nosotros", accent: true },
  { label: "Sale", href: "/camisetas?sale=true", accent: true },
  { label: "Oversized", href: "/camisetas?search=oversized" },
  { label: "Regular", href: "/camisetas?search=regular" },
  { label: "Colecciones", href: "/#coleccion" },
]

export const desktopPrimaryNavRight = [
  { label: "Infaltables", href: "/camisetas?sort=featured" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Guia de tallas", href: "/camisetas/essential-oversized-tee-black" },
]

export const desktopSecondaryNav = [
  { label: "Camisetas oversized", href: "/camisetas?search=oversized" },
  { label: "Regular fit", href: "/camisetas?search=regular" },
  { label: "Basicas", href: "/camisetas?search=basicas" },
  { label: "Graficas", href: "/camisetas?search=graficas" },
  { label: "Edicion limitada", href: "/camisetas?search=edicion%20limitada" },
  { label: "Nuevas", href: "/camisetas?sort=newest" },
  { label: "Ver todo", href: "/camisetas" },
]

export const categoryShowcase: Array<{
  name: string
  slug: ProductCategory
  description: string
  image: string
}> = [
  {
    name: "Oversized",
    slug: "oversized",
    description: "Siluetas relajadas con hombro caido y presencia urbana.",
    image: "/images/categories/oversized.png",
  },
  {
    name: "Regular Fit",
    slug: "regular-fit",
    description: "Cortes precisos para un look limpio de diario.",
    image: "/images/categories/regular-fit.png",
  },
  {
    name: "Basicas",
    slug: "basicas",
    description: "Fondos de armario premium en tonos sobrios.",
    image: "/images/categories/basicas.png",
  },
  {
    name: "Graficas",
    slug: "graficas",
    description: "Visuales contemporaneas con acento de coleccion.",
    image: "/images/categories/graficas.png",
  },
  {
    name: "Edicion limitada",
    slug: "edicion-limitada",
    description: "Drops cortos con acabados especiales y numerados.",
    image: "/images/categories/edicion-limitada.png",
  },
  {
    name: "Nuevas",
    slug: "nuevas",
    description: "Ingreso reciente de siluetas clave para la temporada.",
    image: "/images/categories/nuevas.png",
  },
]

export const trustPoints = [
  {
    title: "Envios a toda Colombia",
    description: "Despachos nacionales con seguimiento y cobertura urbana.",
    icon: Truck,
  },
  {
    title: "Pago 100% seguro",
    description: "Checkout protegido con integracion lista para Mercado Pago.",
    icon: ShieldCheck,
  },
  {
    title: "Cambios faciles",
    description: "Ajustes de talla y cambios de color en pocos pasos.",
    icon: PackageCheck,
  },
  {
    title: "Soporte por WhatsApp",
    description: "Acompanamiento humano antes y despues de la compra.",
    icon: Headphones,
  },
  {
    title: "Calidad premium",
    description: "Algodon pesado, tacto suave y acabados confiables.",
    icon: CreditCard,
  },
]

export const footerColumns = [
  {
    title: "Navegacion",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Camisetas", href: "/camisetas" },
      { label: "Coleccion", href: "/#coleccion" },
      { label: "Nosotros", href: "/#nosotros" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Cambios y devoluciones", href: "/#faq" },
      { label: "Envios", href: "/#faq" },
      { label: "Metodos de pago", href: "/checkout" },
      { label: "WhatsApp", href: siteConfig.whatsappUrl },
    ],
  },
  {
    title: "Politicas",
    links: [
      { label: "Terminos", href: "/checkout" },
      { label: "Privacidad", href: "/checkout" },
      { label: "Pago seguro", href: "/checkout" },
      { label: "Newsletter", href: "/#newsletter" },
    ],
  },
]

export const sizeGuideRows = [
  { size: "S", chest: "54 cm", length: "69 cm", sleeve: "20 cm" },
  { size: "M", chest: "57 cm", length: "72 cm", sleeve: "21 cm" },
  { size: "L", chest: "60 cm", length: "75 cm", sleeve: "22 cm" },
  { size: "XL", chest: "63 cm", length: "78 cm", sleeve: "23 cm" },
  { size: "XXL", chest: "66 cm", length: "80 cm", sleeve: "24 cm" },
]

export const shippingOptions = [
  {
    id: "standard",
    name: "Entrega nacional",
    description: "3 a 6 dias habiles",
    price: 15000,
  },
  {
    id: "express",
    name: "Entrega prioritaria",
    description: "1 a 3 dias habiles",
    price: 22000,
  },
] as const

export const paymentHighlights = [
  "Tarjeta de credito y debito",
  "PSE",
  "Billeteras digitales disponibles segun cuenta y checkout",
]
