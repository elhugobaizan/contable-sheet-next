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

import { GET, PUT, DELETE } from '@/app/bancos/[id]/plazosfijos/[idPlazoFijo]/route';
import { NextRequest } from 'next/server';
import PlazoFijo from '@/app/models/PlazoFijo';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/PlazoFijo', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockPlazoFijo = PlazoFijo as jest.Mocked<typeof PlazoFijo>;

describe('Plazos Fijos API - Route /bancos/[id]/plazosfijos/[idPlazoFijo]', () => {
  const mockPlazoFijoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /bancos/[id]/plazosfijos/[idPlazoFijo]', () => {
    it('debe obtener un plazo fijo por ID exitosamente', async () => {
      const mockPlazoFijoData = {
        _id: mockPlazoFijoId,
        Nombre: 'Plazo Fijo Test',
        Periodo: new Date('2024-01-01'),
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findById as jest.Mock).mockResolvedValue(mockPlazoFijoData);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serialization converts Date to string
      expect(data).toEqual({
        ...mockPlazoFijoData,
        Periodo: mockPlazoFijoData.Periodo.toISOString(),
      });
      expect(mockPlazoFijo.findById).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe retornar 404 cuando el plazo fijo no existe', async () => {
      (mockPlazoFijo.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Plazo fijo no encontrado');
      expect(mockPlazoFijo.findById).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe manejar errores al obtener plazo fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockPlazoFijo.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /bancos/[id]/plazosfijos/[idPlazoFijo]', () => {
    it('debe actualizar un plazo fijo exitosamente', async () => {
      const updateData = {
        Nombre: 'Plazo Fijo Actualizado',
        Periodo: '2024-02-01',
        Vencimiento: '2025-01-31',
        Capital: 200000,
        TNA: 30,
        Banco: '507f1f77bcf86cd799439020',
      };

      const updatedPlazoFijo = {
        _id: mockPlazoFijoId,
        Nombre: updateData.Nombre,
        Periodo: updateData.Periodo,
        Vencimiento: '2025-01-31',
        Capital: updateData.Capital,
        TNA: updateData.TNA,
        Banco: updateData.Banco,
      };

      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPlazoFijo);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedPlazoFijo);
      expect(mockPlazoFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPlazoFijoId,
        expect.objectContaining({
          Nombre: updateData.Nombre,
          Periodo: updateData.Periodo,
          Vencimiento: '2025-01-31',
          Capital: updateData.Capital,
          TNA: updateData.TNA,
          Banco: updateData.Banco,
        }),
        { new: true, runValidators: true }
      );
    });

    it('debe actualizar solo campos proporcionados', async () => {
      const updateData = {
        Nombre: 'Solo Nombre Actualizado',
      };

      const updatedPlazoFijo = {
        _id: mockPlazoFijoId,
        Nombre: updateData.Nombre,
        Periodo: new Date('2024-01-01'),
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPlazoFijo);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockPlazoFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPlazoFijoId,
        expect.objectContaining({
          Nombre: updateData.Nombre,
        }),
        { new: true, runValidators: true }
      );
      // Verificar que solo se actualiza el campo proporcionado
      const callArgs = (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mock.calls[0][1];
      expect(Object.keys(callArgs)).toEqual(['Nombre']);
    });

    it('debe convertir Vencimiento a formato yyyy-MM-dd cuando se actualiza', async () => {
      // Usar una fecha que no tenga problemas de zona horaria
      const updateData = {
        Vencimiento: '2024-12-31',
      };

      const updatedPlazoFijo = {
        _id: mockPlazoFijoId,
        Nombre: 'Plazo Fijo Test',
        Periodo: new Date('2024-01-01'),
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPlazoFijo);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockPlazoFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPlazoFijoId,
        expect.objectContaining({
          Vencimiento: '2024-12-31',
        }),
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el plazo fijo a actualizar no existe', async () => {
      const updateData = {
        Nombre: 'Plazo Fijo No Existe',
        Vencimiento: '2024-12-31',
      };

      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Plazo fijo no encontrado');
    });

    it('debe manejar errores al actualizar plazo fijo', async () => {
      const updateData = {
        Nombre: 'Plazo Fijo Error',
        Vencimiento: '2024-12-31',
      };

      const errorMessage = 'Error de validación';
      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
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

  describe('DELETE /bancos/[id]/plazosfijos/[idPlazoFijo]', () => {
    it('debe eliminar un plazo fijo exitosamente', async () => {
      const deletedPlazoFijo = {
        _id: mockPlazoFijoId,
        Nombre: 'Plazo Fijo a Eliminar',
        Periodo: new Date('2024-01-01'),
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedPlazoFijo);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      // JSON serialization converts Date to string
      expect(data).toEqual({
        ...deletedPlazoFijo,
        Periodo: deletedPlazoFijo.Periodo.toISOString(),
      });
      expect(mockPlazoFijo.findByIdAndDelete).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe retornar 404 cuando el plazo fijo a eliminar no existe', async () => {
      (mockPlazoFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Plazo fijo no encontrado');
    });

    it('debe manejar errores al eliminar plazo fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockPlazoFijo.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ idPlazoFijo: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/api/bancos/123/plazosfijos/456', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
