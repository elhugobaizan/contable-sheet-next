import * as fs from 'node:fs';
import * as path from 'node:path';
import { NextResponse as Res } from "next/server";
import { readGoogleSheet } from '../gsheetController';

interface Credentials {
  spreadsheetId: string;
  range: undefined;
  parse: string;
}

/**
 * Lee las credenciales desde el archivo credentials.json
 */
export function getCredentials(): Credentials {
  try {
    const credentialsPath = path.join(process.cwd(), 'credentials.json');
    let credentialsContent = fs.readFileSync(credentialsPath, 'utf8');
    
    // Eliminar BOM (Byte Order Mark) si existe - UTF-8 BOM es \uFEFF
    credentialsContent = credentialsContent.replace(/^\uFEFF/, '');
    
    // También eliminar cualquier espacio en blanco al inicio y final
    credentialsContent = credentialsContent.trim();

    // Leer credenciales desde credentials.json
    const credentials = JSON.parse(credentialsContent);
    const spreadsheetId = credentials.spreadsheetId;
    const range = undefined;
    const parse = 'true';
    
    // Validar parámetros obligatorios
    if (!spreadsheetId) {
        throw new Error('Faltan parámetros requeridos: Se requiere spreadsheetId');
    }

    return { spreadsheetId, range, parse };
  } catch (error) {
    throw new Error('Error al leer credentials.json: ' + error);
  }
}

/**
 * Encuentra el índice de la fila que corresponde al ID dado
 * @param rows - Array de filas de la hoja
 * @param idColumnIndex - Índice de la columna que contiene el ID
 * @param id - ID a buscar
 * @returns Índice de la fila (1-based) o -1 si no se encuentra
 */
export function findRowIndexById(rows: any[][], idColumnIndex: number, id: string | number): number {
    for (let i = 1; i < rows.length; i++) {
        const rowId = rows[i][idColumnIndex];
        if (rowId && (String(rowId) === String(id) || Number(rowId) === Number(id))) {
            return i + 1; // +1 porque las filas en Google Sheets son 1-based
        }
    }
    return -1;
}

/**
 * Valida que la hoja no esté vacía
 * @param rows - Array de filas de la hoja
 * @returns Respuesta de error si está vacía, null si es válida
 */
export function validateSheetNotEmpty(rows: any[][]): Res | null {
    if (rows.length === 0) {
        return Res.json(
            { error: 'La hoja está vacía' },
            { status: 404 }
        );
    }
    return null;
}

/**
 * Valida que exista la columna ID en los headers
 * @param headers - Array de headers de la hoja
 * @returns Índice de la columna ID o respuesta de error si no se encuentra
 */
export function validateIdColumn(headers: string[]): { idColumnIndex: number } | Res {
    const idColumnIndex = headers.findIndex((header: string) => 
        header.toLowerCase() === 'id' || header.toLowerCase() === '_id'
    );

    if (idColumnIndex === -1) {
        return Res.json(
            { error: 'No se encontró la columna ID en la hoja' },
            { status: 400 }
        );
    }

    return { idColumnIndex };
}

/**
 * Valida que se encuentre una fila con el ID especificado
 * @param rowIndex - Índice de la fila encontrada (-1 si no se encontró)
 * @param id - ID buscado
 * @returns Respuesta de error si no se encuentra, null si es válida
 */
export function validateRowFound(rowIndex: number, id: string | number): Res | null {
    if (rowIndex === -1) {
        return Res.json(
            { error: `No se encontró un wallet con ID: ${id}` },
            { status: 404 }
        );
    }
    return null;
}

/**
 * Genera un ID automáticamente basado en los IDs existentes en la hoja
 */
export async function generateWalletId(sheetName: string): Promise<number> {
    const rows = await readGoogleSheet(sheetName);
    
    if (rows.length === 0) {
        return 1; // Primer wallet
    }

    const headers = rows[0];
    const idColumnValidation = validateIdColumn(headers);
    
    if (idColumnValidation instanceof Res) {
        return Date.now(); // Fallback a timestamp si no hay columna ID
    }

    const { idColumnIndex } = idColumnValidation;
    // Encontrar el máximo ID existente
    let maxId = 0;
    for (let i = 1; i < rows.length; i++) {
        const rowId = rows[i][idColumnIndex];
        if (rowId) {
            const numId = Number(rowId);
            if (!Number.isNaN(numId) && numId > maxId) {
                maxId = numId;
            }
        }
    }
    return maxId + 1;
}