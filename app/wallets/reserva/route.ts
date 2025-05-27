import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//Get reserva de wallets
export async function GET() {
    console.log("reserva de wallets");
    try {
        const result = await prisma.variable.findFirst({
            where: {
                nombre: 'reserva_wallet'
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

export async function PUT(req: Req) {
    console.log("Actualizar reserva de wallet");
    try {
        const body = await req.json();
        const { valor } = body;
        const result = await prisma.variable.update({
            where: { nombre: 'reserva_wallet' },
            data: { valor }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}