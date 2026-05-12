import { useQuery } from "@tanstack/react-query";
import servicesDashboard from "../services/servicesDashboard";

export const useGetStats = () => {
  const services = new servicesDashboard();

  const query = useQuery({
    queryKey: ["ListStats"],
    queryFn: async () => {
      const response = await services.getStats("dashboard/analytics/summary");
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
