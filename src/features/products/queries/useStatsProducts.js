import { useQuery } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";

export const useStatsProducts = () => {
  const services = new serviceProduct();

  const query = useQuery({
    queryKey: ["InfoStats"],
    queryFn: async () => {
      const res = await services.getProducts("/product/stats");
      return res;
    },
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 min
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
