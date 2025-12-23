import mongoose, { Schema, Document } from 'mongoose';

export interface IBanco extends Document {
  capital: number;
  duedate: Date;
  logo: string;
  name: string;
  period: Date;
  tna: number;
}

const BancoSchema = new Schema<IBanco>({
  capital: { type: Number, required: true },
  duedate: { type: Date, required: true },
  logo: { type: String, required: true },
  name: { type: String, required: true },
  period: { type: Date, required: true },
  tna: { type: Number, required: true },
}, {
  timestamps: false,
  collection: 'bancos'
});

export default mongoose.models.Banco || mongoose.model<IBanco>('Banco', BancoSchema);
