import { useQuery } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useProductsById = (id) => {
  const services = new serviceProduct();

  const query = useQuery({
    queryKey: ["InfoProduct", id],
    queryFn: async () => {
      const res = await services.getProducts(`/product/${id}`);
      return res;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 min
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
