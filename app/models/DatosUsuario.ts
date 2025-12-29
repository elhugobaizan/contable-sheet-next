import mongoose, { Schema, Document } from 'mongoose';

export interface IDatosUsuario extends Document {
  Campo: string;
  Valor: any;
}

const DatosUsuarioSchema = new Schema<IDatosUsuario>({
  Campo: { type: String, required: true, unique: true },
  Valor: { type: Schema.Types.Mixed, required: true, default: 0 },
}, {
  timestamps: false,
  collection: 'datosUsuario'
});

export default mongoose.models.DatosUsuario || mongoose.model<IDatosUsuario>('DatosUsuario', DatosUsuarioSchema);
