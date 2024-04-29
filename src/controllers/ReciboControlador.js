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
  try {
    const { id, detalles } = req.body; 
    const reciboReembolso = await ReciboServicio.Reembolsar(id, detalles);
    res.status(201).json( reciboReembolso );
  } catch (error) {
    console.error("Error al realizar el reembolso:", error);
    res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
  }
}