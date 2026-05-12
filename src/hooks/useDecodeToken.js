import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../features/auth/store/authStore";

export const useDecodeToken = () => {
  const token = useAuthStore((s) => s.token);

  if (!token) return null;
  
  try {
    // Decodifica el token
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);

    // Opcional: limpiar sesión si el token es inválido
    useAuthStore.getState().logout?.();

    return null;
  }
};
