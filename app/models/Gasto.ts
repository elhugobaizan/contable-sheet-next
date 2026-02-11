import mongoose, { Schema, Document } from 'mongoose';
import { TipoGasto } from './Tipos';
import { DateTime } from 'luxon';

export interface IGasto extends Document {
  Concepto: string;
  Fecha: string;
  Monto: number;
  Tipo: number;
  Donde: string;
  Metodo?: mongoose.Types.ObjectId;
}

const GastoSchema = new Schema<IGasto>({
  Concepto: { type: String, required: true },
  Fecha: { type: String, required: false, default: DateTime.now().toFormat('yyyy-MM-dd') },
  Monto: { type: Number, required: true },
  Tipo: { type: Number, required: false, default: TipoGasto.Varios },
  Donde: { type: String, required: false, default: '' },
  Metodo: { type: Schema.Types.ObjectId, ref: 'Wallet', required: false },
}, {
  timestamps: true,
  collection: 'gastos'
});

export default mongoose.models.Gasto || mongoose.model<IGasto>('Gasto', GastoSchema);
