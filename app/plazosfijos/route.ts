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

//List wallets
export async function GET(req: Req) {
    console.log("listar plazos fijos");
    try {
        await connectDB();
        const result = await PlazoFijo.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: `Error al listar plazos fijos`,
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create plazo fijo
export async function POST(req: Req) {
    console.log("crear nuevo plazo fijo");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'plazosfijos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'plazosfijos'...");
                await db.createCollection('plazosfijos');
                console.log("Colección 'plazosfijos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples fijos
            const fijos = body.map((fijo: any) => ({
                Nombre: fijo.Nombre || '',
                Periodo: new Date(fijo.Periodo),
                Vencimiento: formatVencimiento(fijo.Vencimiento),
                Capital: fijo.Capital || 0,
                TNA: fijo.TNA || '',
                Banco: fijo.Banco || ''
            }));
            
            const result = await PlazoFijo.insertMany(fijos);
            return Res.json(result);
        } else {        
            // Crear un solo plazo fijo (comportamiento original)
            const { Nombre, Periodo, Vencimiento, Capital, TNA, Banco } = body;
            
            const result = await PlazoFijo.create({
                Nombre: Nombre,
                Periodo: new Date(Periodo),
                Vencimiento: formatVencimiento(Vencimiento),
                Capital: Capital,
                TNA: TNA,
                Banco: Banco
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear plazo fijo',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

