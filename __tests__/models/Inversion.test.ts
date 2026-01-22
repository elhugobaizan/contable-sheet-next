import Inversion from '@/app/models/Inversion';

describe('Inversion Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Inversion).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Inversion.modelName).toBe('Inversion');
  });
});
