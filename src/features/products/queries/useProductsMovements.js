import { useQuery } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useProductsMovements = (filters) => {
  const services = new serviceProduct();

  const query = useQuery({
    queryKey: ["ListProductsMovements", filters],
    queryFn: async () => {
      let page = "";
      let limit = "";

      if (filters && filters?.pageIndex !== undefined) {
        page = `?page=${filters?.pageIndex + 1}`;
      }
      if (filters && filters?.pageSize !== undefined) {
        limit = `&limit=${filters?.pageSize}`;
      }

      const res = await services.getProductMovements(
        `/inventory/${filters?.id}${page}${limit}`,
      );
      return res;
    },
    enabled: !!filters,
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 min
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
