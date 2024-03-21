import * as DescuentoServicio from "../Services/DescuentoServicio"
//Creacion de un nuevo descuento
export const crearDescuento = async (req, res) => {
    try {
        const {nombre,tipo_descuento,valor}=req.body
        const newDescuento=await DescuentoServicio.crearDescuento(nombre,tipo_descuento,valor)
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
        if (descuento){
        res.status(200).json(descuento);
        }else{
            res.status(404).json({ mensaje: 'Descuento no encontrado' });
        }
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
            res.status(200).json(resultado);
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
  //Cambio de estado 
  export const cambiarEstadoDescuento = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        console.log('Estado recibido:', estado); 
        await DescuentoServicio.cambiarEstadoDescuento(id, estado);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const obtenerDescuentosEliminados =async (req,res)=>{
    try{
        const descuentoseliminados=await DescuentoServicio.obtenerDescuentosEliminados();
        res.status(200).json(descuentoseliminados);

    }catch(error){
        res.status(500).json({error: error.message});
    }
}
