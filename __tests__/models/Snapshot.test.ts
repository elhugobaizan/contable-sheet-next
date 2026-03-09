import Snapshot from '@/app/models/Snapshot';

describe('Snapshot Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(Snapshot).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(Snapshot.modelName).toBe('Snapshot');
  });
});
