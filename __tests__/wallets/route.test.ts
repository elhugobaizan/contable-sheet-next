// Mock de mongoose antes de importar cualquier cosa que lo use
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    Schema: jest.fn().mockImplementation(() => ({
      index: jest.fn(),
      pre: jest.fn(),
      post: jest.fn(),
      methods: {},
      statics: {},
      virtuals: {},
      paths: {},
    })),
    model: jest.fn(),
    Types: {
      ObjectId: jest.fn((id) => ({ toString: () => id || 'mockId' })),
    },
  };
});

import { GET, POST } from '@/app/wallets/route';
import { NextRequest } from 'next/server';
import Wallet from '@/app/models/Wallet';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Wallet', () => ({
  __esModule: true,
  default: {
    aggregate: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockWallet = Wallet as jest.Mocked<typeof Wallet>;

describe('Wallets API - Route /wallets', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /wallets', () => {
    it('debe listar todas las wallets exitosamente', async () => {
      const mockWallets = [
        {
          _id: '507f1f77bcf86cd799439011',
          Nombre: 'Wallet 1',
          Inicio: '2024-01-01T00:00:00.000Z',
          Interes: 0,
          Efectivo: 1000,
          Logo: '',
          CVU: '',
          Alias: '',
          criptos: [],
          inversiones: [],
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Nombre: 'Wallet 2',
          Inicio: '2024-01-02T00:00:00.000Z',
          Interes: 5,
          Efectivo: 2000,
          Logo: 'logo.png',
          CVU: '123456789',
          Alias: 'wallet2',
          criptos: [],
          inversiones: [],
        },
      ];

      (mockWallet.aggregate as jest.Mock).mockResolvedValue(mockWallets);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockWallets);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockWallet.aggregate).toHaveBeenCalled();
    });

    it('debe manejar errores al listar wallets', async () => {
      const errorMessage = 'Error de conexión';
      (mockWallet.aggregate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar wallets');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /wallets', () => {
    it('debe crear un wallet exitosamente', async () => {
      const walletData = {
        Nombre: 'Nueva Wallet',
        Inicio: '2024-01-01',
        Interes: 3,
        Efectivo: 1500,
        Logo: 'new-logo.png',
        CVU: '987654321',
        Alias: 'nueva-wallet',
      };

      const createdWallet = {
        _id: '507f1f77bcf86cd799439013',
        ...walletData,
        Inicio: '2024-01-01T00:00:00.000Z',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'wallets' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockWallet.create as jest.Mock).mockResolvedValue(createdWallet);

      const req = new NextRequest('http://localhost:3000/api/wallets', {
        method: 'POST',
        body: JSON.stringify(walletData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdWallet);
      expect(mockWallet.create).toHaveBeenCalledWith({
        Nombre: walletData.Nombre,
        Inicio: new Date(walletData.Inicio),
        Interes: walletData.Interes,
        Efectivo: walletData.Efectivo,
        Logo: walletData.Logo,
        CVU: walletData.CVU,
        Alias: walletData.Alias,
      });
    });

    it('debe crear múltiples wallets cuando se envía un array', async () => {
      const walletsData = [
        {
          Nombre: 'Wallet 1',
          Inicio: '2024-01-01',
          Interes: 0,
          Efectivo: 1000,
        },
        {
          Nombre: 'Wallet 2',
          Inicio: '2024-01-02',
          Interes: 5,
          Efectivo: 2000,
        },
      ];

      const createdWallets = walletsData.map((w, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Nombre: w.Nombre,
        Inicio: new Date(w.Inicio).toISOString(),
        Interes: w.Interes,
        Efectivo: w.Efectivo,
        Logo: '',
        CVU: '',
        Alias: '',
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'wallets' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockWallet.insertMany as jest.Mock).mockResolvedValue(createdWallets);

      const req = new NextRequest('http://localhost:3000/api/wallets', {
        method: 'POST',
        body: JSON.stringify(walletsData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdWallets);
      expect(mockWallet.insertMany).toHaveBeenCalled();
      expect(mockWallet.create).not.toHaveBeenCalled();
      
      // Verificar que insertMany recibe objetos Date
      expect(mockWallet.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Nombre: walletsData[0].Nombre,
            Inicio: expect.any(Date),
          }),
          expect.objectContaining({
            Nombre: walletsData[1].Nombre,
            Inicio: expect.any(Date),
          }),
        ])
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const walletData = {
        Nombre: 'Wallet Simple',
        Inicio: '2024-01-01',
      };

      const createdWallet = {
        _id: '507f1f77bcf86cd799439014',
        Nombre: walletData.Nombre,
        Inicio: '2024-01-01T00:00:00.000Z',
        Interes: 0,
        Efectivo: 0,
        Logo: '',
        CVU: '',
        Alias: '',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'wallets' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockWallet.create as jest.Mock).mockResolvedValue(createdWallet);

      const req = new NextRequest('http://localhost:3000/api/wallets', {
        method: 'POST',
        body: JSON.stringify(walletData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);

      expect(response.status).toBe(200);
      expect(mockWallet.create).toHaveBeenCalledWith({
        Nombre: walletData.Nombre,
        Inicio: new Date(walletData.Inicio),
        Interes: 0,
        Efectivo: 0,
        Logo: '',
        CVU: '',
        Alias: '',
      });
    });

    it('debe crear la colección si no existe', async () => {
      const walletData = {
        Nombre: 'Wallet Nueva',
        Inicio: '2024-01-01',
      };

      const mockDb = {
        listCollections: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([]),
        }),
        createCollection: jest.fn().mockResolvedValue(undefined),
      };

      const mockConnection = {
        connection: {
          db: mockDb,
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockWallet.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...walletData,
        Inicio: '2024-01-01T00:00:00.000Z',
        Interes: 0,
        Efectivo: 0,
        Logo: '',
        CVU: '',
        Alias: '',
      });

      const req = new NextRequest('http://localhost:3000/api/wallets', {
        method: 'POST',
        body: JSON.stringify(walletData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('wallets');
    });

    it('debe manejar errores al crear wallet', async () => {
      const walletData = {
        Nombre: 'Wallet Error',
        Inicio: '2024-01-01',
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'wallets' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockWallet.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/wallets', {
        method: 'POST',
        body: JSON.stringify(walletData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear wallet(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});

