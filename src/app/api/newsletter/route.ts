import { NextResponse } from "next/server"

import { newsletterSchema } from "@/lib/schemas"

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const result = newsletterSchema.safeParse(payload)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors.email?.[0] ?? "Correo invalido" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Suscripcion registrada",
    })
  } catch {
    return NextResponse.json(
      { error: "No pudimos registrar tu correo" },
      { status: 500 }
    )
  }
}
