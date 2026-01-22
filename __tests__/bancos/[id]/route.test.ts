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

import { GET, PUT, DELETE } from '@/app/bancos/[id]/route';
import { NextRequest } from 'next/server';
import Banco from '@/app/models/Banco';
import PlazoFijo from '@/app/models/PlazoFijo';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Banco', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));
jest.mock('@/app/models/PlazoFijo', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockBanco = Banco as jest.Mocked<typeof Banco>;
const mockPlazoFijo = PlazoFijo as jest.Mocked<typeof PlazoFijo>;

describe('Bancos API - Route /bancos/[id]', () => {
  const mockBancoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /bancos/[id]', () => {
    it('debe obtener un banco por ID exitosamente', async () => {
      const mockBancoData = {
        _id: mockBancoId,
        Nombre: 'Banco Test',
        CBU: '1234567890',
        Alias: 'Banco Test',
        Logo: 'Logo de prueba',
        Efectivo: 0,
      };

      const mockPlazosFijos: any[] = [];

      (mockBanco.findById as jest.Mock).mockResolvedValue(mockBancoData);
      (mockPlazoFijo.find as jest.Mock).mockResolvedValue(mockPlazosFijos);

      const params = Promise.resolve({ id: mockBancoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        ...mockBancoData,
        plazosfijos: mockPlazosFijos,
      });
      expect(mockBanco.findById).toHaveBeenCalledWith(mockBancoId);
      expect(mockPlazoFijo.find).toHaveBeenCalledWith({ Banco: mockBancoId });
    });

    it('debe retornar 404 cuando el banco no existe', async () => {
      (mockBanco.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Banco no encontrado');
      expect(mockBanco.findById).toHaveBeenCalledWith(mockBancoId);
    });

    it('debe manejar errores al obtener banco', async () => {
      const errorMessage = 'Error de base de datos';
      (mockBanco.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /bancos/[id]', () => {
    it('debe actualizar un banco exitosamente', async () => {
      const updateData = {
        Nombre: 'Banco Actualizado',
        CBU: '1234567890',
        Alias: 'Banco Actualizado',
        Efectivo: 5,
        Logo: 'Logo de prueba',
      };

      const updatedBanco = {
        _id: mockBancoId,
        Nombre: updateData.Nombre,
        CBU: updateData.CBU,
        Alias: updateData.Alias,
        Efectivo: updateData.Efectivo,
        Logo: 'Logo de prueba',
      };

      (mockBanco.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedBanco);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        ...updatedBanco,
        CBU: updatedBanco.CBU,
      });
      expect(mockBanco.findByIdAndUpdate).toHaveBeenCalledWith(
        mockBancoId,
        {
          Nombre: updateData.Nombre,
          CBU: updateData.CBU,
          Alias: updateData.Alias,
          Efectivo: updateData.Efectivo,
          Logo: updateData.Logo,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe usar valores por defecto para campos opcionales al actualizar', async () => {
      const updateData = {
        Nombre: 'Banco Parcial',
        CBU: null,
        Alias: '',
        Efectivo: 0,
        Logo: 'Logo de prueba',
      };

      const updatedBanco = {
        _id: mockBancoId,
        Nombre: updateData.Nombre,
        CBU: null,
        Alias: '',
        Efectivo: 0,
        Logo: 'Logo de prueba',
      };

      (mockBanco.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedBanco);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockBanco.findByIdAndUpdate).toHaveBeenCalledWith(
        mockBancoId,
        {
          Nombre: updateData.Nombre,
          CBU: null,
          Alias: '',
          Efectivo: 0,
          Logo: 'Logo de prueba',
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el banco a actualizar no existe', async () => {
      const updateData = {
        Nombre: 'Banco No Existe',
        CBU: '1234567890',
        Alias: 'Banco No Existe',
        Efectivo: 0,
        Logo: 'Logo de prueba',
      };

      (mockBanco.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Banco no encontrado');
    });

    it('debe manejar errores al actualizar banco', async () => {
      const updateData = {
        Nombre: 'Banco Error',
        CBU: '1234567890',
        Alias: 'Banco Error',
        Efectivo: 0,
        Logo: 'Logo de prueba',
      };

      const errorMessage = 'Error de validación';
      (mockBanco.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
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

  describe('DELETE /bancos/[id]', () => {
    it('debe eliminar un banco exitosamente', async () => {
      const deletedBanco = {
        _id: mockBancoId,
        Nombre: 'Banco a Eliminar',
        CBU: '1234567890',
        Alias: 'Banco a Eliminar',
        Efectivo: 0,
        Logo: 'Logo de prueba',
      };
      (mockBanco.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedBanco);
      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedBanco);
      expect(mockBanco.findByIdAndDelete).toHaveBeenCalledWith(mockBancoId);
    });

    it('debe retornar 404 cuando el banco a eliminar no existe', async () => {
      (mockBanco.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Banco no encontrado');
    });

    it('debe manejar errores al eliminar banco', async () => {
      const errorMessage = 'Error de base de datos';
      (mockBanco.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockBancoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});