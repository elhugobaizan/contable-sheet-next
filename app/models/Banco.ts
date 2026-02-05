import mongoose, { Schema, Document } from 'mongoose';

export interface IBanco extends Document {
  Nombre  :string,
  CBU:string,
  Alias:string,
  Logo: string;
  Efectivo: number,
  EsMetodo: boolean
}

const BancoSchema = new Schema<IBanco>({
  Nombre: { type: String, required: true },
  CBU: { type: String, required: true },
  Alias: { type: String, required: false, default: '' },
  Logo: { type: String, required: false, default: '' },
  Efectivo: { type: Number, required: false, default: 0 },
  EsMetodo: { type: Boolean, required: false, default: false },
}, {
  timestamps: false,
  collection: 'bancos'
});

export default mongoose.models.Banco || mongoose.model<IBanco>('Banco', BancoSchema);
