import { useDecodeToken } from "./useDecodeToken";

export const usePermissions = () => {
  const decode = useDecodeToken();

  const currentUser = {
    id: decode?.id,
    role: decode?.role?.name,
  };

  const hasRole = (roles) => {
    if (!decode) return false;
    return roles.includes(decode.role?.name);
  };

  const isSelf = (userId) => currentUser.id === userId;

  return { hasRole, isSelf, currentUser };
};

// EXAMPLE:
// const { hasRole } = usePermissions();
// {hasRole(["ADMIN", "SUPERVISOR"]) && (
