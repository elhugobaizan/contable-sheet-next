import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Variable from '@/app/models/Variable';

export const dynamic = 'force-dynamic';

//Get reserva de wallets
export async function GET() {
    console.log("reserva de wallets");
    try {
        await connectDB();
        const result = await Variable.findOne({
            nombre: 'reserva_wallet'
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req) {
    console.log("Actualizar reserva de wallet");
    try {
        await connectDB();
        const body = await req.json();
        const { valor } = body;
        const result = await Variable.findOneAndUpdate(
            { nombre: 'reserva_wallet' },
            { valor },
            { new: true, upsert: true, runValidators: true }
        );
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}