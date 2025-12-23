import mongoose, { Schema, Document } from 'mongoose';

export interface IInversion extends Document {
  nombre: string;
  periodo: Date;
  valorinicial: number;
  valoractual: number;
  cuotapartes: number;
  montoinicial: number;
}

const InversionSchema = new Schema<IInversion>({
  nombre: { type: String, required: true, default: '' },
  periodo: { type: Date, required: true },
  valorinicial: { type: Number, required: true, default: 0 },
  valoractual: { type: Number, required: true, default: 0 },
  cuotapartes: { type: Number, required: true, default: 0 },
  montoinicial: { type: Number, required: true, default: 0 },
}, {
  timestamps: false,
  collection: 'inversiones'
});

export default mongoose.models.Inversion || mongoose.model<IInversion>('Inversion', InversionSchema);
