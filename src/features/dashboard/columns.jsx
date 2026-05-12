import ProductIcon from "../../assets/icons/productIcon";
import StatusChip from "../../shared/components/StatusChip/StatusChip";
import { getInitialsFromFullName } from "../../utils/getInitialsFromFullName";

export const columns = [
  {
    // accessorKey: "productName",
    header: "PRODUCTO",
    size: 3,
    cell: ({ row }) => {
      const img = row.original?.product?.productImages[0];

      return (
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center overflow-hidden">
            {!img?.url && <ProductIcon className="w-[30px] text-[#2563EB] dark:text-[#94A3B8]" />}
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
    size: 1.5,
    cell: ({ getValue }) => {
      const type = getValue();
      return <StatusChip type={type} />;
    },
  },

  {
    accessorKey: "change",
    header: "CANTIDAD",
    size: 1.5,
    cell: ({ getValue, row }) => {
      const type = row.original.type;

      return (
        <span className={`${type === "STOCK_IN" ? "text-[#10B981]" : "text-[#EF4444]"}  text-[14px] leading-[20px] font-bold`}>
          {type === "STOCK_IN" && "+"}
          {getValue()}
        </span>
      );
    },
  },
  {
    // accessorKey: "change",
    header: "USUARIO",
    size: 2,
    cell: ({ row }) => {
      const color = row.original?.user?.brandColor;
      

      const bg = `${color}20`; // fondo suave
      const text = color; // texto fuerte

      let firstName = row.original?.user?.firstName;
      let lastName = row.original?.user?.lastName;
      const fullName = `${firstName} ${lastName}`;

      return (
        <div className="flex items-center gap-3">
          <div
            className="w-[40px] h-[40px] rounded-full lg:flex hidden justify-center items-center text-[12px] leading-[16px] font-bold"
            style={{ backgroundColor: bg, color: text }}
          >
            {getInitialsFromFullName(fullName)}
          </div>
          <p className="text-[13px] leading-[18px] text-[#475569] dark:text-[#F1F5F9]">{fullName}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "movementDate",
    header: "FECHA",
    size: 1.5,
    cell: ({ getValue }) => (
      <span className="text-[#64748B] dark:text-[#94A3B8] text-[13px] leading-[18px]">
        {new Date(getValue()).toLocaleDateString()}
      </span>
    ),
  },
];
