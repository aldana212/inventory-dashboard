import { usePermissions } from "../../../hooks/usePermissions";
import { useMemo } from "react";

export const useUserActions = (handlers) => {
  const { hasRole, isSelf } = usePermissions();

  const canManage = hasRole(["ADMIN", "SUPERVISOR"]);
  const isAdmin = hasRole(["ADMIN"]);

  return useMemo(
    () => [
      {
        key: "edit",
        label: "Editar",
        hidden: (row) => !canManage || isSelf(row.id) || row?.roleRel?.id === 1,
        onClick: handlers.onEdit,
      },
      {
        key: "inactive",
        label: "Desactivar",
        variant: "warning",
        hidden: (row) =>
          !canManage || row.status !== "ACTIVE" || isSelf(row.id) || row?.roleRel?.id === 1,
        onClick: handlers.onInactive,
      },
      {
        key: "activate",
        label: "Activar",
        variant: "success",
        hidden: (row) => !canManage || row.status !== "INACTIVE" || row?.roleRel?.id === 1,
        onClick: handlers.onActivate,
      },
      {
        key: "suspend",
        label: "Suspender",
        variant: "warning",
        hidden: (row) =>
          !canManage ||
          (row.status !== "ACTIVE" && row.status !== "INACTIVE") ||
          isSelf(row.id) || row?.roleRel?.id === 1,
        onClick: handlers.onSuspend,
      },
      {
        key: "reactivate",
        label: "Reactivar",
        variant: "success",
        hidden: (row) => !canManage || row.status !== "SUSPENDED" || row?.roleRel?.id === 1,
        onClick: handlers.onReactivate,
      },
      {
        key: "terminate",
        label: "Terminar",
        variant: "danger",
        hidden: (row) =>
          !isAdmin || row.status === "TERMINATED" || isSelf(row.id) || row?.roleRel?.id === 1,
        onClick: handlers.onTerminate,
      },
    ],
    [handlers, canManage, isAdmin, isSelf],
  );
};
