import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import PlazoFijo from '@/app/models/PlazoFijo';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

// Helper function to convert date to string format yyyy-MM-dd
function formatVencimiento(vencimiento: any): string {
    if (!vencimiento) {
        return DateTime.now().toFormat('yyyy-MM-dd');
    }
    
    if (typeof vencimiento === 'string') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(vencimiento)) {
            return vencimiento;
        }
    }
    
    return DateTime.fromISO(vencimiento).toFormat('yyyy-MM-dd');
}

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("Leer plazo fijo ", id);
    try {
        await connectDB();
            const result = await PlazoFijo.findById(id);
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("Actualizar plazo fijo ", id);
    try {
        await connectDB();
        const body = await req.json();
        const { Nombre, Periodo, Vencimiento, Capital, TNA, Banco } = body;
        
        // Construir objeto de actualización
        const updateData: any = {};
        
        if (Nombre !== undefined) updateData.Nombre = Nombre;
        if (Periodo !== undefined) updateData.Periodo = formatVencimiento(Periodo);
        if (Vencimiento !== undefined) updateData.Vencimiento = formatVencimiento(Vencimiento);
        if (Capital !== undefined) updateData.Capital = Capital;
        if (TNA !== undefined) updateData.TNA = TNA;
        if (Banco !== undefined) updateData.Banco = Banco;
        
        const result = await PlazoFijo.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("borrar plazo  fijo ", id);
    try {
        await connectDB();
        const result = await PlazoFijo.findByIdAndDelete(id);
        
        if (!result) {
            return Res.json({ error: 'Plazo fijo no encontrado' }, { status: 404 });
        }
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}