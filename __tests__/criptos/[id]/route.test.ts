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

import { GET, PUT, DELETE } from '@/app/criptos/[id]/route';
import { NextRequest } from 'next/server';
import Cripto from '@/app/models/Cripto';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Cripto', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockCripto = Cripto as jest.Mocked<typeof Cripto>;

describe('Criptos API - Route /criptos/[id]', () => {
  const mockCriptoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /criptos/[id]', () => {
    it('debe obtener un cripto por ID exitosamente', async () => {
      const mockCriptoData = {
        _id: mockCriptoId,
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
        Wallet: '507f1f77bcf86cd799439020',
      };

      (mockCripto.findById as jest.Mock).mockResolvedValue(mockCriptoData);

      const params = Promise.resolve({ id: mockCriptoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/criptos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockCriptoData);
      expect(mockCripto.findById).toHaveBeenCalledWith(mockCriptoId);
    });

    it('debe retornar 404 cuando el cripto no existe', async () => {
      (mockCripto.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockCriptoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/criptos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Cripto no encontrado');
      expect(mockCripto.findById).toHaveBeenCalledWith(mockCriptoId);
    });

    it('debe manejar errores al obtener cripto', async () => {
      const errorMessage = 'Error de base de datos';
      (mockCripto.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockCriptoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/criptos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /criptos/[id]', () => {
    it('debe actualizar un cripto exitosamente', async () => {
      const updateData = {
        Nombre: 'Bitcoin Actualizado',
        Cantidad: 1.0,
        Logo: 'bitcoin-new.png',
        Sigla: 'BTC',
        Hoy: 55000,
      };

      const updatedCripto = {
        _id: mockCriptoId,
        Nombre: updateData.Nombre,
        Cantidad: updateData.Cantidad,
        Logo: updateData.Logo,
        Sigla: updateData.Sigla,
        Hoy: updateData.Hoy,
      };

      (mockCripto.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCripto);

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedCripto);
      expect(mockCripto.findByIdAndUpdate).toHaveBeenCalledWith(
        mockCriptoId,
        {
          Nombre: updateData.Nombre,
          Cantidad: updateData.Cantidad,
          Logo: updateData.Logo,
          Sigla: updateData.Sigla,
          Hoy: updateData.Hoy,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe usar valores por defecto para campos opcionales al actualizar', async () => {
      const updateData = {
        Nombre: 'Bitcoin Parcial',
        Cantidad: 0.5,
      };

      const updatedCripto = {
        _id: mockCriptoId,
        Nombre: updateData.Nombre,
        Cantidad: updateData.Cantidad,
        Logo: '',
        Sigla: '',
        Hoy: 0,
      };

      (mockCripto.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCripto);

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockCripto.findByIdAndUpdate).toHaveBeenCalledWith(
        mockCriptoId,
        {
          Nombre: updateData.Nombre,
          Cantidad: updateData.Cantidad,
          Logo: '',
          Sigla: '',
          Hoy: 0,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el cripto a actualizar no existe', async () => {
      const updateData = {
        Nombre: 'Bitcoin No Existe',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      (mockCripto.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Cripto no encontrado');
    });

    it('debe manejar errores al actualizar cripto', async () => {
      const updateData = {
        Nombre: 'Bitcoin Error',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
      };

      const errorMessage = 'Error de validación';
      (mockCripto.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
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

  describe('DELETE /criptos/[id]', () => {
    it('debe eliminar un cripto exitosamente', async () => {
      const deletedCripto = {
        _id: mockCriptoId,
        Nombre: 'Bitcoin',
        Cantidad: 0.5,
        Logo: 'bitcoin.png',
        Sigla: 'BTC',
        Hoy: 50000,
        Wallet: '507f1f77bcf86cd799439020',
      };

      (mockCripto.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedCripto);

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedCripto);
      expect(mockCripto.findByIdAndDelete).toHaveBeenCalledWith(mockCriptoId);
    });

    it('debe retornar 404 cuando el cripto a eliminar no existe', async () => {
      (mockCripto.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Cripto no encontrado');
    });

    it('debe manejar errores al eliminar cripto', async () => {
      const errorMessage = 'Error de base de datos';
      (mockCripto.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockCriptoId });
      const req = new NextRequest('http://localhost:3000/api/criptos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
