import { google } from 'googleapis';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Lee las credenciales desde el archivo credentials.json
 */
function getCredentials() {
  try {
    const credentialsPath = path.join(process.cwd(), 'credentials.json');
    let credentialsContent = fs.readFileSync(credentialsPath, 'utf8');
    
    // Eliminar BOM (Byte Order Mark) si existe - UTF-8 BOM es \uFEFF
    credentialsContent = credentialsContent.replace(/^\uFEFF/, '');
    
    // También eliminar cualquier espacio en blanco al inicio y final
    credentialsContent = credentialsContent.trim();
    
    return JSON.parse(credentialsContent);
  } catch (error) {
    throw new Error('Error al leer credentials.json: ' + error);
  }
}

/**
 * Lee datos de una página específica de Google Sheets
 * @param spreadsheetId - ID de la hoja de cálculo (de la URL)
 * @param sheetName - Nombre de la pestaña/página específica a leer
 * @param range - Rango opcional (ej: "A1:D10"). Si no se especifica, lee toda la hoja
 * @returns Array de arrays con los datos de la hoja
 */
export async function readGoogleSheet(
  sheetName: string,
  range?: string,
  spreadsheetId?: string,
): Promise<any[][]> {
  try {
    // Leer credenciales desde credentials.json
    const credentials = getCredentials();
    const apiKey = credentials.apiKey;
    const defaultSpreadsheetId = credentials.spreadsheetId;
    
    // Usar el spreadsheetId proporcionado o el del archivo de credenciales
    const finalSpreadsheetId = spreadsheetId || defaultSpreadsheetId;
    
    const sheets = google.sheets({auth: apiKey, version: 'v4' });

    // Construir el rango: "NombreHoja!A1:Z1000" o solo "NombreHoja"
    const rangeToRead = range ? `${sheetName}!${range}` : sheetName;

    const response = await sheets?.spreadsheets.values.get({
      spreadsheetId: finalSpreadsheetId,
      range: rangeToRead,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('No se encontraron datos en la hoja.');
      return [];
    }

    return rows;
  } catch (error: any) {
    console.error('Error al leer Google Sheet:', error);
    throw new Error(`Error al leer la hoja de cálculo: ${error.message}`);
  }
}

/**
 * Obtiene información sobre todas las hojas/páginas del spreadsheet
 * @param spreadsheetId - ID de la hoja de cálculo
 * @returns Array con los nombres de todas las hojas
 */
export async function getSheetNames(spreadsheetId?: string): Promise<string[]> {
  try {
    // Leer credenciales desde credentials.json
    const credentials = getCredentials();
    const apiKey = credentials.apiKey;
    const defaultSpreadsheetId = credentials.spreadsheetId;
    
    // Usar el spreadsheetId proporcionado o el del archivo de credenciales
    const finalSpreadsheetId = spreadsheetId || defaultSpreadsheetId;
    
    const sheets = google.sheets({ version: 'v4', key: apiKey });

    const response = await sheets.spreadsheets.get({
      spreadsheetId: finalSpreadsheetId,
    });

    const sheetNames = response.data.sheets?.map(sheet => sheet.properties?.title || '') || [];
    return sheetNames.filter(name => name !== '');
  } catch (error: any) {
    console.error('Error al obtener nombres de hojas:', error);
    throw new Error(`Error al obtener información del spreadsheet: ${error.message}`);
  }
}

/**
 * Convierte los datos de la hoja en un formato más útil (objetos con headers)
 * @param rows - Array de arrays con los datos
 * @param hasHeaders - Si la primera fila contiene headers (default: true)
 * @returns Array de objetos con los datos
 */
export function parseSheetData(rows: any[][], hasHeaders: boolean = true): any[] {
  if (rows.length === 0) return [];

  if (!hasHeaders) {
    // Si no hay headers, devolver arrays simples
    return rows;
  }

  const headers = rows[0];
  const data = rows.slice(1);

  return data.map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
}

/**
 * Escribe o actualiza datos en una hoja de Google Sheets
 * @param sheetName - Nombre de la pestaña/página específica
 * @param rowIndex - Índice de la fila a actualizar (1-based, incluyendo header)
 * @param values - Array de valores a escribir en la fila
 * @param spreadsheetId - ID opcional de la hoja de cálculo
 * @returns Respuesta de la API de Google Sheets
 */
export async function writeGoogleSheet(
  sheetName: string,
  rowIndex: number,
  values: any[],
  spreadsheetId?: string,
): Promise<any> {
  try {
    // Leer credenciales desde credentials.json
    const credentials = getCredentials();
    const apiKey = credentials.apiKey;
    const defaultSpreadsheetId = credentials.spreadsheetId;
    
    // Usar el spreadsheetId proporcionado o el del archivo de credenciales
    const finalSpreadsheetId = spreadsheetId || defaultSpreadsheetId;
    
    const sheets = google.sheets({ auth: apiKey, version: 'v4' });

    // Construir el rango: "NombreHoja!A2:Z2" (asumiendo que rowIndex es 1-based)
    const range = `${sheetName}!A${rowIndex}`;

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: finalSpreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error al escribir en Google Sheet:', error);
    throw new Error(`Error al escribir en la hoja de cálculo: ${error.message}`);
  }
}

/**
 * Agrega una nueva fila al final de una hoja de Google Sheets
 * @param sheetName - Nombre de la pestaña/página específica
 * @param values - Array de valores a agregar en la fila
 * @param spreadsheetId - ID opcional de la hoja de cálculo
 * @returns Respuesta de la API de Google Sheets
 */
export async function appendGoogleSheet(
  sheetName: string,
  values: any[],
  spreadsheetId?: string,
): Promise<any> {
  try {
    // Leer credenciales desde credentials.json
    const credentials = getCredentials();
    const apiKey = credentials.apiKey;
    const defaultSpreadsheetId = credentials.spreadsheetId;
    
    // Usar el spreadsheetId proporcionado o el del archivo de credenciales
    const finalSpreadsheetId = spreadsheetId || defaultSpreadsheetId;
    
    const sheets = google.sheets({ auth: apiKey, version: 'v4' });

    // Construir el rango: "NombreHoja" para agregar al final
    const range = sheetName;

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: finalSpreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [values],
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error al agregar fila en Google Sheet:', error);
    throw new Error(`Error al agregar fila en la hoja de cálculo: ${error.message}`);
  }
}
