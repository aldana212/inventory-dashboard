import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import EllipsisIcon from "../../../assets/icons/EllipsisIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import ActionsCell from "../../../shared/components/DataView/DataTable/ActionsCell";
import { formatPrice } from "../../../utils/formatPrice";
import {
  categoryStatus,
  categoryStatusColor,
} from "../../categories/list/columns";

// export const getColumns = ({ onEdit, onDelete }) => [
export const getColumns = (actions) => [
  {
    accessorKey: "name",
    header: "Producto",
    size: 200,
    cell: ({ row, getValue }) => {
      const position = row.original?.productImages[0]?.position;
      const url = row.original?.productImages?.find(
        (img) => img?.isPrimary === true,
      )?.url;

      return (
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center overflow-hidden">
            {!url && <ProductIcon className="w-[30px] text-[#2563EB] dark:text-[#94A3B8]" />}
            {url && (
              <img
                src={url}
                alt={`Img-product-${position + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-0">
            <p className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
              {getValue()}
            </p>
            <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
              SKU: {row.original?.sku}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    // accessorKey: "sku",
    header: "Categoría",
    size: 120,
    cell: ({ row }) => (
      <span className="w-full h-[20px] flex items-center justify-center bg-[#DBEAFE] dark:bg-[#3B82F622] text-[#1D4ED8] dark:text-[#3B82F6] text-[10px] font-semibold px-[8px] py-[2px] rounded-[12px] max-w-max">
        {row.original?.category?.name || "-"}
      </span>
    ),
  },

  {
    accessorKey: "currentStock",
    header: "Stock",
    size: 110,
    cell: ({ getValue, row }) => {
      const lowStock =
        Number(row.original?.currentStock) > Number(row.original?.minimumStock);

      return (
        <span
          className={`text-[12px] leading-[16px] ${lowStock ? "text-[#191C1E] dark:text-[#F1F5F9]" : "text-[#EF4444] "}  font-medium`}
        >
          {getValue()} unids
        </span>
      );
    },
  },

  {
    accessorKey: "isActive",
    header: "Estado",
    size: 97,
    cell: ({ getValue }) => (
      <span
        className={`flex items-center gap-2 ${categoryStatusColor[getValue()]}  text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
      >
        {categoryStatus[getValue()]}
      </span>
    ),
  },

  {
    accessorKey: "salePrice",
    header: "Precio de Venta",
    size: 120,
    cell: ({ getValue }) => (
      <span className="font-semibold text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9]">
        {formatPrice(getValue())}
      </span>
    ),
  },

  {
    header: "Valor",
    size: 120,
    cell: ({ row }) => {
      const value =
        Number(row.original?.currentStock) *
        Number(row.original?.purchasePrice);
        

      return (
        <span className="font-semibold text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9]">
          {formatPrice(value)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "ACCIONES",
    size: 100,
    cell: ({ row }) => (
      <ActionsCell
        row={row.original}
        actions={actions}
      />
    ),
  },
];
