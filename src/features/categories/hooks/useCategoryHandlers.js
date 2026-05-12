import { useState } from "react";
import { useUpdateCategoryStatus } from "../queries/useUpdateCategoryStatus";

export const useCategoryHandlers = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate } = useUpdateCategoryStatus();

  const onEdit = (row) => {
    setSelectedCategory(row); // 👈 guardas datos
    setIsEditOpen(true); // 👈 abres modal
  };
  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedCategory(null);
  };

  const onDeactivate = async (row) => {
    mutate({ id: row.id, status: false });
  };

  const onActivate = async (row) => {
    mutate({ id: row.id, status: true });
  };

  return {
    onEdit,
    isEditOpen,
    selectedCategory,
    closeEdit,
    onDeactivate,
    onActivate,
  };
};
