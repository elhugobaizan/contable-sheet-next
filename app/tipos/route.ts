import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import TipoGasto from '@/app/models/TipoGasto';

export const dynamic = 'force-dynamic';

//List tipos de gasto
export async function GET() {
  console.log("listar tipos_gasto");
  try {
    await connectDB();
    const result = await TipoGasto.find({});
    return Res.json(result);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

/* //Create fijo
export async function POST(req: Req) {
    console.log("crear nuevo fijo");
    try {
        const body = await req.json();
        const { nombre, capital, periodo, url, logo, nroCliente } = body;
        const result = await prisma.fijo.create({
            data: {
                name: nombre,
                capital,
                period: periodo,
                logo,
                url,
                client: nroCliente
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

 */