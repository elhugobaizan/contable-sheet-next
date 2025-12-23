import { GET, PUT, DELETE } from '@/app/wallets/[id]/route';
import { NextRequest } from 'next/server';
import Wallet from '@/app/models/Wallet';
import connectDB from '@/db';

// Mock de las dependencias
jest.mock('@/db');
jest.mock('@/app/models/Wallet');

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockWallet = Wallet as jest.Mocked<typeof Wallet>;

describe('Wallets API - Route /wallets/[id]', () => {
  const mockWalletId = '507f1f77bcf86cd799439011';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue({} as any);
  });

  describe('GET /wallets/[id]', () => {
    it('debe obtener un wallet por ID exitosamente', async () => {
      const mockWalletData = {
        _id: mockWalletId,
        Nombre: 'Wallet Test',
        Inicio: '2024-01-01T00:00:00.000Z',
        Interes: 3,
        Efectivo: 1500,
        Logo: 'logo.png',
        CVU: '123456789',
        Alias: 'wallet-test',
      };

      (mockWallet.findById as jest.Mock).mockResolvedValue(mockWalletData);

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockWalletData);
      expect(mockWallet.findById).toHaveBeenCalledWith(mockWalletId);
    });

    it('debe retornar 404 cuando el wallet no existe', async () => {
      (mockWallet.findById as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Wallet no encontrada');
      expect(mockWallet.findById).toHaveBeenCalledWith(mockWalletId);
    });

    it('debe manejar errores al obtener wallet', async () => {
      const errorMessage = 'Error de base de datos';
      (mockWallet.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const response = await GET(new NextRequest('http://localhost:3000/api/wallets/123'), { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });

  describe('PUT /wallets/[id]', () => {
    it('debe actualizar un wallet exitosamente', async () => {
      const updateData = {
        Nombre: 'Wallet Actualizado',
        Inicio: '2024-02-01',
        Interes: 5,
        Efectivo: 2000,
        Logo: 'new-logo.png',
        CVU: '987654321',
        Alias: 'wallet-updated',
      };

      const updatedWallet = {
        _id: mockWalletId,
        ...updateData,
        Inicio: '2024-02-01T00:00:00.000Z',
      };

      (mockWallet.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedWallet);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(updatedWallet);
      expect(mockWallet.findByIdAndUpdate).toHaveBeenCalledWith(
        mockWalletId,
        {
          Nombre: updateData.Nombre,
          Inicio: updateData.Inicio,
          Interes: updateData.Interes,
          Efectivo: updateData.Efectivo,
          Logo: updateData.Logo,
          CVU: updateData.CVU,
          Alias: updateData.Alias,
        },
        { new: true, runValidators: true }
      );
    });

    it('debe usar valores por defecto para campos opcionales al actualizar', async () => {
      const updateData = {
        Nombre: 'Wallet Parcial',
        Inicio: '2024-02-01',
      };

      const updatedWallet = {
        _id: mockWalletId,
        Nombre: updateData.Nombre,
        Inicio: '2024-02-01T00:00:00.000Z',
        Interes: 0,
        Efectivo: 0,
        Logo: '',
        CVU: '',
        Alias: '',
      };

      (mockWallet.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedWallet);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });

      expect(response.status).toBe(200);
      expect(mockWallet.findByIdAndUpdate).toHaveBeenCalledWith(
        mockWalletId,
        {
          Nombre: updateData.Nombre,
          Inicio: updateData.Inicio,
          Interes: 0,
          Efectivo: 0,
          Logo: '',
          CVU: '',
          Alias: '',
        },
        { new: true, runValidators: true }
      );
    });

    it('debe retornar 404 cuando el wallet a actualizar no existe', async () => {
      const updateData = {
        Nombre: 'Wallet No Existe',
        Inicio: '2024-02-01',
      };

      (mockWallet.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await PUT(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Wallet no encontrada');
    });

    it('debe manejar errores al actualizar wallet', async () => {
      const updateData = {
        Nombre: 'Wallet Error',
        Inicio: '2024-02-01',
      };

      const errorMessage = 'Error de validación';
      (mockWallet.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
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

  describe('DELETE /wallets/[id]', () => {
    it('debe eliminar un wallet exitosamente', async () => {
      const deletedWallet = {
        _id: mockWalletId,
        Nombre: 'Wallet a Eliminar',
        Inicio: '2024-01-01T00:00:00.000Z',
        Interes: 0,
        Efectivo: 1000,
        Logo: '',
        CVU: '',
        Alias: '',
      };

      (mockWallet.findByIdAndDelete as jest.Mock).mockResolvedValue(deletedWallet);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(deletedWallet);
      expect(mockWallet.findByIdAndDelete).toHaveBeenCalledWith(mockWalletId);
    });

    it('debe retornar 404 cuando el wallet a eliminar no existe', async () => {
      (mockWallet.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.error).toBe('Wallet no encontrada');
    });

    it('debe manejar errores al eliminar wallet', async () => {
      const errorMessage = 'Error de base de datos';
      (mockWallet.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const params = Promise.resolve({ id: mockWalletId });
      const req = new NextRequest('http://localhost:3000/api/wallets/123', {
        method: 'DELETE',
      });

      const response = await DELETE(req, { params });
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe(errorMessage);
    });
  });
});

