import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

//List bancos
export async function GET() {
    console.log("listar bancos");
    try {
        const result = await prisma.banco.findMany();
        console.log("find many");
        return Res.json(result);
    } catch (err) {
        console.log("hay error", err);
        return Res.json(err);
    }
}

//Create banco
export async function POST(req: Req) {
    console.log("crear nuevo banco");
    try {
        const body = await req.json();
        const { name, capital, period, tna, logo, duedate } = body;
        const result = {
            name,
            capital,
            period,
            tna,
            logo,
            duedate
        };
        return Res.json(result);
    } catch (err) {
        return Res.json({ message: err });
    }
}

