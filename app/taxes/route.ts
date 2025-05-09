import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

//List fijos
export async function GET() {
    console.log("listar fijos");
    try {
        const result = await prisma.fijo.findMany();
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

//Create fijo
export async function POST(req: Req) {
    console.log("crear nuevo fijo");
    try {
        const body = await req.json();
        const { nombre, capital, periodo, url, logo, nroCliente } = body;
        const result = await prisma.fijo.create({
            data: {
                name: nombre,
                capital,
                period: periodo,
                logo,
                url,
                client: nroCliente
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

