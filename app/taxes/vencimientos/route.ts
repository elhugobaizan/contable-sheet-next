import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';

export const dynamic = 'force-dynamic';

//List vencimientos
export async function GET() {
  console.log("listar vencimientos de impuestos");
  try {
    await connectDB();
    const hoy = new Date();
    const fechaLimite = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 3);
    const result = await Fijo.find({
      period: { $lte: fechaLimite }
    });
    const avisos = result.map((impuesto) => `Hoy vence ${impuesto.name}, hay que pagar ${NumberToMoney(impuesto.capital)} pesos`);
    return Res.json(avisos);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

function NumberToMoney(number: Number) {
  return `$ ${number.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}