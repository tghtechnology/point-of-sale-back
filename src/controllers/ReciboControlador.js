import * as ReciboServicio from "../Services/ReciboServicio"

export const ListarRecibo = async(req, res) => { 
    try {
        const recibos = await ReciboServicio.listarRecibo();
        res.status(200).json(recibos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar los recibos' });
      }
}

export const CrearRecibo = async (req, res) => {
    const Rec = await ReciboServicio.CrearRecibo()
    res.status(201).json(Rec)
}
export const Reembolsar=async(req,res)=>{
  const { id, detalles } = req.body;
  try {
    const reciboReembolso = await ReciboServicio.Reembolsar(id, detalles);
    res.status(201).json( reciboReembolso );
  } catch (error) {
    console.error("Error al realizar el reembolso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}
export const ListarReciboById=async(req, res)=>{
  const id = req.params.id;
  try {
    const recibo = await ReciboServicio.ListarReciboById(id);
    res.status(200).json(recibo);
  } catch (error) {
    console.error("Error al obtener el recibo:", error.message);
    res.status(500).json({ mensaje: "Error al obtener el recibo." });
  }
}
export const ListarRecibosByVenta=async(req,res)=>{
  const { id_venta } = req.params;
  try{
    const recibos = await ReciboServicio.ListarReciboByVenta(id_venta);
    res.status(200).json(recibos);
  }
  catch(error){
    res.status(500).json({ mensaje: 'Error al obtener los detalles de la venta de dicha venta' });
  }
}