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

  const netoActual = data?.netoActual
  const cotizacionVenta = data?.cotizacionesOficial?.venta
  const snapshot = {
    Annio: year,
    Mes: month,
    period,
    PatrimonioNetoARS: netoActual,
    PatrimonioNetoUSD: cotizacionVenta ? netoActual / cotizacionVenta : 0,
    Liquidez: data?.disponible,
    Inversiones: (data?.totalPlazosFijos + data?.totalCriptos + data?.fondos),
    Deuda: data?.deudaAFavor,
    TasaDeCambio: cotizacionVenta,
    Fecha: new Date()
  }

  return await Snapshot.create(snapshot)
}

export async function POST(request: Request) {
  let body: { data?: any };
  try {
    body = await request.json();
  } catch {
    return Res.json(
      { error: "Cuerpo de la petición inválido o vacío" },
      { status: 400 }
    );
  }
  const data = body?.data ?? body;
  if (data == null || typeof data !== "object") {
    return Res.json(
      { error: "Se requiere un objeto 'data' con netoActual y demás campos" },
      { status: 400 }
    );
  }

  console.log("data: ", data);
  const snapshot = await ensureMonthlySnapshot(data);

  return Res.json({ message: "Resumen creado ", snapshot });
}