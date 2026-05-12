import React, { useState } from "react";
import AddIcon from "../../../assets/icons/AddIcon";
import MetricCard from "../../../shared/components/MetricCard/MetricCard";
import SuppliersIcon from "../../../assets/icons/SuppliersIcon";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import DataTable from "../../../shared/components/DataView/DataTable/DataTable";
import { getColumns } from "./columns";
import { useCategory } from "../queries/useCategory";
import { useStatsCategory } from "../queries/useStatsCategory";
import CheckBadgeIcon from "../../../assets/icons/CheckBadgeIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import DisabledIcon from "../../../assets/icons/DisabledIcon";
import CustomModal from "../../../shared/components/CustomModal/CustomModal";
import CategoryForm from "../form/CategoryForm";
import ModalDelete from "../../../shared/components/ModalDelete/ModalDelete";
import { usePermissions } from "../../../hooks/usePermissions";
import { useTheme } from "../../../hooks/useTheme";
import { useCategoryHandlers } from "../hooks/useCategoryHandlers";
import { useCategoryActions } from "../hooks/useCategoryActions";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import CardList from "../../../shared/components/DataView/CardList/CardList";
import CategoryTableCard from "./components/CategoryTableCard/CategoryTableCard";

const CategoryPage = () => {
  const { hasRole } = usePermissions();
  const { darkMode } = useTheme();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data: statsData, isLoading: statsIsLoading } = useStatsCategory();
  const { data, isLoading } = useCategory({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const handlers = useCategoryHandlers();
  const actions = useCategoryActions(handlers);
  const columns = getColumns(actions);

  const [isForm, setIsForm] = useState(false);

  const handleChangePageIndex = (value) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: value,
    }));
  };

  return (
    <div className="w-full flex flex-1 flex-col justify-start gap-[32px] sm:pb-0 pb-24">
      <div className="w-full h-auto flex sm:flex-row flex-col flex sm:items-end items-start justify-between gap-[20px]">
        <div className="flex flex-col lg:gap-[8px] gap-[2px]">
          <h3 className="lg:text-[30px] text-[20px] text-[#191C1E] dark:text-[#F1F5F9] lg:leading-[36px] leading-[32px] font-extrabold">
            Gestión de Categorías
          </h3>
          <p className="lg:text-[16px] text-[14px] text-[#434655] dark:text-[#94A3B8] lg:leading-[24px] leading-[16px]">
            Organiza y segmenta tu inventario para optimizar la cadena de
            suministro y el análisis de existencias.
          </p>
        </div>
        {hasRole(["ADMIN", "SUPERVISOR"]) && (
          <button
          disabled={isLoading && statsIsLoading}
            onClick={() => setIsForm(true)}
            className="sm:max-w-max w-full h-[44.42px] bg-[#004AC6] disabled:bg-[#E0E3E5] dark:disabled:bg-transparent border border-transparent dark:disabled:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <div className="w-[20px] h-[20px] flex justify-center items-center">
              <AddIcon className="w-[20px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A]" />
            </div>
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A] leading-[22.8px] font-semibold">
              Agregar categoría
            </span>
          </button>
        )}
      </div>
      <div className="xl:min-w-[960px] w-full min-h-[114px] grid lg:grid-cols-4 grid-cols-2 xl:gap-[24px] lg:gap-[12px] gap-[8px]">
        <MetricCard
          title="Total categorías"
          value={statsData?.total}
          icon={
            <CategoryIcon className="w-[25px] text-[#2563EB] dark:text-[#004AC6]" />
          }
          iconBackground={darkMode ? "#3B82F61A" : "#EFF6FF"}
          isLoading={statsIsLoading}
        />
        <MetricCard
          title="Activas"
          value={statsData?.active}
          icon={
            <CheckCircleIcon className="w-[25px] text-[#16A34A] dark:text-[#10B981]" />
          }
          iconBackground={darkMode ? "#22C55E1A" : "#F0FDF4"}
          isLoading={statsIsLoading}
        />
        <MetricCard
          title="Inactivas"
          value={statsData?.inactive}
          icon={
            <DisabledIcon className="w-[25px] text-[#515F74] dark:text-[#94A3B8]" />
          }
          iconBackground={darkMode ? "#6B72801A" : "#E0E3E5"}
          isLoading={statsIsLoading}
        />

        <MetricCard
          title="Sin productos"
          value={statsData?.empty}
          icon={
            <AlertIcon className="w-[25px] text-[#BA1A1A] dark:text-[#EF4444]" />
          }
          iconBackground="#FFDAD633"
          iconBackground={darkMode ? "#EF44441A" : "#FFDAD633"}
          isLoading={statsIsLoading}
        />
      </div>
      {/* {!isLoading && ( */}
      <div className="w-full flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] overflow-hidden">
        <div className="w-full h-[59px] sm:px-[24px] px-[16px] py-[16px] flex items-center justify-between">
          <h3 className="text-[16px] text-[#0F172A] sm:flex hidden dark:text-[#F1F5F9] leading-[24px] font-bold">
            Registros de categorias
          </h3>
          <h3 className="text-[16px] text-[#0F172A] sm:hidden flex dark:text-[#F1F5F9] leading-[24px] font-bold">
            Categorias
          </h3>
          <button className="flex items-center gap-[8px] cursor-pointer">
            <span className="sm:text-[14px] text-[12px] text-[#004AC6] hidden leading-[20px] font-semibold">
              Exportar reporte
            </span>
            <div className="w-[18px] h-[18px] hidden justify-center items-center">
              <DownloadIcon className="w-[18px] text-[#004AC6]" />
            </div>
          </button>
        </div>
        <div className="sm:flex hidden">
          <DataTable
            data={data?.data}
            columns={columns}
            pagination={pagination}
            onPaginationChange={setPagination}
            isLoading={isLoading}
            pageCount={data?.pagination?.pages ?? 0}
            emptyState={{
              title: "No hay categorías registradas",
              description:
                "Aún no has creado categorías. Cuando lo hagas, aparecerán aquí.",
            }}
          />
        </div>

        <div className="sm:hidden flex border-t border-t-[#F9FAFB] dark:border-t-[#1E293B]">
          <CardList
            data={data?.data}
            pagination={pagination}
            onPaginationChange={handleChangePageIndex}
            isLoading={isLoading}
            pageCount={data?.pagination?.pages ?? 0}
            emptyState={{
              title: "No hay categorías registradas",
              description:
                "Aún no has creado categorías. Cuando lo hagas, aparecerán aquí.",
            }}
            renderItem={(item, index) => (
              <CategoryTableCard
                key={item.id}
                data={item}
                index={index}
                actions={actions}
              />
            )}
          />
        </div>
      </div>

      <CustomModal isOpen={handlers?.isEditOpen || isForm}>
        <CategoryForm
        isOpen={handlers?.isEditOpen || isForm}
          onClose={() => {
            handlers?.closeEdit();
            setIsForm(false);
          }}
          info={handlers?.selectedCategory}
        />
      </CustomModal>
    </div>
  );
};

export default CategoryPage;
