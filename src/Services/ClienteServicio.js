import {connect} from "../database"
import { validarNombrePais } from "../helpers/helperPais";
import { PrismaClient } from "@prisma/client";
//Inicialización de prisma
const prisma = new PrismaClient();
//Crear clientes
const crearCliente = async (nombre, email, telefono, direccion, ciudad, region, codigo_postal, pais) => {
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }

    const newCliente=await prisma.cliente.create({
      data:{
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            region: region,
            codigo_postal: codigo_postal,
            pais: pais,
            estado:true
      }
    })
    return newCliente
}; 

//Listar clientes
const listarClientes= async()=>{
    const clientes= await prisma.cliente.findMany({
        where: {
          estado: true
        }
      })
      return clientes;
}

//Listar por id
const obtenerClienteById=async (id) => {
    const cliente= await prisma.cliente.findFirst({
        where: {
          id: Number(id)
        }
      })
      return cliente;
}

//Editar cliente
const editarCliente = async (id, nombre, email, telefono, direccion, ciudad, region, codigo_postal, pais) => {
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }
    const cliente=await prisma.cliente.update({
      where: {
        id: Number(id)
      },
      data:{
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            region: region,
            codigo_postal: codigo_postal,
            pais: pais,
            estado:true
      }
    })
    const updatedCliente={
        nombre:cliente.nombre,
        email:cliente.email,
        telefono:cliente.telefono,
        direccion:cliente.direccion,
        ciudad:cliente.ciudad,
        region:cliente.region,
        codigo_postal:cliente.codigo_postal,
        pais:cliente.pais,
        estado:cliente.estado
    }
    return updatedCliente
};

//Eliminar cliente
const eliminarCliente = async (id) => {
    const cliente=await prisma.cliente.update({
      where: {
        id: Number(id)
      },
      data:{
            estado: false
      }
    })
};

module.exports={
    crearCliente,
    listarClientes,
    obtenerClienteById,
    editarCliente,
    eliminarCliente
}
