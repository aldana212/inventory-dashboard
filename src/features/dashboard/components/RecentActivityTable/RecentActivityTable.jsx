import React, { useState } from "react";
import Pagination from "../../../../shared/components/DataView/DataTable/Pagination";
import DataTable from "../../../../shared/components/DataView/DataTable/DataTable";
import { columns } from "../../columns";
import { useMovements } from "../../../movements/queries/useMovements";
import CardList from "../../../../shared/components/DataView/CardList/CardList";
import RecentActivityCard from "./RecentActivityCard";

const RecentActivityTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
    pageCount: 0,
  });

  const { data, isLoading } = useMovements({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const handleChangePageIndex = (value) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: value,
    }));
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#0D1C2D]  border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:rounded-t-[12px] rounded-[12px]">
      <div className="w-full sm:h-[59px] h-[69px] sm:px-[24px] sm:py-[16px] p-[20px] border-b sm:border-b-transparent border-b-[#F9FAFB] dark:border-b-[#1E293B] flex items-center justify-between">
        <h3 className="text-[16px] text-[#0F172A] dark:text-[#F1F5F9] leading-[24px] font-bold">
          Actividad Reciente
        </h3>
        <p className="text-[14px] text-[#004AC6] dark:text-[#2563EB] leading-[20px] font-semibold">
          Ver Todo
        </p>
      </div>

      {/* 73.5 - 81 */}

      <div className="hidden sm:flex">
        <DataTable
          data={data && data?.data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          pageCount={data?.pages ?? 0}
          manualPagination
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas o salidas para este producto. Los nuevos movimientos aparecerán aquí.",
          }}
        />
      </div>

      <div className="sm:hidden flex">
        <CardList
         data={data?.data}
          pagination={pagination}
          onPaginationChange={handleChangePageIndex}
          isLoading={isLoading}
          pageCount={data?.pages ?? 0}
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas o salidas para este producto. Los nuevos movimientos aparecerán aquí.",
          }}
          renderItem={(item, index) => (
            <RecentActivityCard
              key={item.id}
              data={item}
              index={index}
            />
          )}
        />
      </div>
    </div>
  );
};

export default RecentActivityTable;
