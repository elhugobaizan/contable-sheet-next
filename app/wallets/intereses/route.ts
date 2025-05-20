import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';
import { banco, wallet } from "@/app/generated/prisma";
import { Interval, DateTime } from 'luxon';

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("total intereses wallets");
    try {
        const result = await prisma.wallet.findMany();
        const intereses = result && result.map(wallet => calculateDiario(wallet) * 30);
        return Res.json(intereses ? intereses.reduce((suma, banco) => suma + banco, 0) : 0);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

function calculateDiario(selectedEnte: wallet) {
    return (selectedEnte.capital * ((selectedEnte.tna / 365) * 1) / 100);
}
