import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Fijo from '@/app/models/Fijo';

export const dynamic = 'force-dynamic';

//List fijos
export async function GET() {
    console.log("listar fijos");
    try {
        await connectDB();
        const result = await Fijo.find({});
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al listar fijos',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create fijo(s)
export async function POST(req: Req) {
    console.log("crear nuevo fijo(s)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'fijos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'fijos'...");
                await db.createCollection('fijos');
                console.log("Colección 'fijos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples fijos
            const fijos = body.map((fijo: any) => ({
                Detalle: fijo.Detalle,
                Vencimiento: new Date(fijo.Vencimiento),
                Deuda: fijo.Deuda || 0,
                Datos: fijo.Datos || '',
                Logo: fijo.Logo || '',
                URL: fijo.URL || ''
            }));
            
            const result = await Fijo.insertMany(fijos);
            return Res.json(result);
        } else {
            // Crear un solo fijo (comportamiento original)
            const { Detalle, Vencimiento, Deuda, Datos, Logo, URL } = body;
            
            const result = await Fijo.create({
                Detalle: Detalle,
                Vencimiento: new Date(Vencimiento),
                Deuda: Deuda || 0,
                Datos: Datos || '',
                Logo: Logo || '',
                URL: URL || ''
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear fijo(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

