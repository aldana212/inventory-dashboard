import React from "react";
import WarningCircleIcon from "../../../assets/icons/WarningCircleIcon";
import WarningIcon from "../../../assets/icons/WarningIcon";

const ModalDelete = ({ title, text, name, onClose, onAccept }) => {
  const parts = text.split("{{name}}");

  return (
    <div className="w-[448px] h-auto flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] gap-[24px] pt-[24px] rounded-[12px] overflow-hidden">
      <div className="w-full flex items-start gap-[16px] p-[16px]">
        <div className="min-w-[48px] min-h-[48px] bg-[#FFDAD6]/30 dark:bg-[#EF4444]/10 flex justify-center rounded-full">
          <WarningIcon className="w-[25px] text-[#BA1A1A] dark:text-[#EF4444]" />
        </div>
        <div className="w-full flex flex-col gap-[8px]">
          <h2 className="text-[18px] text-[#191B23] dark:text-[#F1F5F9] leading-[24px] font-semibold">
            {title}
          </h2>
          <p className="text-[14px] text-[#434654] dark:text-[#94A3B8]">
            {parts[0]}
            <strong>{name && name}</strong>
            {parts[1]}
          </p>
        </div>
      </div>
      <div className="w-full min-h-[75px] flex items-center justify-end gap-[12px] p-[16px] bg-[#F8FAFC] dark:bg-[#051424] border-t border-t-[#F1F5F9] dark:border-t-[#0D1C2D]">
        <button
          onClick={onClose}
          className="min-w-[109.48px] h-[44.42px] bg-[#FFFFFF] border border-[#CBD5E1] rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
        >
          <span className="text-[16px] text-[#475569] leading-[24px] font-semibold">
            Cancelar
          </span>
        </button>
        <button
          onClick={onAccept}
          className="min-w-[99.72px] h-[44.42px] bg-[#BA1A1A] disabled:bg-gray-400 rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
        >
          {/* {isPending && <Loader />} */}
          {/* {!isPending && ( */}
          <span className="text-[16px] text-[#FFFFFF] leading-[24px] font-semibold">
            Eliminar
          </span>
          {/* // )} */}
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
