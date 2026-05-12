import { useQuery } from "@tanstack/react-query";
import serviceMovement from "../services/serviceMovement";

export const useMovementStats = (filters) => {
  const services = new serviceMovement();

  const query = useQuery({
    queryKey: ["ListMovementStats", filters && filters],
    queryFn: async () => {
      const response = await services.getMovement(
        `/movement/stats?period=${filters}`,
      );
      return response;
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
