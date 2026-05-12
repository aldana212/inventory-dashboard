import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
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
    accessorKey: "movementDate",
    header: "FECHA",
    size: 185,
    cell: ({ getValue }) => {
      const fechaHora = new Date(getValue()).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short",
      });

      return (
        <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px]">
          {fechaHora}
        </span>
      );
    },
  },

  {
    accessorKey: "type",
    header: "TIPO",
    size: 152,
    cell: ({ getValue }) => {
      const type = getValue();
      return <StatusChip type={type} />
    },
  },

  {
    accessorKey: "change",
    header: "CANTIDAD",
    size: 134,
    cell: ({ getValue, row }) => {
      const type = row.original.type;
      return (
        <span
          className={`${type === "STOCK_IN" ? "text-[#10B981]" : "text-[#EF4444]"}  text-[14px] leading-[20px] font-bold`}
        >
          {type === "STOCK_IN" && "+"}
          {getValue()}
        </span>
      );
    },
  },

  {
    accessorKey: "reference",
    header: "REFERENCIA",
    size: 197,
    cell: ({ getValue }) => (
      <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px]">
        {getValue()}
      </span>
    ),
  },

  {
    header: "USUARIO",
    size: 133,
    cell: ({ row }) => {
      const user = row.original.user;
      const color = user?.brandColor;
       let firstName = row.original?.user?.firstName;
      let lastName = row.original?.user?.lastName;
      const fullName = `${firstName} ${lastName}`;

      const bg = `${color}20`; // fondo suave

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
    size: 140,
    cell: ({ row }) => (
      <span className="text-[#191C1E] dark:text-[#F1F5F9] text-[14px] font-bold">
        {row.original?.stockAfter}
      </span>
    ),
  },
];
