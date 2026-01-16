import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from "@/app/models/Tipos";

export const dynamic = 'force-dynamic';

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Pagar fijo");
    try {
        await connectDB();
        const id = (await params).id;

        const updateData: any = {
            Deuda: 0,
            Vencimiento: new Date("1970-01-01T03:00:00.000+00:0"),
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
                Fecha: new Date(),
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