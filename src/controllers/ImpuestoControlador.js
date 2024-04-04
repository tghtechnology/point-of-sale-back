import * as ImpuestoServicio from "../Services/ImpuestoServicio"

//Crear nueva categoría
export const crearImpuesto = async (req, res) => {
  try{
    const { nombre, tasa, tipo_impuesto } = req.body;
    const impuesto = await ImpuestoServicio.crearImpuesto(nombre, tasa, tipo_impuesto)
    res.status(201).json(impuesto);
  } catch (error) {
        //Manejo bad request
        if (error.message === "Campo nombre vacío") {
            return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
        } else if (error.message === "Campo tasa vacío") {
            return res.status(400).json({ error: "El campo tasa no puede estar vacío" });
        } else if (error.message === "Tasa no es número válido") {
            return res.status(400).json({ error: "El campo tasa solo puede ser un número" });
        } else if (error.message === "tipo_impuesto no válido") {
            return res.status(400).json({ error: "El tipo de impuesto no es válido" });
        } else {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el impuesto.' });
    }
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
    try {
        const id = req.params.id;
        const impuesto = await ImpuestoServicio.listarImpuestoPorId(id);
        if (impuesto == null) {
            return res.status(400).json({ error: "No se encontró el impuesto" });
        }
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
  
      if (impuesto == null) {
        return res.status(404).json({ error: 'Impuesto no encontrado' });
      }

      res.status(200).json(impuesto); 
    } catch (error) {
        //Manejo bad request
        if (error.message === "Campo nombre vacío") {
            return res.status(400).json({ error: "El campo nombre no puede estar vacío" });
        } else if (error.message === "Campo tasa vacío") {
            return res.status(400).json({ error: "El campo tasa no puede estar vacío" });
        } else if (error.message === "Tasa no es número válido") {
            return res.status(400).json({ error: "El campo tasa solo puede ser un número" });
        } else if (error.message === "tipo_impuesto no válido") {
            return res.status(400).json({ error: "El tipo de impuesto no es válido" });
        } else {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el impuesto' });
    }
  };
}

//Eliminar impuesto
export const eliminarImpuesto = async (req, res) => {
    try {
      const id = req.params.id;
      const impuesto = await ImpuestoServicio.eliminarImpuesto(id);
      if (impuesto == null) {
        return res.status(404).json({ error: 'Impuesto no encontrado' });
      }
      res.status(200).json({ mensaje: 'Impuesto eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el impuesto.' });
    }
  }