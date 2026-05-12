import React, { useEffect, useState } from "react";
import { getInitialsFromFullName } from "../../../../../utils/getInitialsFromFullName";
import ActionsCell from "../../../../../shared/components/DataView/DataTable/ActionsCell";
import { userStatus } from "../../columns";
import { formatRelativeDate } from "../../../../../utils/formatRelativeDate";

const UsersTableCard = ({ data, index, actions }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);

    return () => clearTimeout(timer);
  }, [index]);
  
  const color = data?.brandColor;

  const bg = `${color}20`; // fondo suave
  const text = color; // texto fuerte

  let firstName = data?.firstName;
  let lastName = data?.lastName;
  const fullName = `${firstName} ${lastName}`;

  const roleName = data?.role?.name;

  const name =
    roleName?.charAt(0).toUpperCase() + roleName.slice(1).toLowerCase();

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
      <div className="w-full flex items-start gap-[12px]">
        <div
          className="min-w-[40px] h-[40px] rounded-full flex justify-center items-center text-[12px] leading-[16px] font-bold"
          style={{ backgroundColor: bg, color: text }}
        >
          {getInitialsFromFullName(fullName)}
        </div>
        <div className="w-full flex flex-col items-start gap-[2px]">
          <p className="text-[16px] leading-[15px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {fullName}
          </p>
          <span className="text-[12px] text-[#94A3B8] dark:text-[#94A3B8]">
            {data?.email}
          </span>
        </div>
        <ActionsCell row={data} actions={actions} />
      </div>
      <div className="w-full min-h-px bg-[#F9FAFB] dark:bg-[#1E293B]" />
      <div className="w-full grid grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">ROL</h3>
          <span
            className={`flex items-center gap-2 text-[11px] font-bold px-[12px] py-[2px] rounded-[12px] max-w-max`}
            style={{ backgroundColor: bg, color: text }}
          >
            {name}
          </span>
        </div>
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">ESTADO</h3>
           <span
          className={`flex items-center gap-2 ${userStatus[data?.status] === "Activo" ? "bg-[#007D551A] dark:bg-[#10B981]/10 text-[#007D55] dark:text-[#10B981]" : "bg-[#E0E3E5] dark:bg-[#6B72801A] text-[#515F74] dark:text-[#94A3B8]"} text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
        >
          {userStatus[data?.status]}
        </span>
        </div>
        <div className="flex flex-col col-span-2 gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">ÚLTIMA CONEXIÓN</h3>
          <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px] font-semibold">
            {formatRelativeDate(data?.lastLogin)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UsersTableCard;
