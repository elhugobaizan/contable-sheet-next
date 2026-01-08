import mongoose, { Schema, Document } from 'mongoose';

export interface ICripto extends Document {
  Nombre: string,
  Cantidad: number,
  Logo: string,
  Sigla: string;
  Hoy: number;
  Wallet: mongoose.Types.ObjectId;
}

const CriptoSchema = new Schema<ICripto>({
  Nombre: { type: String, required: true },
  Cantidad: { type: Number, required: true },
  Logo: { type: String, required: false, default: '' },
  Sigla: { type: String, required: false, default: '' },
  Hoy: { type: Number, required: true },
  Wallet: { type: mongoose.Types.ObjectId, required: true },
}, {
  timestamps: false,
  collection: 'criptos'
});

export default mongoose.models.Cripto || mongoose.model<ICripto>('Cripto', CriptoSchema);
