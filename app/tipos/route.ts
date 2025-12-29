import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import TipoGasto from '@/app/models/Tipos';

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