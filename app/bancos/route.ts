import Banco from '@/app/models/Banco';
import connectDB from '@/db';
import { NextRequest as Req, NextResponse as Res } from "next/server";

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("listar bancos");
    try {
        await connectDB();
        const result = await Banco.aggregate([
            {
                $lookup: {
                    from: 'plazosfijos',
                    as: 'plazosfijos',
                    localField: '_id',
                    foreignField: 'Banco',
                }
            },
            {
                $lookup: {
                    from: 'inversiones',
                    as: 'inversiones',
                    localField: '_id',
                    foreignField: 'Ente',
                }
            }
        ]);
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al listar bancos',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create banco(s)
export async function POST(req: Req) {
    console.log("crear nuevo banco(s)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'bancos' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'bancos'...");
                await db.createCollection('bancos');
                console.log("Colección 'bancos' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples bancos
                const bancos = body.map((banco: any) => ({
                Nombre: banco.Nombre,
                CBU: banco.CBU,
                Alias: banco.Alias,
                Logo: banco.Logo || '',
                Efectivo: banco.Efectivo || 0,
                EsMetodo: banco.EsMetodo || false
            }));
            
            const result = await Banco.insertMany(bancos);
            return Res.json(result);
        } else {
            // Crear un solo banco (comportamiento original)
            const { Nombre, CBU, Alias, Logo, Efectivo, EsMetodo } = body;
            
            const result = await Banco.create({
                Nombre: Nombre,
                CBU: CBU,
                Alias: Alias || '',
                Logo: Logo || '',
                Efectivo: Efectivo || 0,
                EsMetodo: EsMetodo || false
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear banco(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

