import mongoose, { Schema, Document } from 'mongoose';

export interface IFijo extends Document {
  Detalle: string;
  Vencimiento: string;
  Deuda: number;
  Datos: string;
  Logo: string;
  URL: string;
}

const FijoSchema = new Schema<IFijo>({
  Detalle: { type: String, required: true },
  Vencimiento: { type: String, required: false, default: '' },
  Deuda: { type: Number, required: false, default: 0 },
  Datos: { type: String, required: false, default: '' },
  Logo: { type: String, required: false, default: '' },
  URL: { type: String, required: false, default: '' },
}, {
  timestamps: false,
  collection: 'fijos'
});

export default mongoose.models.Fijo || mongoose.model<IFijo>('Fijo', FijoSchema);
