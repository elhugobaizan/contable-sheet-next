import mongoose, { Schema, Document } from 'mongoose';

export interface IGasto extends Document {
  amount: number;
  date: Date;
  detail: string;
  type: number;
}

const GastoSchema = new Schema<IGasto>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  detail: { type: String, required: true },
  type: { type: Number, required: true },
}, {
  timestamps: false,
  collection: 'gastos'
});

export default mongoose.models.Gasto || mongoose.model<IGasto>('Gasto', GastoSchema);
