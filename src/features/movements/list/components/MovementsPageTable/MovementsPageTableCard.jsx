import React, { useEffect, useState } from "react";
import { getInitialsFromFullName } from "../../../../../utils/getInitialsFromFullName";
import StatusChip from "../../../../../shared/components/StatusChip/StatusChip";
import ProductIcon from "../../../../../assets/icons/productIcon";

const MovementsPageTableCard = ({ data, index }) => {
  const [show, setShow] = useState(false);

  //  {
  //   createdAt: '2026-05-04T22:59:07.790Z',
  //   movementDate: '2026-05-04T22:59:07.790Z',
  //   reference: 'MOV-TE-000017',
  //   product: {
  //     id: 5,
  //     name: 'business_inventory',
  //     sku: 'DASSA',
  //     description: '',
  //     companyId: 1,
  //     categoryId: 1,
  //     unitId: 1,
  //     purchasePrice: '212',
  //     salePrice: '213',
  //     currentStock: '5',
  //     minimumStock: '1',
  //     isActive: true,
  //     createdAt: '2026-05-04T22:48:21.551Z',
  //     updatedAt: '2026-05-06T15:39:44.041Z',
  //     productImages: []
  //   },
  //   type: 'STOCK_OUT',
  //   change: -1,
  //   stockBefore: '9',
  //   stockAfter: '8',
  //   user: {
  //     id: 4,
  //     firstName: 'Jose',
  //     lastName: 'Aldana',
  //     email: 'danielaldana212@gmail.com',
  //     companyId: 1,
  //     status: 'ACTIVE',
  //     brandColor: '#EC4899'
  //   }
  // }

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

  const dateTime = new Date(data?.movementDate).toLocaleDateString()

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
      <div className="flex items-start gap-3">
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

      <div className="w-full flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-0">
          <p className="text-[14px] leading-[20px] text-[#191C1E] dark:text-[#F1F5F9] font-medium">
             {dateTime}
          </p>
          <span className="text-[10px] text-[#94A3B8] dark:text-[#94A3B8]">
            REF:  {data?.reference}
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

export default MovementsPageTableCard;
