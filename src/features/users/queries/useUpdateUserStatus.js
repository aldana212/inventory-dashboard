import { useMutation, useQueryClient } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";
import { useToast } from "../../../hooks/useToast";

export const useUpdateUserStatus = () => {
  const services = new servicesUser();
  const toast = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updateUserStatus(
        `/user/${newTodo?.id}/status`,
        { status: newTodo?.status },
      );
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error({
        title: "Acción no permitida",
        description:
          "No puedes cambiar el estado de tu propia cuenta por seguridad.",
      });
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
