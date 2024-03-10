import {connect } from "../database"
const crearDescuento=async(nombre,tipo_descuento,valor)=>{    
    const connection=await connect()
    //Opciones de tipos de descuento que se deben ingresar
    const tiposValidos = ['%', '$'];
    //En el caso se ingrese otro tipo
    if (!tiposValidos.includes(tipo_descuento)) {
        return res.status(400).json({ message: 'Tipo de descuento no válido' });
    }
    let valor_calculado=valor
    // En el caso que se ingrese porcentaje(%)
    if (tipo_descuento === '%') {
        // Convierte el valor a un porcentaje decimal
        valor_calculado = parseFloat(valor) / 100;
    }
    // En el caso que se ingrese un monto($)
    else if (tipo_descuento === '$') {
        //Se mantiene el valor tal y como se ingreso
        valor_calculado = parseFloat(valor);
    } 
    const [results] = await connection.execute(
        "INSERT INTO descuento(nombre, tipo_descuento, valor,valor_calculado, estado) VALUES(?,?,?,?,?)",
        [nombre, tipo_descuento, valor,valor_calculado, true]
    );
    return results;
}
const eliminarDescuento =async (id)=>{
    const connection = await connect();
        // Actualizar solo el estado del descuento en la base de datos
        await connection.execute(
            'UPDATE descuento SET estado = false WHERE id = ?',
            [id]
        );
}

const obtenerDescuentoById=async (id) => {
    const connection = await connect();
    const [rows] = await connection.execute("SELECT * FROM descuento WHERE id = ?", [id]);
  return rows[0];
}

const modificarDescuento = async (id, nombre, tipo_descuento, valor, estado) => {
        const connection = await connect();
        const tiposValidos = ['%', '$'];
        // Validar tipo de descuento
        if (!tiposValidos.includes(tipo_descuento)) {
            throw new Error('Tipo de descuento no válido');
        }
        // Calcular valor calculado
        let nuevoValorCalculado = valor;
        if (tipo_descuento === '%') {
            nuevoValorCalculado = parseFloat(valor) / 100;
        }
        if (tipo_descuento === '$') {
            nuevoValorCalculado = parseFloat(valor);
        }

        // Verificar si se proporciona el estado
        let nuevoEstado;
        if (estado !== undefined) {
            nuevoEstado = estado;
        } else {
            // Si no se proporciona, mantener el estado existente
            const [existingResult] = await connection.query("SELECT estado FROM descuento WHERE id = ?", [id]);
            if (existingResult.length === 0) {
                throw new Error('Descuento no encontrado');
            }
            nuevoEstado = existingResult[0].estado;
        }

        // Actualizar descuento en la base de datos
        await connection.query("UPDATE descuento SET nombre = ?, tipo_descuento = ?, valor = ?, valor_calculado = ?, estado = ? WHERE id = ?", [
            nombre, tipo_descuento, valor, nuevoValorCalculado, nuevoEstado, id
        ]);

        return true;
    
};
const obtenerDescuentos=async()=>{
    const connection = await connect();
    const [rows] = await connection.execute("SELECT * FROM descuento WHERE estado = true");
    return rows;
};
const obtenerDescuentosEliminados=async()=>{
    const connection = await connect();
    const [rows] = await connection.execute("SELECT * FROM descuento WHERE estado = false");
    return rows;
};
const cambiarEstadoDescuento = async (id, nuevoEstado) => {
        const connection = await connect();
        // Actualizar solo el estado del descuento en la base de datos
        const [result] = await connection.execute(
            'UPDATE descuento SET estado = ? WHERE id = ?',
            [nuevoEstado, id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Descuento no encontrado');
        }
};

module.exports={
    crearDescuento,
    eliminarDescuento,
    obtenerDescuentoById,
    modificarDescuento,
    obtenerDescuentos,
    cambiarEstadoDescuento,
    obtenerDescuentosEliminados
}