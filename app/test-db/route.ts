import { NextRequest as Req, NextResponse as Res } from "next/server";
import connectDB from '@/db';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

// Test MongoDB connection
export async function GET() {
    console.log("Probando conexión a MongoDB...");
    try {
        const connection = await connectDB();
        
        // Obtener información del estado de la conexión
        const state = mongoose.connection.readyState;
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        const dbName = mongoose.connection.db?.databaseName;
        const host = mongoose.connection.host;
        const port = mongoose.connection.port;

        return Res.json({
            success: true,
            message: 'Conexión a MongoDB exitosa',
            connection: {
                state: states[state as keyof typeof states] || 'unknown',
                stateCode: state,
                database: dbName,
                host: host,
                port: port
            }
        });
    } catch (err) {
        console.log("ERROR en conexión MongoDB: ", err);
        return Res.json({
            success: false,
            error: 'Error al conectar con MongoDB',
            message: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}

