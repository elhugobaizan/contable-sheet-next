import { readGoogleSheet, parseSheetData, writeGoogleSheet, appendGoogleSheet } from '@/app/gsheetController';
import { getCredentials, findRowIndexById, validateSheetNotEmpty, validateIdColumn, validateRowFound } from "./utils";
import { NextResponse as Res } from "next/server";

export const dynamic = 'force-dynamic';

/**
 * Prepara los valores de la fila mapeando los datos del request a las columnas de la hoja
 */
function prepareRowValues(headers: string[], existingRow: any[] | null, id: string | number, walletData: { nombre?: string; capital?: number; periodo?: string | Date; tna?: number; logo?: string }): any[] {
    const values: any[] = [];
    headers.forEach((header: string, index: number) => {
        const headerLower = header.toLowerCase();
        const existingValue = existingRow ? (existingRow[index] ?? '') : '';
        
        if (headerLower === 'id' || headerLower === '_id') {
            values[index] = id;
        } else if (headerLower === 'name' || headerLower === 'nombre') {
            values[index] = walletData.nombre ?? existingValue;
        } else if (headerLower === 'capital') {
            values[index] = walletData.capital ?? existingValue ?? 0;
        } else if (headerLower === 'period' || headerLower === 'periodo') {
            const periodValue = walletData.periodo ?? existingValue;
            values[index] = periodValue instanceof Date 
                ? periodValue.toISOString().split('T')[0] 
                : periodValue;
        } else if (headerLower === 'tna') {
            values[index] = walletData.tna ?? existingValue ?? 0;
        } else if (headerLower === 'logo') {
            values[index] = walletData.logo ?? existingValue;
        } else {
            values[index] = existingValue;
        }
    });
    return values;
}
export const sheetName = 'Wallet';

/**
 * Objeto para manejar operaciones relacionadas con wallets
 */
export const wallet = {

    /**
     * Lee datos de la hoja de cálculo de la wallet
     */
    async read(): Promise<Res> {
        console.log("Leer tabla de wallets");
        try {
            // Leer credenciales desde credentials.json
            const credentials = getCredentials();
            const { range, parse } = credentials;

            // Leer los datos de la hoja
            const rows = await readGoogleSheet(sheetName, range);

            // Si se solicita parsear, convertir a objetos
            if (parse && rows.length > 0) {
                const parsedData = parseSheetData(rows, true);
                return Res.json({
                    sheetName,
                    totalRows: parsedData.length,
                    data: parsedData
                });
            }

            // Devolver datos en formato raw (array de arrays)
            return Res.json({
                sheetName,
                totalRows: rows.length,
                data: rows
            });

        } catch (err: any) {
            console.log("ERROR: ", err);
            return Res.json(
                { 
                    error: 'Error al leer Google Sheet',
                    message: err.message || String(err)
                },
                { status: 500 }
            );
        }
    },

    /**
     * Escribe o actualiza un wallet individual por ID en la hoja de cálculo
     * @param id - ID del wallet a actualizar
     * @param walletData - Datos del wallet a escribir (nombre, capital, periodo, tna, logo)
     */
    async write(id: string | number, walletData: { nombre?: string; capital?: number; periodo?: string | Date; tna?: number; logo?: string }): Promise<Res> {
        console.log(`Escribir wallet con ID: ${id}`);
        try {

            // Leer los datos actuales de la hoja para encontrar la fila
            const rows = await readGoogleSheet(sheetName);
            
            // Validar que la hoja no esté vacía
            const emptySheetError = validateSheetNotEmpty(rows);
            if (emptySheetError) {
                return emptySheetError;
            }

            // Parsear los datos para encontrar el índice de la columna ID
            const headers = rows[0];
            const idColumnValidation = validateIdColumn(headers);
            if (idColumnValidation instanceof Res) {
                return idColumnValidation;
            }
            const { idColumnIndex } = idColumnValidation;

            // Buscar la fila que corresponde al ID
            const rowIndex = findRowIndexById(rows, idColumnIndex, id);
            const rowNotFoundError = validateRowFound(rowIndex, id);
            if (rowNotFoundError) {
                return rowNotFoundError;
            }

            // Preparar los valores a escribir
            const values = prepareRowValues(headers, rows[rowIndex - 1], id, walletData);

            // Escribir en la hoja
            await writeGoogleSheet(sheetName, rowIndex, values);

            return Res.json({
                success: true,
                message: `Wallet con ID ${id} actualizado correctamente`,
                rowIndex,
                data: values
            });

        } catch (err: any) {
            console.log("ERROR: ", err);
            return Res.json(
                { 
                    error: 'Error al escribir en Google Sheet',
                    message: err.message || String(err)
                },
                { status: 500 }
            );
        }
    },

    /**
     * Crea un nuevo wallet en la hoja de cálculo
     * @param id - ID del wallet a crear
     * @param walletData - Datos del wallet a crear (nombre, capital, periodo, tna, logo)
     */
    async create(id: string | number, walletData: { nombre?: string; capital?: number; periodo?: string | Date; tna?: number; logo?: string }): Promise<Res> {
        console.log(`Crear wallet con ID: ${id}`);
        try {
            // Leer los datos actuales de la hoja para obtener los headers
            const rows = await readGoogleSheet(sheetName);
            
            // Si la hoja está vacía, no podemos crear sin headers
            if (rows.length === 0) {
                return Res.json(
                    { error: 'La hoja está vacía y no tiene headers' },
                    { status: 400 }
                );
            }

            // Obtener los headers
            const headers = rows[0];

            // Preparar los valores para la nueva fila
            const values = prepareRowValues(headers, null, id, walletData);

            // Agregar la nueva fila al final de la hoja
            await appendGoogleSheet(sheetName, values);

            return Res.json({
                success: true,
                message: `Wallet con ID ${id} creado correctamente`,
                data: values
            });

        } catch (err: any) {
            console.log("ERROR: ", err);
            return Res.json(
                { 
                    error: 'Error al crear wallet en Google Sheet',
                    message: err.message || String(err)
                },
                { status: 500 }
            );
        }
    }
};