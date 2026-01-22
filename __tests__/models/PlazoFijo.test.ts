import PlazoFijo from '@/app/models/PlazoFijo';

describe('PlazoFijo Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(PlazoFijo).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(PlazoFijo.modelName).toBe('PlazoFijo');
  });
});
