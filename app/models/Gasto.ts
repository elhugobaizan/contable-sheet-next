import mongoose, { Schema, Document } from 'mongoose';
import { TipoGasto } from './Tipos';

export interface IGasto extends Document {
  Concepto: string;
  Fecha: Date;
  Monto: number;
  Tipo: number;
  Donde: string;
}

const GastoSchema = new Schema<IGasto>({
  Concepto: { type: String, required: true },
  Fecha: { type: Date, required: false, default: new Date() },
  Monto: { type: Number, required: true },
  Tipo: { type: Number, required: false, default: TipoGasto.Varios },
  Donde: { type: String, required: false, default: '' }
}, {
  timestamps: false,
  collection: 'gastos'
});

export default mongoose.models.Gasto || mongoose.model<IGasto>('Gasto', GastoSchema);
