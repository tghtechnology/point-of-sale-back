import { PrismaClient } from "@prisma/client";
import * as DTOInsert from "../DTOS/ImpuestoDTO/ImpuestoDTOForInsert"
import * as DTOMin from "../DTOS/ImpuestoDTO/ImpuestoDTOMinimal"
import * as DTOList from "../DTOS/ImpuestoDTO/ImpuestoDTOForList"

const prisma = new PrismaClient();

//Crear un impuesto
export const crearImpuesto = async (nombre, tasa, tipo_impuesto) => {
    
    //Validación tipo de dato de tasa
    if (!tasa) {throw new Error("Campo tasa vacío")}
    if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

    //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}
    
    //Llamado al dto de crear
    const imp = await DTOInsert.toCreate(nombre, tasa, tipo_impuesto)

    //Dar formato
    const impuestoFormato = DTOMin.DTOFormat(imp.id, imp.nombre, imp.tasa, imp.tipo_impuesto);
    return impuestoFormato
}

export const listarImpuestos = async () => {

    //Llamado al dto de listar
    const impuestos = await DTOList.toList()
    return impuestos
}

export const listarImpuestoPorId = async (id) => {

    //Llamado al dto de listar por id
    const impuesto = await DTOList.toListById(id)

    //Si el id no existe
    if (id === null) {throw new Error("ID no encontrado")}

    return impuesto
}

export const modificarImpuesto = async (id, nombre, tasa, tipo_impuesto) => {

     //Validación tipo de dato de tasa
     if (!tasa) {throw new Error("Campo tasa vacío")}
     if (typeof tasa !== 'number' || isNaN(parseFloat(tasa)) || !isFinite(tasa)) {throw new Error("Tasa no es número válido")}

     //Validación tipo de impuesto
    let tipo = tipo_impuesto.replace(/\s+/g, '-').replace(/ñ/g, 'n');
    const TiposPermitidos = ['Incluido_en_el_precio', 'Anadido_al_precio'];
    if (!TiposPermitidos.includes(tipo)) {throw new Error("tipo_impuesto no válido")}

    //Llamado al dto de editar
    const imp = await DTOInsert.toEdit(id, nombre, tasa, tipo_impuesto) 
    if (imp == null) {return null}

    //Validación nombre
    if (!nombre || nombre.length < 1) {throw new Error("Campo nombre vacío")}

    //Dar formato
    const impuestoFormato = DTOMin.DTOFormat(imp.id, imp.nombre, imp.tasa, imp.tipo_impuesto);
    return impuestoFormato
}

export const eliminarImpuesto = async (id) => {

    //Buscar por id
    const impuestoExistente = await prisma.impuesto.findUnique({
        where: {
          id: parseInt(id)
        }
    })

    //Si no existe el id
    if (!impuestoExistente) { return null}

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