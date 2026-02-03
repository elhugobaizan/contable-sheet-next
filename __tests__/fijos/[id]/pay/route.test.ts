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

import { PUT } from '@/app/fijos/[id]/pay/route';
import { NextRequest } from 'next/server';
import Fijo from '@/app/models/Fijo';
import Gasto from '@/app/models/Gasto';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Fijo', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));
jest.mock('@/app/models/Gasto', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockFijo = Fijo as jest.Mocked<typeof Fijo>;
const mockGasto = Gasto as jest.Mocked<typeof Gasto>;

describe('Fijos API - Route /fijos/[id]/pay', () => {
  const mockFijoId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('PUT /fijos/[id]/pay', () => {
    it('debe pagar un fijo exitosamente cuando tiene deuda', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Servicio de Internet',
        Vencimiento: new Date('2024-12-31'),
        Deuda: 5000,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const updatedFijo = {
        _id: mockFijoId,
        Detalle: mockFijoData.Detalle,
        Vencimiento: new Date('1970-01-01T00:00:00.000Z'),
        Deuda: 0,
        Datos: mockFijoData.Datos,
        Logo: mockFijoData.Logo,
        URL: mockFijoData.URL,
      };

      const createdGasto = {
        _id: '507f1f77bcf86cd799439020',
        Concepto: `Pago de fijo ${mockFijoData.Detalle}`,
        Fecha: new Date(),
        Monto: mockFijoData.Deuda,
        Tipo: 7, // TipoGasto.Impuestos
        Donde: '',
      };

      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);
      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFijo);
      (mockGasto.create as jest.Mock).mockResolvedValue(createdGasto);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({
        ...updatedFijo,
        Vencimiento: updatedFijo.Vencimiento.toISOString(),
      });
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
      expect(mockFijo.findByIdAndUpdate).toHaveBeenCalledWith(
        mockFijoId,
        {
          Deuda: 0,
          Vencimiento: '',
        },
        { new: true, runValidators: true }
      );
      expect(mockGasto.create).toHaveBeenCalledWith({
        Concepto: `Pago de fijo ${mockFijoData.Detalle}`,
        Fecha: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        Monto: mockFijoData.Deuda,
        Tipo: 7, // TipoGasto.Impuestos
        Donde: '',
      });
    });

    it('debe retornar 404 cuando el fijo no existe', async () => {
      (mockFijo.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Fijo no encontrado');
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
      expect(mockFijo.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockGasto.create).not.toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el fijo no tiene deuda', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Servicio de Internet',
        Vencimiento: new Date('2024-12-31'),
        Deuda: 0,
        Datos: '',
        Logo: '',
        URL: '',
      };

      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Fijo no tiene deuda');
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
      expect(mockFijo.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockGasto.create).not.toHaveBeenCalled();
    });

    it('debe retornar 400 cuando el fijo tiene deuda negativa', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Servicio de Internet',
        Vencimiento: new Date('2024-12-31'),
        Deuda: -100,
        Datos: '',
        Logo: '',
        URL: '',
      };

      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Fijo no tiene deuda');
      expect(mockFijo.findById).toHaveBeenCalledWith(mockFijoId);
      expect(mockFijo.findByIdAndUpdate).not.toHaveBeenCalled();
      expect(mockGasto.create).not.toHaveBeenCalled();
    });

    it('debe crear el gasto con el concepto correcto', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Impuesto Municipal',
        Vencimiento: new Date('2024-12-31'),
        Deuda: 7500,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const updatedFijo = {
        _id: mockFijoId,
        Detalle: mockFijoData.Detalle,
        Vencimiento: '1970-01-01T00:00:00.000Z',
        Deuda: 0,
        Datos: mockFijoData.Datos,
        Logo: mockFijoData.Logo,
        URL: mockFijoData.URL,
      };

      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);
      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFijo);
      (mockGasto.create as jest.Mock).mockResolvedValue({});

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      await PUT(req, { params });

      expect(mockGasto.create).toHaveBeenCalledWith({
        Concepto: `Pago de fijo ${mockFijoData.Detalle}`,
        Fecha: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        Monto: mockFijoData.Deuda,
        Tipo: 7, // TipoGasto.Impuestos
        Donde: '',
      });
    });

    it('debe manejar errores al buscar el fijo', async () => {
      const errorMessage = 'Error de base de datos';
      (mockFijo.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });

    it('debe manejar errores al actualizar el fijo', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Servicio de Internet',
        Vencimiento: new Date('2024-12-31'),
        Deuda: 5000,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const errorMessage = 'Error al actualizar';
      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);
      (mockFijo.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });

    it('debe manejar errores al crear el gasto', async () => {
      const mockFijoData = {
        _id: mockFijoId,
        Detalle: 'Servicio de Internet',
        Vencimiento: new Date('2024-12-31'),
        Deuda: 5000,
        Datos: '',
        Logo: '',
        URL: '',
      };

      const updatedFijo = {
        _id: mockFijoId,
        Detalle: mockFijoData.Detalle,
        Vencimiento: '1970-01-01T00:00:00.000Z',
        Deuda: 0,
        Datos: mockFijoData.Datos,
        Logo: mockFijoData.Logo,
        URL: mockFijoData.URL,
      };

      const errorMessage = 'Error al crear gasto';
      (mockFijo.findById as jest.Mock).mockResolvedValue(mockFijoData);
      (mockFijo.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedFijo);
      (mockGasto.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockFijoId });
      const req = new NextRequest('http://localhost:3000/api/fijos/123/pay', {
        method: 'PUT',
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
