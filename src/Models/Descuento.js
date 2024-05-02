class Descuento {
  constructor(id, nombre, tipo_descuento, valor, valor_calculado, estado) {
    this.id = id;
    this.nombre = nombre;
    this.tipo_descuento = tipo_descuento;
    this.valor = valor;
    this.valor_calculado = valor_calculado;
    this.estado = estado;
  }
}

module.exports(Descuento);
