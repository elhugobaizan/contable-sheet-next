jest.mock('@/db');
jest.mock('@/app/models/Snapshot', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

import { POST } from '@/app/utiles/resumen/route';
import connectDB from '@/db';
import Snapshot from '@/app/models/Snapshot';

const mockConnectDB = connectDB as jest.MockedFunction<typeof connectDB>;
const mockSnapshot = Snapshot as jest.Mocked<typeof Snapshot>;

describe('Resumen API - Route /utiles/resumen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConnectDB.mockResolvedValue(undefined as any);
  });

  describe('POST /utiles/resumen', () => {
    it('debe devolver 400 cuando el cuerpo está vacío o no es JSON', async () => {
      const req = new Request('http://localhost:3000/utiles/resumen', {
        method: 'POST',
        body: 'invalid',
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.error).toContain('inválido');
    });

    it('debe devolver 400 cuando data no es un objeto', async () => {
      const req = new Request('http://localhost:3000/utiles/resumen', {
        method: 'POST',
        body: JSON.stringify(null),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      const data = await res.json();
      expect(res.status).toBe(400);
      expect(data.error).toContain('data');
    });

    it('debe devolver 500 cuando connectDB falla', async () => {
      mockConnectDB.mockRejectedValue(new Error('DB error'));
      const req = new Request('http://localhost:3000/utiles/resumen', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            netoActual: 1000,
            cotizacionesOficial: { venta: 1000 },
            disponible: 500,
            totalPlazosFijos: 0,
            totalCriptos: 0,
            fondos: 0,
            deudaAFavor: 0,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      const data = await res.json();
      expect(res.status).toBe(500);
      expect(data.error).toBeDefined();
    });

    it('debe crear snapshot y devolver 200 cuando no existe para el mes', async () => {
      (mockSnapshot.findOne as jest.Mock).mockResolvedValue(null);
      const created = {
        _id: 'snap1',
        Annio: new Date().getFullYear(),
        Mes: new Date().getMonth() + 1,
        PatrimonioNetoARS: 1000,
        PatrimonioNetoUSD: 1,
      };
      (mockSnapshot.create as jest.Mock).mockResolvedValue(created);
      const req = new Request('http://localhost:3000/utiles/resumen', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            netoActual: 1000,
            cotizacionesOficial: { venta: 1000 },
            disponible: 500,
            totalPlazosFijos: 0,
            totalCriptos: 0,
            fondos: 0,
            deudaAFavor: 0,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.message).toBeDefined();
      expect(data.snapshot).toBeDefined();
      expect(mockSnapshot.findOne).toHaveBeenCalled();
      expect(mockSnapshot.create).toHaveBeenCalled();
    });

    it('debe devolver snapshot existente cuando ya existe para el mes', async () => {
      const existing = {
        _id: 'snap0',
        Annio: new Date().getFullYear(),
        Mes: new Date().getMonth() + 1,
      };
      (mockSnapshot.findOne as jest.Mock).mockResolvedValue(existing);
      const req = new Request('http://localhost:3000/utiles/resumen', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            netoActual: 2000,
            cotizacionesOficial: { venta: 1000 },
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const res = await POST(req);
      const data = await res.json();
      expect(res.status).toBe(200);
      expect(data.snapshot).toEqual(existing);
      expect(mockSnapshot.create).not.toHaveBeenCalled();
    });
  });
});
