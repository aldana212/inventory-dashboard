import { useQuery } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useProducts = (filters) => {
  const services = new serviceProduct();

  const query = useQuery({
    queryKey: ["ListProducts", filters && filters],
    queryFn: async () => {
      let page = "";
      let limit = "";
      let categoryId = "";
      let search = "";
      let stockStatus = "";
      let isActive = "";

      if (filters && filters?.pageIndex !== undefined) {
        page = `?page=${filters?.pageIndex + 1}`;
      }
      if (filters && filters?.pageSize !== undefined) {
        limit = `&limit=${filters?.pageSize}`;
      }
      if (filters?.category && filters?.category !== "all") {
        categoryId = `&categoryId=${filters?.category}`;
      }
      if (filters?.search && filters?.search?.trim()?.length != 0) {
        search = `&search=${filters?.search}`;
      }
      if (filters?.stockStatus && filters?.stockStatus !== "all") {
        stockStatus = `&stockStatus=${filters?.stockStatus}`;
      }
      if (filters?.isActive && filters?.isActive !== "all") {
        isActive = `&isActive=${filters?.isActive}`;
      }

      const res = await services.getProducts(
        `/product${page}${limit}${categoryId}${search}${stockStatus}${isActive}`,
      );
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
