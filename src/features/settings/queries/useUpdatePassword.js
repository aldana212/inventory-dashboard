import { useMutation } from "@tanstack/react-query";
import servicesSetting from "../services/servicesSetting";
import { useToast } from "../../../hooks/useToast";
import { useAuthStore } from "../../auth/store/authStore";
import { useNavigate } from "react-router";

export const useUpdatePassword = () => {
  const services = new servicesSetting();
  const toast = useToast();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updatePassword(
        `/auth/change-password`,
        newTodo,
      );
      return res;
    },
    onSuccess: () => {
      toast.success({
        title: "Contraseña actualizada",
        description: "Por seguridad, debes iniciar sesión nuevamente con tu nueva contraseña.",
      });
      logout();
      navigate("/");
    },

    onError: (error) => {
      console.error("Error:", error);
      if (
        error.status === 401 &&
        error.message === "Your current password is incorrect"
      ) {
        toast.error({
          title: "Error de validación",
          description: "La contraseña actual no es correcta.",
        });
        return;
      }
    },
  });

  return {
    ...mutation,
  };
};
