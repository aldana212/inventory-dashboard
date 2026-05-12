import React from "react";
import MovementsIcon from "../../../../assets/icons/movementsIcon";
import AlertIcon from "../../../../assets/icons/AlertIcon";
import ProductIcon from "../../../../assets/icons/productIcon";
import CheckClipboardIcon from "../../../../assets/icons/CheckClipboardIcon";
import DisabledIcon from "../../../../assets/icons/DisabledIcon";
import MoneyIcon from "../../../../assets/icons/MoneyIcon";
import { formatPrice } from "../../../../utils/formatPrice";
import InputIcon from "../../../../assets/icons/InputIcon";

const BentoMetricsGrid = ({ data }) => {
  const getValueSize = (value) => {
    const len = value?.toString().length || 0;

    if (len >= 14) return "text-[16px]";
    if (len >= 11) return "text-[18px]";
    if (len >= 9) return "text-[20px]";

    return "text-[clamp(20px,2vw,24px)]";
  };

  return (
    <div className="w-full h-auto grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-[12px]">
      <div className="sm:max-w-[504px] w-full lg:h-[190px] sm:h-[150px] h-[120px] order-1 col-span-1 bg-[#FFFFFF] dark:bg-[#0D1C2D] lg:p-[24px] p-[16px] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] flex flex-col items-center justify-between sm:gap-0 gap-[8px]">
        <div className="w-full sm:h-[44px] h-auto flex items-start justify-between">
          <div className="sm:w-[44px] w-[36px] sm:h-[44px] h-[36px] bg-[#004AC6]/10  dark:bg-[#3B82F6]/10 p-1 flex justify-center items-center rounded-[12px]">
            <CheckClipboardIcon className="sm:w-[25px] w-[20px] text-[#004AC6] dark:text-[#B3C5FF]" />
          </div>
          <div className="min-w-[38.63px] h-auto bg-[#F0FDF4] dark:bg-[#10B981]/10 px-[8px] py-[4px] flex justify-center items-center rounded-[12px]">
            <span className="sm:text-[12px] text-[10px] text-[#16A34A] dark:text-[#10B981] sm:leading-[16px] leading-[15px] font-semibold">
              +12%
            </span>
          </div>
        </div>
        <div className="w-full lg:pt-[32px] pt-0 flex flex-col sm:gap-[4px] gap-0">
          <p className="sm:text-[13px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[18px] leading-[16px] font-medium">
            TOTAL PRODUCTOS
          </p>
          <span className="sm:text-[30px] text-[24px] text-[#191C1E] dark:text-[#F1F5F9] sm:leading-[36px] leading-[32px] font-extrabold">
            {data?.totalProducts}
          </span>
        </div>
      </div>
      <div className="sm:max-w-[504px] w-full lg:h-[190px] sm:h-[150px] h-auto order-2 bg-[#FFFFFF] dark:bg-[#0D1C2D] lg:p-[24px] p-[12px] border border-[#BA1A1A]/20 dark:border-[#1E293B] rounded-[12px] flex flex-col justify-between">
        <div className="w-full h-[44px] flex items-start justify-between">
          <div className="sm:w-[44px] w-[36px] sm:h-[44px] h-[36px] bg-[#FEF2F2] dark:bg-[#EF4444]/10 p-2 flex justify-center items-center rounded-[12px] ">
            <AlertIcon className="sm:w-[44px] w-[36px] text-[#DC2626] dark:text-[#EF4444]" />
          </div>
          <div className="min-w-[38.63px] h-auto bg-[#FEF2F2] dark:bg-[#EF4444]/10 px-[8px] py-[4px] flex justify-center items-center rounded-full">
            <span className="sm:text-[12px] text-[10px] text-[#DC2626] dark:text-[#EF4444] sm:leading-[16px] leading-[15px] font-semibold">
              Alerta
            </span>
          </div>
        </div>
        <div className="w-full lg:pt-[32px] pt-0 flex flex-col sm:gap-[4px] gap-0">
          <p className="sm:text-[13px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[18px] leading-[16px] font-medium">
            BAJO STOCK
          </p>
          <span className="sm:text-[30px] text-[24px] text-[#191C1E] dark:text-[#F1F5F9]  sm:leading-[36px] leading-[32px] font-extrabold">
            {data?.lowStock}
          </span>
        </div>
      </div>
      <div className="sm:max-w-[504px] w-full lg:h-[190px] sm:h-[150px] h-[120px] order-3 bg-[#FFFFFF] dark:bg-[#0D1C2D] lg:p-[24px] p-[12px] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] flex flex-col justify-between sm:gap-0 gap-[8px]">
        <div className="sm:w-[44px] w-[36px] sm:h-[44px] h-[36px] bg-[#F1F5F9] dark:bg-[#6B7280]/10 p-1 flex justify-center items-center rounded-[12px]">
          <DisabledIcon className="sm:w-[25px] w-[20px] text-[#475569] dark:text-[#94A3B8]" />
        </div>
        <div className="w-full lg:pt-[32px] pt-0 flex flex-col sm:gap-[4px] gap-0">
          <p className="sm:text-[13px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[18px] leading-[16px] font-medium">
            AGOTADOS
          </p>
          <span className="sm:text-[30px] text-[24px] text-[#191C1E] dark:text-[#F1F5F9]  sm:leading-[36px] leading-[32px] font-extrabold">
            {data?.outStock}
          </span>
        </div>
      </div>
      <div className="sm:max-w-[504px] w-full lg:h-[190px] sm:h-[150px] h-[120px] sm:order-4 order-5 sm:col-span-1 col-span-2 bg-[#FFFFFF] dark:bg-[#0D1C2D] lg:p-[24px] p-[12px] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] flex flex-col justify-between">
        <div className="w-full h-[44px] flex items-start justify-between">
          <div className="sm:w-[44px] w-[36px] sm:h-[44px] h-[36px] bg-[#F0FDF4] dark:bg-[#22C55E]/10 p-1 flex justify-center items-center rounded-[12px]">
            <MoneyIcon className="sm:w-[25px] w-[20px] text-[#16A34A] dark:text-[#10B981]" />
          </div>
          <div className="min-w-[38.63px] h-auto bg-[#EFF6FF] dark:bg-[#2563EB]/10 px-[8px] py-[4px] lg:flex hidden justify-center items-center rounded-[12px]">
            <span className="sm:text-[12px] text-[10px] text-[#2563EB] dark:text-[#2563EB] sm:leading-[16px] leading-[15px] font-semibold">
              Sincronizado
            </span>
          </div>
        </div>
        <div className="w-full lg:pt-[32px] pt-0 flex flex-col sm:gap-[4px] gap-0">
          <p className="sm:text-[13px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[18px] leading-[16px] font-medium">
            VALOR TOTAL
          </p>
          <span
            className={`${getValueSize(formatPrice(data?.total))} text-[#191C1E] dark:text-[#F1F5F9]  sm:leading-[36px] leading-[32px] font-extrabold`}
          >
            {formatPrice(data?.total)}
          </span>
        </div>
      </div>
      <div className="sm:max-w-[504px] w-full lg:h-[190px] sm:h-[150px] h-[120px] sm:order-5 order-4 col-span-1 bg-[#FFFFFF] dark:bg-[#0D1C2D] lg:p-[24px] p-[12px] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] flex flex-col justify-between">
        <div className="w-[44px] h-[44px] bg-[#EEF2FF] dark:bg-[#3B82F6]/10 p-1 flex justify-center items-center rounded-[12px]">
          <InputIcon className="w-[25px] text-[#4F46E5]" />
        </div>
        <div className="w-full lg:pt-[32px] pt-0 flex flex-col gap-[4px]">
          <p className="text-[13px] text-[#64748B] dark:text-[#94A3B8] leading-[18px] font-medium">
            Movimientos del día
          </p>
          <span className="text-[30px] text-[#191C1E] dark:text-[#F1F5F9] leading-[36px] font-extrabold">
            {data?.createdToday}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BentoMetricsGrid;
