import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from '@/app/models/Tipos';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer gasto");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Gasto.findById(id).populate('Metodo');
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
        const { Fecha, Monto, Tipo, Donde, Concepto, Metodo } = body;
        
        // Validate and parse Vencimiento date
        const updateData: any = {
            Fecha: Fecha || DateTime.now().toFormat('yyyy-MM-dd'),
            Monto: Monto || 0,
            Tipo: Tipo || TipoGasto.Varios,
            Donde: Donde || '',
            Concepto: Concepto || '',
            Metodo: Metodo || ''
        };
        
        let result = await Gasto.findByIdAndUpdate(
            id,
            updateData,
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