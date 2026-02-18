import mongoose, { Schema, Document } from 'mongoose';

export interface ISnapshot extends Document {
  Annio: number
  Mes: number
  Periodo: string
  PatrimonioNetoARS: number
  PatrimonioNetoUSD: number
  Liquidez: number
  Inversiones: number
  Deuda: number
  TasaDeCambio: number
}


const SnapshotSchema = new Schema<ISnapshot>({
  Annio: { type: Number, required: true },
  Mes: { type: Number, required: true },
  Periodo: { type: String, required: true },
  PatrimonioNetoARS: { type: Number, required: true },
  PatrimonioNetoUSD: { type: Number, required: true },
  Liquidez: { type: Number, required: true },
  Inversiones: { type: Number, required: true },
  Deuda: { type: Number, required: true },
  TasaDeCambio: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'snapshots'
});
SnapshotSchema.index({ Annio: 1, Mes: 1 }, { unique: true });

export default mongoose.models.Snapshot || mongoose.model<ISnapshot>('Snapshot', SnapshotSchema);
