import { NextRequest as Req, NextResponse as Res } from "next/server";
import { DateTime } from "luxon";
import { prisma } from "@/db";

async function getReservaWallets() {
  try {
    const result = await prisma.variable.findFirst({
      where: {
        nombre: 'reserva_wallet'
      }
    });
    const valor = result ? (result.valor ? result.valor : 0) : 0;
    return valor;
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
  }
}

async function getTotalFondos() {
  return 1725507.58;
}

async function getTotalCripto() {
  return 1759900.21;
}

export async function GET() {
  const totalCripto = await getTotalCripto();
  const totalFondos = await getTotalFondos();
  const reservaWallets = await getReservaWallets();

  const inversiones = totalCripto + totalFondos + reservaWallets;

  return Res.json(inversiones);
}
