import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List vencimientos
export async function GET() {
  console.log("listar vencimientos de bancos");
  const hoy = new Date();
  try {
    const result = await prisma.banco.findMany({
      where: {
        duedate: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), -3, 0, 0, 0)
      }
    });
    const avisos = result.map((banco) => `Hoy vence el plazo fijo de ${banco.name}, son ${NumberToMoney(banco.capital)} pesos en intereses`);
    return Res.json(result);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json(err);
  }
}

function NumberToMoney(number: Number) {
  return `$ ${number.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
}