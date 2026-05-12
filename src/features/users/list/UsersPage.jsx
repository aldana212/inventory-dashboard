import React, { useState } from "react";
import MetricCard from "../../../shared/components/MetricCard/MetricCard";
import SuppliersIcon from "../../../assets/icons/suppliersIcon";
import CheckBadgeIcon from "../../../assets/icons/CheckBadgeIcon";
import TimerIcon from "../../../assets/icons/TimerIcon";
import AddIcon from "../../../assets/icons/AddIcon";
import { getColumns } from "./columns";
import DataTable from "../../../shared/components/DataView/DataTable/DataTable";
import { useGetUsers } from "../queries/useGetUsers";
import { useGetUsersStats } from "../queries/useGetUsersStats";
import CustomModal from "../../../shared/components/CustomModal/CustomModal";
import UserForm from "../form/UserForm";
import ModalDelete from "../../../shared/components/ModalDelete/ModalDelete";
import UsersIcon from "../../../assets/icons/UsersIcon";
import UserCheckIcon from "../../../assets/icons/UserCheckIcon";
import UserShieldIcon from "../../../assets/icons/UserShieldIcon";
import UsersSlashIcon from "../../../assets/icons/UsersSlashIcon";
import UserXmarkIcon from "../../../assets/icons/UserXmarkIcon";
import { useTheme } from "../../../hooks/useTheme";
import { useUserHandlers } from "../hook/useUserHandlers";
import { useUserActions } from "../hook/useUserActions";
import CardList from "../../../shared/components/DataView/CardList/CardList";
import UsersTableCard from "./components/UsersTableCard/UsersTableCard";
import DownloadIcon from "../../../assets/icons/DownloadIcon";

const UsersPage = () => {
  const [isform, setIsform] = useState(false);
  const { darkMode } = useTheme();

  const handlers = useUserHandlers();
  const actions = useUserActions(handlers);
  const columns = getColumns(actions);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading } = useGetUsers({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });
  const { data: dataStats, isLoading: isLoadingStats } = useGetUsersStats();

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
            Gestión de Usuarios
          </h3>
          <p className="lg:text-[16px] text-[14px] text-[#434655] dark:text-[#94A3B8] lg:leading-[24px] leading-[16px]">
            Administra los accesos, roles y permisos de tu organización.
          </p>
        </div>
        <button
          disabled={isLoading && isLoadingStats}
          onClick={() => setIsform(true)}
          className="sm:max-w-max w-full h-[44.42px] bg-[#004AC6] disabled:bg-[#E0E3E5] dark:disabled:bg-transparent border border-transparent dark:disabled:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
        >
          <div className="w-[20px] h-[20px] flex justify-center items-center">
            <AddIcon className="w-[20px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A]" />
          </div>
          <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A] leading-[22.8px] font-semibold">
            Nuevo Usuario
          </span>
        </button>
      </div>
      <div className="xl:min-w-[960px] w-full min-h-[114px] grid lg:grid-cols-4 grid-cols-2 xl:gap-[24px] lg:gap-[12px] gap-[8px]">
        <MetricCard
          title="TOTAL USUARIOS"
          value={dataStats?.total}
          icon={
            <UsersIcon className="w-[20px] text-[#1D4ED8] dark:text-[#004AC6]" />
          }
          iconBackground={darkMode ? "#3B82F61A" : "#EFF6FF"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="ACTIVOS"
          value={dataStats?.active}
          icon={
            <UserCheckIcon className="w-[25px] text-[#047857] dark:text-[#10B981]" />
          }
          iconBackground={darkMode ? "#22C55E1A" : "#ECFDF5"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="INACTIVOS"
          value={dataStats?.inactive}
          icon={
            <UserXmarkIcon className="w-[24px] text-[#334155] dark:text-[#94A3B8]" />
          }
          iconBackground={darkMode ? "#6B72801A" : "#F8FAFC"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="ADMINISTRADORES"
          value={dataStats?.administrators}
          icon={
            <UserShieldIcon className="w-[25px] text-[#7E22CE] dark:text-[#4F46E5]" />
          }
          iconBackground={darkMode ? "#3B82F61A" : "#FAF5FF"}
          isLoading={isLoadingStats}
        />
      </div>
      <div className="w-full flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] overflow-hidden">
        <div className="w-full h-[59px] sm:px-[24px] px-[16px] py-[16px] flex items-center justify-between">
          <h3 className="text-[16px] text-[#0F172A] sm:flex hidden dark:text-[#F1F5F9] leading-[24px] font-bold">
            Registros de usuarios
          </h3>
          <h3 className="text-[16px] text-[#0F172A] sm:hidden flex dark:text-[#F1F5F9] leading-[24px] font-bold">
            Usuarios
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
            onPaginationChange={handleChangePageIndex}
            isLoading={isLoading}
            pageCount={data?.pagination?.pages ?? 0}
            manualPagination={true}
            emptyState={{
              title: "No hay Usuarios registradas",
              description:
                "Aún no has creado Usuarios. Cuando lo hagas, aparecerán aquí.",
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
              title: "No hay Usuarios registradas",
              description:
                "Aún no has creado Usuarios. Cuando lo hagas, aparecerán aquí.",
            }}
            renderItem={(item, index) => (
              <UsersTableCard
                key={item.id}
                data={item}
                index={index}
                actions={actions}
              />
            )}
          />
        </div>
      </div>

      <CustomModal isOpen={handlers?.isEditOpen || isform}>
        <UserForm
          isOpen={handlers?.isEditOpen || isform}
          onClose={() => {
            handlers?.closeEdit();
            setIsform(false);
          }}
          info={handlers?.selectedUser}
        />
      </CustomModal>
    </div>
  );
};

export default UsersPage;
