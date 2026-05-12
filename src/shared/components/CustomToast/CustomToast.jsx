import React from "react";
import { toast } from "sonner";
import CloseIcon from "../../../assets/icons/CloseIcon";
import '../../../index.css'

const variantStyles = {
  success: "bg-[#F0FDF4] dark:bg-[#22C55E]/10",
  error: "bg-[#FEF2F2] dark:bg-[#EF4444]/10",
  info: "bg-[#F1F5F9] dark:bg-[#6B7280]/10",
};

const CustomToast = ({ t, title, description, icon, variant = "info" }) => {
  return (
    <div className="data-sonner-toast flex min-h-[74px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center gap-[12px] p-[16px] items-start gap-3 w-full min-w-[320px] rounded-[12px] shadow-md ">
      {/* Icono */}
      <div
        className={`min-w-[40px] min-h-[40px] rounded-[8px] flex justify-center ${variantStyles[variant]} items-center cursor-pointer transition-all duration-300`}
      >
        {icon}
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-[16px] text-[#0F172A] dark:text-[#F1F5F9] leading-[17.5px] font-bold">
          {title}
        </p>
        {description && (
          <p className="text-[12px] text-[#94A3B8] dark:text-[#94A3B8] leading-[14px]">
            {description}
          </p>
        )}
      </div>

      {/* ❌ Botón cerrar */}
      <div
        className="min-w-[32px] min-h-[32px] rounded-full flex justify-center hover:bg-[#F8FAFC] hover:dark:bg-[#051424] items-center cursor-pointer transition-all duration-300"
        onClick={() => toast.dismiss(t)}
      >
        <CloseIcon className="w-[14px] stroke-2 text-[#94A3B8]" />
      </div>
    </div>
  );
};

export default CustomToast;
