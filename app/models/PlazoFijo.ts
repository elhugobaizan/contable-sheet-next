import mongoose, { Schema, Document } from 'mongoose';
import { DateTime } from 'luxon';

export interface IPlazoFijo extends Document {
  Nombre:string,
  Periodo:string,
  Vencimiento:string,
  Capital: number,
  TNA: number,
  Banco: mongoose.Types.ObjectId
}

const PlazoFijoSchema = new Schema<IPlazoFijo>({
  Nombre: { type: String, required: false, default: '' },
  Periodo: { type: String, required: false, default: DateTime.now().toFormat('yyyy-MM-dd') },
  Vencimiento: { type: String, required: false, default: DateTime.now().toFormat('yyyy-MM-dd') },
  Capital: { type: Number, required: true },
  TNA: { type: Number, required: true},
  Banco: { type: mongoose.Types.ObjectId, required: true},
}, {
  timestamps: false,
  collection: 'plazosfijos'
});

export default mongoose.models.PlazoFijo || mongoose.model<IPlazoFijo>('PlazoFijo', PlazoFijoSchema);
