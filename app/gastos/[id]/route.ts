import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer gasto");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Gasto.findById(id);
        if (!result) {
            return Res.json({ error: 'Gasto no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar gasto");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { detalle, monto, fecha, tipo } = body;
        const result = await Gasto.findByIdAndUpdate(
            id,
            { detail: detalle, amount: monto, date: fecha, type: tipo },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Gasto no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar gasto");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Gasto.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Gasto no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}