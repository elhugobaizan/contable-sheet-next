import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import PlazoFijo from '@/app/models/PlazoFijo';

export const dynamic = 'force-dynamic';

//List wallets
export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("listar plazos fijos del banco ", id);
    try {
        if (!id) {
            return Res.json({ error: 'ID de banco no proporcionado' }, { status: 400 });
        }
        await connectDB();
        const ObjectId = require('mongoose').Types.ObjectId;
        const result = await PlazoFijo.find({ Banco: new ObjectId(id) });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: `Error al listar plazos fijos del banco ${id}`,
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create plazo fijo
export async function POST(req: Req, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("crear nuevo plazo fijo para el banco ", id);
    try {
        if (!id) {
            return Res.json({ error: 'ID de banco no proporcionado' }, { status: 400 });
        }
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
                Vencimiento: new Date(fijo.Vencimiento),
                Capital: fijo.Capital || 0,
                TNA: fijo.TNA || '',
                Banco: id || ''
            }));
            
            const result = await PlazoFijo.insertMany(fijos);
            return Res.json(result);
        } else {        
            // Crear un solo plazo fijo (comportamiento original)
            const { Nombre, Periodo, Vencimiento, Capital, TNA } = body;
            
            const result = await PlazoFijo.create({
                Nombre: Nombre,
                Periodo: new Date(Periodo),
                Vencimiento: new Date(Vencimiento),
                Capital: Capital,
                TNA: TNA,
                Banco: id
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

