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

import { GET, POST } from '@/app/datosUsuario/route';
import { NextRequest } from 'next/server';
import DatosUsuario from '@/app/models/DatosUsuario';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/DatosUsuario', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn(),
    insertMany: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockDatosUsuario = DatosUsuario as jest.Mocked<typeof DatosUsuario>;

describe('Datos Usuario API - Route /datosUsuario', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /datosUsuario', () => {
    it('debe listar todos los datos de usuario exitosamente', async () => {
      const mockDatosUsuarioList = [
        {
          _id: '507f1f77bcf86cd799439011',
          Campo: 'nombre',
          Valor: 'Juan Pérez',
        },
        {
          _id: '507f1f77bcf86cd799439012',
          Campo: 'email',
          Valor: 'juan@example.com',
        },
      ];

      (mockDatosUsuario.find as jest.Mock).mockResolvedValue(mockDatosUsuarioList);

      const req = new NextRequest('http://localhost:3000/api/datosUsuario');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockDatosUsuarioList);
      expect(mockConnectDB).toHaveBeenCalledTimes(1);
      expect(mockDatosUsuario.find).toHaveBeenCalledWith({});
    });

    it('debe filtrar por Campo cuando se proporciona el parámetro de consulta', async () => {
      const mockDatosUsuarioList = [
        {
          _id: '507f1f77bcf86cd799439011',
          Campo: 'nombre',
          Valor: 'Juan Pérez',
        },
      ];

      (mockDatosUsuario.find as jest.Mock).mockResolvedValue(mockDatosUsuarioList);

      const req = new NextRequest('http://localhost:3000/api/datosUsuario?Campo=nombre');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockDatosUsuarioList);
      expect(mockDatosUsuario.find).toHaveBeenCalledWith({ Campo: 'nombre' });
    });

    it('debe manejar errores al listar datos de usuario', async () => {
      const errorMessage = 'Error de conexión';
      (mockDatosUsuario.find as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/datosUsuario');
      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al listar datos Usuario');
      expect(data.message).toBe(errorMessage);
    });
  });

  describe('POST /datosUsuario', () => {
    it('debe crear un dato de usuario exitosamente', async () => {
      const datoUsuarioData = {
        Campo: 'telefono',
        Valor: '1234567890',
      };

      const createdDatoUsuario = {
        _id: '507f1f77bcf86cd799439013',
        Campo: datoUsuarioData.Campo,
        Valor: datoUsuarioData.Valor,
      };

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'datosUsuario' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockDatosUsuario.create as jest.Mock).mockResolvedValue(createdDatoUsuario);

      const req = new NextRequest('http://localhost:3000/api/datosUsuario', {
        method: 'POST',
        body: JSON.stringify(datoUsuarioData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdDatoUsuario);
      expect(mockDatosUsuario.create).toHaveBeenCalledWith({
        Campo: datoUsuarioData.Campo,
        Valor: datoUsuarioData.Valor,
      });
    });

    it('debe crear múltiples datos de usuario cuando se envía un array', async () => {
      const datosUsuarioData = [
        {
          Campo: 'nombre',
          Valor: 'Juan Pérez',
        },
        {
          Campo: 'email',
          Valor: 'juan@example.com',
        },
      ];

      const createdDatosUsuario = datosUsuarioData.map((d, i) => ({
        _id: `507f1f77bcf86cd79943901${i}`,
        Campo: d.Campo,
        Valor: d.Valor,
      }));

      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'datosUsuario' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockDatosUsuario.insertMany as jest.Mock).mockResolvedValue(createdDatosUsuario);

      const req = new NextRequest('http://localhost:3000/api/datosUsuario', {
        method: 'POST',
        body: JSON.stringify(datosUsuarioData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(createdDatosUsuario);
      expect(mockDatosUsuario.insertMany).toHaveBeenCalled();
      expect(mockDatosUsuario.create).not.toHaveBeenCalled();
      
      expect(mockDatosUsuario.insertMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            Campo: datosUsuarioData[0].Campo,
            Valor: datosUsuarioData[0].Valor,
          }),
          expect.objectContaining({
            Campo: datosUsuarioData[1].Campo,
            Valor: datosUsuarioData[1].Valor,
          }),
        ])
      );
    });

    it('debe crear la colección si no existe', async () => {
      const datoUsuarioData = {
        Campo: 'nuevoCampo',
        Valor: 'nuevoValor',
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
      (mockDatosUsuario.create as jest.Mock).mockResolvedValue({
        _id: '507f1f77bcf86cd799439015',
        ...datoUsuarioData,
      });

      const req = new NextRequest('http://localhost:3000/api/datosUsuario', {
        method: 'POST',
        body: JSON.stringify(datoUsuarioData),
        headers: { 'Content-Type': 'application/json' },
      });

      await POST(req);

      expect(mockDb.createCollection).toHaveBeenCalledWith('datosUsuario');
    });

    it('debe manejar errores al crear dato de usuario', async () => {
      const datoUsuarioData = {
        Campo: 'campoError',
        Valor: 'valorError',
      };

      const errorMessage = 'Error de validación';
      const mockConnection = {
        connection: {
          db: {
            listCollections: jest.fn().mockReturnValue({
              toArray: jest.fn().mockResolvedValue([{ name: 'datosUsuario' }]),
            }),
          },
        },
      };

      mockConnectDB.mockResolvedValue(mockConnection as any);
      (mockDatosUsuario.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const req = new NextRequest('http://localhost:3000/api/datosUsuario', {
        method: 'POST',
        body: JSON.stringify(datoUsuarioData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al crear dato(s) Usuario');
      expect(data.message).toBe(errorMessage);
    });
  });
});
