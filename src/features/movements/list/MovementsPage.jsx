import React, { useState } from "react";
import AddIcon from "../../../assets/icons/AddIcon";
import MetricCard from "../../../shared/components/MetricCard/MetricCard";
import WalletIcon from "../../../assets/icons/WalletIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import DataTable from "../../../shared/components/DataView/DataTable/DataTable";
import Filters from "./components/Filters/Filters";
import { useNavigate } from "react-router";
import InputIcon from "../../../assets/icons/InputIcon";
import OutputIcon from "../../../assets/icons/OutputIcon";
import CheckClipboardIcon from "../../../assets/icons/CheckClipboardIcon";
import CustomSelect from "../../../shared/components/CustomSelect/CustomSelect";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import CalculatorIcon from "../../../assets/icons/CalculatorIcon";
import ActivityIcon from "../../../assets/icons/ActivityIcon";
import { useMovementStats } from "../queries/useMovementStats";
import ScaleUnbalancedFlipIcon from "../../../assets/icons/ScaleUnbalancedFlipIcon";
import ScaleIcon from "../../../assets/icons/ScaleIcon";
import ScaleUnbalancedIcon from "../../../assets/icons/ScaleUnbalancedIcon";
import { useTheme } from "../../../hooks/useTheme";
import MovementsPageTable from "./components/MovementsPageTable/MovementsPageTable";

const MovementsPage = () => {
  const { darkMode } = useTheme();
  const [period, setPeriod] = useState("week");

  let navigate = useNavigate();

  const { data: dataStats, isLoading: isLoadingStats } =
    useMovementStats(period);

  const Icon =
    dataStats?.balance > 0
      ? ScaleUnbalancedFlipIcon
      : dataStats?.balance < 0
        ? ScaleUnbalancedIcon
        : ScaleIcon;

  // const isIcon =

  const periodOptions = [
    { label: "Hoy", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mes", value: "month" },
    { label: "Año", value: "year" },
  ];

  return (
    <div className="w-full flex flex-1 flex-col justify-start gap-[32px] sm:pb-0 pb-24">
      <div className="w-full h-auto flex md:flex-row flex-col items-end justify-between gap-[20px]">
        <div className=" flex flex-col lg:gap-[8px] gap-[2px]">
          <h3 className="lg:text-[30px] text-[20px] text-[#191C1E] dark:text-[#F1F5F9] lg:leading-[36px] leading-[32px] font-extrabold">
            Historial de Movimientos
          </h3>
          <p className="sm:w-[700px] w-full lg:text-[16px] text-[14px] text-[#434655] dark:text-[#94A3B8] lg:leading-[24px] leading-[16px]">
            Control detallado de entradas y salidas de mercancía en tiempo real
            para optimizar tu cadena de suministro.
          </p>
        </div>
        <div className="sm:max-w-max w-full flex  items-center sm:gap-[12px] gap-[4px]">
          <div className="sm:min-w-[173.39px] w-full">
            <CustomSelect
              value={periodOptions.find((o) => o?.value === period) || null}
              options={periodOptions}
              onChange={(opt) => setPeriod(opt?.value)}
              icono={<CalendarIcon className="w-[16px] dark:text-[#F1F5F9]" />}
              disabled={isLoadingStats}
              placeholder="Estado: Todos"
            />
          </div>
          <button
          disabled={isLoadingStats}
            onClick={() => navigate(`/movements/input/new`)}
            className="sm:min-w-max w-full h-[40px] bg-[#004AC6] disabled:bg-[#E0E3E5] dark:disabled:bg-transparent border border-transparent dark:disabled:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <span className="sm:text-[14px] text-[13px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A] sm:leading-[22.8px] font-semibold">
              Registrar movimiento
            </span>
          </button>
        </div>
      </div>
      <div className="xl:min-w-[960px] w-full min-h-[114px] grid lg:grid-cols-4 grid-cols-2 xl:gap-[24px] lg:gap-[12px] gap-[8px]">
        <MetricCard
          title="Entradas"
          value={dataStats?.input}
          icon={
            <InputIcon className="w-[25px] text-[#16A34A] dark:text-[#10B981]" />
          }
          iconBackground={darkMode ? "#22C55E1A" : "#F0FDF4"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Salidas"
          value={dataStats?.output}
          icon={<OutputIcon className="text-[#BA1A1A] dark:text-[#EF4444]" />}
          iconBackground={darkMode ? "#EF44441A" : "#FFDAD633"}
          isLoading={isLoadingStats}
        />
        {/* Balance Neto */}
        <MetricCard
          title="Balance"
          value={dataStats?.balance}
          icon={
            <Icon className="w-[25px] text-[#2563EB] dark:text-[#B3C5FF]" />
          }
          iconBackground={darkMode ? "#3B82F61A" : "#EFF6FF"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Movimientos"
          value={dataStats?.movement}
          icon={
            <ActivityIcon className="w-[25px] text-[#515F74] dark:text-[#94A3B8]" />
          }
          iconBackground={darkMode ? "#6B72801A" : "#E0E3E5"}
          isLoading={isLoadingStats}
        />
      </div>
      <MovementsPageTable />
    </div>
  );
};

export default MovementsPage;
