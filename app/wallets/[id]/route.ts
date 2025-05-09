import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer wallet");
    try {
        const id = (await params).id;
        const result = await prisma.wallet.findMany({ where: { id: +id } });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar wallet");
    try {
        const id = (await params).id;
        const body = await req.json();
        const { nombre, capital, periodo, tna, logo } = body;
        const result = await prisma.wallet.update({
            where: { id: +id },
            data: { name: nombre, capital, period: periodo, tna, logo }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar wallet");
    try {
        const id = (await params).id;
        const result = await prisma.wallet.delete({
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