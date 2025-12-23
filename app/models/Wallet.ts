import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  Nombre: string;
  Inicio: Date;
  Interes: number;
  Efectivo: number;
  Logo: string;
  CVU: string;
  Alias: string;
}

const WalletSchema = new Schema<IWallet>({
  Nombre: { type: String, required: true },
  Inicio: { type: Date, required: true },
  Interes: { type: Number, required: false, default: 0 },
  Efectivo: { type: Number, required: false, default: 0 },
  Logo: { type: String, required: false, default: '' },
  CVU: { type: String, required: false, default: '' },
  Alias: { type: String, required: false, default: '' },
}, {
  timestamps: false,
  collection: 'wallets'
});

export default mongoose.models.Wallet || mongoose.model<IWallet>('Wallet', WalletSchema);
