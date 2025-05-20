import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("total wallets");
    try {
        const result = await prisma.wallet.aggregate({
            _sum: {
                capital: true
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}
