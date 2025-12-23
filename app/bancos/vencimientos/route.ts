import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Banco from '@/app/models/Banco';

export const dynamic = 'force-dynamic';

//List vencimientos
export async function GET() {
  console.log("listar vencimientos de bancos");
  const hoy = new Date();
  const fechaLimite = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 3);
  try {
    await connectDB();
    const result = await Banco.find({
      duedate: { $lte: fechaLimite }
    });
    const avisos = result.map((banco) => `Hoy vence el plazo fijo de ${banco.name}, son ${NumberToMoney(banco.capital)} pesos en intereses`);
    return Res.json(result);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

function NumberToMoney(number: Number) {
  return `$ ${number.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}