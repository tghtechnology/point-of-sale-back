export const getUTCTime = (dateTimeString) => {
    const dt = new Date(dateTimeString);
    const dtNumber = dt.getTime();
    const dtOffset = dt.getTimezoneOffset() * 60000;
    const dtUTC = new Date();
    dtUTC.setTime(dtNumber - dtOffset);

    return dtUTC;
}

export const getPeruTime = () => {
    const ahoraUTC = new Date();
    const diffHorariaPeru = -5;

    const fechaAhora = new Date(
      ahoraUTC.getTime() + diffHorariaPeru * 60 * 60 * 1000
    );
  
    return fechaAhora;
  };
  