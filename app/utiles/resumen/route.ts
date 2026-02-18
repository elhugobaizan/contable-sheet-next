import { NextResponse as Res } from "next/server";
import Snapshot from "@/app/models/Snapshot";

async function ensureMonthlySnapshot(data: any) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const period = `${year}-${String(month).padStart(2, "0")}`

  const existing = await Snapshot.findOne({
    year,
    month
  })

  if (existing) return existing

  const snapshot = {
    Annio: year,
    Mes: month,
    period,
    PatrimonioNetoARS: data.netoActual,
    PatrimonioNetoUSD: data.netoActual / data.cotizacionesOficial.venta,
    Liquidez: data.disponible,
    Inversiones: data.totalPlazosFijos + data.totalCriptos + data.fondos,
    Deuda: data.deudaAFavor,
    TasaDeCambio: data.cotizacionesOficial.venta,
    Fecha: new Date()
  }

  return await Snapshot.create(snapshot)
}

export async function POST(request: Request) {
  const { data } = await request.json()

  const snapshot = await ensureMonthlySnapshot(data)

  snapshot.PatrimonioNeto = data.PatrimonioNeto
  snapshot.Liquidez = data.Liquidez
  snapshot.Inversiones = data.Inversiones
  snapshot.Deuda = data.Deuda
  snapshot.Moneda = data.Moneda
  snapshot.Fecha = new Date()

  return Res.json({ message: "Resumen creado" });
}