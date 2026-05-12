import { useLocation, useMatch } from "react-router-dom";

export const useActiveRoute = () => {
  const { pathname } = useLocation();

  const editProductMatch = useMatch("/products/:id/edit");

  return {
    isHome: pathname === "/",

    isProducts: pathname.startsWith("/products"),

    isNewProducts: pathname === "/products/new",

    isEditProduct: !!editProductMatch,

    isMovements: pathname.startsWith("/movements"),

    isProfile: pathname.startsWith("/settings"),

    productId: editProductMatch?.params.id,
  };
};