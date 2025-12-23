import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Banco from '@/app/models/Banco';

export const dynamic = 'force-dynamic';

//Total bancos
export async function GET() {
    console.log("total bancos");
    try {
        await connectDB();
        const result = await Banco.aggregate([
            {
                $group: {
                    _id: null,
                    _sum: {
                        capital: { $sum: '$capital' }
                    }
                }
            }
        ]);
        return Res.json(result[0] || { _sum: { capital: 0 } });
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}
