jest.mock('@/db');
jest.mock('@/app/models/PlazoFijo', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

import { GET, PUT, DELETE } from '@/app/plazosfijos/[id]/route';
import { NextRequest } from 'next/server';
import PlazoFijo from '@/app/models/PlazoFijo';
import connectDB from '@/db';

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockPlazoFijo = PlazoFijo as jest.Mocked<typeof PlazoFijo>;

describe('Plazos Fijos API - Route /plazosfijos/[id]', () => {
  const mockPlazoFijoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /plazosfijos/[id]', () => {
    it('debe obtener un plazo fijo por ID exitosamente', async () => {
      const mockPlazoData = {
        _id: mockPlazoFijoId,
        Nombre: 'Plazo Test',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findById as jest.Mock).mockResolvedValue(mockPlazoData);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/plazosfijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockPlazoData);
      expect(mockPlazoFijo.findById).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe retornar 404 cuando el plazo fijo no existe', async () => {
      (mockPlazoFijo.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/plazosfijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Plazo fijo no encontrado');
      expect(mockPlazoFijo.findById).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe manejar errores al obtener plazo fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockPlazoFijo.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const response = await GET(new NextRequest('http://localhost:3000/plazosfijos/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /plazosfijos/[id]', () => {
    it('debe actualizar un plazo fijo exitosamente', async () => {
      const updateData = {
        Nombre: 'Plazo Actualizado',
        Periodo: '2024-02-01',
        Vencimiento: '2025-01-31',
        Capital: 150000,
        TNA: 40,
        Banco: '507f1f77bcf86cd799439021',
      };

      const updatedPlazo = {
        _id: mockPlazoFijoId,
        ...updateData,
      };

      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPlazo);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedPlazo);
      expect(mockPlazoFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockPlazoFijoId,
        expect.any(Object),
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el plazo fijo a actualizar no existe', async () => {
      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
        method: 'PUT',
        body: JSON.stringify({ Nombre: 'Actualizado' }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Plazo fijo no encontrado');
    });

    it('debe manejar errores al actualizar plazo fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockPlazoFijo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
        method: 'PUT',
        body: JSON.stringify({ Nombre: 'Actualizado' }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('DELETE /plazosfijos/[id]', () => {
    it('debe eliminar un plazo fijo exitosamente', async () => {
      const deletedPlazo = {
        _id: mockPlazoFijoId,
        Nombre: 'Plazo a Eliminar',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      (mockPlazoFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedPlazo);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedPlazo);
      expect(mockPlazoFijo.findByIdAndDelete).toHaveBeenCalledWith(mockPlazoFijoId);
    });

    it('debe retornar 404 cuando el plazo fijo a eliminar no existe', async () => {
      (mockPlazoFijo.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
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

      const params = Promise.resolve({ id: mockPlazoFijoId });
      const req = new NextRequest('http://localhost:3000/plazosfijos/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
