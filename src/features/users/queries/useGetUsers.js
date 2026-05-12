import { useQuery } from "@tanstack/react-query";
import servicesUser from "../services/servicesUser";

export const useGetUsers = (filters) => {
  const services = new servicesUser();

  const query = useQuery({
    queryKey: ["InfoUsers", filters],
    queryFn: async () => {
      let page = "";
      let limit = "";

      if (filters?.pageIndex !== undefined) {
        page = `?page=${filters?.pageIndex + 1}`;
      }
      if (filters?.pageSize !== undefined) {
        limit = `&limit=${filters?.pageSize}`;
      }

      const res = await services.getUsers(`/user${page}${limit}`);
      return res;
    },
    enabled: filters !== undefined,
    staleTime: 0,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    data: query?.data,
  };
};
