/**
 * Obtiene la hora en formato UTC a partir de una cadena de fecha y hora.
 *
 * @param {string} dateTimeString - Cadena de fecha y hora en formato ISO 8601.
 * @returns {Date} - Objeto de fecha y hora en formato UTC.
 *
 * @description Esta función toma una cadena de fecha y hora en formato ISO 8601 y devuelve la hora equivalente en formato UTC.
 * Primero convierte la cadena de fecha y hora en un objeto de fecha.
 * Luego, calcula el tiempo en milisegundos y el desplazamiento de zona horaria.
 * Finalmente, ajusta la hora para obtener la hora UTC y devuelve el objeto de fecha y hora correspondiente.
 **/
export const getUTCTime = (dateTimeString) => {
  const dt = new Date(dateTimeString);
  const dtNumber = dt.getTime();
  const dtOffset = dt.getTimezoneOffset() * 60000;
  const dtUTC = new Date();
  dtUTC.setTime(dtNumber - dtOffset);
  return dtUTC;
};

/**
 * Obtiene la hora actual en formato de zona horaria de Perú.
 *
 * @returns {Date} - Objeto de fecha y hora en formato de zona horaria de Perú.
 *
 * @description Esta función devuelve la hora actual en el huso horario de Perú.
 * Calcula la diferencia horaria entre UTC y Perú (UTC-5) en horas.
 * Luego, ajusta la hora actual en función de esta diferencia y devuelve el objeto de fecha y hora correspondiente.
 **/
export const getPeruTime = () => {
  const ahoraUTC = new Date();
  const diffHorariaPeru = -5;
  const fechaAhora = new Date(
    ahoraUTC.getTime() + diffHorariaPeru * 60 * 60 * 1000
  );
  return fechaAhora;
};
