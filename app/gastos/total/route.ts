import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//Total gastos
export async function GET() {
    console.log("total gastos");
    try {
        const result = await prisma.gasto.aggregate({
            _sum: {
                amount: true
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}
