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

import { GET, POST } from '@/app/bancos/[id]/plazosfijos/route';
import { NextRequest } from 'next/server';
import PlazoFijo from '@/app/models/PlazoFijo';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/PlazoFijo', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockPlazoFijo = PlazoFijo as jest.Mocked<typeof PlazoFijo>;

describe('Plazos Fijos API - Route /bancos/[id]/plazosfijos', () => {
  const mockBancoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /bancos/[id]/plazosfijos', () => {
    it('debe listar todos los plazos fijos del banco exitosamente', async () => {
      const mockPlazosFijos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Nombre: 'Plazo Fijo 1',
          Periodo: new Date('2024-01-01'),
          Vencimiento: '2024-12-31',
          Capital: 100000,
          TNA: 35,
          Banco: mockBancoId,
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Nombre: 'Plazo Fijo 2',
          Periodo: new Date('2024-02-01'),
          Vencimiento: '2025-01-31',
          Capital: 200000,
          TNA: 30,
          Banco: mockBancoId,
        },
      ];

      (mockPlazoFijo.find as jest.Mock).mockResolvedValue(mockPlazosFijos);

      const params = Promise.resolve({ id: mockBancoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serialization converts Date to string
      expect(data).toEqual(mockPlazosFijos.map(p => ({
        ...p,
        Periodo: p.Periodo.toISOString(),
      })));
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockPlazoFijo.find).toHaveBeenCalled();
    });

    it('debe retornar 400 cuando no se proporciona ID de banco', async () => {
      const params = Promise.resolve({ id: '' });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos'), { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de banco no proporcionado');
      expect(mockPlazoFijo.find).not.toHaveBeenCalled();
    });

    it('debe manejar errores al listar plazos fijos', async () => {
      const errorMessage = 'Error de conexión';
      (mockPlazoFijo.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(`Error al listar plazos fijos del banco ${mockBancoId}`);
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /bancos/[id]/plazosfijos', () => {
    it('debe crear un plazo fijo exitosamente', async () => {
      const plazoFijoData = {
        Nombre: 'Nuevo Plazo Fijo',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
      };

      const createdPlazoFijo = {
        _id: '507f1f77bcf86cd799439013',
        Nombre: plazoFijoData.Nombre,
        Periodo: new Date(plazoFijoData.Periodo),
        Vencimiento: '2024-12-31',
        Capital: plazoFijoData.Capital,
        TNA: plazoFijoData.TNA,
        Banco: mockBancoId,
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'plazosfijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockPlazoFijo.create as jest.Mock).mockResolvedValue(createdPlazoFijo);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serialization converts Date to string
      expect(data).toEqual({
        ...createdPlazoFijo,
        Periodo: createdPlazoFijo.Periodo.toISOString(),
      });
      expect(mockPlazoFijo.create).toHaveBeenCalledWith({
        Nombre: plazoFijoData.Nombre,
        Periodo: new Date(plazoFijoData.Periodo),
        Vencimiento: '2024-12-31',
        Capital: plazoFijoData.Capital,
        TNA: plazoFijoData.TNA,
        Banco: mockBancoId,
      });
    });

    it('debe crear múltiples plazos fijos cuando se envía un array', async () => {
      const plazosFijosData = [
        {
          Nombre: 'Plazo Fijo 1',
          Periodo: '2024-01-01',
          Vencimiento: '2024-12-31',
          Capital: 100000,
          TNA: 35,
        },
        {
          Nombre: 'Plazo Fijo 2',
          Periodo: '2024-02-01',
          Vencimiento: '2025-01-31',
          Capital: 200000,
          TNA: 30,
        },
      ];

      const createdPlazosFijos = plazosFijosData.map((p, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Nombre: p.Nombre,
        Periodo: new Date(p.Periodo),
        Vencimiento: p.Vencimiento,
        Capital: p.Capital,
        TNA: p.TNA,
        Banco: mockBancoId,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'plazosfijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockPlazoFijo.insertMany as jest.Mock).mockResolvedValue(createdPlazosFijos);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazosFijosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serialization converts Date to string
      expect(data).toEqual(createdPlazosFijos.map(p => ({
        ...p,
        Periodo: p.Periodo.toISOString(),
      })));
      expect(mockPlazoFijo.insertMany).toHaveBeenCalled();
      expect(mockPlazoFijo.create).not.toHaveBeenCalled();
      
      // Verificar que insertMany recibe Vencimiento como string
      expect(mockPlazoFijo.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Nombre: plazosFijosData[0].Nombre,
            Vencimiento: '2024-12-31',
            Periodo: expect.any(Date),
          }),
          expect.objectContaining({
            Nombre: plazosFijosData[1].Nombre,
            Vencimiento: '2025-01-31',
            Periodo: expect.any(Date),
          }),
        ])
      );
    });

    it('debe convertir Vencimiento a formato yyyy-MM-dd cuando viene como ISO string', async () => {
      // Usar una fecha que no tenga problemas de zona horaria
      const plazoFijoData = {
        Nombre: 'Plazo Fijo Test',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
      };

      const createdPlazoFijo = {
        _id: '507f1f77bcf86cd799439014',
        ...plazoFijoData,
        Vencimiento: '2024-12-31',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'plazosfijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockPlazoFijo.create as jest.Mock).mockResolvedValue(createdPlazoFijo);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });

      expect(response.status).toBe(200);
      expect(mockPlazoFijo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          Vencimiento: '2024-12-31',
        })
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const plazoFijoData = {
        Nombre: '',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 0,
        TNA: 0,
      };

      const createdPlazoFijo = {
        _id: '507f1f77bcf86cd799439015',
        ...plazoFijoData,
        Vencimiento: '2024-12-31',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'plazosfijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockPlazoFijo.create as jest.Mock).mockResolvedValue(createdPlazoFijo);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });

      expect(response.status).toBe(200);
      expect(mockPlazoFijo.create).toHaveBeenCalled();
    });

    it('debe crear la colección si no existe', async () => {
      const plazoFijoData = {
        Nombre: 'Plazo Fijo Nueva',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
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
      (mockPlazoFijo.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439016',
        ...plazoFijoData,
        Vencimiento: '2024-12-31',
        Banco: mockBancoId,
      });

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req, { params });

      expect(mockDb.createCollection).toHaveBeenCalledWith('plazosfijos');
    });

    it('debe retornar 400 cuando no se proporciona ID de banco', async () => {
      const plazoFijoData = {
        Nombre: 'Plazo Fijo Test',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
      };

      const params = Promise.resolve({ id: '' });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('ID de banco no proporcionado');
      expect(mockPlazoFijo.create).not.toHaveBeenCalled();
    });

    it('debe manejar errores al crear plazo fijo', async () => {
      const plazoFijoData = {
        Nombre: 'Plazo Fijo Error',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'plazosfijos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockPlazoFijo.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoFijoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear plazo fijo');
      expect(data.message).toBe(errorMessage);
    });
  });
});
