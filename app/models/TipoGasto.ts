import mongoose, { Schema, Document } from 'mongoose';

export interface ITipoGasto extends Document {
  nombre: string;
}

const TipoGastoSchema = new Schema<ITipoGasto>({
  nombre: { type: String, required: true },
}, {
  timestamps: false,
  collection: 'tipo_gasto'
});

export default mongoose.models.TipoGasto || mongoose.model<ITipoGasto>('TipoGasto', TipoGastoSchema);
