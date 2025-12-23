import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';

export const dynamic = 'force-dynamic';

//List fijos
export async function GET() {
    console.log("listar fijos");
    try {
        await connectDB();
        const result = await Fijo.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

//Create fijo
export async function POST(req: Req) {
    console.log("crear nuevo fijo");
    try {
        await connectDB();
        const body = await req.json();
        const { nombre, capital, periodo, url, logo, nroCliente } = body;
        const result = await Fijo.create({
            name: nombre,
            capital,
            period: periodo,
            logo,
            url,
            client: nroCliente
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

