import React, { useEffect, useRef, useState } from "react";
import EllipsisIcon from "../../../../assets/icons/EllipsisIcon";
import EditIcon from "../../../../assets/icons/EditIcon";
import DeleteIcon from "../../../../assets/icons/DeleteIcon";
import EyeOpenIcon from "../../../../assets/icons/EyeOpenIcon";

const variantStyles = {
  default: "text-[#515F74] dark:text-[#94A3B8] hover:bg-[#E0E3E5] hover:dark:bg-[#E0E3E520]",

  success: "text-[#10B981] hover:bg-[#DCFCE7] hover:dark:bg-[#10B981]/10",

  warning: "text-[#F59E0B] hover:bg-[#F59E0B20]",

  danger: "text-[#EF4444] hover:bg-[#EF444420]",
};

const ActionsCell = ({ row, actions = [] }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    function handleClick(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // 🔥 filtra acciones visibles
  const visibleActions = actions.filter((a) => !a.hidden || !a.hidden(row));

  // 🔥 si no hay acciones, no renderiza nada
  if (visibleActions.length === 0) return null;

  return (
    <div ref={ref} className="relative flex items-center justify-center gap-2 ">
      <button
        className="relative w-[30px] h-[30px] flex justify-center items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <EllipsisIcon className="w-[20px] h-[20px] rotate-90 text-[#94A3B8] hover:text-[#737686] transition-all duration-300" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:dark:bg-[#051424] border border-[#E2E8F0] dark:border-[#1E293B] shadow-md rounded-md z-50 overflow-hidden">
          {visibleActions.map((action) => {
            const styles = variantStyles[action.variant || "default"];

            return (
              <button
                key={action.key}
                disabled={action.disabled && action.disabled(row)}
                onClick={() => {
                  action.onClick && action.onClick(row);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition cursor-pointer ${styles}`}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionsCell;
