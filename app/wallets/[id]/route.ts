import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Wallet from '@/app/models/Wallet';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer wallet");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Wallet.findById(id);
        if (!result) {
            return Res.json({ error: 'Wallet no encontrada' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar wallet");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { Nombre, Inicio, Interes, Efectivo, Logo, CVU, Alias, EsMetodo } = body;
        
        const result = await Wallet.findByIdAndUpdate(
            id,
            {
                Nombre: Nombre,
                Inicio: new Date(Inicio),
                Interes: Interes || 0,
                Efectivo: Efectivo || 0,
                Logo: Logo || '',
                CVU: CVU || '',
                Alias: Alias || '',
                EsMetodo: EsMetodo || false
            },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Wallet no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar wallet");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Wallet.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Wallet no encontrada' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}