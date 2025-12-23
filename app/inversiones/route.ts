import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Inversion from '@/app/models/Inversion';

export const dynamic = 'force-dynamic';

//List inversiones
export async function GET() {
    console.log("listar inversiones");
    try {
        await connectDB();
        const result = await Inversion.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

//Create inversion
export async function POST(req: Req) {
    console.log("crear nuevo inversion");
    try {
        await connectDB();
        const body = await req.json();
        const {
            nombre,
            periodo,
            cuotapartes,
            montoinicial,
            valoractual,
            valorinicial
        } = body;
        const result = await Inversion.create({
            nombre,
            periodo,
            cuotapartes,
            montoinicial,
            valoractual,
            valorinicial
        });
        console.log(result);

        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

