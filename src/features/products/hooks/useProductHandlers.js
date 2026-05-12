import { useNavigate } from "react-router";
import { useUpdateProductStatus } from "../queries/useUpdateProductStatus";

export const useProductHandlers = () => {
  const navigate = useNavigate();

  const { mutate } = useUpdateProductStatus();

  const onView = (row) => {
    navigate(`/products/${row?.id}`);
  };

  const onEdit = (row) => {
    navigate(`/products/${row?.id}/edit`);
  };

  const onDeactivate = async (row) => {
    mutate({ id: row.id, status: false });
  };

  const onActivate = async (row) => {
    mutate({ id: row.id, status: true });
  };

  return {
    onView,
    onEdit,
    onDeactivate,
    onActivate,
  };
};
