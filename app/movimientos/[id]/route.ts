import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Movimiento from '@/app/models/Movimiento';
import { TipoGasto } from '@/app/models/Tipos';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer movimiento");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Movimiento.findById(id).populate('Metodo');
        if (!result) {
            return Res.json({ error: 'Movimiento no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar movimiento");
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
        
        let result = await Movimiento.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Movimiento no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar movimiento");
    try {
        await connectDB();
        const id = (await params).id;
        const result = await Movimiento.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Movimiento no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}