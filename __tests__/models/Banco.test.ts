import Banco from '@/app/models/Banco';

describe('Banco Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Banco).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Banco.modelName).toBe('Banco');
  });
});
