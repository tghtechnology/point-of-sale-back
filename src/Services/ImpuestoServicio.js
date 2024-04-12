import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Crear un impuesto
export const crearImpuesto = async (nombre, tasa, tipo_impuesto) => {
    
    //Validación tipo de dato de tasa
    if (!tasa) {throw new Error("Campo tasa vacío")}
    if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

    console.log(tipo_impuesto)
    //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
    
    const newImpuesto = await prisma.impuesto.create({
        data: {
          nombre: nombre,
          tasa: tasa,
          tipo_impuesto: tipo_impuesto,
          estado: true
        },
      })
    
      const impuestoFormato = {
        id: newImpuesto.id,
        nombre: newImpuesto.nombre,
        tasa: newImpuesto.tasa,
        tipo_impuesto: newImpuesto.tipo_impuesto
      }
      return impuestoFormato; 
}

export const listarImpuestos = async () => {

    const allImpuestos = await prisma.impuesto.findMany({
        where: {
          estado: true
        }
      })
    
      const impuestoFormato = allImpuestos.map((impuesto) => {
        return {
          id: impuesto.id,
          nombre: impuesto.nombre,
          tasa: impuesto.tasa,
          tipo_impuesto: impuesto.tipo_impuesto
        };
      });
      return impuestoFormato;
}

export const listarImpuestoPorId = async (id) => {

    const impuesto = await prisma.impuesto.findUnique({
        where: {
          id: parseInt(id),
          estado: true
        }
      })
    
      //Si el id no existe
      if (!impuesto) {return null}
    
      const impuestoFormato = {
        id: impuesto.id,
        nombre: impuesto.nombre,
        tasa: impuesto.tasa,
        tipo_impuesto: impuesto.tipo_impuesto
    }
      return impuestoFormato;
}

export const modificarImpuesto = async (id, nombre, tasa, tipo_impuesto) => {

     //Validación tipo de dato de tasa
     if (!tasa) {throw new Error("Campo tasa vacío")}
     if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

     //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    const impuesto = await prisma.impuesto.update({
        where: {
          id: parseInt(id),
          estado: true
        },
        data: {
          nombre: nombre,
          tasa: tasa,
          tipo_impuesto: tipo_impuesto
        }
      })

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}

    const impuestoFormato = {
        id: impuesto.id,
        nombre: impuesto.nombre,
        tasa: impuesto.tasa,
        tipo_impuesto: impuesto.tipo_impuesto
      }
      return impuestoFormato;
}

export const eliminarImpuesto = async (id) => {

    //Buscar si existe una categoría con el id
  const impuestoExistente = await prisma.impuesto.findUnique({
    where: {
      id: parseInt(id),
      estado: true
    }
  })

  //Si el id no existe
  if (!impuestoExistente) {return null}

  const impuesto = await prisma.impuesto.update({
    where: {
      id: parseInt(id),
      estado: true
    },
    data: {
      estado: false
    }
  })
  return impuesto
}