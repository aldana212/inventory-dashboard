import React, { useMemo } from "react";
import CheckClipboardIcon from "../../../../../assets/icons/CheckClipboardIcon";
import FilterIcon from "../../../../../assets/icons/FilterIcon";
import CustomSelect from "../../../../../shared/components/CustomSelect/CustomSelect";
import SearchIcon from "../../../../../assets/icons/SearchIcon";
import DownloadIcon from "../../../../../assets/icons/DownloadIcon";
import { useCategory } from "../../../../categories/queries/useCategory";
import CustomInput from "../../../../../shared/components/CustomInput/CustomInput";

const stockStatusOptions = [
  { value: "all", label: "stock" },
  { value: "in_stock", label: "En stock" },
  { value: "low_stock", label: "Stock bajo" },
  { value: "critical", label: "Stock crítico" },
  { value: "out_of_stock", label: "Agotado" },
];

const statusOptions = [
  { value: "all", label: "Estado" },
  { value: "true", label: "Activos" },
  { value: "false", label: "Inactivos" },
];

const Filters = ({ disabled, filters, setFilters }) => {
  const { data, status } = useCategory();

  const categoryOptions = useMemo(() => {
    if (status === "success") {
      const catego = data?.data
      const newCategoryMock = [...catego];
      newCategoryMock.unshift({ id: "all", name: "Categorías" });

      return newCategoryMock.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
    }
  }, [data, status]);

  return (
    <div className="sm:min-w-[960px] w-full sm:h-[58px] bg-[#FFFFFF] dark:bg-[#0D1C2D] p-[8px] flex items-center justify-between gap-[12px] rounded-t-[12px]">
      <div className="sm:w-auto w-full grid sm:grid-cols-[repeat(4,max-content)] grid-cols-2 items-center sm:gap-[16px] gap-[7px]">
        <label
          htmlFor="search"
          className="relative sm:w-[250px] w-full sm:col-span-1 col-span-2 h-[40px] bg-[#F2F4F6] dark:bg-[#051424] flex justify-start items-center pl-[40px] py-[11px] pr-[16px] rounded-[4px]"
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
        <div className="sm:w-[160px] w-full">
          <CustomSelect
            value={
              categoryOptions?.find((o) => o?.value === filters?.category) ||
              null
            }
            options={categoryOptions}
            onChange={(opt) =>
              setFilters((prev) => ({
                ...prev,
                category: opt?.value,
              }))
            }
            disabled={disabled}
            icono={<FilterIcon className="w-[14px] dark:text-[#94A3B8]" />}
            placeholder="Todas las Categorías"
          />
        </div>
        <div className="sm:w-[130px] w-full">
          <CustomSelect
            value={
              stockStatusOptions.find(
                (o) => o?.value === filters?.stockStatus,
              ) || null
            }
            options={stockStatusOptions}
            onChange={(opt) =>
              setFilters((prev) => ({
                ...prev,
                stockStatus: opt?.value,
              }))
            }
            disabled={disabled}
            icono={
              <CheckClipboardIcon className="w-[14px] dark:text-[#94A3B8]" />
            }
            placeholder="Estado: Todos"
          />
        </div>
        <div className="sm:w-[130px] w-full">
          <CustomSelect
            value={
              statusOptions.find((o) => o?.value === filters?.isActive) || null
            }
            options={statusOptions}
            onChange={(opt) =>
              setFilters((prev) => ({
                ...prev,
                isActive: opt?.value,
              }))
            }
            disabled={disabled}
            icono={
              <CheckClipboardIcon className="w-[14px] dark:text-[#94A3B8]" />
            }
            placeholder="Estado: Todos"
          />
        </div>
        <button
        disabled={disabled}
        className="sm:w-[112.13px] w-full h-[38px] sm:hidden flex items-center gap-[8px] bg-transparent dark:bg-[#0D1C2D] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px] px-[16px] cursor-pointer">
          <DownloadIcon className="w-[15px] h-[15px] text-[#475569] dark:text-[#F1F5F9]" />
          <span className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px] font-semibold">
            Exportar
          </span>
        </button>
      </div>
      <button className="w-[112.13px] h-[38px] sm:flex hidden items-center gap-[8px] bg-transparent dark:bg-[#0D1C2D] border border-[#C3C6D7]/20 dark:border-[#1E293B] rounded-[8px] px-[16px] cursor-pointer">
        <DownloadIcon className="min-w-[15px] min-h-[15px] text-[#475569] dark:text-[#F1F5F9]" />
        <span className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px] font-semibold">
          Exportar
        </span>
      </button>
    </div>
  );
};

export default Filters;
