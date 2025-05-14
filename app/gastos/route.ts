import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List gastos
export async function GET() {
    console.log("listar gastos");
    try {
        const result = await prisma.gasto.findMany();
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

//Create gasto
export async function POST(req: Req) {
    console.log("crear nuevo gasto");
    try {
        const body = await req.json();
        const { detalle, monto, fecha, tipo } = body;
        const result = await prisma.gasto.create({
            data: {
                detail: detalle,
                amount: monto,
                date: fecha,
                type: tipo
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

