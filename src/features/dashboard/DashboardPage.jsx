import React from "react";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ProductIcon from "../../assets/icons/productIcon";
import AlertIcon from "../../assets/icons/AlertIcon";
import MovementsIcon from "../../assets/icons/movementsIcon";
import BentoMetricsGrid from "./components/BentoMetricsGrid/BentoMetricsGrid";
import RecentActivityTable from "./components/RecentActivityTable/RecentActivityTable";
import StockDistribution from "./components/StockDistribution/StockDistribution";
import AlertBanners from "./components/AlertBanners/AlertBanners";
import { useGetStats } from "./queries/useGetStats";
import MovementsChart from "./components/MovementsChart/MovementsChart";
import { useGetStatsBar } from "./queries/useGetStatsBar";
import { useGetPopularCategories } from "./queries/useGetPopularCategories";

const DashboardPage = () => {
  const { data } = useGetStats();
  const { data: dataStatsBar } = useGetStatsBar();
  const { data: dataPopularCategories } = useGetPopularCategories();

  
  

  return (
    <div className="w-full h-auto flex flex-1 flex-col justify-start gap-[32px] sm:pb-0 pb-24">
      <div className="w-full h-auto flex sm:flex-row flex-col items-end justify-between sm:gap-0 gap-[16px]">
        <div className="lg:w-[471.13px] sm:w-[400px] w-full flex flex-col">
          <h3 className="lg:text-[30px] text-[20px] text-[#191C1E] dark:text-[#F1F5F9] lg:leading-[36px] leading-[32px] font-extrabold">
            Dashboard
          </h3>
          <p className="lg:text-[16px] text-[14px] text-[#434655] dark:text-[#94A3B8] lg:leading-[24px] leading-[16px]">
            Resumen general del estado de tus existencias y operaciones.
          </p>
        </div>
        <button className="sm:max-w-max w-full h-[36px] bg-[#0050CB] px-[16px] py-[8px] rounded-[8px] flex items-center justify-center gap-[8px]">
          <div className="w-[18px] h-[18px] flex justify-center items-center">
            <DownloadIcon className="text-[#FFFFFF]" />
          </div>
          <span className="text-[14px] text-[#FFFFFF] leading-[20px] font-semibold">
            Exportar reporte
          </span>
        </button>
      </div>
      {/* <AlertBanners /> */}
      <BentoMetricsGrid data={data} />

      <div className="w-full flex sm:flex-row flex-col items-start gap-[20px]">
        {/* <div className="w-full h-[362px] bg-[#FFFFFF] border border-[#E2E8F0] rounded-[12px]"></div> */}
        <MovementsChart data={dataStatsBar} />
        <StockDistribution data={dataPopularCategories} />
      </div>

      <RecentActivityTable />
    </div>
  );
};

export default DashboardPage;
