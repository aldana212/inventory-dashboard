import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useUpdateCategory = (id) => {
  const services = new serviceCategory();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updateCategories(`/category/${id}`, {
        name: newTodo.name,
        description: newTodo.description,
        isActive: newTodo?.isActive,
        icon: newTodo?.icon,
      });
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ListCategories"] });
      queryClient.invalidateQueries({ queryKey: ["ListStatsCategory"] });
    },
  });

  return {
    ...mutation,
  };
};
