import { connect } from "../database";
const Categoria = require('../Models/Categoria')

const crearCategoria = async (nombre, color) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "INSERT INTO categoria (nombre, color, estado) VALUES (?, ?, true)",
    [nombre, color]
  ); 

  return results;
}

module.exports = { crearCategoria }

