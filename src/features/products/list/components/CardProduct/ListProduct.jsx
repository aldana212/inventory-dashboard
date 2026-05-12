import React from "react";
import CardProduct from "./CardProduct";
import AddIcon from "../../../../../assets/icons/AddIcon";

const ListProduct = ({ data }) => {

  return (
    <div className="grid grid-cols-3 gap-[24px]">
      {data.map((item) => (
        <CardProduct key={item?.id} data={item} />
      ))}
      <div className="max-w-[422px] h-[375px] bg-[#F8FAFC] flex flex-col justify-center items-center border border-dashed border-[#E2E8F0] rounded-[12px] overflow-hidden cursor-pointer">
        <div className="w-[200px] flex flex-col justify-center items-center  gap-[8px]">
          <div className="w-[64px] h-[64px] rounded-full bg-[#FFFFFF] shadow-md p-3">
             <AddIcon className="text-[#1D4ED8]" />
          </div>
          <p className="text-[20px] text-center text-[#191B23] leading-[20px] font-semibold pt-[10px]">
            Agregar Producto
          </p>
          <span className="text-[12px] text-center text-[#64748B] leading-[16px]">
            Cargue nuevas referencias al inventario nacional.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
