import mongoose, { Schema, Document } from 'mongoose';

export interface IFijo extends Document {
  capital: number;
  client: string;
  logo: string;
  name: string;
  period?: Date;
  url: string;
}

const FijoSchema = new Schema<IFijo>({
  capital: { type: Number, required: true, default: 0 },
  client: { type: String, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  period: { type: Date, required: false },
  url: { type: String, required: true },
}, {
  timestamps: false,
  collection: 'fijos'
});

export default mongoose.models.Fijo || mongoose.model<IFijo>('Fijo', FijoSchema);
