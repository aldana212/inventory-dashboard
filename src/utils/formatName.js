export const formatName = (text) => {
  if (!text) return "";

  const parts = text.trim().split(" ");

  const firstName = parts[0];
  const lastName = parts[1];

  const capitalizedFirst =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() + "." : "";

  return `${capitalizedFirst} ${lastInitial}`
};
