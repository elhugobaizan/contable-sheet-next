import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer gasto");
    try {
        const id = (await params).id;
        const result = await prisma.gasto.findMany({ where: { id: +id } });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar gasto");
    try {
        const id = (await params).id;
        const body = await req.json();
        const { detalle, monto, fecha, tipo } = body;
        const result = await prisma.gasto.update({
            where: { id: +id },
            data: { detail: detalle, amount: monto, date: fecha, type: tipo }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar gasto");
    try {
        const id = (await params).id;
        const result = await prisma.gasto.delete({
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