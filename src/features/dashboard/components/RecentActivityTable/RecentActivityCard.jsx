import React, { useEffect, useState } from "react";
import ProductIcon from "../../../../assets/icons/productIcon";
import StatusChip from "../../../../shared/components/StatusChip/StatusChip";
import { getInitialsFromFullName } from "../../../../utils/getInitialsFromFullName";

const RecentActivityCard = ({ data, index }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, index * 70);

    return () => clearTimeout(timer);
  }, [index]);

  const name = data?.product?.name;
  const sku = data?.product?.sku;
  const img = data?.product?.productImages[0];

  const user = data?.user;
  const color = user?.brandColor;

  const bg = `${color}20`; // fondo suave
  const text = color; // texto fuerte

  let firstName = user?.firstName;
  let lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      key={`${data?.reference} - ${index * 80}`}
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
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] bg-[#E6E8EA] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] rounded-[4px] flex justify-center items-center overflow-hidden">
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
          <div className="flex flex-col items-start gap-0">
            <p className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-semibold">
              {name}
            </p>
            <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
              SKU: {sku}
            </span>
          </div>
        </div>
        <span
          className={`${data?.type === "STOCK_IN" ? "text-[#10B981]" : "text-[#EF4444]"}  text-[16px] leading-[24px] font-bold`}
        >
          {data?.type === "STOCK_IN" && "+"}
          {data?.change}
        </span>
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <StatusChip type={data?.type} />
        <div className="flex items-center gap-[8px]">
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
          <div className="min-w-px h-[20px] bg-[#E5E7EB] dark:bg-[#1E293B]" />
          <span className="text-[#64748B] dark:text-[#94A3B8] text-[13px] leading-[18px]">
            {new Date(data?.movementDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
