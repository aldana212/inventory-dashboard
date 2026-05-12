import React from "react";
import { formatPrice } from "../../../../../utils/formatPrice";
import EllipsisIcon from "../../../../../assets/icons/EllipsisIcon";

const CardProduct = ({ data }) => {
  const lowStock = Number(data?.currentStock) > Number(data?.minimumStock);

  return (
    <div className="max-w-[422px] h-[375px] bg-[#FFFFFF] flex flex-col border border-[#E2E8F0] rounded-[12px] overflow-hidden">
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={data?.productImages[0]?.url}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col flex-1 gap-[16px] p-[24px]">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-[3px]">
            <p className="text-[20px] text-[#191B23] leading-[20px] font-semibold">
              {data?.name}
            </p>
            <span className="text-[12px] text-[#64748B] leading-[20px]">
              SKU: {data?.sku}
            </span>
          </div>
          <div className="relative">
            <EllipsisIcon className="w-[20px] h-[20px] rotate-90 text-[#94A3B8] hover:text-[#737686] cursor-pointer transition-all duration-300" />
          <div className="absolute w-[]">

          </div>
          
          </div>
        </div>

        <div className="w-full flex items-center justify-between pt-[6px] border-t border-t-[#F1F5F9]">
          <div className="flex flex-col gap-[2px]">
            <p className="text-[11px] text-[#94A3B8] leading-[16px] font-semibold">
              PRECIO
            </p>
            <span className="text-[16px] text-[#1D4ED8] leading-[18px] font-semibold">
              {formatPrice(data?.purchasePrice)}{" "}
              <span className="text-[10px]">COP</span>
            </span>
          </div>
          <div className="flex flex-col gap-[2px] items-end">
            <p className="text-[10px] text-[#94A3B8] leading-[20px]">
              CANTIDAD
            </p>
            <span
              className={`text-[14px] ${lowStock ? "text-[#334155]" : "text-[#BA1A1A]"} leading-[16px] font-semibold`}
            >
              {data?.currentStock} Unidades
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
