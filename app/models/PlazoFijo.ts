import mongoose, { Schema, Document } from 'mongoose';

export interface IPlazoFijo extends Document {
  Nombre:string,
  Periodo:Date,
  Vencimiento:Date,
  Capital: number,
  TNA: number,
  Banco: number
}

const PlazoFijoSchema = new Schema<IPlazoFijo>({
  Nombre: { type: String, required: false, default: '' },
  Periodo: { type: Date, required: false, default: new Date() },
  Vencimiento: { type: Date, required: false, default: new Date() },
  Capital: { type: Number, required: true },
  TNA: { type: Number, required: true},
  Banco: { type: Number, required: true},
}, {
  timestamps: false,
  collection: 'plazosfijos'
});

export default mongoose.models.PlazoFijo || mongoose.model<IPlazoFijo>('PlazoFijo', PlazoFijoSchema);
