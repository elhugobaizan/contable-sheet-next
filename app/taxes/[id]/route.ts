import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';

export async function GET(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Leer fijo");
    try {
        const id = (await params).id;
        const result = await prisma.fijo.findMany({ where: { id: +id } });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function PUT(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("Actualizar fijo");
    try {
        const id = (await params).id;
        const body = await req.json();
        const { nombre, capital, periodo, url, logo, nroCliente } = body;
        console.log("body", body);

        const result = await prisma.fijo.update({
            where: { id: +id },
            data: { name: nombre, capital, period: periodo, logo, url, client: nroCliente }
        });
        return Res.json(result);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ message: err });
    }
}

export async function DELETE(req: Req, { params }: { params: Promise<{ id: string }> }) {
    console.log("borrar fijo");
    try {
        const id = (await params).id;
        const result = await prisma.fijo.delete({
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