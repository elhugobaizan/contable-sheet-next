import { NextRequest as Req, NextResponse as Res } from "next/server";
import { generateWalletId } from "../controllers/utils";
import { sheetName, wallet } from "../controllers/wallet";

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("listar wallets");
    try {
        const result = await wallet.read();
        //Parsear el JSON a objetos
        return result;
    } catch (err) {
        console.log("ERROR: ", err);
        return err;
    }
}

//Create wallet
export async function POST(req: Req) {
    console.log("crear nuevo wallet");
    try {
        const body = await req.json();
        const { id, nombre, capital, periodo, tna, logo } = body;
        
        // Generar ID automáticamente si no se proporciona
        const walletId = id ?? await generateWalletId(sheetName);

        // Crear wallet en Google Sheets usando la estructura del controlador
        const result = await wallet.create(walletId, {
            nombre,
            capital,
            periodo,
            tna,
            logo
        });

        return result;
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ 
            error: 'Error al crear wallet',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

