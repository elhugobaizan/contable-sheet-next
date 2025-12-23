import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Wallet from '@/app/models/Wallet';

export const dynamic = 'force-dynamic';

//Intereses wallets
export async function GET() {
    console.log("total intereses wallets");
    try {
        await connectDB();
        const result = await Wallet.find({});
        const intereses = result && result.map(wallet => calculateDiario(wallet) * 30);
        return Res.json(intereses ? intereses.reduce((suma, interes) => suma + interes, 0) : 0);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

function calculateDiario(selectedEnte: any) {
    return (selectedEnte.capital * ((selectedEnte.tna / 365) * 1) / 100);
}
