import React, { useEffect, useState } from "react";
import ProductIcon from "../../../../../assets/icons/productIcon";
import ActionsCell from "../../../../../shared/components/DataView/DataTable/ActionsCell";
import { formatPrice } from "../../../../../utils/formatPrice";

const ProductTableCard = ({ data, index, actions }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);

    return () => clearTimeout(timer);
  }, [index]);

  const name = data?.name;
  const sku = data?.sku;
  const img = data?.productImages[0];

  const lowStock = Number(data?.currentStock) > Number(data?.minimumStock);

  const total = Number(data?.currentStock) * Number(data?.purchasePrice);

  return (
    <div
      key={data?.reference}
      className={`w-full min-h-[215px] flex flex-col gap-[16px] p-[16px] border-b border-b-[#F9FAFB] dark:border-b-[#1E293B] last:border-b-transparent 
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
        <div className="w-[40px] h-[40px] shrink-0 bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center overflow-hidden">
          {!img?.url && (
            <ProductIcon className="w-[30px] text-[#2563EB] dark:text-[#94A3B8]" />
          )}
          {img?.url && (
            <img
              src={img?.url}
              alt={`Img-product-${img?.position + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="w-full flex flex-col items-start gap-[2px]">
          <p className="text-[14px] leading-[15px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
            {name}
          </p>
          <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
            SKU: {sku}
          </span>
          <span className="w-full h-[20px] flex items-center justify-center bg-[#DBEAFE] dark:bg-[#3B82F622] text-[#1D4ED8] dark:text-[#3B82F6] text-[10px] font-semibold px-[8px] py-[2px] rounded-[12px] max-w-max">
            {data?.category?.name || "-"}
          </span>
        </div>
        <ActionsCell row={data} actions={actions} />
      </div>
      <div className="w-full min-h-px bg-[#F9FAFB] dark:bg-[#1E293B]" />
      <div className="w-full grid grid-cols-2 gap-[8px]">
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">STOCK</h3>
          <p
            className={`text-[14px] ${lowStock ? "text-[#191C1E] dark:text-[#F1F5F9]" : "text-[#EF4444]"} leading-[20px] font-semibold`}
          >
            {data?.currentStock}
          </p>
        </div>
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">ESTADO</h3>
          <span
            className={`h-[20px] flex items-center justify-center ${data?.isActive === "active" ? "bg-[#D1FAE5] text-[#047857]" : "bg-[#E0E3E5] text-[#515F74]"}  sm:text-[14px] text-[10px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
          >
            {data?.isActive === "active" ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">PRECIO</h3>
          <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px] font-semibold">
            {formatPrice(data?.salePrice)}
          </span>
        </div>
        <div className="flex flex-col gap-[2px] justify-start items-start">
          <h3 className="text-[10px] text-[#64748B] leading-[15px]">
            VALOR TOTAL
          </h3>
          <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20px] font-semibold">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductTableCard;
