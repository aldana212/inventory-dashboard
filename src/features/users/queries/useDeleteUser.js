import { useMutation, useQueryClient } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";

export const useDeleteUser = () => {
  const services = new servicesUser();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await services.deleteUser(`/user/${id}`);
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
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
