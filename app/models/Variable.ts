import mongoose, { Schema, Document } from 'mongoose';

export interface IVariable extends Document {
  nombre: string;
  valor: number;
}

const VariableSchema = new Schema<IVariable>({
  nombre: { type: String, required: true, unique: true },
  valor: { type: Number, required: true, default: 0 },
}, {
  timestamps: false,
  collection: 'variables'
});

export default mongoose.models.Variable || mongoose.model<IVariable>('Variable', VariableSchema);
