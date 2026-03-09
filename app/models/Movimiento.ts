import mongoose, { Schema, Document } from 'mongoose';
import { TipoGasto, TipoMovimiento } from './Tipos';
import { DateTime } from 'luxon';


export interface IMovimiento extends Document {
  Concepto: string;
  Fecha: string;
  Monto: number;
  Tipo: TipoGasto;
  Codigo: TipoMovimiento;
  Donde: string;
  Metodo: string;
}

const MovimientoSchema = new Schema<IMovimiento>({
  Concepto: { type: String, required: true },
  Fecha: { type: String, required: false, default: DateTime.now().toFormat('yyyy-MM-dd') },
  Monto: { type: Number, required: true },
  Tipo: { type: Number, required: true, enum: Object.values(TipoGasto).filter((v): v is number => typeof v === 'number') },
  Codigo: { type: Number, required: true, enum: Object.values(TipoMovimiento).filter((v): v is number => typeof v === 'number') },
  Donde: { type: String, required: false, default: '' },
  Metodo: { type: String, required: false, default: '' },
}, {
  timestamps: true,
  collection: 'movimientos'
});








export default mongoose.models.Movimiento || mongoose.model<IMovimiento>('Movimiento', MovimientoSchema);
