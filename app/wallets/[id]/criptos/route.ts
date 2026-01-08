import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Cripto from '@/app/models/Cripto';

export const dynamic = 'force-dynamic';

//List criptos
export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;    
    console.log("listar criptos de la wallet ", id);
    try {
        if (!id) {
            return Res.json({ error: 'ID de wallet no proporcionado' }, { status: 400 });
        }
        await connectDB();
        const ObjectId = require('mongoose').Types.ObjectId;
        const result = await Cripto.find({ Wallet: new ObjectId(id) });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: `Error al listar criptos de la wallet ${id}`,
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create cripto(s)
export async function POST(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("crear nuevo cripto(s) para la wallet ", id);
    try {
        if (!id) {
            return Res.json({ error: 'ID de wallet no proporcionado' }, { status: 400 });
        }
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'criptos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'criptos'...");
                await db.createCollection('criptos');
                console.log("Colección 'criptos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples criptos
            const criptos = body.map((cripto: any) => ({
                Nombre: cripto.Nombre,
                Cantidad: cripto.Cantidad,
                Logo: cripto.Logo || '',
                Sigla: cripto.Sigla || '',
                Hoy: cripto.Hoy || 0,
                Wallet: id || ''
            }));
            
            const result = await Cripto.insertMany(criptos);
            return Res.json(result);
        } else {
            // Crear un solo cripto (comportamiento original)
            const { Nombre, Cantidad, Logo, Sigla, Hoy } = body;
            
            const result = await Cripto.create({
                Nombre: Nombre,
                Cantidad: Cantidad,
                Logo: Logo || '',
                Sigla: Sigla || '',
                Hoy: Hoy || 0,
                Wallet: id || ''
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear cripto(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

