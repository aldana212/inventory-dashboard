import { useQuery } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";

export const useGetUsersStats = () => {
  const services = new servicesUser();

  const query = useQuery({
    queryKey: ["InfoUsersStats"],
    queryFn: async () => {
      const res = await services.getUsers("/user/stats");
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
