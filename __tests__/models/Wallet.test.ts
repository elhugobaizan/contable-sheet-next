import Wallet from '@/app/models/Wallet';

describe('Wallet Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Wallet).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Wallet.modelName).toBe('Wallet');
  });
});
