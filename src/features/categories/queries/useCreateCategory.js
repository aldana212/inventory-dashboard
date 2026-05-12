import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useCreateCategory = () => {
  const services = new serviceCategory();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.createCategories("/category", {
        name: newTodo.name,
        description: newTodo.description,
        companyId: 1,
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
    },
  });

  return {
    ...mutation,
  };
};
