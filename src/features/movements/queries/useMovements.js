import { useQuery } from "@tanstack/react-query";
import serviceMovement from "../services/serviceMovement";

export const useMovements = (filters) => {
  const services = new serviceMovement();

  const query = useQuery({
    queryKey: ["ListMovements", filters && filters],
    queryFn: async () => {
      let page = "";
      let limit = "";
      let search = "";
      let date = "";
      let type = "";

      const from = filters?.date?.from;
      const to = filters?.date?.to;

      if (filters && filters?.pageIndex !== undefined) {
        page = `?page=${filters?.pageIndex + 1}`;
      }
      if (filters && filters?.pageSize !== undefined) {
        limit = `&limit=${filters?.pageSize}`;
      }
      if (filters?.search && filters?.search?.trim()?.length != 0) {
        search = `&search=${filters?.search}`;
      }
      if (filters?.date?.from && filters?.date?.to) {
        date = `&from=${from?.toISOString().split("T")[0]}&to=${to?.toISOString().split("T")[0]}`;
      }
      if (filters?.type && filters?.type !== "all") {
        type = `&type=${filters?.type}`;
      }

      const response = await services.getMovement(
        `/movement${page}${limit}${search}${date}${type}`,
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
