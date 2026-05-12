import { useQuery } from "@tanstack/react-query";
import serviceCategory from "../services/serviceCategory";

export const useStatsCategory = () => {
  const services = new serviceCategory();

  const query = useQuery({
    queryKey: ["ListStatsCategory"],
    queryFn: async () => {
      const res = await services.getCategories("/category/getStats");
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
