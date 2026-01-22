import { GET } from '@/app/route';

describe('Root API - Route /', () => {
  describe('GET /', () => {
    it('debe retornar un mensaje de bienvenida', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Contable del Hugo - API con Next' });
    });
  });
});
