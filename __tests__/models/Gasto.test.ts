import { Gasto } from '@/app/models';

describe('Gasto Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Gasto).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto (alias de Movimiento)', () => {
    expect(Gasto.modelName).toBe('Movimiento');
  });
});
