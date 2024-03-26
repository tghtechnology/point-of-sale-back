export const DTOFormat = (id, nombre, tasa, tipo_impuesto) => {

    const Formato = {
        id: id,
        nombre: nombre, 
        tasa: tasa,
        tipo_impuesto: tipo_impuesto,
    };

    return Formato;
}