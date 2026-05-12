import React from "react";
import WalletIcon from "../../../assets/icons/WalletIcon";
import { useTheme } from "../../../hooks/useTheme";
import Skeleton from "../Skeleton/Skeleton";

const MetricCard = ({
  title,
  value,
  icon,
  active = false,
  border = "#E2E8F0",
  iconBackground = "#F2F4F6",
  isLoading,
}) => {
  const { darkMode } = useTheme();

  const getValueSize = () => {
    const len = value?.toString().length || 0;

    if (len >= 14) return "text-[16px]";
    if (len >= 11) return "text-[18px]";
    if (len >= 9) return "text-[20px]";

    return "text-[clamp(20px,2vw,24px)]";
  };

  return (
    <>
      {isLoading && (
        <div className="w-full h-[114px] bg-[#FFFFFF] dark:bg-[#0D1C2D] p-[24px] flex items-center gap-[16px] rounded-[8px]">
          <Skeleton className="min-w-[43px] min-h-[43px]" />
          <div className="w-full flex flex-col gap-[8px]">
            <Skeleton className="w-[70%] h-[10px]" />
            <Skeleton className="w-1/2 h-[10px]" />
          </div>
        </div>
      )}
      {!isLoading && (
        <div
          className={`w-full min-h-[114px]
        ${active ? "bg-[#004AC6]" : "bg-[#FFFFFF] dark:bg-[#0D1C2D]"}
         md:p-[24px] p-[12px] flex sm:flex-row flex-col sm:items-center items-start justify-start sm:gap-[16px] gap-[8px] rounded-[8px]
         
         `}
          style={{
            border: `1px solid ${active ? "#FFFFFF" : darkMode ? "#1E293B" : border}`,
          }}
        >
          <div
            className="min-w-[43px] min-h-[43px] flex justify-center items-center rounded-[8px] p-1"
            style={{ background: iconBackground }}
          >
            {/* <WalletIcon className="text-[#FFFFFF]" /> */}
            {icon}
          </div>
          <div className="w-full flex flex-col">
            <p
              className={`text-[12px] 
            ${active ? "text-[#FFFFFF]" : "text-[#515F74] dark:text-[#94A3B8]"}
             leading-[16px] font-bold`}
            >
              {" "}
              {title}
            </p>
            <span
              className={`${getValueSize()} leading-tight font-extrabold truncate
          ${active ? "text-white" : "text-[#191C1E] dark:text-[#F1F5F9]"}`}
            >
              {value}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default MetricCard;
