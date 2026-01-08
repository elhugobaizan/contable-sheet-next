import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Cripto from '@/app/models/Cripto';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ idCripto: string }> }) {
    const { idCripto } = await params;
    console.log("Leer cripto ", idCripto);
    try {
        await connectDB();
        const result = await Cripto.findById(idCripto);
        if (!result) {
            return Res.json({ error: 'Cripto no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ idCripto: string }> }) {
    const { idCripto } = await params;
    console.log("Actualizar cripto ", idCripto);
    try {
        await connectDB();
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
            idCripto,
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

export async function DELETE(req: Req, { params }: { params: Promise<{ idCripto: string }> }) {
        const { idCripto } = await params;
    console.log("borrar cripto ", idCripto);
    try {
        await connectDB();
        const result = await Cripto.findByIdAndDelete(idCripto);
        
        if (!result) {
            return Res.json({ error: 'Cripto no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}