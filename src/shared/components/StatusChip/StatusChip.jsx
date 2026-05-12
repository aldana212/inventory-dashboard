import React from "react";

const movementsType = {
  STOCK_IN: "Entrada",
  STOCK_OUT: "Salida",
};

const StatusChip = ({ type }) => {
  return (
    <>
      {movementsType[type] === "Entrada" ? (
        <span className="lg:min-w-[69.55px] max-w-max flex items-center justify-center bg-[#DCFCE7] dark:bg-[#10B981]/10 text-[#10B981] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max">
          {movementsType[type]}
        </span>
      ) : (
        <span className="lg:min-w-[56.25px] max-w-max flex items-center justify-center bg-[#FEE2E2] dark:bg-[#EF4444]/10 text-[#EF4444] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max">
          {movementsType[type]}
        </span>
      )}
    </>
  );
};

export default StatusChip;
