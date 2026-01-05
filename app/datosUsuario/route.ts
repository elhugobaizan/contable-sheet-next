import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import DatosUsuario from '@/app/models/DatosUsuario';

export const dynamic = 'force-dynamic';

//List datosUsuario
export async function GET(req: Req) {
    console.log("listar datos Usuario");
    try {
        await connectDB();
        
        // Obtener el parámetro de consulta "Campo" si existe
        const { searchParams } = new URL(req.url);
        const campo = searchParams.get('Campo');
        
        // Si se proporciona Campo, filtrar por ese campo; si no, devolver todos
        const query = campo ? { Campo: campo } : {};
        const result = await DatosUsuario.find(query);
        
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al listar datos Usuario',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create dato(s) Usuario
export async function POST(req: Req) {
    console.log("crear nuevo dato(s) Usuario");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'datosUsuario' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'datos Usuario'...");
                await db.createCollection('datosUsuario');
                console.log("Colección 'datos Usuario' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples datos de Usuario
            const datosUsuario = body.map((datosUsuario: any) => ({
                Campo: datosUsuario.Campo,
                Valor: datosUsuario.Valor
            }));
            
            const result = await DatosUsuario.insertMany(datosUsuario);
            return Res.json(result);
        } else {
            // Crear un solo dato de Usuario (comportamiento original)
            const { Campo, Valor } = body;
            
            const result = await DatosUsuario.create({
                Campo: Campo,
                Valor: Valor
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear dato(s) Usuario',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

