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

import { GET, PUT, DELETE } from '@/app/gastos/[id]/route';
import { NextRequest } from 'next/server';
import Gasto from '@/app/models/Gasto';
import { TipoGasto } from '@/app/models/Tipos';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Gasto', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockGasto = Gasto as jest.Mocked<typeof Gasto>;

describe('Gastos API - Route /gastos/[id]', () => {
  const mockGastoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /gastos/[id]', () => {
    it('debe obtener un gasto por ID exitosamente', async () => {
      const mockGastoData = {
        _id: mockGastoId,
        Concepto: 'Gasto Test',
        Fecha: '2024-01-15',
        Monto: 1000,
        Tipo: TipoGasto.Comida,
        Donde: 'Restaurante',
        Metodo: 'Efectivo',
      };

      (mockGasto.findById as jest.Mock).mockResolvedValue(mockGastoData);

      const params = Promise.resolve({ id: mockGastoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/gastos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockGastoData);
      expect(mockGasto.findById).toHaveBeenCalledWith(mockGastoId);
    });

    it('debe retornar 404 cuando el gasto no existe', async () => {
      (mockGasto.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockGastoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/gastos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Gasto no encontrado');
      expect(mockGasto.findById).toHaveBeenCalledWith(mockGastoId);
    });

    it('debe manejar errores al obtener gasto', async () => {
      const errorMessage = 'Error de base de datos';
      (mockGasto.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockGastoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/gastos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /gastos/[id]', () => {
    it('debe actualizar un gasto exitosamente', async () => {
      const updateData = {
        Concepto: 'Gasto Actualizado',
        Fecha: '2024-01-20',
        Monto: 1500,
        Tipo: TipoGasto.Salud,
        Donde: 'Farmacia',
        Metodo: 'Efectivo',
      };

      const updatedGasto = {
        _id: mockGastoId,
        Concepto: updateData.Concepto,
        Fecha: updateData.Fecha,
        Monto: updateData.Monto,
        Tipo: updateData.Tipo,
        Donde: updateData.Donde,
        Metodo: updateData.Metodo,
      };

      (mockGasto.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedGasto);

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedGasto);
      expect(mockGasto.findByIdAndUpdate).toHaveBeenCalledWith(
        mockGastoId,
        expect.objectContaining({
          Concepto: updateData.Concepto,
          Fecha: updateData.Fecha,
          Monto: updateData.Monto,
          Tipo: updateData.Tipo,
          Donde: updateData.Donde,  
          Metodo: updateData.Metodo,
        }),
        { new: true, runValidators: true }
      );
    });

    it('debe usar valores por defecto para campos opcionales al actualizar', async () => {
      const updateData = {
        Concepto: 'Gasto Parcial',
      };

      const updatedGasto = {
        _id: mockGastoId,
        Concepto: updateData.Concepto,
        Fecha: expect.any(String),
        Monto: 0,
        Tipo: TipoGasto.Varios,
        Donde: '',
        Metodo: '',
      };

      (mockGasto.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedGasto);

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockGasto.findByIdAndUpdate).toHaveBeenCalledWith(
        mockGastoId,
        expect.objectContaining({
          Concepto: updateData.Concepto,
          Monto: 0,
          Tipo: TipoGasto.Varios,
          Donde: '',
          Metodo: '',
        }),
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el gasto a actualizar no existe', async () => {
      const updateData = {
        Concepto: 'Gasto No Existe',
        Fecha: '2024-01-15',
        Monto: 1000,
      };

      (mockGasto.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Gasto no encontrado');
    });

    it('debe manejar errores al actualizar gasto', async () => {
      const updateData = {
        Concepto: 'Gasto Error',
        Fecha: '2024-01-15',
        Monto: 1000,
      };

      const errorMessage = 'Error de validación';
      (mockGasto.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('DELETE /gastos/[id]', () => {
    it('debe eliminar un gasto exitosamente', async () => {
      const deletedGasto = {
        _id: mockGastoId,
        Concepto: 'Gasto a Eliminar',
        Fecha: '2024-01-15',
        Monto: 1000,
        Tipo: TipoGasto.Comida,
        Donde: 'Restaurante', 
        Metodo: 'Efectivo',
      };

      (mockGasto.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedGasto);

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedGasto);
      expect(mockGasto.findByIdAndDelete).toHaveBeenCalledWith(mockGastoId);
    });

    it('debe retornar 404 cuando el gasto a eliminar no existe', async () => {
      (mockGasto.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Gasto no encontrado');
    });

    it('debe manejar errores al eliminar gasto', async () => {
      const errorMessage = 'Error de base de datos';
      (mockGasto.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockGastoId });
      const req = new NextRequest('http://localhost:3000/api/gastos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
