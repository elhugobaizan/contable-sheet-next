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

import { GET, POST } from '@/app/wallets/[id]/inversiones/route';
import { NextRequest } from 'next/server';
import Inversion from '@/app/models/Inversion';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Inversion', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockInversion = Inversion as jest.Mocked<typeof Inversion>;

describe('Wallets API - Route /wallets/[id]/inversiones', () => {
  const mockWalletId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /wallets/[id]/inversiones', () => {
    it('debe listar las inversiones de la wallet exitosamente', async () => {
      const mockInversiones = [
        {
          _id: '507f1f77bcf86cd799439020',
          Nombre: 'Inversion 1',
          Capital: 10000,
          Moneda: 1,
          Ente: mockWalletId,
        },
        {
          _id: '507f1f77bcf86cd799439021',
          Nombre: 'Inversion 2',
          Capital: 20000,
          Moneda: 2,
          Ente: mockWalletId,
        },
      ];

      (mockInversion.find as jest.Mock).mockResolvedValue(mockInversiones);

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123/inversiones'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockInversiones);
      expect(mockInversion.find).toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el ID de wallet no es proporcionado', async () => {
      const params = Promise.resolve({ id: '' });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/inversiones'), { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de wallet no proporcionado');
    });

    it('debe manejar errores al listar inversiones', async () => {
      const errorMessage = 'Error de conexión';
      (mockInversion.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123/inversiones'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(`Error al listar inversiones de la wallet ${mockWalletId}`);
    });
  });

  describe('POST /wallets/[id]/inversiones', () => {
    it('debe crear una inversión para la wallet exitosamente', async () => {
      const inversionData = {
        Nombre: 'Nueva Inversion',
        Capital: 15000,
        Moneda: 1,
      };

      const createdInversion = {
        _id: '507f1f77bcf86cd799439022',
        Nombre: inversionData.Nombre,
        Capital: inversionData.Capital,
        Moneda: inversionData.Moneda,
        Ente: mockWalletId,
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'inversiones' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockInversion.create as jest.Mock).mockResolvedValue(createdInversion);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/inversiones', {
        method: 'POST',
        body: JSON.stringify(inversionData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdInversion);
      expect(mockInversion.create).toHaveBeenCalledWith({
        Nombre: inversionData.Nombre,
        Capital: inversionData.Capital,
        Moneda: inversionData.Moneda,
        Ente: mockWalletId,
      });
    });

    it('debe crear múltiples inversiones cuando se envía un array', async () => {
      const inversionesData = [
        {
          Nombre: 'Inversion 1',
          Capital: 10000,
          Moneda: 1,
        },
        {
          Nombre: 'Inversion 2',
          Capital: 20000,
          Moneda: 2,
        },
      ];

      const createdInversiones = inversionesData.map((inv, i) => ({
        _id: `507f1f77bcf86cd79943902${i}`,
        Nombre: inv.Nombre,
        Capital: inv.Capital,
        Moneda: inv.Moneda,
        Ente: mockWalletId,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'inversiones' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockInversion.insertMany as jest.Mock).mockResolvedValue(createdInversiones);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/inversiones', {
        method: 'POST',
        body: JSON.stringify(inversionesData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdInversiones);
      expect(mockInversion.insertMany).toHaveBeenCalled();
      expect(mockInversion.create).not.toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el ID de wallet no es proporcionado', async () => {
      const inversionData = {
        Nombre: 'Nueva Inversion',
        Capital: 15000,
        Moneda: 1,
      };

      const params = Promise.resolve({ id: '' });
      const req = new NextRequest('http://localhost:3000/api/wallets/inversiones', {
        method: 'POST',
        body: JSON.stringify(inversionData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de wallet no proporcionado');
    });

    it('debe manejar errores al crear inversión', async () => {
      const inversionData = {
        Nombre: 'Inversion Error',
        Capital: 5000,
        Moneda: 1,
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'inversiones' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockInversion.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/inversiones', {
        method: 'POST',
        body: JSON.stringify(inversionData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(`Error al crear inversion(es) para la wallet ${mockWalletId}`);
      expect(data.message).toBe(errorMessage);
    });
  });
});
