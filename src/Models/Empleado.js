class Empleado {
  constructor(id, nombre, correo, telefono, pin, estado) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.estado = estado;
  }
}

module.exports(Empleado);
