import { GET, POST } from '@/app/bancos/route';
import { NextRequest } from 'next/server';
import Banco from '@/app/models/Banco';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Banco');

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockBanco = Banco as jest.Mocked<typeof Banco>;

describe('Bancos API - Route /bancos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /bancos', () => {
    it('debe listar todas las bancos exitosamente', async () => {
      const mockBancos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Nombre: 'Banco 1',
          Vencimiento: '2024-01-01T00:00:00.000Z',
          Alias: 'Banco 1',
          Efectivo: 0,
          URL: '',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Nombre: 'Banco 2',
          Vencimiento: '2024-01-02T00:00:00.000Z',
          Alias: 'Banco 2',
          Efectivo: 5,
          URL: 'https://www.banco2.com',
        },
      ];

      (mockBanco.find as jest.Mock).mockResolvedValue(mockBancos);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockBancos);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockBanco.find).toHaveBeenCalledWith({});
    });

    it('debe manejar errores al listar bancos', async () => {
      const errorMessage = 'Error de conexión';
      (mockBanco.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar bancos');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /bancos', () => {
    it('debe crear un banco exitosamente', async () => {
      const bancoData = {
        Nombre: 'Nuevo Banco',
        CBU: '1234567890',
        Alias: 'Nuevo Banco',
        Logo: 'new-logo.png',
        Efectivo: 0,
      };

      const createdBanco = {
        _id: '507f1f77bcf86cd799439013',
        ...bancoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'bancos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockBanco.create as jest.Mock).mockResolvedValue(createdBanco);

      const req = new NextRequest('http://localhost:3000/api/bancos', {
        method: 'POST',
        body: JSON.stringify(bancoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdBanco);
      expect(mockBanco.create).toHaveBeenCalledWith({
        Nombre: bancoData.Nombre,
        CBU: bancoData.CBU,
        Alias: bancoData.Alias,
        Logo: bancoData.Logo,
        Efectivo: bancoData.Efectivo,
      });
    });

    it('debe crear múltiples bancos cuando se envía un array', async () => {
      const bancosData = [
        {
          Nombre: 'Banco 1',
          CBU: '1234567890',
          Efectivo: 0,
          Alias: '',
          Logo: '',
        },
        {
          Nombre: 'Banco 2',
          CBU: '1234567890',
          Efectivo: 5,
          Alias: '',
          Logo: '',
        },
      ];

      const createdBancos = bancosData.map((b, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Nombre: b.Nombre,
        CBU: b.CBU,
        Efectivo: b.Efectivo,
        Alias: b.Alias,
        Logo: b.Logo,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'bancos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockBanco.insertMany as jest.Mock).mockResolvedValue(createdBancos);

      const req = new NextRequest('http://localhost:3000/api/bancos', {
        method: 'POST',
        body: JSON.stringify(bancosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdBancos);
      expect(mockBanco.insertMany).toHaveBeenCalled();
      expect(mockBanco.create).not.toHaveBeenCalled();
      
      // Verificar que insertMany recibe objetos String
      expect(mockBanco.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Nombre: bancosData[0].Nombre,
            CBU: expect.any(String),
            Efectivo: expect.any(Number),
            Alias: expect.any(String),
            Logo: expect.any(String),
          }),
          expect.objectContaining({
            Nombre: bancosData[1].Nombre,
            CBU: expect.any(String),
            Efectivo: expect.any(Number),
            Alias: expect.any(String),
            Logo: expect.any(String),
          }),
        ])
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const bancoData = {
        Nombre: 'Banco Simple',
        CBU: '1234567890',
        Efectivo: 0,
        Alias: '',
        Logo: '',
      };

      const createdBanco = {
        _id: '507f1f77bcf86cd799439014',
        ...bancoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'bancos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockBanco.create as jest.Mock).mockResolvedValue(createdBanco);

      const req = new NextRequest('http://localhost:3000/api/bancos', {
        method: 'POST',
        body: JSON.stringify(bancoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);

      expect(response.status).toBe(200);
      expect(mockBanco.create).toHaveBeenCalledWith({
        ...bancoData,
      });
    });

    it('debe crear la colección si no existe', async () => {
      const bancoData = {
        Nombre: 'Banco Nueva',
        CBU: '1234567890',
        Efectivo: 0,
        Alias: '',
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
      (mockBanco.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...bancoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      });

      const req = new NextRequest('http://localhost:3000/api/bancos', {
        method: 'POST',
        body: JSON.stringify(bancoData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('bancos');
    });

    it('debe manejar errores al crear banco', async () => {
      const bancoData = {
        Nombre: 'Banco Error',
        CBU: '1234567890',
        Efectivo: 0,
        Alias: '',
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'bancos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockBanco.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/bancos', {
        method: 'POST',
        body: JSON.stringify(bancoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear banco(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});

