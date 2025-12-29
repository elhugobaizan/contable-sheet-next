import mongoose, { Schema, Document } from 'mongoose';
import { TipoMoneda } from './Tipos';

export interface IInversion extends Document {
  Nombre: string;
  Capital: number;
  Moneda: number;
}

const InversionSchema = new Schema<IInversion>({
  Nombre: { type: String, required: true, default: '' },
  Capital: { type: Number, required: true, default: 0 },
  Moneda: { type: Number, required: true, default: TipoMoneda.Peso },
}, {
  timestamps: false,
  collection: 'inversiones'
});

export default mongoose.models.Inversion || mongoose.model<IInversion>('Inversion', InversionSchema);
