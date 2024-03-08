import * as DescuentoServicio from "../Services/DescuentoServicio"
//Creacion de un nuevo descuento
export const crearDescuento = async (req, res) => {
    try {
        const {nombre,tipo_descuento,valor}=req.body
        const id=await DescuentoServicio.crearDescuento(nombre,tipo_descuento,valor)
        // Devolver el descuento creado con su estado
        const newDescuento = {
            id: id,
            nombre: nombre,
            tipo_descuento: tipo_descuento,
            valor: valor,
            estado: true
        };

        res.status(201).json(newDescuento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Eliminar descuento
export const eliminarDescuento=async (req, res)=>{
    try{
    const id=req.params.id;
    await DescuentoServicio.eliminarDescuento(id);
    res.status(200).json({ mensaje: 'Descuento eliminado' });
}catch(error) {
    res.status(500).json({ error: error.message });
}
}

//Obtener descuento por id
export const obtenerDescuentoById=async (req, res)=>{
    try{
        const id=req.params.id;
        const descuento=await DescuentoServicio.obtenerDescuentoById(id);
        res.status(200).json(descuento);
    }catch(error) {
        res.status(500).json({ error: error.message });
    }
};

//Modificar un descuento
export const modificarDescuento = async (req, res) => {
    try {
        const id=req.params.id;
        const{nombre,tipo_descuento,valor,estado}=req.body
        const resultado =await DescuentoServicio.modificarDescuento(id,nombre,tipo_descuento,valor,estado);
   
        if (resultado) {
            res.sendStatus(204); // Envía respuesta de éxito
        } else {
            res.status(404).json({ message: 'Descuento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

//Obtener todos los descuentos
export const obtenerDescuentos = async (req, res) => {
    try{
        const descuentos=await DescuentoServicio.obtenerDescuentos();
        res.status(200).json(descuentos);
    }catch(error){
        res.status(500).json({error: error.message});
    }
  };
  export const cambiarEstadoDescuento = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        console.log('Estado recibido:', estado); // Imprimir el estado recibido

        // Llama al servicio para cambiar el estado del descuento
        await DescuentoServicio.cambiarEstadoDescuento(id, estado);

        // Si todo salió bien, responde con un código 204 (No Content)
        res.sendStatus(204);
    } catch (error) {
        // Si hay un error, responde con un código 500 (Internal Server Error) y el mensaje de error
        res.status(500).json({ error: error.message });
    }
};
