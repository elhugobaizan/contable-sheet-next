import { NextRequest as Req, NextResponse as Res } from "next/server";
import { DateTime } from "luxon";
import { prisma } from "@/db";

async function getReservaWallets() {
  return 200000;
  /*   try {
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
    } */
}

async function getTotalFondos() {
  return 1725507.58;
  /*   try {
      const result = await prisma.wallet.aggregate({
        _sum: {
          capital: true
        }
      });
      return (result._sum.capital ? result._sum.capital : 0) - 1200000; //Hay que ver donde poner esa reserva
    } catch (err) {
      console.log("ERROR: ", err);
    } */
}

async function getTotalCripto() {
  return 1759900.21;
  /*   try {
      const result = await prisma.banco.aggregate({
        _sum: {
          capital: true
        }
      });
      return result._sum.capital;
    } catch (err) {
      console.log("ERROR: ", err);
    } */
}

export async function GET() {
  const totalCripto = await getTotalCripto();
  const totalFondos = await getTotalFondos();
  const reservaWallets = await getReservaWallets();

  const inversiones = totalCripto + totalFondos + reservaWallets;

  return Res.json(inversiones);
}
