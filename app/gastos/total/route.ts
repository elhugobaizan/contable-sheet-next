import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Gasto from '@/app/models/Gasto';

export const dynamic = 'force-dynamic';

//Total gastos
export async function GET() {
    console.log("total gastos");
    try {
        await connectDB();
        const result = await Gasto.aggregate([
            {
                $group: {
                    _id: null,
                    _sum: {
                        amount: { $sum: '$amount' }
                    }
                }
            }
        ]);
        return Res.json(result[0] || { _sum: { amount: 0 } });
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}
