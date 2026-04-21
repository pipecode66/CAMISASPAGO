import type { Product } from "@/types/product"

const black = { name: "Black", hex: "#171717" }
const offWhite = { name: "Off White", hex: "#F2EFEA" }
const olive = { name: "Olive", hex: "#69705E" }
const sand = { name: "Sand", hex: "#C6B498" }
const graphite = { name: "Graphite", hex: "#55575C" }
const stone = { name: "Stone", hex: "#D8D3CB" }
const bone = { name: "Bone", hex: "#E8E2D8" }
const moss = { name: "Moss", hex: "#596252" }
const cream = { name: "Cream", hex: "#F5F0E8" }
const umber = { name: "Umber", hex: "#8B6B57" }
const navy = { name: "Faded Navy", hex: "#4B5566" }

export const products: Product[] = [
  {
    id: "tee-001",
    slug: "essential-oversized-tee-black",
    name: "Essential Oversized Tee - Black",
    shortDescription: "La camiseta base de la marca con caida amplia y tacto pesado.",
    description:
      "Una oversized con cuello reforzado, hombro caido y estructura limpia. Funciona como prenda principal o base de layering.",
    price: 149000,
    compareAtPrice: 179000,
    images: [
      {
        src: "/images/products/tee-noir-front.png",
        alt: "Essential Oversized Tee en color negro, vista principal editorial.",
      },
      {
        src: "/images/products/tee-noir-detail.png",
        alt: "Essential Oversized Tee en negro, detalle de textura y fit.",
      },
    ],
    colors: [black, offWhite, graphite],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 18,
    category: "oversized",
    fit: "oversized",
    badge: "Best Seller",
    material: "Algodon premium 280 gsm peinado",
    care: [
      "Lavar al reves en agua fria",
      "No usar blanqueador",
      "Secar a la sombra",
    ],
    features: ["Cuello rib premium", "Caida boxy", "Costuras reforzadas"],
    tags: ["negra", "streetwear", "oversized", "basica"],
    isFeatured: true,
  },
  {
    id: "tee-002",
    slug: "signature-tee-off-white",
    name: "Signature Tee - Off White",
    shortDescription: "Regular fit pulido con una mano suave y acabado limpio.",
    description:
      "Una silueta esencial de hombro preciso con peso medio-alto. Pensada para combinar con denim, sastreria relajada o piezas utilitarias.",
    price: 139000,
    images: [
      {
        src: "/images/products/tee-ivory-front.png",
        alt: "Signature Tee en off white, producto principal.",
      },
      {
        src: "/images/products/tee-ivory-detail.png",
        alt: "Signature Tee en off white, detalle de cuello y acabado.",
      },
    ],
    colors: [offWhite, black, sand],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 14,
    category: "regular-fit",
    fit: "regular",
    badge: "Nuevo",
    material: "Algodon peruano 240 gsm",
    care: [
      "Lavar con colores similares",
      "Planchar del reves",
      "No retorcer la prenda",
    ],
    features: ["Regular fit", "Acabado premium", "Tejido transpirable"],
    tags: ["off white", "regular", "premium", "minimal"],
    isFeatured: true,
    isNewArrival: true,
  },
  {
    id: "tee-003",
    slug: "washed-street-tee-olive",
    name: "Washed Street Tee - Olive",
    shortDescription: "Tono lavado con aire vintage y volumen relajado.",
    description:
      "Prenda de apariencia gastada controlada, con tacto seco y caracter urbano. El tono olive lavado aporta profundidad sin perder versatilidad.",
    price: 159000,
    compareAtPrice: 189000,
    images: [
      {
        src: "/images/products/tee-olive-front.png",
        alt: "Washed Street Tee en olive, vista principal.",
      },
      {
        src: "/images/products/tee-olive-detail.png",
        alt: "Washed Street Tee en olive, detalle editorial lateral.",
      },
    ],
    colors: [olive, moss, black],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 11,
    category: "nuevas",
    fit: "oversized",
    badge: "Nuevo",
    material: "Algodon lavado 270 gsm",
    care: [
      "Lavar por separado la primera vez",
      "No secar en maquina",
      "Evitar planchado directo sobre costuras",
    ],
    features: ["Lavado vintage", "Fit amplio", "Caida pesada"],
    tags: ["olive", "washed", "oversized", "nuevo"],
    isNewArrival: true,
  },
  {
    id: "tee-004",
    slug: "graphic-motion-tee-grey",
    name: "Graphic Motion Tee - Grey",
    shortDescription: "Grafica sobria con intencion de coleccion y base gris humo.",
    description:
      "Una grafica de ritmo limpio pensada para elevar looks cotidianos. El tono grey equilibra la pieza y mantiene la sensacion premium.",
    price: 169000,
    images: [
      {
        src: "/images/products/tee-graphite-front.png",
        alt: "Graphic Motion Tee en grey, producto principal.",
      },
      {
        src: "/images/products/tee-graphite-detail.png",
        alt: "Graphic Motion Tee en grey, detalle de grafica.",
      },
    ],
    colors: [graphite, black, stone],
    sizes: ["S", "M", "L", "XL"],
    stock: 9,
    category: "graficas",
    fit: "oversized",
    badge: "Best Seller",
    material: "Algodon premium 260 gsm con estampado soft touch",
    care: [
      "Lavar del reves",
      "No planchar sobre la grafica",
      "Secado plano recomendado",
    ],
    features: ["Grafica soft touch", "Base gris humo", "Cuello alto"],
    tags: ["grafica", "grey", "street", "bestseller"],
    isFeatured: true,
  },
  {
    id: "tee-005",
    slug: "core-regular-tee-sand",
    name: "Core Regular Tee - Sand",
    shortDescription: "Una basica refinada con tono arena y estructura limpia.",
    description:
      "La camiseta de diario con proporciones equilibradas, ideal para rotacion alta y looks monocromaticos de inspiracion editorial.",
    price: 129000,
    images: [
      {
        src: "/images/products/tee-sand-front.png",
        alt: "Core Regular Tee en sand, vista frontal.",
      },
      {
        src: "/images/products/tee-sand-detail.png",
        alt: "Core Regular Tee en sand, detalle de fit.",
      },
    ],
    colors: [sand, bone, black],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 26,
    category: "basicas",
    fit: "regular",
    material: "Algodon compacto 220 gsm",
    care: [
      "Lavar a maquina en ciclo suave",
      "No usar secadora alta",
      "Planchar a temperatura media",
    ],
    features: ["Regular fit", "Color arena", "Tela suave"],
    tags: ["sand", "basica", "regular", "minimal"],
    isFeatured: true,
  },
  {
    id: "tee-006",
    slug: "atelier-oversized-tee-stone",
    name: "Atelier Oversized Tee - Stone",
    shortDescription: "Oversized pulida con tono mineral y caida controlada.",
    description:
      "Inspirada en el lenguaje de estudio creativo, esta pieza mezcla volumen, limpieza visual y una paleta suave de alto valor percibido.",
    price: 152000,
    images: [
      {
        src: "/images/products/tee-stone-front.png",
        alt: "Atelier Oversized Tee en stone, imagen principal.",
      },
      {
        src: "/images/products/tee-stone-detail.png",
        alt: "Atelier Oversized Tee en stone, detalle editorial.",
      },
    ],
    colors: [stone, black, offWhite],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 13,
    category: "oversized",
    fit: "oversized",
    material: "Algodon mercerizado 250 gsm",
    care: [
      "Lavar en agua fria",
      "No secar directamente al sol",
      "Doblar para conservar estructura",
    ],
    features: ["Manga amplia", "Tono piedra", "Acabado limpio"],
    tags: ["stone", "oversized", "editorial"],
  },
  {
    id: "tee-007",
    slug: "district-tee-bone",
    name: "District Tee - Bone",
    shortDescription: "Regular fit con cuello compacto y tono bone refinado.",
    description:
      "Base ideal para outfits urbanos con pantalones amplios, sobrecamisas o capas ligeras. Una prenda simple con sensacion de marca.",
    price: 132000,
    images: [
      {
        src: "/images/products/tee-ivory-front.png",
        alt: "District Tee en bone, frente principal.",
      },
      {
        src: "/images/products/tee-ivory-detail.png",
        alt: "District Tee en bone, detalle editorial de producto.",
      },
    ],
    colors: [bone, black, stone],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 21,
    category: "regular-fit",
    fit: "regular",
    material: "Algodon premium 230 gsm",
    care: [
      "Lavar del reves",
      "No mezclar con prendas oscuras nuevas",
      "No usar vapor muy alto sobre cuello",
    ],
    features: ["Cuello compacto", "Largo preciso", "Tono bone"],
    tags: ["bone", "regular", "clean"],
  },
  {
    id: "tee-008",
    slug: "monogram-street-tee-charcoal",
    name: "Monogram Street Tee - Charcoal",
    shortDescription: "Detalle grafico discreto sobre una base charcoal profunda.",
    description:
      "Una camiseta que entra en la categoria premium streetwear desde el detalle, no desde el ruido. Tiene volumen justo y presencia sobria.",
    price: 165000,
    compareAtPrice: 195000,
    images: [
      {
        src: "/images/products/tee-graphite-front.png",
        alt: "Monogram Street Tee en charcoal, frente.",
      },
      {
        src: "/images/products/tee-graphite-detail.png",
        alt: "Monogram Street Tee en charcoal, detalle de monograma.",
      },
    ],
    colors: [graphite, black, navy],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 7,
    category: "edicion-limitada",
    fit: "oversized",
    badge: "Sale",
    material: "Algodon denso 280 gsm con detalle flock",
    care: [
      "No planchar el flock",
      "Lavar por separado",
      "Secado colgado",
    ],
    features: ["Detalle flock", "Edicion corta", "Base charcoal"],
    tags: ["charcoal", "monograma", "limitada", "sale"],
    isSale: true,
  },
  {
    id: "tee-009",
    slug: "linea-graphic-tee-moss",
    name: "Linea Graphic Tee - Moss",
    shortDescription: "Grafica lineal minimalista con tono musgo sofisticado.",
    description:
      "Una grafica contemporanea de bajo contraste pensada para clientes que buscan diseno sin perder limpieza y versatilidad.",
    price: 167000,
    images: [
      {
        src: "/images/products/tee-olive-front.png",
        alt: "Linea Graphic Tee en moss, imagen principal.",
      },
      {
        src: "/images/products/tee-olive-detail.png",
        alt: "Linea Graphic Tee en moss, detalle lateral.",
      },
    ],
    colors: [moss, olive, black],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    category: "graficas",
    fit: "oversized",
    material: "Algodon lavado 250 gsm",
    care: [
      "Lavar en ciclo delicado",
      "No usar secadora",
      "Planchar del reves",
    ],
    features: ["Grafica lineal", "Lavado suave", "Look editorial"],
    tags: ["moss", "grafica", "streetwear"],
    isNewArrival: true,
  },
  {
    id: "tee-010",
    slug: "studio-core-tee-black",
    name: "Studio Core Tee - Black",
    shortDescription: "Regular fit negro con mano suave y silueta impecable.",
    description:
      "Un esencial sobrio para quien busca calidad silenciosa. Funciona tanto en sets casuales como en combinaciones mas pulidas.",
    price: 134000,
    images: [
      {
        src: "/images/products/tee-noir-front.png",
        alt: "Studio Core Tee en negro, frente principal.",
      },
      {
        src: "/images/products/tee-noir-detail.png",
        alt: "Studio Core Tee en negro, close-up editorial.",
      },
    ],
    colors: [black, graphite, sand],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 29,
    category: "basicas",
    fit: "regular",
    material: "Algodon penteado 230 gsm",
    care: [
      "Lavar con prendas negras",
      "No dejar en remojo",
      "Planchar a baja temperatura",
    ],
    features: ["Basica premium", "Cuello estable", "Base negra"],
    tags: ["black", "core", "regular"],
  },
  {
    id: "tee-011",
    slug: "afterhours-tee-cream",
    name: "Afterhours Tee - Cream",
    shortDescription: "Tono crema elevado con silueta oversized de caida suave.",
    description:
      "Pensada para un styling nocturno o monocromatico, conserva la sobriedad visual de la marca con un tacto mas lujoso.",
    price: 154000,
    images: [
      {
        src: "/images/products/tee-ivory-front.png",
        alt: "Afterhours Tee en cream, producto principal.",
      },
      {
        src: "/images/products/tee-ivory-detail.png",
        alt: "Afterhours Tee en cream, detalle editorial.",
      },
    ],
    colors: [cream, stone, black],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 8,
    category: "nuevas",
    fit: "oversized",
    badge: "Nuevo",
    material: "Algodon mercerizado 255 gsm",
    care: [
      "Lavar con tonos claros",
      "No usar blanqueador",
      "Secado a la sombra",
    ],
    features: ["Caida suave", "Tono crema", "Acabado premium"],
    tags: ["cream", "oversized", "nuevo"],
    isNewArrival: true,
  },
  {
    id: "tee-012",
    slug: "unit-01-tee-washed-grey",
    name: "Unit 01 Tee - Washed Grey",
    shortDescription: "Pieza numerada con acabado lavado y alma de drop corto.",
    description:
      "Un articulo de edicion limitada que mezcla tono mineral, costura visible y una lectura mas industrial dentro del catalogo.",
    price: 172000,
    compareAtPrice: 199000,
    images: [
      {
        src: "/images/products/tee-graphite-front.png",
        alt: "Unit 01 Tee en washed grey, vista frontal.",
      },
      {
        src: "/images/products/tee-graphite-detail.png",
        alt: "Unit 01 Tee en washed grey, detalle de costuras.",
      },
    ],
    colors: [graphite, stone],
    sizes: ["M", "L", "XL"],
    stock: 5,
    category: "edicion-limitada",
    fit: "oversized",
    badge: "Sale",
    material: "Algodon pesado 285 gsm con lavado mineral",
    care: [
      "Lavar por separado",
      "No exponer a secado fuerte",
      "Planchar del reves",
    ],
    features: ["Drop corto", "Lavado mineral", "Detalles visibles"],
    tags: ["washed grey", "edicion limitada", "sale"],
    isSale: true,
  },
  {
    id: "tee-013",
    slug: "capsule-tee-umber",
    name: "Capsule Tee - Umber",
    shortDescription: "Una tonalidad tierra para looks premium mas calidos.",
    description:
      "El tono umber aporta sofisticacion y diferencia sin romper la neutralidad del armario. Mantiene una construccion balanceada de alto uso.",
    price: 146000,
    images: [
      {
        src: "/images/products/tee-sand-front.png",
        alt: "Capsule Tee en umber, imagen principal.",
      },
      {
        src: "/images/products/tee-sand-detail.png",
        alt: "Capsule Tee en umber, detalle de textura.",
      },
    ],
    colors: [umber, sand, bone],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 16,
    category: "basicas",
    fit: "regular",
    material: "Algodon premium 240 gsm",
    care: [
      "Lavar con colores similares",
      "No usar secadora",
      "Planchado suave del reves",
    ],
    features: ["Tono tierra", "Tela estable", "Uso diario premium"],
    tags: ["umber", "regular", "capsule"],
  },
  {
    id: "tee-014",
    slug: "signal-tee-faded-navy",
    name: "Signal Tee - Faded Navy",
    shortDescription: "Azul lavado para una lectura premium mas profunda.",
    description:
      "Una pieza nueva que aporta contraste a la paleta neutra del catalogo. Conserva el ADN limpio de SABLE con un acento mas nocturno.",
    price: 158000,
    images: [
      {
        src: "/images/products/tee-stone-front.png",
        alt: "Signal Tee en faded navy, frente editorial.",
      },
      {
        src: "/images/products/tee-stone-detail.png",
        alt: "Signal Tee en faded navy, detalle lateral.",
      },
    ],
    colors: [navy, black, stone],
    sizes: ["M", "L", "XL", "XXL"],
    stock: 10,
    category: "nuevas",
    fit: "oversized",
    material: "Algodon lavado premium 265 gsm",
    care: [
      "Lavar con tonos oscuros",
      "No blanquear",
      "Secar en sombra",
    ],
    features: ["Faded navy", "Volumen relajado", "Tela pesada"],
    tags: ["navy", "oversized", "nuevo"],
    isNewArrival: true,
  },
]
