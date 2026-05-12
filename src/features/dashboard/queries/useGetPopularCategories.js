import { useQuery } from "@tanstack/react-query";
import servicesDashboard from "../services/servicesDashboard";

export const useGetPopularCategories = () => {
  const services = new servicesDashboard();

  const query = useQuery({
    queryKey: ["ListPopularCategories"],
    queryFn: async () => {
      const response = await services.getStatsBar("dashboard/analytics/categories/popular");
      return response;
    },
    // enabled: filters && !!filters,
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 min
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
