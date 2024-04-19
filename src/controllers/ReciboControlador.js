import * as ReciboServicio from "../Services/ReciboServicio"

export const ListarRecibo = async(_, res) => { 
    try {
        const recibos = await ReciboServicio.listarRecibo();
        res.status(200).json(recibos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al listar los recibos' });
      }
}

export const crearRecibo = async (req, res) => {
    //const id_venta = req.params.id;
    const { id_venta } = req.body
    const nuevoRecibo = await ReciboServicio.crearRecibo(id_venta)
    res.status(201).json(nuevoRecibo);
}