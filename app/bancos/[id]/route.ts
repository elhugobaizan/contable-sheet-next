import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Banco from '@/app/models/Banco';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer banco");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Banco.findById(id);
        if (!result) {
            return Res.json({ error: 'Banco no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar banco");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo, vencimiento } = body;

        const result = await Banco.findByIdAndUpdate(
            id,
            { name: nombre, capital, period: periodo, tna, logo, duedate: vencimiento },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Banco no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar banco");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Banco.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Banco no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}