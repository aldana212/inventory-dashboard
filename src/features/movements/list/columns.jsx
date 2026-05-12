import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import StatusChip from "../../../shared/components/StatusChip/StatusChip";
import { formatName } from "../../../utils/formatName";
import { getInitialsFromFullName } from "../../../utils/getInitialsFromFullName";

export const movementsType = {
  STOCK_IN: "Entrada",
  STOCK_OUT: "Salida",
};

// STOCK_IN -- Entrada
// STOCK_OUT -- Salida

export const columns = [
  {
    accessorKey: "createdAt",
    header: "FECHA",
    size: 166,
    cell: ({ getValue, row }) => (
      <div className="flex flex-col items-center gap-0">
        <p className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px]">
          {new Date(getValue())?.toISOString().split("T")[0]}
        </p>
        <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
          REF: {row.original.reference}
        </span>
      </div>
    ),
  },

  {
    // accessorKey: "productName",
    header: "PRODUCTO",
    size: 250,
    cell: ({ row }) => {
      const img = row.original?.product?.productImages[0];

      return (
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#E6E8EA] rounded-[4px] flex justify-center items-center overflow-hidden">
            {!img?.url && (
              <ProductIcon className="w-[30px] text-[#2563EB] dark:text-[#94A3B8]" />
            )}
            {img?.url && (
              <img
                src={img?.url}
                alt={`Img-product-${img?.position + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-0">
            <p className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
              {row.original?.product?.name}
            </p>
            <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
              SKU: {row.original?.product?.sku}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "type",
    header: "TIPO",
    size: 128,
    cell: ({ getValue }) => {
      const type = getValue();
      return <StatusChip type={type} />;
    },
  },

  {
    accessorKey: "change",
    header: "CANTIDAD",
    size: 113,
    cell: ({ getValue, row }) => {
      const type = row.original.type;
      return (
        <span
          className={`${type === "STOCK_IN" ? "text-[#15803D] dark:text-[#10B981]" : "text-[#B91C1C] dark:text-[#EF4444]"}  text-[14px] leading-[20px] font-bold`}
        >
          {type === "STOCK_IN" && "+"}
          {getValue()}
        </span>
      );
    },
  },

  {
    header: "USUARIO",
    size: 113,
    cell: ({ row }) => {
      const user = row.original.user;
      const color = user?.brandColor;

      const bg = `${color}20`; // fondo suave

      let firstName = row.original?.user?.firstName;
      let lastName = row.original?.user?.lastName;
      const fullName = `${firstName} ${lastName}`;

      return (
        <div className="flex items-center gap-3">
          <div
            className="w-[40px] h-[40px] rounded-full lg:flex hidden justify-center items-center text-[12px] leading-[16px] font-bold"
            style={{ backgroundColor: bg, color }}
          >
            {getInitialsFromFullName(fullName)}
          </div>
          <p className="text-[13px] leading-[18px] text-[#475569] dark:text-[#F1F5F9]">
            {formatName(fullName)}
          </p>
        </div>
      );
    },
  },

  {
    // accessorKey: "stockAfter",
    header: "STOCK FINAL",
    size: 128,
    cell: ({ row }) => (
      <span className="text-[#191C1E] dark:text-[#F1F5F9] text-[14px] font-bold">
        {row.original?.stockAfter}
      </span>
    ),
  },
];
