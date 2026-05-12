export function formatRelativeDate(dateString) {
  if (!dateString) return "Nunca";

  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // 🟢 Hace minutos
  if (diffMinutes < 1) return "Hace unos segundos";
  if (diffMinutes < 60) return `Hace ${diffMinutes} min`;

  // 🟡 Hoy
  if (diffHours < 24 && now.getDate() === date.getDate()) {
    return `Hoy, ${formatTime(date)}`;
  }

  // 🔵 Ayer
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Ayer, ${formatTime(date)}`;
  }

  // 🟠 Hace días
  if (diffDays < 30) {
    return `Hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;
  }

  // 🔴 Hace meses
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `Hace ${diffMonths} mes${diffMonths > 1 ? "es" : ""}`;
  }

  // ⚫ Hace años
  const diffYears = Math.floor(diffMonths / 12);
  return `Hace ${diffYears} año${diffYears > 1 ? "s" : ""}`;
}

// Helper para hora
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
