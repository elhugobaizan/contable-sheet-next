import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';

export const dynamic = 'force-dynamic';

//List gastos
export async function GET() {
    console.log("listar gastos");
    try {
        await connectDB();
        const result = await Gasto.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

//Create gasto
export async function POST(req: Req) {
    console.log("crear nuevo gasto");
    try {
        await connectDB();
        const body = await req.json();
        const { detalle, monto, fecha, tipo } = body;
        const result = await Gasto.create({
            detail: detalle,
            amount: monto,
            date: fecha,
            type: tipo
        });
        console.log(result);

        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

