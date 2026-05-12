export function getInitialsFromFullName(fullName) {
  if (!fullName || fullName?.trim()?.length === 0) return "";

  return fullName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0].toLocaleUpperCase())
    .join("");
}
