import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer fijo");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Fijo.findById(id);
        if (!result) {
            return Res.json({ error: 'Fijo no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar fijo");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { Detalle, Vencimiento, Deuda, Datos, Logo, URL } = body;
        
        const updateData: any = {
            Detalle: Detalle,
            Deuda: Deuda || 0,
            Datos: Datos || '',
            Logo: Logo || '',
            URL: URL || '',
            Vencimiento: Vencimiento || ''
        };
                
        const result = await Fijo.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar fijo");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Fijo.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}