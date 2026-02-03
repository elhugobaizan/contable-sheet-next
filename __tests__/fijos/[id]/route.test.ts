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

import { GET, PUT, DELETE } from '@/app/fijos/[id]/route';
import { NextRequest } from 'next/server';
import Fijo from '@/app/models/Fijo';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Fijo', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockFijo = Fijo as jest.Mocked<typeof Fijo>;

describe('Fijos API - Route /fijos/[id]', () => {
  const mockFijoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /fijos/[id]', () => {
    it('debe obtener un fijo por ID exitosamente', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Fijo Test',
        Vencimiento: '2024-01-01T00:00:00.000Z',
        Deuda: 0,
        Datos: '',
        Logo: 'logo.png',
        URL: 'https://www.fijo.com',
      };

      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);

      const params = Promise.resolve({ id: mockFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/fijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockFijoData);
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
    });

    it('debe retornar 404 cuando el fijo no existe', async () => {
      (mockFijo.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/fijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Fijo no encontrado');
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
    });

    it('debe manejar errores al obtener fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockFijo.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/fijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /fijos/[id]', () => {
    it('debe actualizar un fijo exitosamente', async () => {
      const updateData = {
        Detalle: 'Fijo Actualizado',
        Vencimiento: '2024-02-01',
        Deuda: 5,
        Datos: '',
        Logo: 'new-logo.png',
        URL: 'https://www.fijo-updated.com',
      };

      const updatedFijo = {
        _id: mockFijoId,
        Detalle: updateData.Detalle,
        Vencimiento: updateData.Vencimiento,
        Deuda: updateData.Deuda,
        Datos: updateData.Datos,
        Logo: updateData.Logo,
        URL: updateData.URL,
      };

      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFijo);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedFijo);
      expect(mockFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockFijoId,
        {
          Detalle: updateData.Detalle,
          Deuda: updateData.Deuda,
          Datos: updateData.Datos,
          Logo: updateData.Logo,
          URL: updateData.URL,
          Vencimiento: updateData.Vencimiento || '',
        },
        { new: true, runValidators: true }
      );
    });

    it('debe usar valores por defecto para campos opcionales al actualizar', async () => {
      const updateData = {
        Detalle: 'Fijo Parcial',
        Vencimiento: null,
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const updatedFijo = {
        _id: mockFijoId,
        Detalle: updateData.Detalle,
        Vencimiento: '',
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFijo);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockFijoId,
        {
          Detalle: updateData.Detalle,
          Deuda: 0,
          Datos: '',
          Logo: '',
          URL: '',
          Vencimiento: '',
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el fijo a actualizar no existe', async () => {
      const updateData = {
        Detalle: 'Fijo No Existe',
        Vencimiento: '2024-02-01',
      };

      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Fijo no encontrado');
    });

    it('debe manejar errores al actualizar fijo', async () => {
      const updateData = {
        Detalle: 'Fijo Error',
        Vencimiento: '2024-02-01',
      };

      const errorMessage = 'Error de validación';
      (mockFijo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
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

  describe('DELETE /fijos/[id]', () => {
    it('debe eliminar un fijo exitosamente', async () => {
      const deletedFijo = {
        _id: mockFijoId,
        Detalle: 'Fijo a Eliminar',
        Vencimiento: '2024-01-01T00:00:00.000Z',
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      (mockFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedFijo);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedFijo);
      expect(mockFijo.findByIdAndDelete).toHaveBeenCalledWith(mockFijoId);
    });

    it('debe retornar 404 cuando el fijo a eliminar no existe', async () => {
      (mockFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Fijo no encontrado');
    });

    it('debe manejar errores al eliminar fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockFijo.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});

