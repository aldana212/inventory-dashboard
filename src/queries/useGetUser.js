/* eslint-disable no-useless-catch */
import { useQuery } from "@tanstack/react-query";
import servicesUser from "../features/users/services/servicesUser";
import { useAuthStore } from "../features/auth/store/authStore";
import { useDecodeToken } from "../hooks/useDecodeToken";

export const useGetUser = () => {
  const services = new servicesUser();
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const decode = useDecodeToken();

  const query = useQuery({
    queryKey: ["InfoUser", decode?.id],
    queryFn: async () => {
      try {
        const res = await services.getUsers(`/user/${decode?.id}`);
        console.log(res);
        
        if (res?.role?.id !== decode?.role?.id) {
          logout();
          return;
        }

        setUser(res);
        return res;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!decode?.id,
    staleTime: 0, // 🔥 cache 5 min
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: () => 3000,
  });

  return {
    ...query,
    data: query?.data,
  };
};
