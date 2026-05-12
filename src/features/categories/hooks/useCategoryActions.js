import { usePermissions } from "../../../hooks/usePermissions";
import { useMemo } from "react";

export const useCategoryActions = (handlers) => {
  const { hasRole } = usePermissions();

  const canManage = hasRole(["ADMIN", "SUPERVISOR"]);

  return useMemo(
    () => [
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
        hidden: (row) => !canManage || row.isActive !== "active",
        onClick: handlers.onDeactivate,
      },

      {
        key: "activate",
        label: "Activar",
        variant: "success",
        hidden: (row) => !canManage || row.isActive !== "inactive",
        onClick: handlers.onActivate,
      },
    ],
    [handlers, canManage],
  );
};
