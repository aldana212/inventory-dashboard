import { useMutation, useQueryClient } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";

export const useCreateUser = () => {
  const services = new servicesUser();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.createUser("/user", newTodo);
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["InfoUsers"],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["InfoUsersStats"],
        exact: false,
      });
    },
  });

  return {
    ...mutation,
  };
};
