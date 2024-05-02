class Usuario {
  constructor(id, nombre, email, pais, password, estado) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.pais = pais;
    this.password = password;
    this.estado = estado;
  }
}

module.exports(Usuario);