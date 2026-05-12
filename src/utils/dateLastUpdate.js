export const dateLastUpdate = (dateISO) => {
  const date = new Date(dateISO);
  const now = new Date();

  let diff = now - date;
  if (diff < 0) {
    return "Última actualización en el futuro";
  }

  const seconds = Math.floor(diff / 1000); // segundos
  const minutes = Math.floor(seconds / 60); // minutos
  const hours = Math.floor(minutes / 60); // horas
  const day = Math.floor(hours / 24); // dias

  if (day > 0) return `${day} día${day > 1 ? "s" : ""}`;
  if (hours > 0) return `${hours} hora${hours > 1 ? "s" : ""}`;
  if (minutes > 0) return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
  return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
};
