import { useQuery } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useCategory = (filters) => {
  const services = new serviceCategory();

  const query = useQuery({
    queryKey: ["ListCategories", filters && filters],
    queryFn: async () => {
      let page = "";
      let limit = "";

      if (filters && filters?.pageIndex !== undefined) {
        page = `?page=${filters?.pageIndex + 1}`;
      }
      if (filters && filters?.pageSize !== undefined) {
        limit = `&limit=${filters?.pageSize}`;
      }

      const res = await services.getCategories(`/category${page}${limit}`);
      return res;
    },
    enabled: filters && !!filters,
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 min
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
