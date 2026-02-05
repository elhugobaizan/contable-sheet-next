import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Wallet from '@/app/models/Wallet';

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("listar wallets");
    try {
        await connectDB();
        const result = await Wallet.aggregate([
            {
                $lookup: {
                    from: 'criptos',
                    as: 'criptos',
                    localField: '_id',
                    foreignField: 'Wallet',
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
            error: 'Error al listar wallets',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

//Create wallet(s)
export async function POST(req: Req) {
    console.log("crear nuevo wallet(s)");
    try {
        const mongooseConnection = await connectDB();
        
        // Verificar si la colección existe, si no, crearla
        const db = mongooseConnection.connection.db;
        if (db) {
            const collections = await db.listCollections({ name: 'wallets' }).toArray();
            if (collections.length === 0) {
                console.log("Creando colección 'wallets'...");
                await db.createCollection('wallets');
                console.log("Colección 'wallets' creada exitosamente");
            }
        }
        
        const body = await req.json();
        
        // Verificar si es un array
        if (Array.isArray(body)) {
            // Crear múltiples wallets
            const wallets = body.map((wallet: any) => ({
                Nombre: wallet.Nombre,
                Inicio: new Date(wallet.Inicio),
                Interes: wallet.Interes || 0,
                Efectivo: wallet.Efectivo || 0,
                Logo: wallet.Logo || '',
                CVU: wallet.CVU || '',
                Alias: wallet.Alias || '',
                EsMetodo: wallet.EsMetodo || false
            }));
            
            const result = await Wallet.insertMany(wallets);
            return Res.json(result);
        } else {
            // Crear un solo wallet (comportamiento original)
            const { Nombre, Inicio, Interes, Efectivo, Logo, CVU, Alias, EsMetodo } = body;
            
            const result = await Wallet.create({
                Nombre: Nombre,
                Inicio: new Date(Inicio),
                Interes: Interes || 0,
                Efectivo: Efectivo || 0,
                Logo: Logo || '',
                CVU: CVU || '',
                Alias: Alias || '',
                EsMetodo: EsMetodo || false
            });

            return Res.json(result);
        }
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear wallet(s)',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

