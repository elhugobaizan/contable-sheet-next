import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List tipos de gasto
export async function GET() {
  console.log("listar tipos_gasto");
  try {
    const result = await prisma.tipo_gasto.findMany();
    return Res.json(result);
  } catch (err) {
    console.log("ERROR: ", err);
    return Res.json(err);
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