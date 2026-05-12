import { useMutation, useQueryClient } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";
import { useToast } from "../../../hooks/useToast";

export const useUpdateUser = (id) => {
  const services = new servicesUser();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const payload = {
        ...newTodo,
        ...(newTodo?.rol && {
          roleId: newTodo?.rol,
        }),
      };

      delete payload?.rol;

      const res = await services.updateUser(`/user/${id}`, payload);
      return res;
    },
    onError: (error) => {
      console.error(error);
      if (
        error?.status === 403 &&
        error?.message === "You can't change your own role"
      ) {
        toast.error({
          title: "Acción no permitida",
          description:
            "No puedes cambiar tu propio rol por seguridad. Pide a otro administrador que realice este cambio.",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["InfoUsers"] });
      queryClient.invalidateQueries({ queryKey: ["InfoUsersStats"] });
    },
  });

  return {
    ...mutation,
  };
};
