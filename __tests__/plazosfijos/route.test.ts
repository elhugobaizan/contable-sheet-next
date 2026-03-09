jest.mock('@/db');
jest.mock('@/app/models/PlazoFijo', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

import { GET, POST } from '@/app/plazosfijos/route';
import { NextRequest } from 'next/server';
import PlazoFijo from '@/app/models/PlazoFijo';
import connectDB from '@/db';

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockPlazoFijo = PlazoFijo as jest.Mocked<typeof PlazoFijo>;

describe('Plazos Fijos API - Route /plazosfijos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /plazosfijos', () => {
    it('debe listar todos los plazos fijos exitosamente', async () => {
      const mockPlazos = [
        {
          _id: '507f1f77bcf86cd799439011',
          Nombre: 'Plazo 1',
          Periodo: '2024-01-01',
          Vencimiento: '2024-12-31',
          Capital: 100000,
          TNA: 35,
          Banco: '507f1f77bcf86cd799439020',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Nombre: 'Plazo 2',
          Periodo: '2024-02-01',
          Vencimiento: '2025-01-31',
          Capital: 200000,
          TNA: 40,
          Banco: '507f1f77bcf86cd799439021',
        },
      ];

      (mockPlazoFijo.find as jest.Mock).mockResolvedValue(mockPlazos);

      const req = new NextRequest('http://localhost:3000/plazosfijos');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockPlazos);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockPlazoFijo.find).toHaveBeenCalledWith({});
    });

    it('debe manejar errores al listar plazos fijos', async () => {
      const errorMessage = 'Error de conexión';
      (mockPlazoFijo.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/plazosfijos');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar plazos fijos');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /plazosfijos', () => {
    it('debe crear un plazo fijo exitosamente', async () => {
      const plazoData = {
        Nombre: 'Nuevo Plazo',
        Periodo: '2024-01-01',
        Vencimiento: '2024-12-31',
        Capital: 100000,
        TNA: 35,
        Banco: '507f1f77bcf86cd799439020',
      };

      const createdPlazo = {
        _id: '507f1f77bcf86cd799439013',
        ...plazoData,
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
      (mockPlazoFijo.create as jest.Mock).mockResolvedValue(createdPlazo);

      const req = new NextRequest('http://localhost:3000/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazoData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdPlazo);
      expect(mockPlazoFijo.create).toHaveBeenCalled();
      const createCall = (mockPlazoFijo.create as jest.Mock).mock.calls[0][0];
      expect(createCall.Nombre).toBe(plazoData.Nombre);
      expect(createCall.Capital).toBe(plazoData.Capital);
      expect(createCall.TNA).toBe(plazoData.TNA);
      expect(createCall.Banco).toBe(plazoData.Banco);
    });

    it('debe crear múltiples plazos fijos cuando se envía un array', async () => {
      const plazosData = [
        {
          Nombre: 'Plazo 1',
          Periodo: '2024-01-01',
          Vencimiento: '2024-12-31',
          Capital: 100000,
          TNA: 35,
          Banco: '507f1f77bcf86cd799439020',
        },
        {
          Nombre: 'Plazo 2',
          Periodo: '2024-02-01',
          Vencimiento: '2025-01-31',
          Capital: 200000,
          TNA: 40,
          Banco: '507f1f77bcf86cd799439021',
        },
      ];

      const createdPlazos = plazosData.map((p, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        ...p,
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
      (mockPlazoFijo.insertMany as jest.Mock).mockResolvedValue(createdPlazos);

      const req = new NextRequest('http://localhost:3000/plazosfijos', {
        method: 'POST',
        body: JSON.stringify(plazosData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdPlazos);
      expect(mockPlazoFijo.insertMany).toHaveBeenCalled();
      expect(mockPlazoFijo.create).not.toHaveBeenCalled();
    });

    it('debe manejar errores al crear plazo fijo', async () => {
      const errorMessage = 'Error de base de datos';
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

      const req = new NextRequest('http://localhost:3000/plazosfijos', {
        method: 'POST',
        body: JSON.stringify({
          Nombre: 'Plazo',
          Periodo: '2024-01-01',
          Vencimiento: '2024-12-31',
          Capital: 100000,
          TNA: 35,
          Banco: '507f1f77bcf86cd799439020',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear plazo fijo');
      expect(data.message).toBe(errorMessage);
    });
  });
});
