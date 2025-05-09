import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List bancos
export async function GET() {
    console.log("listar bancos");
    try {
        const result = await prisma.banco.findMany();
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

//Create banco
export async function POST(req: Req) {
    console.log("crear nuevo banco");
    try {
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo, vencimiento } = body;
        const result = await prisma.banco.create({
            data: {
                name: nombre,
                capital,
                period: periodo,
                tna,
                logo,
                duedate: vencimiento
            }
        });
        console.log(result);
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

