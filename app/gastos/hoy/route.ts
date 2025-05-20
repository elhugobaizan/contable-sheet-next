import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';
import { DateTime, Duration } from "luxon";

export const dynamic = 'force-dynamic';

//Gastos hoy
export async function GET() {
    console.log("gastos de hoy", DateTime.now().startOf('day').minus({ hours: 3 }).toJSDate());
    try {
        const result = await prisma.gasto.aggregate({
            _sum: {
                amount: true
            },
            where: {
                date: DateTime.now().startOf('day').minus({ hours: 3 }).toJSDate()
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}
