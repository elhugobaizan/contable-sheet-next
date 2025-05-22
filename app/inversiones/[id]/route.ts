import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer inversion");
    try {
        const id = (await params).id;
        const result = await prisma.inversion.findMany({ where: { id: +id } });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar inversion");
    try {
        const id = (await params).id;
        const body = await req.json();
        const {
            nombre,
            periodo,
            cuotapartes,
            montoinicial,
            valoractual,
            valorinicial
        } = body;
        const result = await prisma.inversion.update({
            where: { id: +id },
            data: {
                nombre,
                periodo,
                cuotapartes,
                montoinicial,
                valoractual,
                valorinicial
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar inversion");
    try {
        const id = (await params).id;
        const result = await prisma.inversion.delete({
            where: {
                id: +id
            }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}