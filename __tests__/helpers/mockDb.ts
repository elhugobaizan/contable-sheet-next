import mongoose from 'mongoose';

// Mock de la conexión a la base de datos
export const mockConnectDB = jest.fn().mockResolvedValue(mongoose);

// Mock del modelo Wallet
export const createMockWallet = (overrides = {}) => ({
  _id: new mongoose.Types.ObjectId(),
  Nombre: 'Test Wallet',
  Inicio: new Date('2024-01-01'),
  Interes: 0,
  Efectivo: 1000,
  Logo: '',
  CVU: '',
  Alias: '',
  ...overrides,
  toJSON: jest.fn().mockReturnThis(),
  save: jest.fn().mockResolvedValue(this),
});

export const mockWalletModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
  insertMany: jest.fn(),
};

