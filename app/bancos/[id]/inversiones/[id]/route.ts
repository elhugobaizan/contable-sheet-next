import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Inversion from '@/app/models/Inversion';
import { TipoMoneda } from "@/app/models/Tipos";

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer inversion");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Inversion.findById(id);
        if (!result) {
            return Res.json({ error: 'Inversion no encontrada' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar inversion");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { Nombre, Capital, Moneda } = body;

        const result = await Inversion.findByIdAndUpdate(
            id,
            {
                Nombre: Nombre,
                Capital: Capital || 0,
                Moneda: Moneda || TipoMoneda.Peso,
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

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar inversion");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Inversion.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Inversion no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}