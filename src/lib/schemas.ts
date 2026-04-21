import { z } from "zod"

import { shippingMethods } from "@/types/checkout"

export const newsletterSchema = z.object({
  email: z.email("Ingresa un correo valido"),
})

export const checkoutSchema = z.object({
  email: z.email("Ingresa un correo valido"),
  firstName: z.string().min(2, "Tu nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "Tu apellido debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(7, "Ingresa un numero valido")
    .regex(/^[0-9+\s-]+$/, "Usa solo numeros o simbolos telefonicos"),
  department: z.string().min(2, "Selecciona un departamento"),
  city: z.string().min(2, "Ingresa tu ciudad"),
  address: z.string().min(6, "Ingresa una direccion completa"),
  apartment: z.string().optional(),
  notes: z.string().optional(),
  method: z.enum(shippingMethods),
  couponCode: z.string().optional(),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
