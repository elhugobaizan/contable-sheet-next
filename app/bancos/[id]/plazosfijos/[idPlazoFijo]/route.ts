import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import PlazoFijo from '@/app/models/PlazoFijo';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ idPlazoFijo: string }> }) {
    const { idPlazoFijo } = await params;
    console.log("Leer plazo fijo ", idPlazoFijo);
    try {
        await connectDB();
            const result = await PlazoFijo.findById(idPlazoFijo);
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ idPlazoFijo: string }> }) {
    const { idPlazoFijo } = await params;
    console.log("Actualizar plazo fijo ", idPlazoFijo);
    try {
        await connectDB();
        const body = await req.json();
        const { Nombre, Periodo, Vencimiento, Capital, TNA, Banco } = body;
        
        const result = await PlazoFijo.findByIdAndUpdate(
            idPlazoFijo,
            {
                Nombre: Nombre,
                Periodo: new Date(Periodo),
                Vencimiento: new Date(Vencimiento),
                Capital: Capital || 0,
                TNA: TNA || 0,
                Banco: Banco
            },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ idPlazoFijo: string }> }) {
    const { idPlazoFijo } = await params;
    console.log("borrar plazo  fijo ", idPlazoFijo);
    try {
        await connectDB();
        const result = await PlazoFijo.findByIdAndDelete(idPlazoFijo);
        
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}