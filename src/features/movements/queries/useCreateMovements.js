import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceMovement from "../services/serviceMovement";

export const useCreateMovements = () => {
  const services = new serviceMovement();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.createMovement("/movement", {
        type: newTodo?.type,
        companyId: newTodo?.companyId,
        userId: newTodo?.userId,
        observation: newTodo?.note,
        productId: newTodo?.productId,
        quantity: newTodo?.quantity,
      });
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListMovements"] });
      queryClient.invalidateQueries({ queryKey: ["ListMovementStats"] });
    },
  });

  return {
    ...mutation,
  };
};
