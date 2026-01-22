import Fijo from '@/app/models/Fijo';

describe('Fijo Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Fijo).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Fijo.modelName).toBe('Fijo');
  });
});
