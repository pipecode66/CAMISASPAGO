# SABLE Store

Tienda e-commerce de camisetas premium/streetwear construida con `Next.js 16`, `App Router`, `TypeScript`, `Tailwind CSS`, `shadcn/ui`, `Framer Motion`, `Zustand`, `React Hook Form`, `Zod` y una integracion preparada para `Mercado Pago Colombia`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Variables de entorno

Copia `.env.example` como `.env.local` para desarrollo local.

Variables disponibles:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_WEBHOOK_URL`

Si `MERCADO_PAGO_ACCESS_TOKEN` no existe, el checkout entra automaticamente en modo `mock` para demo en local y en despliegue.

## Despliegue en Vercel

El proyecto ya queda preparado para Vercel con:

- `vercel.json` para declarar explicitamente el framework `nextjs`
- `.vercelignore` para excluir archivos no necesarios en despliegues por CLI
- `.nvmrc` para alinear la version de Node usada por el equipo
- `.gitignore` listo para evitar commitear la carpeta `.vercel`

### Opcion 1: desde GitHub

1. Importa este repositorio en Vercel.
2. Deja el `Root Directory` en la raiz del repositorio.
3. Vercel detectara Next.js automaticamente.
4. Agrega las variables de entorno de `.env.example` en `Project Settings -> Environment Variables`.
5. Despliega.

### Opcion 2: con Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

Para trabajar con variables del proyecto:

```bash
vercel env pull
```

## Notas de produccion

- La rama `main` queda lista para despliegue de produccion en Vercel.
- El `build` del proyecto ya compila correctamente.
- El checkout usa una ruta server-side (`/api/checkout/preference`) compatible con Vercel Functions.
