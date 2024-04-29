import { v2 as cloudinary } from "cloudinary";

/**
 * Configura y utiliza la API de Cloudinary para cargar imágenes.
 *
 * @param {string} filePath - Ruta del archivo de imagen a cargar.
 * @returns {Promise<Object>} - Promesa que resuelve en un objeto de metadatos de la imagen cargada.
 *
 * @description Esta función configura la API de Cloudinary con las credenciales proporcionadas y carga una imagen al servicio.
 * Se utiliza la versión 2 de la API de Cloudinary (v2) para cargar imágenes de forma asíncrona.
 * La función toma la ruta del archivo de imagen a cargar y la carga a la carpeta especificada en Cloudinary.
 * Devuelve una promesa que resuelve en un objeto de metadatos de la imagen cargada, incluyendo la URL de acceso público.
 **/
cloudinary.config({
  cloud_name: "dusghtj8l",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "articulos",
  });
}