import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useDeleteCategory = () => {
  const services = new serviceCategory();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await services.deleteCategories(`/category/${id}`);
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
