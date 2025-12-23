import { NextRequest as Req, NextResponse as Res } from "next/server";
import { DateTime } from "luxon";
import connectDB from "@/db";
import Fijo from '@/app/models/Fijo';
import Gasto from '@/app/models/Gasto';
import Variable from '@/app/models/Variable';
import Wallet from '@/app/models/Wallet';
import Banco from '@/app/models/Banco';

async function getTotalFijos() {
  try {
    await connectDB();
    const result = await Fijo.aggregate([
      {
        $group: {
          _id: null,
          _sum: {
            capital: { $sum: '$capital' }
          }
        }
      }
    ]);
    return result[0]?._sum?.capital || 0;
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
  }
}

async function getGastosHoy() {
  try {
    await connectDB();
    const fechaHoy = DateTime.now().startOf('day').minus({ hours: 3 }).toJSDate();
    const fechaFin = DateTime.now().endOf('day').minus({ hours: 3 }).toJSDate();
    const result = await Gasto.aggregate([
      {
        $match: {
          date: {
            $gte: fechaHoy,
            $lte: fechaFin
          }
        }
      },
      {
        $group: {
          _id: null,
          _sum: {
            amount: { $sum: '$amount' }
          }
        }
      }
    ]);
    return result[0]?._sum?.amount || 0;
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
  }
}

async function getReservaWallets() {
  try {
    await connectDB();
    const result = await Variable.findOne({
      nombre: 'reserva_wallet'
    });
    const valor = result ? (result.valor ? result.valor : 0) : 0;
    return valor;
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
  }
}

async function getTotalDisponible() {
  try {
    await connectDB();
    const result = await Wallet.aggregate([
      {
        $group: {
          _id: null,
          _sum: {
            capital: { $sum: '$capital' }
          }
        }
      }
    ]);
    const reserva = await getReservaWallets()
    return (result[0]?._sum?.capital || 0) - reserva; //Hay que ver donde poner esa reserva
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
  }
}

async function getPlazosFijos() {
  try {
    await connectDB();
    const result = await Banco.aggregate([
      {
        $group: {
          _id: null,
          _sum: {
            capital: { $sum: '$capital' }
          }
        }
      }
    ]);
    return result[0]?._sum?.capital || 0;
  } catch (err) {
    console.log("ERROR: ", err);
    return 0;
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
