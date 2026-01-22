import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from "@/app/models/Tipos";
import { DateTime } from "luxon";

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
    console.log("Pagar fijo");
    try {
        await connectDB();
        const id = (await params).id;

        const updateData: any = {
            Deuda: 0,
            Vencimiento: '',
        };
        

        const fijo = await Fijo.findById(id);
        if (!fijo) {
            return Res.json({ error: 'Fijo no encontrado' }, { status: 404 });
        }
        const Monto = fijo.Deuda;

        if (Monto > 0) {
            const result = await Fijo.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
        
            await Gasto.create({
                Concepto: `Pago de fijo ${fijo.Detalle}`,
                Fecha: DateTime.now().toFormat('yyyy-MM-dd'),
                Monto: Monto,
                Tipo: TipoGasto.Impuestos,
                Donde: ''
            });
            
            return Res.json(result);
        } else {
            return Res.json({ error: 'Fijo no tiene deuda' }, { status: 400 });
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}