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

import { GET, POST } from '@/app/fijos/route';
import { NextRequest } from 'next/server';
import Fijo from '@/app/models/Fijo';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Fijo', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockFijo = Fijo as jest.Mocked<typeof Fijo>;

describe('Fijos API - Route /fijos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /fijos', () => {
    it('debe listar todas las fijos exitosamente', async () => {
      const mockFijos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Detalle: 'Fijo 1',
          Vencimiento: '2024-01-01T00:00:00.000Z',
          Deuda: 0,
          Datos: '',
          Logo: '',
          URL: '',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Detalle: 'Fijo 2',
          Vencimiento: '2024-01-02T00:00:00.000Z',
          Deuda: 5,
          Datos: '',
          Logo: 'logo.png',
          URL: 'https://www.fijo2.com',
        },
      ];

      (mockFijo.find as jest.Mock).mockResolvedValue(mockFijos);

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockFijos);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockFijo.find).toHaveBeenCalledWith({});
    });

    it('debe manejar errores al listar fijos', async () => {
      const errorMessage = 'Error de conexión';
      (mockFijo.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar fijos');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /fijos', () => {
    it('debe crear un fijo exitosamente', async () => {
      const fijoData = {
        Detalle: 'Nuevo Fijo',
        Vencimiento: '2024-01-01',
        Deuda: 0,
        Datos: '',
        Logo: 'new-logo.png',
        URL: 'https://www.fijo.com',
      };

      const createdFijo = {
        _id: '507f1f77bcf86cd799439013',
        ...fijoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'fijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockFijo.create as jest.Mock).mockResolvedValue(createdFijo);

      const req = new NextRequest('http://localhost:3000/api/fijos', {
        method: 'POST',
        body: JSON.stringify(fijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdFijo);
      expect(mockFijo.create).toHaveBeenCalledWith({
        Detalle: fijoData.Detalle,
        Vencimiento: fijoData.Vencimiento,
        Deuda: fijoData.Deuda,
        Datos: fijoData.Datos,
        Logo: fijoData.Logo,
        URL: fijoData.URL,
      });
    });

    it('debe crear múltiples fijos cuando se envía un array', async () => {
      const fijosData = [
        {
          Detalle: 'Fijo 1',
          Vencimiento: '2024-01-01',
          Deuda: 0,
          Datos: '',
          Logo: '',
          URL: '',
        },
        {
          Detalle: 'Fijo 2',
          Vencimiento: '2024-01-02',
          Deuda: 5,
          Datos: '',
          Logo: '',
          URL: '',
        },
      ];

      const createdFijos = fijosData.map((f, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Detalle: f.Detalle,
        Vencimiento: new Date(f.Vencimiento).toISOString(),
        Deuda: f.Deuda,
        Datos: f.Datos,
        Logo: f.Logo,
        URL: f.URL,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'fijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockFijo.insertMany as jest.Mock).mockResolvedValue(createdFijos);

      const req = new NextRequest('http://localhost:3000/api/fijos', {
        method: 'POST',
        body: JSON.stringify(fijosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdFijos);
      expect(mockFijo.insertMany).toHaveBeenCalled();
      expect(mockFijo.create).not.toHaveBeenCalled();
      
      // Verificar que insertMany recibe Vencimiento como string (yyyy-MM-dd)
      expect(mockFijo.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Detalle: fijosData[0].Detalle,
            Vencimiento: fijosData[0].Vencimiento,
          }),
          expect.objectContaining({
            Detalle: fijosData[1].Detalle,
            Vencimiento: fijosData[1].Vencimiento,
          }),
        ])
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const fijoData = {
        Detalle: 'Fijo Simple',
        Vencimiento: '2024-01-01',
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const createdFijo = {
        _id: '507f1f77bcf86cd799439014',
        ...fijoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'fijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockFijo.create as jest.Mock).mockResolvedValue(createdFijo);

      const req = new NextRequest('http://localhost:3000/api/fijos', {
        method: 'POST',
        body: JSON.stringify(fijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);

      expect(response.status).toBe(200);
      expect(mockFijo.create).toHaveBeenCalledWith({
        ...fijoData,
        Vencimiento: fijoData.Vencimiento,
      });
    });

    it('debe crear la colección si no existe', async () => {
      const fijoData = {
        Detalle: 'Fijo Nueva',
        Vencimiento: '2024-01-01',
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
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
      (mockFijo.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...fijoData,
        Vencimiento: '2024-01-01T00:00:00.000Z',
      });

      const req = new NextRequest('http://localhost:3000/api/fijos', {
        method: 'POST',
        body: JSON.stringify(fijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('fijos');
    });

    it('debe manejar errores al crear fijo', async () => {
      const fijoData = {
        Detalle: 'Fijo Error',
        Vencimiento: '2024-01-01',
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'fijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockFijo.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/fijos', {
        method: 'POST',
        body: JSON.stringify(fijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear fijo(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});

