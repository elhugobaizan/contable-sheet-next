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

import { GET, PUT, DELETE } from '@/app/datosUsuario/[id]/route';
import { NextRequest } from 'next/server';
import DatosUsuario from '@/app/models/DatosUsuario';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/DatosUsuario', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockDatosUsuario = DatosUsuario as jest.Mocked<typeof DatosUsuario>;

describe('Datos Usuario API - Route /datosUsuario/[id]', () => {
  const mockDatoUsuarioId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /datosUsuario/[id]', () => {
    it('debe obtener un dato de usuario por ID exitosamente', async () => {
      const mockDatoUsuarioData = {
        _id: mockDatoUsuarioId,
        Campo: 'nombre',
        Valor: 'Juan Pérez',
      };

      (mockDatosUsuario.findById as jest.Mock).mockResolvedValue(mockDatoUsuarioData);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const response = await GET(new NextRequest('http://localhost:3000/api/datosUsuario/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockDatoUsuarioData);
      expect(mockDatosUsuario.findById).toHaveBeenCalledWith(mockDatoUsuarioId);
    });

    it('debe retornar 404 cuando el dato de usuario no existe', async () => {
      (mockDatosUsuario.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const response = await GET(new NextRequest('http://localhost:3000/api/datosUsuario/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Dato de Usuario no encontrado');
      expect(mockDatosUsuario.findById).toHaveBeenCalledWith(mockDatoUsuarioId);
    });

    it('debe manejar errores al obtener dato de usuario', async () => {
      const errorMessage = 'Error de base de datos';
      (mockDatosUsuario.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const response = await GET(new NextRequest('http://localhost:3000/api/datosUsuario/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /datosUsuario/[id]', () => {
    it('debe actualizar un dato de usuario exitosamente', async () => {
      const updateData = {
        Campo: 'nombre',
        Valor: 'Juan Pérez Actualizado',
      };

      const updatedDatoUsuario = {
        _id: mockDatoUsuarioId,
        Campo: updateData.Campo,
        Valor: updateData.Valor,
      };

      (mockDatosUsuario.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedDatoUsuario);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedDatoUsuario);
      expect(mockDatosUsuario.findByIdAndUpdate).toHaveBeenCalledWith(
        mockDatoUsuarioId,
        {
          Campo: updateData.Campo,
          Valor: updateData.Valor,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el dato de usuario a actualizar no existe', async () => {
      const updateData = {
        Campo: 'nombre',
        Valor: 'Juan Pérez',
      };

      (mockDatosUsuario.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Dato de Usuario no encontrado');
    });

    it('debe manejar errores al actualizar dato de usuario', async () => {
      const updateData = {
        Campo: 'nombre',
        Valor: 'Juan Pérez',
      };

      const errorMessage = 'Error de validación';
      (mockDatosUsuario.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
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

  describe('DELETE /datosUsuario/[id]', () => {
    it('debe eliminar un dato de usuario exitosamente', async () => {
      const deletedDatoUsuario = {
        _id: mockDatoUsuarioId,
        Campo: 'nombre',
        Valor: 'Juan Pérez',
      };

      (mockDatosUsuario.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedDatoUsuario);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedDatoUsuario);
      expect(mockDatosUsuario.findByIdAndDelete).toHaveBeenCalledWith(mockDatoUsuarioId);
    });

    it('debe retornar 404 cuando el dato de usuario a eliminar no existe', async () => {
      (mockDatosUsuario.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Dato de Usuario no encontrado');
    });

    it('debe manejar errores al eliminar dato de usuario', async () => {
      const errorMessage = 'Error de base de datos';
      (mockDatosUsuario.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockDatoUsuarioId });
      const req = new NextRequest('http://localhost:3000/api/datosUsuario/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});
