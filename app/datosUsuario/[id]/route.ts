import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import DatosUsuario from '@/app/models/DatosUsuario';

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer dato de Usuario");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await DatosUsuario.findById(id);
        if (!result) {
            return Res.json({ error: 'Dato de Usuario no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar dato de Usuario");
    try {
        await connectDB();
        const id = (await params).id;
        const body = await req.json();
        const { Campo, Valor } = body;
        
        const result = await DatosUsuario.findByIdAndUpdate(
            id,
            {
                Campo: Campo,
                Valor: Valor
            },
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Dato de Usuario no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar dato de Usuario");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await DatosUsuario.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Dato de Usuario no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}