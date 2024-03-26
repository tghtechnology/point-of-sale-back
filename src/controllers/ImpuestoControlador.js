import * as ImpuestoServicio from "../Services/ImpuestoServicio"

//Crear nueva categoría
export const crearImpuesto = async (req, res) => {
  try{
    const { nombre, tasa, tipo_impuesto } = req.body;
    const nuevoImpuesto = await ImpuestoServicio.crearImpuesto(nombre, tasa, tipo_impuesto)

    res.status(201).json(nuevoImpuesto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el impuesto.' });
  }
};

export const listarImpuestos = async (req, res) => {
    try {
      const impuestos = await ImpuestoServicio.listarImpuestos();
      res.status(200).json(impuestos)
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los impuestos.' });
    }
  };

export const listarImpuestoPorId = async (req, res) => {

    const id = req.params.id;
    try {
        const impuesto = await ImpuestoServicio.listarImpuestoPorId(id);
    res.status(200).json(impuesto)
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener el impuesto.' });
    }
}

//Actualizar impuesto
export const actualizarImpuesto = async (req, res) => {
    try {
      const id=req.params.id;
      const{nombre, tasa, tipo_impuesto}=req.body
      const impuesto = await ImpuestoServicio.modificarImpuesto(id, nombre, tasa, tipo_impuesto);
  
      if (!impuesto) {
        res.status(404).json({ message: 'Impuesto no encontrado' });
      }
      res.status(200).json(impuesto); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el impuesto' });
    }
  };

//Eliminar impuesto
export const eliminarImpuesto = async (req, res) => {
    try {
      const id = req.params.id;
      await ImpuestoServicio.eliminarImpuesto(id);
      res.status(200).json({ mensaje: 'Impuesto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el impuesto.' });
    }
  };