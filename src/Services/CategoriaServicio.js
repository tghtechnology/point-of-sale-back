import { connect } from "../database";

const crearCategoria = require('../Models/Categoria')

export const crearCategoria = async (nombre, color) => {

  const connection = await connect();
  const [results] = await connection.execute(
    "INSERT INTO categoria (nombre, color, estado) VALUES (?, ?, true)",
    [nombre, color]
  ); 

  return results;
}

module.exports = { crearCategoria }

