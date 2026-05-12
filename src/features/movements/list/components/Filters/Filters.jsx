import React from "react";
import CheckClipboardIcon from "../../../../../assets/icons/CheckClipboardIcon";
import FilterIcon from "../../../../../assets/icons/FilterIcon";
import CustomSelect from "../../../../../shared/components/CustomSelect/CustomSelect";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import DownloadIcon from "../../../../../assets/icons/DownloadIcon";
import DatePickerInput from "../../../../../shared/components/DatePickerInput/DatePickerInput";
import CalendarIcon from "../../../../../assets/icons/CalendarIcon";

const stockStatusOptions = [
  { value: "all", label: "Todos los tipos" },
  { value: "STOCK_IN", label: "Entrada" },
  { value: "STOCK_OUT", label: "Salida" },
];

const Filters = ({ disabled, filters, setFilters }) => {
  return (
    <div className="sm:min-w-[960px] w-full sm:h-[58px] bg-[#FFFFFF] dark:bg-[#0D1C2D] p-[8px] flex items-center justify-between gap-[12px] rounded-t-[8px]">
      <div className="sm:w-auto w-full grid sm:grid-cols-[repeat(3,max-content)] grid-cols-2 items-center sm:gap-[16px] gap-[7px]">
        <label
          htmlFor="search"
          className="relative sm:w-[326px] w-full h-[40px] sm:col-span-1 col-span-2 bg-[#F2F4F6] dark:bg-[#051424] flex justify-start items-center pl-[40px] py-[11px] pr-[16px] rounded-[4px]"
        >
          <div className="absolute left-3 w-[18px] h-[24px] flex justify-center items-center">
            <SearchIcon className="text-[#737686] dark:text-[#94A3B8]" />
          </div>
          <input
            type="text"
            value={filters.search}
            id="search"
            name="search"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            disabled={disabled}
            placeholder="Buscar productos..."
            className="outline-none text-[14px] text-[#6B7280] dark:text-[#94A3B8] font-normal"
          />
        </label>
        <div className="sm:min-w-[215.24px] w-full">
          <DatePickerInput
            mode="range"
            value={filters?.date}
            onChange={(opt) => {
              if (!opt) {
                setFilters((prev) => ({
                  ...prev,
                  date: null,
                }));
                return;
              }
              setFilters((prev) => ({
                ...prev,
                date: opt,
              }));
            }}
            disabled={disabled}
            icono={<CalendarIcon className="w-[16px] dark:text-[#94A3B8]" />}
          />
        </div>
        <div className="sm:min-w-[173.39px] w-full">
          <CustomSelect
            value={
              stockStatusOptions.find((o) => o?.value === filters?.type) || null
            }
            options={stockStatusOptions}
            onChange={(opt) =>
              setFilters((prev) => ({
                ...prev,
                type: opt?.value,
              }))
            }
            icono={
              <CheckClipboardIcon className="w-[16px] dark:text-[#94A3B8]" />
            }
            disabled={disabled}
            placeholder="Tipo: Todos"
          />
        </div>
        <button className="sm:w-[112.13px] w-full h-[38px] sm:hidden flex items-center gap-[8px] bg-transparent dark:bg-[#0D1C2D] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px] px-[16px] cursor-pointer">
          <DownloadIcon className="w-[15px] h-[15px] text-[#475569] dark:text-[#F1F5F9]" />
          <span className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px] font-semibold">
            Exportar
          </span>
        </button>
      </div>
      <button
        disabled={disabled}
        className="w-[112.13px] h-[38px] sm:flex hidden items-center gap-[8px] bg-transparent dark:bg-[#0D1C2D] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px] px-[16px] cursor-pointer"
      >
        <DownloadIcon className="min-w-[15px] min-h-[15px] text-[#475569] dark:text-[#F1F5F9]" />
        <span className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px] font-semibold">
          Exportar
        </span>
      </button>
    </div>
  );
};

export default Filters;
