import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export const dynamic = 'force-dynamic';

//List inversiones
export async function GET() {
    console.log("listar inversiones");
    try {
        const result = await prisma.inversion.findMany();
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

//Create inversion
export async function POST(req: Req) {
    console.log("crear nuevo inversion");
    try {
        const body = await req.json();
        const {
            nombre,
            periodo,
            cuotapartes,
            montoinicial,
            valoractual,
            valorinicial
        } = body;
        const result = await prisma.inversion.create({
            data: {
                nombre,
                periodo,
                cuotapartes,
                montoinicial,
                valoractual,
                valorinicial
            }
        });
        console.log(result);

        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

