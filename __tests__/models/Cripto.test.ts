import Cripto from '@/app/models/Cripto';

describe('Cripto Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Cripto).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Cripto.modelName).toBe('Cripto');
  });
});
