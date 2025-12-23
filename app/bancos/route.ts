import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Banco from '@/app/models/Banco';

export const dynamic = 'force-dynamic';

//List bancos
export async function GET() {
    console.log("listar bancos");
    try {
        await connectDB();
        const result = await Banco.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

//Create banco
export async function POST(req: Req) {
    console.log("crear nuevo banco");
    try {
        await connectDB();
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo, vencimiento } = body;
        const result = await Banco.create({
            name: nombre,
            capital,
            period: periodo,
            tna,
            logo,
            duedate: vencimiento
        });
        console.log(result);
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

