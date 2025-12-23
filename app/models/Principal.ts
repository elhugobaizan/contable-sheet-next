import mongoose, { Schema, Document } from 'mongoose';

export interface IPrincipal extends Document {
  available: number;
  expenses: number;
  inbanks: number;
  indebt: number;
  investments: number;
  max: number;
  monthly: number;
  nextmonth: number;
}

const PrincipalSchema = new Schema<IPrincipal>({
  available: { type: Number, required: true, default: 0 },
  expenses: { type: Number, required: true, default: 0 },
  inbanks: { type: Number, required: true, default: 0 },
  indebt: { type: Number, required: true, default: 0 },
  investments: { type: Number, required: true, default: 0 },
  max: { type: Number, required: true, default: 0 },
  monthly: { type: Number, required: true, default: 0 },
  nextmonth: { type: Number, required: true, default: 0 },
}, {
  timestamps: false,
  collection: 'principal'
});

export default mongoose.models.Principal || mongoose.model<IPrincipal>('Principal', PrincipalSchema);
