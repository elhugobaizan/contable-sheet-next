import { NextRequest as Req, NextResponse as Res } from "next/server";
import { prisma } from '@/db';
import { banco } from "@/app/generated/prisma";
import { Interval, DateTime } from 'luxon';

export const dynamic = 'force-dynamic';

//List wallets
export async function GET() {
    console.log("total bancos");
    try {
        const result = await prisma.banco.findMany();
        const intereses = result && result.map(banco => calculateMensual(banco));
        return Res.json(intereses ? intereses.reduce((suma, banco) => suma + banco, 0) : 0);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json(err);
    }
}

function calculateMensual(selectedBanco: banco) {
    return (selectedBanco.capital * ((selectedBanco.tna / 365) * Interval.fromDateTimes(DateTime.fromJSDate(selectedBanco.period!), DateTime.fromJSDate(selectedBanco.duedate)).length('days')) / 100);
}
