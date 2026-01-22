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

import { GET, PUT, DELETE } from '@/app/bancos/[id]/inversiones/[idInversion]/route';
import { NextRequest } from 'next/server';
import Inversion from '@/app/models/Inversion';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Inversion', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockInversion = Inversion as jest.Mocked<typeof Inversion>;

describe('Bancos API - Route /bancos/[id]/inversiones/[idInversion]', () => {
  const mockBancoId = '507f1f77bcf86cd799439011';
  const mockInversionId = '507f1f77bcf86cd799439020';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /bancos/[id]/inversiones/[idInversion]', () => {
    it('debe obtener una inversión por ID exitosamente', async () => {
      const mockInversionData = {
        _id: mockInversionId,
        Nombre: 'Inversion 1',
        Capital: 10000,
        Moneda: 1,
        Ente: mockBancoId,
      };

      (mockInversion.findById as jest.Mock).mockResolvedValue(mockInversionData);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockInversionData);
      expect(mockInversion.findById).toHaveBeenCalledWith(mockInversionId);
    });

    it('debe retornar 404 cuando la inversión no existe', async () => {
      (mockInversion.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Inversion no encontrada');
    });

    it('debe manejar errores al obtener inversión', async () => {
      const errorMessage = 'Error de base de datos';
      (mockInversion.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /bancos/[id]/inversiones/[idInversion]', () => {
    it('debe actualizar una inversión exitosamente', async () => {
      const updateData = {
        Nombre: 'Inversion Actualizada',
        Capital: 20000,
        Moneda: 2,
        Ente: mockBancoId,
      };

      const updatedInversion = {
        _id: mockInversionId,
        Nombre: updateData.Nombre,
        Capital: updateData.Capital,
        Moneda: updateData.Moneda,
        Ente: updateData.Ente,
      };

      (mockInversion.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedInversion);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedInversion);
      expect(mockInversion.findByIdAndUpdate).toHaveBeenCalledWith(
        mockInversionId,
        {
          Nombre: updateData.Nombre,
          Capital: updateData.Capital,
          Moneda: updateData.Moneda,
          Ente: updateData.Ente,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando la inversión a actualizar no existe', async () => {
      const updateData = {
        Nombre: 'Inversion No Existe',
        Capital: 10000,
        Moneda: 1,
        Ente: mockBancoId,
      };

      (mockInversion.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Inversion no encontrada');
    });

    it('debe manejar errores al actualizar inversión', async () => {
      const updateData = {
        Nombre: 'Inversion Error',
        Capital: 10000,
        Moneda: 1,
        Ente: mockBancoId,
      };

      const errorMessage = 'Error de validación';
      (mockInversion.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
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

  describe('DELETE /bancos/[id]/inversiones/[idInversion]', () => {
    it('debe eliminar una inversión exitosamente', async () => {
      const deletedInversion = {
        _id: mockInversionId,
        Nombre: 'Inversion 1',
        Capital: 10000,
        Moneda: 1,
        Ente: mockBancoId,
      };

      (mockInversion.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedInversion);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedInversion);
      expect(mockInversion.findByIdAndDelete).toHaveBeenCalledWith(mockInversionId);
    });

    it('debe retornar 404 cuando la inversión a eliminar no existe', async () => {
      (mockInversion.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Inversion no encontrada');
    });

    it('debe manejar errores al eliminar inversión', async () => {
      const errorMessage = 'Error de base de datos';
      (mockInversion.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId, idInversion: mockInversionId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/inversiones/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
