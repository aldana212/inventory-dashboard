import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import EllipsisIcon from "../../../assets/icons/EllipsisIcon";
import ActionsCell from "../../../shared/components/DataView/DataTable/ActionsCell";
import { formatRelativeDate } from "../../../utils/formatRelativeDate";
import { getInitialsFromFullName } from "../../../utils/getInitialsFromFullName";

export const userStatus = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  SUSPENDED: "Suspendido",
  TERMINATED: "Despedido",
};

export const getColumns = (actions) => [
  {
    // accessorKey: "name",
    header: "USUARIO",
    size: 200,
    cell: ({ row }) => {
      const color = row.original?.brandColor;

      const bg = `${color}20`; // fondo suave
      const text = color; // texto fuerte

      let firstName = row.original?.firstName;
      let lastName = row.original?.lastName;
      const fullName = `${firstName} ${lastName}`;

      return (
        <div className="flex items-center gap-3">
          <div
            className="w-[40px] h-[40px] rounded-full flex justify-center items-center text-[12px] leading-[16px] font-bold"
            style={{ backgroundColor: bg, color: text }}
          >
            {getInitialsFromFullName(fullName)}
          </div>
          <p className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {fullName}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: "EMAIL",
    size: 200,
    cell: ({ getValue }) => (
      <span className="text-[#475569] dark:text-[#94A3B8] text-[14px] leading-[20px] font-normal">
        {getValue()}
      </span>
    ),
  },

  {
    accessorKey: "role",
    header: "ROL",
    size: 150,
    cell: ({ row }) => {
      const color = row.original?.brandColor;
      const bg = `${color}20`; // fondo suave
      const text = color; // texto fuerte

      const role = row.original?.role?.name;
      const name = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

      return (
        <span
          className={`flex items-center gap-2 text-[11px] font-bold px-[12px] py-[2px] rounded-[12px] max-w-max`}
          style={{ backgroundColor: bg, color: text }}
        >
          {name}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "ESTADO",
    size: 150,
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span
          className={`flex items-center gap-2 ${userStatus[status] === "Activo" ? "bg-[#007D551A] dark:bg-[#10B981]/10 text-[#10B981]" : "bg-[#E0E3E5] dark:bg-[#6B72801A] text-[#515F74] dark:text-[#94A3B8]"} text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
        >
          {userStatus[status]}
        </span>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "ÚLTIMA CONEXIÓN",
    size: 150,
    cell: ({ row }) => {
      return (
        <span
          className={`flex items-center gap-2 text-[#64748B] dark:text-[#94A3B8] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
        >
          {formatRelativeDate(row.original?.lastLogin)}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "ACCIONES",
    size: 100,
    cell: ({ row }) => <ActionsCell row={row.original} actions={actions} />,
  },
];

// export const columns =
