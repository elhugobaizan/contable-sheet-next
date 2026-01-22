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

import { GET, POST } from '@/app/wallets/[id]/criptos/route';
import { NextRequest } from 'next/server';
import Cripto from '@/app/models/Cripto';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Cripto', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockCripto = Cripto as jest.Mocked<typeof Cripto>;

describe('Wallets API - Route /wallets/[id]/criptos', () => {
  const mockWalletId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /wallets/[id]/criptos', () => {
    it('debe listar los criptos de la wallet exitosamente', async () => {
      const mockCriptos = [
        {
          _id: '507f1f77bcf86cd799439020',
          Nombre: 'Bitcoin',
          Cantidad: 0.5,
          Logo: 'bitcoin.png',
          Sigla: 'BTC',
          Hoy: 50000,
          Wallet: mockWalletId,
        },
        {
          _id: '507f1f77bcf86cd799439021',
          Nombre: 'Ethereum',
          Cantidad: 2.0,
          Logo: 'ethereum.png',
          Sigla: 'ETH',
          Hoy: 3000,
          Wallet: mockWalletId,
        },
      ];

      (mockCripto.find as jest.Mock).mockResolvedValue(mockCriptos);

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123/criptos'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriptos);
      expect(mockCripto.find).toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el ID de wallet no es proporcionado', async () => {
      const params = Promise.resolve({ id: '' });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/criptos'), { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de wallet no proporcionado');
    });

    it('debe manejar errores al listar criptos', async () => {
      const errorMessage = 'Error de conexión';
      (mockCripto.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123/criptos'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(`Error al listar criptos de la wallet ${mockWalletId}`);
    });
  });

  describe('POST /wallets/[id]/criptos', () => {
    it('debe crear un cripto para la wallet exitosamente', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      const createdCripto = {
        _id: '507f1f77bcf86cd799439022',
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: criptoData.Logo,
        Sigla: criptoData.Sigla,
        Hoy: criptoData.Hoy,
        Wallet: mockWalletId,
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'criptos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockCripto.create as jest.Mock).mockResolvedValue(createdCripto);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdCripto);
      expect(mockCripto.create).toHaveBeenCalledWith({
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: criptoData.Logo,
        Sigla: criptoData.Sigla,
        Hoy: criptoData.Hoy,
        Wallet: mockWalletId,
      });
    });

    it('debe crear múltiples criptos cuando se envía un array', async () => {
      const criptosData = [
        {
          Nombre: 'Bitcoin',
          Cantidad: 0.5,
          Logo: 'bitcoin.png',
          Sigla: 'BTC',
          Hoy: 50000,
        },
        {
          Nombre: 'Ethereum',
          Cantidad: 2.0,
          Logo: 'ethereum.png',
          Sigla: 'ETH',
          Hoy: 3000,
        },
      ];

      const createdCriptos = criptosData.map((c, i) => ({
        _id: `507f1f77bcf86cd79943902${i}`,
        Nombre: c.Nombre,
        Cantidad: c.Cantidad,
        Logo: c.Logo,
        Sigla: c.Sigla,
        Hoy: c.Hoy,
        Wallet: mockWalletId,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'criptos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockCripto.insertMany as jest.Mock).mockResolvedValue(createdCriptos);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/criptos', {
        method: 'POST',
        body: JSON.stringify(criptosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdCriptos);
      expect(mockCripto.insertMany).toHaveBeenCalled();
      expect(mockCripto.create).not.toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el ID de wallet no es proporcionado', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      const params = Promise.resolve({ id: '' });
      const req = new NextRequest('http://localhost:3000/api/wallets/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de wallet no proporcionado');
    });

    it('debe manejar errores al crear cripto', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'criptos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockCripto.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear cripto(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});
