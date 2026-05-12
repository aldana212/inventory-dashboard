import React, { useEffect, useState } from "react";
import { getIcon } from "../../../../../utils/getIcon";
import CategoryIcon from "../../../../../assets/icons/CategoryIcon";
import ActionsCell from "../../../../../shared/components/DataView/DataTable/ActionsCell";

const CategoryTableCard = ({ data, index, actions }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);

    return () => clearTimeout(timer);
  }, [index]);

  const date = new Date(data?.createdAt).toLocaleDateString();

  const dateTime = new Date(data?.updatedAt).toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div
      key={data?.reference}
      className={`w-full h-auto flex flex-col gap-[12px] p-[16px] border-b border-b-[#F9FAFB] dark:border-b-[#1E293B] last:border-b-transparent 
      transition-all duration-500 ease-out
        ${
          show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-[0.98]"
        }

      `}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="w-full flex items-center gap-[12px]">
        <div className="min-w-[40px] h-[40px] bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center">
          {data?.icon === "All" && (
            <CategoryIcon className={`w-[20px] text-[#2563EB]`} />
          )}
          {data?.icon !== "All" && getIcon(data?.icon, "#2563EB")}
        </div>
        <div className="w-full flex flex-col items-start gap-[3px]">
          <p className="text-[16px] leading-[15px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {data?.name}
          </p>
          <span className="text-[12px] text-[#94A3B8] dark:text-[#94A3B8]">
            Creado: {date}
          </span>
        </div>
        <ActionsCell row={data} actions={actions} />
      </div>
      <div className="w-full min-h-px bg-[#F9FAFB] dark:bg-[#1E293B]" />
      <div className="w-full grid grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B]  leading-[15px]">STOCK</h3>
          <span className={`text-[14px] dark:text-[#F1F5F9] leading-[20px] font-bold `}>
            {data?.productCount} unids
          </span>
        </div>
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">ESTADO</h3>
          <span
            className={`flex items-center gap-2 ${data?.isActive === "active" ? "bg-[#007D551A] dark:bg-[#10B981]/10 text-[#007D55] dark:text-[#10B981]" : "bg-[#E0E3E5] dark:bg-[#6B72801A] text-[#515F74] dark:text-[#94A3B8]"} text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
          >
            {data?.isActive === "active" ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
      <div className="flex flex-col col-span-2 gap-[2px] justify-start items-start">
        <h3 className="text-[10px] text-[#64748B] leading-[15px]">
          ÚLTIMA ACTUALIZACION
        </h3>
        <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px] font-semibold">
          {dateTime}
        </span>
      </div>
    </div>
  );
};

export default CategoryTableCard;
