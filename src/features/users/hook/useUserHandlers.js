import { useState } from "react";
import { useUpdateUserStatus } from "../queries/useUpdateUserStatus";

export const useUserHandlers = () => {
  const { mutate } = useUpdateUserStatus();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onEdit = (row) => {
    setSelectedUser(row); // 👈 guardas datos
    setIsEditOpen(true); // 👈 abres modal
  };
  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const onInactive = async (row) => {
    mutate({ id: row.id, status: "INACTIVE" });
  };

  const onActivate = async (row) => {
    mutate({ id: row.id, status: "ACTIVE" });
  };
  const onSuspend = async (row) => {
    mutate({ id: row.id, status: "SUSPENDED" });
  };

  const onReactivate = async (row) => {
    mutate({ id: row.id, status: "ACTIVE" });
  };

  const onTerminate = async (row) => {
    mutate({ id: row.id, status: "TERMINATED" });
  };

  return {
    onEdit,
    isEditOpen,
    selectedUser,
    closeEdit,
    onInactive,
    onActivate,
    onSuspend,
    onReactivate,
    onTerminate,
  };
};
