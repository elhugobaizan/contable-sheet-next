import Gasto from '@/app/models/Gasto';

describe('Gasto Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Gasto).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Gasto.modelName).toBe('Gasto');
  });
});
