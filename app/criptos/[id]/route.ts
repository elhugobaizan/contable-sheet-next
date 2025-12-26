import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Cripto from '@/app/models/Cripto';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer cripto");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Cripto.findById(id);
        if (!result) {
            return Res.json({ error: 'Cripto no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar cripto");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { Nombre, Cantidad, Logo, Sigla, Hoy } = body;
        
        const updateData: any = {
            Nombre: Nombre,
            Cantidad: Cantidad,
            Logo: Logo || '',
            Sigla: Sigla || '',
            Hoy: Hoy || 0
        };
        
        const result = await Cripto.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Cripto no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar cripto");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Cripto.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Cripto no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}