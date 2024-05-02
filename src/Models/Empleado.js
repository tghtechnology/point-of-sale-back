class Empleado {
  constructor(id, nombre, correo, telefono, estado) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.estado = estado;
  }
}

module.exports(Empleado);