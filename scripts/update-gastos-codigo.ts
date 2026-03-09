/**
 * Script temporal: actualiza todos los gastos para setear Codigo = 1
 * (campo relacionado con tipo de movimiento).
 * Ejecutar: npx tsx scripts/update-gastos-codigo.ts
 */
import './load-env';
import mongoose from 'mongoose';
import connectDB from '../db';
import Gasto from '../app/models/Movimiento';

const CODIGO = 1;

async function main() {
  await connectDB();

  const result = await Gasto.updateMany(
    {},
    { $set: { Codigo: CODIGO } }
  );

  console.log(`Actualizados ${result.modifiedCount} gastos con Codigo = ${CODIGO}`);
  console.log(`Total matched: ${result.matchedCount}`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
