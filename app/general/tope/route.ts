import { NextRequest as Req, NextResponse as Res } from "next/server";
import { DateTime } from "luxon";
import { prisma } from "@/db";

async function getTotalFijos() {
  try {
    const result = await prisma.fijo.aggregate({
      _sum: {
        capital: true
      }
    });
    return result._sum.capital;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

async function getGastosHoy() {
  try {
    const result = await prisma.gasto.aggregate({
      _sum: {
        amount: true
      },
      where: {
        date: DateTime.now().startOf('day').minus({ hours: 3 }).toJSDate()
      }
    });
    return result._sum.amount ? result._sum.amount : 0;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

async function getTotalDisponible() {
  try {
    const result = await prisma.wallet.aggregate({
      _sum: {
        capital: true
      }
    });
    return (result._sum.capital ? result._sum.capital : 0) - 1200000; //Hay que ver donde poner esa reserva
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

async function getPlazosFijos() {
  try {
    const result = await prisma.banco.aggregate({
      _sum: {
        capital: true
      }
    });
    return result._sum.capital;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

function ahorroPorMes(objetivoMensual: number, alMomento: number) {
  return (alMomento > objetivoMensual ? 0 : (objetivoMensual - alMomento));
}

function topeDiario(efectivoEnBanco: number, objetivoMensual: number) {
  return (efectivoEnBanco - (objetivoMensual < 0 ? 0 : objetivoMensual)) / (DateTime.now().daysInMonth - DateTime.now().day);
}

export async function GET() {
  console.log('tope de gasto diario');

  const totalFijos = await getTotalFijos();
  const gastosHoy = await getGastosHoy();
  const disponible = await getTotalDisponible();
  const pfijo = await getPlazosFijos();

  const ahorro = ahorroPorMes(880000, pfijo!);
  console.log(totalFijos, gastosHoy, disponible, pfijo, ahorro);

  const tope = topeDiario(disponible! - totalFijos!, ahorro);
  return Res.json(tope);
}
