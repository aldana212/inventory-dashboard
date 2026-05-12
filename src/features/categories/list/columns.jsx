import CategoryIcon from "../../../assets/icons/CategoryIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import EllipsisIcon from "../../../assets/icons/EllipsisIcon";
import ActionsCell from "../../../shared/components/DataView/DataTable/ActionsCell";
import { getIcon } from "../../../utils/getIcon";

export const categoryStatus = {
  active: "Activo",
  inactive: "Inactivo",
  // under_review: "En revisión",
};

export const categoryStatusColor = {
  active: "bg-[#DCFCE7] dark:bg-[#10B981]/10 text-[#10B981]",
  inactive: "bg-[#E0E3E5] dark:text-[#94A3B8] dark:bg-[#E0E3E5]/10 text-[#515F74]",
  under_review: "bg-[#FFDAD61A] text-[#BA1A1A]",
};

export const getColumns = (actions) => [
  {
    accessorKey: "name",
    header: "Nombre",
    size: 194,
    cell: ({ getValue, row }) => {
      const icon = row.original?.icon;

      return (
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center">
            {icon === "All" && (
              <CategoryIcon className={`w-[20px] text-[#2563EB]`} />
            )}
            {icon !== "All" && getIcon(icon, "#2563EB")}
          </div>
          <span className="text-[16px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {getValue()}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Descripcion",
    size: 300,
    cell: ({ getValue }) => (
      <span className="text-[#434655] dark:text-[#94A3B8] text-[14px] leading-[20px] font-normal">
        {getValue()}
      </span>
    ),
  },

  {
    accessorKey: "productCount",
    header: "Stock Items",
    size: 110,
    cell: ({ getValue }) => (
      <span className="text-[#191C1E] dark:text-[#F1F5F9] text-[14px] leading-[20px] font-medium">
        {getValue()} unids
      </span>
    ),
  },

  {
    accessorKey: "isActive",
    header: "Estado",
    size: 110,
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span
          className={`flex items-center gap-2 ${categoryStatusColor[status]} text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
        >
          {categoryStatus[status]}
        </span>
      );
    },
  },

  {
    accessorKey: "updatedAt",
    header: "Última actualización",
    size: 140,
    cell: ({ getValue }) => {
      const fechaHora = new Date(getValue()).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short",
      });

      return (
        <span className="text-[#191C1E] dark:text-[#94A3B8] text-[14px] leading-none font-medium">
          {fechaHora}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "ACCIONES",
    size: 100,
    cell: ({ row }) => (
      <ActionsCell row={row.original} actions={actions} />
    ),
  },
];
