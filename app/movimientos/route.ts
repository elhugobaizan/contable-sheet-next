import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Movimiento from '@/app/models/Movimiento';
import { TipoGasto, TipoMovimiento } from '@/app/models/Tipos';
import { DateTime } from "luxon";

export const dynamic = 'force-dynamic';

//List gastos
export async function GET(req: Req) {
    console.log("listar movimientos");
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
        
        const result = await Movimiento.find(query).populate('Metodo');
        console.log(`Encontrados: ${result?.length} movimientos`);
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al listar movimientos',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create gasto(s)
export async function POST(req: Req) {
    console.log("crear nuevo movimiento(s)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'movimientos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'movimientos'...");
                await db.createCollection('movimientos');
                console.log("Colección 'movimientos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples gastos
            const movimientos = body.map((movimiento: any) => ({
                Concepto: movimiento.Concepto,
                Fecha: movimiento.Fecha,
                Monto: movimiento.Monto || 0,
                Tipo: movimiento.Tipo || TipoGasto.Varios,
                Donde: movimiento.Donde || '',
                Metodo: movimiento.Metodo || null,
                Codigo: movimiento.Codigo || TipoMovimiento.Gasto
            }));
            
            const result = await Movimiento.insertMany(movimientos);
            const populated = await Movimiento.find({ _id: { $in: result.map((r: any) => r._id) } }).populate('Metodo');
            return Res.json(populated);
        } else {
            // Crear un solo fijo (comportamiento original)
            const { Concepto, Fecha, Monto, Tipo, Donde, Metodo, Codigo } = body;
            
            const result = await Movimiento.create({
                Concepto: Concepto,
                Fecha: Fecha,
                Monto: Monto || 0,
                Tipo: Tipo || TipoGasto.Varios,
                Donde: Donde || '',
                Metodo: Metodo || '',
                Codigo: Codigo || TipoMovimiento.Gasto
            });
            console.log("Movimiento creado: ", result);
            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear movimiento(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

