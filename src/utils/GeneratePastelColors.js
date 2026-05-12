export function generatePastelColors() {
  // Genera colores claros (200–255)
  const randomLight = () => Math.floor(Math.random() * 56) + 200;

  const r = randomLight();
  const g = randomLight();
  const b = randomLight();

  const toHex = (v) => v.toString(16).padStart(2, "0");

  const bg = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  // calcular luminancia para decidir texto
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

  // si es muy claro → texto oscuro
  const text = luminance > 200 ? "#1f2937" : "#111827"; 
  // gris oscuro (tipo Tailwind gray-800 / gray-900)

  return {
    bg,
    text,
  };
}