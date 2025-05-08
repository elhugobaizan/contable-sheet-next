import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer banco");
    try {
        const id = (await params).id;
        const result = await prisma.banco.findMany({ where: { id: +id } });
        return Res.json(result);
    } catch (err) {
        return Res.json({ message: err });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar banco");
    try {
        const id = (await params).id;
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo, vencimiento } = body;
        console.log("body", body);

        const result = await prisma.banco.update({
            where: { id: +id },
            data: { name: nombre, capital, period: periodo, tna, logo, duedate: vencimiento }
        });
        return Res.json(result);
    } catch (err) {
        return Res.json({ message: err });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar banco");
    try {
        const id = (await params).id;
        const result = await prisma.banco.delete({
            where: {
                id: +id
            }
        });
        return Res.json(result);
    } catch (err) {
        return Res.json({ message: err });
    }
}