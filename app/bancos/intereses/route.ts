import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import Banco from '@/app/models/Banco';
import { Interval, DateTime } from 'luxon';

export const dynamic = 'force-dynamic';

//Intereses bancos
export async function GET() {
    console.log("intereses bancos");
    try {
        await connectDB();
        const result = await Banco.find({});
        const intereses = result && result.map(banco => calculateMensual(banco));
        return Res.json(intereses ? intereses.reduce((suma, banco) => suma + banco, 0) : 0);
    } catch (err) {
        console.log("ERROR: ", err);
        return Res.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }
}

function calculateMensual(selectedBanco: any) {
    if (!selectedBanco.period || !selectedBanco.duedate) {
        return 0;
    }
    const periodDate = selectedBanco.period instanceof Date ? selectedBanco.period : new Date(selectedBanco.period);
    const duedateDate = selectedBanco.duedate instanceof Date ? selectedBanco.duedate : new Date(selectedBanco.duedate);
    return (selectedBanco.capital * ((selectedBanco.tna / 365) * Interval.fromDateTimes(DateTime.fromJSDate(periodDate), DateTime.fromJSDate(duedateDate)).length('days')) / 100);
}
