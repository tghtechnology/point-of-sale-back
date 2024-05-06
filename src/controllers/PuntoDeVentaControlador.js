import * as PuntoDeVentaServicio from "../Services/PuntoDeVentaServicio";

export const listarPOS = async (_, res) => {
    try{
      const pos = await PuntoDeVentaServicio.listarPOS()
      res.status(201).json(pos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el impuesto.' });
    }
}

export const listarPOSPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const pos = await PuntoDeVentaServicio.listarPOS(id)
        if (!pos) {
            return res.status(404).json({ error: "No se encontró el punto de venta" });
        }
        res.status(201).json(pos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el impuesto.' });
    }
}

export const eliminarPOS = async (req, res) => {
    try {
      const id = req.params.id;
      const pos = await PuntoDeVentaServicio.eliminarPOS(id);
      if (!pos) {
        return res.status(404).json({ error: 'Punto de venta no encontrado' });
      }
      res.status(200).json({ mensaje: 'Punto de venta eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el punto de venta.' });
    }
  }
