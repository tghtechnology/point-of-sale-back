import { connect } from "../database";
import { PrismaClient } from "@prisma/client";

//Inicialización de prisma
const prisma = new PrismaClient();

const crearDescuento = async (nombre, tipo_descuento, valor) => {
  //Opciones de tipos de descuento que se deben ingresar
  const tiposValidos = ["PORCENTAJE", "MONTO"];
  //En el caso se ingrese otro tipo
  if (!tiposValidos.includes(tipo_descuento)) {
    throw new Error("Tipo de descuento no válido");
  }
  let valor_calculado = valor;
  // En el caso que se ingrese porcentaje(%)
  if (tipo_descuento === "PORCENTAJE") {
    // Convierte el valor a un porcentaje decimal
    valor_calculado = parseFloat(valor) / 100;
  }
  // En el caso que se ingrese un monto($)
  else if (tipo_descuento === "MONTO") {
    //Se mantiene el valor tal y como se ingreso
    valor_calculado = parseFloat(valor);
  }
  const newDescuento = await prisma.descuento.create({
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: valor_calculado,
      estado: true,
    },
  });
  return newDescuento;
};
const eliminarDescuento = async (id) => {

  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      estado: false,
    },
  });
};

const obtenerDescuentoById = async (id) => {

  const descuento = await prisma.descuento.findFirst({
    where: {
      id: Number(id),
    },
  });
  return descuento;
};

const modificarDescuento = async (
  id,
  nombre,
  tipo_descuento,
  valor,
  estado
) => {

  const tiposValidos = ["PORCENTAJE", "MONTO"];
  // Validar tipo de descuento
  if (!tiposValidos.includes(tipo_descuento)) {
    throw new Error("Tipo de descuento no válido");
  }
  // Calcular valor calculado
  let nuevoValorCalculado = valor;
  if (tipo_descuento === "PORCENTAJE") {
    nuevoValorCalculado = parseFloat(valor) / 100;
  }
  if (tipo_descuento === "MONTO") {
    nuevoValorCalculado = parseFloat(valor);
  }

  // Verificar si se proporciona el estado
  let nuevoEstado;
  if (estado !== undefined) {
    nuevoEstado = estado;
  }

  // Actualizar descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      nombre: nombre,
      tipo_descuento: tipo_descuento,
      valor: valor,
      valor_calculado: nuevoValorCalculado,
      estado: nuevoEstado,
    },
  });
  const updatedDescuento = {
    nombre: descuento.nombre,
    tipo_descuento: descuento.tipo_descuento,
    valor: descuento.valor,
    valor_calculado: descuento.valor_calculado,
    estado: descuento.estado,
  };

  return updatedDescuento;
};
const obtenerDescuentos = async () => {
  const descuentos = await prisma.descuento.findMany({
    where: {
      estado: true,
    },
  });
  return descuentos;
};

const obtenerDescuentosEliminados = async () => {

  const descuentoseliminados = await prisma.descuento.findMany({
    where: {
      estado: false,
    },
  });
  return descuentoseliminados;
};
const cambiarEstadoDescuento = async (id, nuevoEstado) => {
  // Actualizar solo el estado del descuento en la base de datos
  const descuento = await prisma.descuento.update({
    where: {
      id: Number(id),
    },
    data: {
      estado: nuevoEstado,
    },
  });
};

module.exports = {
  crearDescuento,
  eliminarDescuento,
  obtenerDescuentoById,
  modificarDescuento,
  obtenerDescuentos,
  cambiarEstadoDescuento,
  obtenerDescuentosEliminados,
};
