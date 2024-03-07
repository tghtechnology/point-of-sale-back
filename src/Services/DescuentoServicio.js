import {connect } from "../database"
const crearDescuento=async(nombre,tipo_descuento,valor,valor_calculado)=>{
    const connection=await connect()
    const [results] = await connection.execute(
        "INSERT INTO descuento(nombre, tipo_descuento, valor,valor_calculado, estado) VALUES(?,?,?,?,?)",
        [nombre, tipo_descuento, valor,valor_calculado, true]
    );
    return results;
}
module.exports={crearDescuento}