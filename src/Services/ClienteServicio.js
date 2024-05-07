import {connect} from "../database"
import { validarNombrePais } from "../helpers/helperPais";
import { PrismaClient } from "@prisma/client";
import { getUTCTime } from "../Utils/Time";
//Inicialización de prisma
const prisma = new PrismaClient();
//Crear clientes
const crearCliente = async (nombre, email, telefono, direccion, ciudad, region, pais) => {
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
          email: email,
          estado:true
      }
      });

      if (clienteExistente) {
          throw new Error("El correo electrónico ya está en uso");
      }
    const todayISO = new Date().toISOString()
    const fecha_creacion = getUTCTime(todayISO)
    const newCliente=await prisma.cliente.create({
      data:{
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            region: region,
            pais: pais,
            fecha_creacion:fecha_creacion,
            fecha_modificacion: null,
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
          id: Number(id),
          estado: true
        }
      })
      return cliente;
}

//Editar cliente
const editarCliente = async (id, nombre, email, telefono, direccion, ciudad, region, pais) => {
    if (!validarNombrePais(pais)) {
      throw new Error("País inválido");
    }
    const clienteExistente = await prisma.cliente.findUnique({
      where: {
          id: Number(id)
      }
      });
      if(!clienteExistente){
        throw new Error("Cliente no encontrado");
      }
      
    const todayISO = new Date().toISOString()
    const fecha_modificacion = getUTCTime(todayISO)
    const cliente=await prisma.cliente.update({
      where: {
        id: Number(id),
        estado: true
      },
      data:{
            nombre: nombre,
            email: email,
            telefono: telefono,
            direccion: direccion,
            ciudad: ciudad,
            region: region,
            pais: pais,
            fecha_modificacion: fecha_modificacion,
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
        pais:cliente.pais,
        fecha_creacion:cliente.fecha_creacion,
        fecha_modificacion:cliente.fecha_modificacion,
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
