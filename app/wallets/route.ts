import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

//List wallets
export async function GET() {
    console.log("listar wallets");
    try {
        const result = await prisma.wallet.findMany();
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

//Create wallet
export async function POST(req: Req) {
    console.log("crear nuevo wallet");
    try {
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo } = body;
        const result = await prisma.wallet.create({
            data: {
                name: nombre,
                capital,
                period: periodo,
                tna,
                logo
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

