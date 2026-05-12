import { usePermissions } from "../../../hooks/usePermissions";
import { useMemo } from "react";

export const useProductActions = (handlers) => {
  const { hasRole } = usePermissions();

  const canManage = hasRole(["ADMIN", "SUPERVISOR"]);
  const canView = hasRole(["ADMIN", "SUPERVISOR", "OPERADOR"]);
  const canViewDetail = hasRole(["ADMIN", "SUPERVISOR", "OPERADOR", "VIEWER"]);

  return useMemo(
    () => [
      {
        key: "view",
        label: "Ver",
        hidden: () => !canViewDetail,
        onClick: handlers.onView,
      },

      {
        key: "edit",
        label: "Editar",
        hidden: () => !canManage,
        onClick: handlers.onEdit,
      },

      {
        key: "deactivate",
        label: "Desactivar",
        variant: "warning",
        hidden: (row) => !canView || row.isActive !== "active",
        onClick: handlers.onDeactivate,
      },

      {
        key: "activate",
        label: "Activar",
        variant: "success",
        hidden: (row) => !canView || row.isActive !== "inactive",
        onClick: handlers.onActivate,
      },
    ],
    [handlers, canManage, canView],
  );
};
