import Principal from '@/app/models/Principal';

describe('Principal Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Principal).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Principal.modelName).toBe('Principal');
  });
});
