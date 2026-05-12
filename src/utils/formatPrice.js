export const formatPrice = (value) => {

   if (value == null) return ""

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2,
  }).format(value);
};
