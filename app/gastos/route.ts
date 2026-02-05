import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from '@/app/models/Tipos';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

//List gastos
export async function GET(req: Req) {
    console.log("listar gastos");
    const all = req.nextUrl.searchParams.get('all') || false;
    try {
        await connectDB();
        
        let query = {};
        if (!all) {
            // Get current month start and next month start as strings (yyyy-MM-dd format)
            const now = DateTime.now();
            const startOfMonth = now.startOf('month').toFormat('yyyy-MM-dd');
            const startOfNextMonth = now.plus({ months: 1 }).startOf('month').toFormat('yyyy-MM-dd');
            
            // Since Fecha is a string in yyyy-MM-dd format, we can use string comparison
            // The format is lexicographically sortable, so >= and < work correctly
            query = {
                Fecha: {
                    $gte: startOfMonth,
                    $lt: startOfNextMonth
                }
            };
        }
        
        const result = await Gasto.find(query);
        console.log(`Encontrados: ${result?.length} gastos`);
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
            const gastos = body.map((gasto: any) => ({
                Concepto: gasto.Concepto,
                Fecha: gasto.Fecha,
                Monto: gasto.Monto || 0,
                Tipo: gasto.Tipo || TipoGasto.Varios,
                Donde: gasto.Donde || '',
                Metodo: gasto.Metodo || ''
            }));
            
            const result = await Gasto.insertMany(gastos);
            return Res.json(result);
        } else {
            // Crear un solo fijo (comportamiento original)
            const { Concepto, Fecha, Monto, Tipo, Donde, Metodo } = body;
            
            const result = await Gasto.create({
                Concepto: Concepto,
                Fecha: Fecha,
                Monto: Monto || 0,
                Tipo: Tipo || TipoGasto.Varios,
                Donde: Donde || '',
                Metodo: Metodo || ''
            });
            console.log("Gasto creado: ", result);
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

