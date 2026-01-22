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

import { GET, POST } from '@/app/criptos/route';
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

describe('Criptos API - Route /criptos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /criptos', () => {
    it('debe listar todos los criptos exitosamente', async () => {
      const mockCriptos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Nombre: 'Bitcoin',
          Cantidad: 0.5,
          Logo: 'bitcoin.png',
          Sigla: 'BTC',
          Hoy: 50000,
          Wallet: '507f1f77bcf86cd799439020',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Nombre: 'Ethereum',
          Cantidad: 2.0,
          Logo: 'ethereum.png',
          Sigla: 'ETH',
          Hoy: 3000,
          Wallet: '507f1f77bcf86cd799439021',
        },
      ];

      (mockCripto.find as jest.Mock).mockResolvedValue(mockCriptos);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriptos);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockCripto.find).toHaveBeenCalledWith({});
    });

    it('debe manejar errores al listar criptos', async () => {
      const errorMessage = 'Error de conexión';
      (mockCripto.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar criptos');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /criptos', () => {
    it('debe crear un cripto exitosamente', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      const createdCripto = {
        _id: '507f1f77bcf86cd799439013',
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: criptoData.Logo,
        Sigla: criptoData.Sigla,
        Hoy: criptoData.Hoy,
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

      const req = new NextRequest('http://localhost:3000/api/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdCripto);
      expect(mockCripto.create).toHaveBeenCalledWith({
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: criptoData.Logo,
        Sigla: criptoData.Sigla,
        Hoy: criptoData.Hoy,
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
        _id: `507f1f77bcf86cd79943901${i}`,
        Nombre: c.Nombre,
        Cantidad: c.Cantidad,
        Logo: c.Logo,
        Sigla: c.Sigla,
        Hoy: c.Hoy,
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

      const req = new NextRequest('http://localhost:3000/api/criptos', {
        method: 'POST',
        body: JSON.stringify(criptosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdCriptos);
      expect(mockCripto.insertMany).toHaveBeenCalled();
      expect(mockCripto.create).not.toHaveBeenCalled();
      
      expect(mockCripto.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Nombre: criptosData[0].Nombre,
            Cantidad: criptosData[0].Cantidad,
            Logo: criptosData[0].Logo,
            Sigla: criptosData[0].Sigla,
            Hoy: criptosData[0].Hoy,
          }),
          expect.objectContaining({
            Nombre: criptosData[1].Nombre,
            Cantidad: criptosData[1].Cantidad,
            Logo: criptosData[1].Logo,
            Sigla: criptosData[1].Sigla,
            Hoy: criptosData[1].Hoy,
          }),
        ])
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
      };

      const createdCripto = {
        _id: '507f1f77bcf86cd799439014',
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: '',
        Sigla: '',
        Hoy: 0,
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

      const req = new NextRequest('http://localhost:3000/api/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);

      expect(response.status).toBe(200);
      expect(mockCripto.create).toHaveBeenCalledWith({
        Nombre: criptoData.Nombre,
        Cantidad: criptoData.Cantidad,
        Logo: '',
        Sigla: '',
        Hoy: 0,
      });
    });

    it('debe crear la colección si no existe', async () => {
      const criptoData = {
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
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
      (mockCripto.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...criptoData,
      });

      const req = new NextRequest('http://localhost:3000/api/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('criptos');
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

      const req = new NextRequest('http://localhost:3000/api/criptos', {
        method: 'POST',
        body: JSON.stringify(criptoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear cripto(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});
