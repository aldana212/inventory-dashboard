import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useUpdateProducts = (id) => {
  const services = new serviceProduct();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updateProducts(`/product/${id}`, newTodo);
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListProducts"] });

      queryClient.invalidateQueries({ queryKey: ["InfoProduct", id] });
    },
  });

  return {
    ...mutation,
  };
};
