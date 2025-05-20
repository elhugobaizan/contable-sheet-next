import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List vencimientos
export async function GET() {
  console.log("listar vencimientos de impuestos");
  try {
    const hoy = new Date();
    const result = await prisma.fijo.findMany({
      where: {
        period: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), -3, 0, 0, 0)
      }
    });
    const avisos = result.map((impuesto) => `Hoy vence ${impuesto.name}, hay que pagar ${NumberToMoney(impuesto.capital)} pesos`);
    return Res.json(avisos);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json(err);
  }
}

function NumberToMoney(number: Number) {
  return `$ ${number.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}