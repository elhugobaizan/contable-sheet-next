import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from '@/app/models/Tipos';

export const dynamic = 'force-dynamic';

//List gastos
export async function GET() {
    console.log("listar gastos");
    try {
        await connectDB();
        const result = await Gasto.find({ Fecha: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al listar gastos',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create gasto(s)
export async function POST(req: Req) {
    console.log("crear nuevo gasto(s)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'gastos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'gastos'...");
                await db.createCollection('gastos');
                console.log("Colección 'gastos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples gastos
            const gastos = body.map((fijo: any) => ({
                Concepto: fijo.Concepto,
                Fecha: new Date(fijo.Fecha),
                Monto: fijo.Monto || 0,
                Tipo: fijo.Tipo || TipoGasto.Varios,
                Donde: fijo.Donde || ''
            }));
            
            const result = await Gasto.insertMany(gastos);
            return Res.json(result);
        } else {
            // Crear un solo fijo (comportamiento original)
            const { Concepto, Fecha, Monto, Tipo, Donde } = body;
            
            const result = await Gasto.create({
                Concepto: Concepto,
                Fecha: new Date(Fecha),
                Monto: Monto || 0,
                Tipo: Tipo || TipoGasto.Varios,
                Donde: Donde || ''
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear gasto(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

