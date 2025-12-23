import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

//Gastos hoy
export async function GET() {
    const fechaHoy = DateTime.now().startOf('day').minus({ hours: 3 }).toJSDate();
    const fechaFin = DateTime.now().endOf('day').minus({ hours: 3 }).toJSDate();
    console.log("gastos de hoy", fechaHoy);
    try {
        await connectDB();
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
        return Res.json(result[0] || { _sum: { amount: 0 } });
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}
