import DatosUsuario from '@/app/models/DatosUsuario';

describe('DatosUsuario Model', () => {
  it('debe exportar el modelo correctamente', () => {
    expect(DatosUsuario).toBeDefined();
  });

  it('debe tener el nombre del modelo correcto', () => {
    expect(DatosUsuario.modelName).toBe('DatosUsuario');
  });
});
