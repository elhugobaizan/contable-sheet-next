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

import { GET, POST } from '@/app/movimientos/route';
import { NextRequest } from 'next/server';
import Gasto from '@/app/models/Movimiento';
import { TipoGasto } from '@/app/models/Tipos';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Movimiento', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockGasto = Gasto as jest.Mocked<typeof Gasto>;

describe('Gastos API - Route /gastos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /gastos', () => {
    it('debe listar todos los gastos del mes actual exitosamente', async () => {
      const mockGastos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Concepto: 'Gasto 1',
          Fecha: '2024-01-15',
          Monto: 1000,
          Tipo: TipoGasto.Comida,
          Donde: 'Restaurante',
          Metodo: 'Efectivo',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Concepto: 'Gasto 2',
          Fecha: '2024-01-20',
          Monto: 500,
          Tipo: TipoGasto.Salud,
          Donde: 'Farmacia',
          Metodo: 'Efectivo',
        },
      ];

      (mockGasto.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockGastos),
      });

      const req = new NextRequest('http://localhost:3000/api/gastos');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockGastos);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockGasto.find).toHaveBeenCalled();
    });

    it('debe listar todos los gastos cuando se proporciona el parámetro all=true', async () => {
      const mockGastos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Concepto: 'Gasto 1',
          Fecha: '2024-01-15',
          Monto: 1000,
          Tipo: TipoGasto.Comida,
          Donde: 'Restaurante',
          Metodo: 'Efectivo',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Concepto: 'Gasto 2',
          Fecha: '2023-12-20',
          Monto: 500,
          Tipo: TipoGasto.Salud,
          Donde: 'Farmacia',
          Metodo: 'Tarjeta',
        },
      ];

      (mockGasto.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockGastos),
      });

      const req = new NextRequest('http://localhost:3000/api/gastos?all=true');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockGastos);
      expect(mockGasto.find).toHaveBeenCalledWith({});
    });

    it('debe manejar errores al listar gastos', async () => {
      const errorMessage = 'Error de conexión';
      (mockGasto.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      const req = new NextRequest('http://localhost:3000/api/gastos');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar movimientos');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /gastos', () => {
    it('debe crear un gasto exitosamente', async () => {
      const gastoData = {
        Concepto: 'Nuevo Gasto',
        Fecha: '2024-01-15',
        Monto: 1000,
        Tipo: TipoGasto.Comida,
        Donde: 'Restaurante', 
        Metodo: 'Efectivo',
      };

      const createdGasto = {
        _id: '507f1f77bcf86cd799439013',
        Concepto: gastoData.Concepto,
        Fecha: gastoData.Fecha,
        Monto: gastoData.Monto,
        Tipo: gastoData.Tipo,
        Donde: gastoData.Donde, 
        Metodo: gastoData.Metodo,
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'gastos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockGasto.create as jest.Mock).mockResolvedValue(createdGasto);

      const req = new NextRequest('http://localhost:3000/api/gastos', {
        method: 'POST',
        body: JSON.stringify(gastoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdGasto);
      expect(mockGasto.create).toHaveBeenCalledWith({
        Concepto: gastoData.Concepto,
        Fecha: gastoData.Fecha,
        Monto: gastoData.Monto,
        Tipo: gastoData.Tipo,
        Codigo: 1,
        Donde: gastoData.Donde,
        Metodo: gastoData.Metodo,
      });
    });

    it('debe crear múltiples gastos cuando se envía un array', async () => {
      const gastosData = [
        {
          Concepto: 'Gasto 1',
          Fecha: '2024-01-15',
          Monto: 1000,
          Tipo: TipoGasto.Comida,
          Donde: 'Restaurante',
          Metodo: 'Tarjeta',
        },
        {
          Concepto: 'Gasto 2',
          Fecha: '2024-01-20',
          Monto: 500,
          Tipo: TipoGasto.Salud,
          Donde: 'Farmacia',
          Metodo: 'Efectivo',
        },
      ];

      const createdGastos = gastosData.map((g, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Concepto: g.Concepto,
        Fecha: g.Fecha,
        Monto: g.Monto,
        Tipo: g.Tipo,
        Donde: g.Donde,
        Metodo: g.Metodo,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'gastos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockGasto.insertMany as jest.Mock).mockResolvedValue(createdGastos);
      (mockGasto.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(createdGastos),
      });

      const req = new NextRequest('http://localhost:3000/api/gastos', {
        method: 'POST',
        body: JSON.stringify(gastosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdGastos);
      expect(mockGasto.insertMany).toHaveBeenCalled();
      expect(mockGasto.create).not.toHaveBeenCalled();
      
      expect(mockGasto.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Concepto: gastosData[0].Concepto,
            Fecha: gastosData[0].Fecha,
            Monto: gastosData[0].Monto,
            Tipo: gastosData[0].Tipo,
            Donde: gastosData[0].Donde,
            Metodo: gastosData[0].Metodo,
          }),
          expect.objectContaining({
            Concepto: gastosData[1].Concepto,
            Fecha: gastosData[1].Fecha,
            Monto: gastosData[1].Monto,
            Tipo: gastosData[1].Tipo,
            Donde: gastosData[1].Donde,
            Metodo: gastosData[1].Metodo,
          }),
        ])
      );
    });

    it('debe usar valores por defecto para campos opcionales', async () => {
      const gastoData = {
        Concepto: 'Gasto Simple',
        Fecha: '2024-01-15',
      };

      const createdGasto = {
        _id: '507f1f77bcf86cd799439014',
        Concepto: gastoData.Concepto,
        Fecha: gastoData.Fecha,
        Monto: 0,
        Tipo: TipoGasto.Varios,
        Donde: '',
        Metodo: 'Efectivo',
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'gastos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockGasto.create as jest.Mock).mockResolvedValue(createdGasto);

      const req = new NextRequest('http://localhost:3000/api/gastos', {
        method: 'POST',
        body: JSON.stringify(gastoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);

      expect(response.status).toBe(200);
      const createCall = (mockGasto.create as jest.Mock).mock.calls[0][0];
      expect(createCall).toMatchObject({
        Concepto: gastoData.Concepto,
        Fecha: gastoData.Fecha,
        Monto: 0,
        Tipo: TipoGasto.Varios,
        Donde: '',
      });
      expect([null, ''].includes(createCall.Metodo) || createCall.Metodo === undefined).toBe(true);
    });

    it('debe crear la colección si no existe', async () => {
      const gastoData = {
        Concepto: 'Gasto Nueva',
        Fecha: '2024-01-15',
        Monto: 1000,
        Tipo: TipoGasto.Comida,
        Donde: 'Restaurante',
        Metodo: 'Efectivo',
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
      (mockGasto.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...gastoData,
      });

      const req = new NextRequest('http://localhost:3000/api/gastos', {
        method: 'POST',
        body: JSON.stringify(gastoData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('movimientos');
    });

    it('debe manejar errores al crear gasto', async () => {
      const gastoData = {
        Concepto: 'Gasto Error',
        Fecha: '2024-01-15',
        Monto: 1000,
        Tipo: TipoGasto.Comida,
        Donde: 'Restaurante',
        Metodo: 'Efectivo',
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'gastos' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockGasto.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/gastos', {
        method: 'POST',
        body: JSON.stringify(gastoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear movimiento(s)');
      expect(data.message).toBe(errorMessage);
    });
  });
});
