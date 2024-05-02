class Articulo {
  constructor(
    id,
    nombre,
    tipo_venta,
    precio,
    coste,
    ref,
    representacion,
    id_categoria,
    estado
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo_venta = tipo_venta;
    this.precio = precio;
    this.coste = coste;
    this.ref = ref;
    this.representacion = representacion;
    this.id_categoria = id_categoria;
    this.estado = estado;
  }
}

//module.exports(Articulo)
