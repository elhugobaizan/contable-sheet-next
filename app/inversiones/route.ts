import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Inversion from '@/app/models/Inversion';
import { TipoMoneda } from "../models/Tipos";

export const dynamic = 'force-dynamic';

//List inversiones
export async function GET() {
    console.log("listar inversiones");
    try {
        await connectDB();
        const result = await Inversion.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

//Create inversion
export async function POST(req: Req) {
    console.log("crear nueva inversion(es)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'inversiones' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'inversiones'...");
                await db.createCollection('inversiones');
                console.log("Colección 'inversiones' creada exitosamente");
            }
        }
        
        const body = await req.json();

        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples inversiones
            const inversiones = body.map((inversion: any) => ({
                Nombre: inversion.Nombre,
                Capital: inversion.Capital || 0,
                Moneda: inversion.Moneda || TipoMoneda.Peso,
            }));
            
            const result = await Inversion.insertMany(inversiones);
            return Res.json(result);
        } else {
            // Crear una sola inversión (comportamiento original)
            const { Nombre, Capital, Moneda } = body;
            
            const result = await Inversion.create({
                Nombre: Nombre,
                Capital: Capital || 0,
                Moneda: Moneda || TipoMoneda.Peso,
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear inversion(es)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

