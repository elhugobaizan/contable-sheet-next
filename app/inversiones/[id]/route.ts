import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Inversion from '@/app/models/Inversion';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer inversion");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Inversion.findById(id);
        if (!result) {
            return Res.json({ error: 'Inversión no encontrada' }, { status: 404 });
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
        const {
            nombre,
            periodo,
            cuotapartes,
            montoinicial,
            valoractual,
            valorinicial
        } = body;
        const result = await Inversion.findByIdAndUpdate(
            id,
            {
                nombre,
                periodo,
                cuotapartes,
                montoinicial,
                valoractual,
                valorinicial
            },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Inversión no encontrada' }, { status: 404 });
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
            return Res.json({ error: 'Inversión no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}