// Importación de la librería i18n-iso-countries
const paises = require("i18n-iso-countries");

// Registro del idioma español para la librería de países
paises.registerLocale(require("i18n-iso-countries/langs/es.json"));

// Función para validar si un nombre de país es válido
export const validarNombrePais = (pais) => {
  const listaPaises = paises.getNames("es");
  return Object.values(listaPaises).includes(pais);
};

// Función para obtener la lista de nombres de todos los países disponibles
export const obtenerListaPaises = () => {
  return Object.values(paises.getNames("es", { select: "official" }));
};
