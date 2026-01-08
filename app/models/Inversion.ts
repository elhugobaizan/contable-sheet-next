import mongoose, { Schema, Document } from 'mongoose';
import { TipoMoneda } from './Tipos';

export interface IInversion extends Document {
  Nombre: string;
  Capital: number;
  Moneda: number;
  Ente: mongoose.Types.ObjectId;
}

const InversionSchema = new Schema<IInversion>({
  Nombre: { type: String, required: true, default: '' },
  Capital: { type: Number, required: true, default: 0 },
  Moneda: { type: Number, required: true, default: TipoMoneda.Peso },
  Ente: { type: mongoose.Types.ObjectId, required: true },
}, {
  timestamps: false,
  collection: 'inversiones'
});

export default mongoose.models.Inversion || mongoose.model<IInversion>('Inversion', InversionSchema);
