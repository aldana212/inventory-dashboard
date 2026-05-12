import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useUpdateProductStatus = () => {
  const services = new serviceProduct();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updateProductStatus(
        `/product/${newTodo?.id}/status`,
        { isActive: newTodo?.status },
      );
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListProducts"] });
    },
  });

  return {
    ...mutation,
  };
};
