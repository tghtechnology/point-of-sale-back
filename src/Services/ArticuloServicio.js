import { connect } from "../database";

const Articulo = require('../Models/Articulo')

class ArticuloServicio {
    async crearArticulo() {
        "INSERT INTO articulos (nombre, tipo_venta, precio, coste, ref, representacion, id_categoria) VALUES (?, ?, ?, ?, ?, ?, ?)"
    }
}