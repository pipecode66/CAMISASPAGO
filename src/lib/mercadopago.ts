import { MercadoPagoConfig, Preference } from "mercadopago"

let mercadoPagoClient: MercadoPagoConfig | null = null
let mercadoPagoPreference: Preference | null = null

export function isMercadoPagoConfigured() {
  return Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN)
}

export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("MERCADO_PAGO_ACCESS_TOKEN no esta configurado")
  }

  if (!mercadoPagoClient) {
    mercadoPagoClient = new MercadoPagoConfig({
      accessToken,
      options: { timeout: 5000 },
    })
  }

  return mercadoPagoClient
}

export function getMercadoPagoPreference() {
  if (!mercadoPagoPreference) {
    mercadoPagoPreference = new Preference(getMercadoPagoClient())
  }

  return mercadoPagoPreference
}
