import { useMutation, useQueryClient } from "@tanstack/react-query";
import serviceProduct from "../services/serviceProduct";
import { useToast } from "../../../hooks/useToast";

export const useCreateProducts = () => {
  const services = new serviceProduct();
  const toast = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      const res = await services.createProducts("/product", newTodo);
      return res;
    },
    onError: (error) => {
      console.error("Error:", error);

      if (error.status === 400 && error?.message === "The selling price cannot be lower than the purchase price") {
        toast.error({
          title: "Precio inválido",
          description:
            "El precio de venta no puede ser menor al precio de compra",
        });
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries( { queryKey: ["ListProducts"] });
    },
  });

  return {
    ...mutation,
  };
};
