import React from "react";
import AlertIcon from "../../../../assets/icons/AlertIcon";
import ProductIcon from "../../../../assets/icons/ProductIcon";

const AlertBanners = () => {
  return (
    <div className="w-full h-auto flex items-center justify-center gap-[12px]">
      <div className="relative w-full min-h-[76px] flex items-center justify-between p-[16px] bg-[#FFF7ED] border border-[#FFEDD5] gap-[20px] rounded-[12px] ">
        <div className="flex gap-[12px]">
          <div className="w-[38px] h-[38px] bg-[#FFEDD5] flex justify-center items-center rounded-[8px]">
            <AlertIcon className="w-[30px] text-[#EA580C]" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] text-[#0F172A] leading-[24px] font-semibold ">
              Productos con bajo stock
            </h3>
            <p className="text-[13px] text-[#475569] leading-[18px]">
              18 productos necesitan atencion
            </p>
          </div>
        </div>
        <button className="h-[32px] px-[12px] py-[6px] flex justify-center items-center rounded-[8px] border border-[#FED7AA]">
          <span className="text-[13px] text-[#C2410C] leading-[18px] font-semibold">
            Ver detalle
          </span>
        </button>
      </div>
      <div className="relative w-full min-h-[76px] flex items-center justify-between p-[16px] bg-[#FEF2F2] border border-[#FEE2E2] gap-[20px] rounded-[12px] ">
        <div className="flex gap-[8px]">
          <div className="w-[38px] h-[38px] bg-[#FEE2E2] flex justify-center items-center rounded-[8px]">
            <ProductIcon className="w-[30px] text-[#DC2626]" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-[16px] text-[#0F172A] leading-[24px] font-semibold ">
              Productos agotados
            </h3>
            <p className="text-[13px] text-[#475569] leading-[18px]">
              5 productos sin existencias
            </p>
          </div>
        </div>
       <button className="h-[32px] px-[12px] py-[6px] flex justify-center items-center rounded-[8px] border border-[#FECACA]">
          <span className="text-[13px] text-[#B91C1C] leading-[18px] font-semibold">
            Ver detalle
          </span>
        </button>
      </div>
    </div>
  );
};

export default AlertBanners;
