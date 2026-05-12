import React, { useEffect, useState } from "react";
import StatusChip from "../../../../../shared/components/StatusChip/StatusChip";
import { getInitialsFromFullName } from "../../../../../utils/getInitialsFromFullName";

const ProductDetailTableCard = ({ data, index }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);

    return () => clearTimeout(timer);
  }, [index]);

  const user = data?.user;
  const color = user?.brandColor;

  const bg = `${color}20`; // fondo suave
  const text = color; // texto fuerte

  let firstName = user?.firstName;
  let lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  const dateTime = new Date(data?.movementDate).toLocaleString("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div
      key={data?.reference}
      className={`w-full min-h-[114px] flex flex-col gap-[16px] p-[16px] border-b border-b-[#F9FAFB] dark:border-b-[#1E293B] last:border-b-transparent 
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
      <div className="w-full flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-0">
          <p className="text-[11px]  text-[#94A3B8] dark:text-[#94A3B8] ">
            {dateTime}
          </p>
          <span className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {data?.reference}
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="flex flex-col items-start gap-0">
            <p className="text-[10px]  text-[#94A3B8] dark:text-[#94A3B8] ">
              Cantidad
            </p>
            <span
              className={`${data?.type === "STOCK_IN" ? "text-[#10B981]" : "text-[#EF4444]"} text-[14px] leading-[20px] font-bold`}
            >
              {data?.type === "STOCK_IN" && "+"}
              {data?.change}
            </span>
          </div>
          <div className="flex flex-col items-start gap-0">
            <p className="text-[10px]  text-[#94A3B8] dark:text-[#94A3B8] ">
              Stock Final
            </p>
            <span className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
              {data?.stockAfter}
            </span>
          </div>
        </div>

        {/*  */}
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <StatusChip type={data?.type} />
        <div className="flex items-center gap-[6px]">
          <div
            className="w-[25px] h-[25px] rounded-full flex justify-center items-center text-[9px] leading-[15px] font-bold"
            style={{ backgroundColor: bg, color: text }}
          >
            {getInitialsFromFullName(fullName)}
          </div>
          <p className="text-[12px] leading-[16px] text-[#475569] dark:text-[#F1F5F9]">
            {fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTableCard;
