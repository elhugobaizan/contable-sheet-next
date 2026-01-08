import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Inversion from '@/app/models/Inversion';
import { TipoMoneda } from "@/app/models/Tipos";

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ idInversion: string }> }) {
    const { idInversion } = await params;
    console.log("Leer inversion ", idInversion);
    try {
        await connectDB();
        const result = await Inversion.findById(idInversion);
        if (!result) {
            return Res.json({ error: 'Inversion no encontrada' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ idInversion: string }> }) {
    const { idInversion } = await params;
    console.log("Actualizar inversion ", idInversion);
    try {
        await connectDB();
        const body = await req.json();
        const { Nombre, Capital, Moneda, Ente } = body;

        const result = await Inversion.findByIdAndUpdate(
            idInversion,
            {
                Nombre: Nombre,
                Capital: Capital || 0,
                Moneda: Moneda || TipoMoneda.Peso,
                Ente: Ente
            },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Inversion no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ idInversion: string }> }) {
    const { idInversion } = await params;
    console.log("borrar inversion ", idInversion);
    try {
        await connectDB();
        const result = await Inversion.findByIdAndDelete(idInversion);
        
        if (!result) {
            return Res.json({ error: 'Inversion no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}