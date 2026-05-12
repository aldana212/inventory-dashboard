import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useUpdateCategoryStatus = () => {
  const services = new serviceCategory();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.updateCategoriesStatus(
        `/category/${newTodo?.id}/status`,
        { isActive: newTodo?.status },
      );
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
