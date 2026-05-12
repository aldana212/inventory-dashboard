import React, { useState } from "react";
import { useMovements } from "../../../queries/useMovements";
import Filters from "../Filters/Filters";
import { columns } from "../../columns";
import DataTable from "../../../../../shared/components/DataView/DataTable/DataTable";
import CardList from "../../../../../shared/components/DataView/CardList/CardList";
import MovementsPageTableCard from "./MovementsPageTableCard";

const MovementsPageTable = () => {
  const [filters, setFilters] = useState({
    search: "",
    date: null,
    type: "all",
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading } = useMovements({
    ...filters,
    ...pagination,
  });

  const isFilters =
    filters.type !== "all" ||
    filters.date !== null ||
    filters?.search?.trim()?.length != 0;

  const handleChangePageIndex = (value) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: value,
    }));
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px]">
      <Filters disabled={isLoading} filters={filters} setFilters={setFilters} />
      <div className="sm:flex hidden">
        <DataTable
          data={data?.data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={handleChangePageIndex}
          isLoading={isLoading}
          pageCount={data?.pages ?? 0}
          manualPagination
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas ni salidas en el inventario. Cuando registres movimientos, se mostrarán aquí.",
          }}
          isFilters={isFilters}
        />
      </div>
      <div className="sm:hidden flex border-t sm:border-t-transparent border-t-[#F9FAFB] dark:border-t-[#1E293B]">
        <CardList
          data={data?.data}
          pagination={pagination}
          onPaginationChange={handleChangePageIndex}
          isLoading={isLoading}
          pageCount={data?.pages ?? 0}
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas ni salidas en el inventario. Cuando registres movimientos, se mostrarán aquí.",
          }}
          renderItem={(item, index) => (
            <MovementsPageTableCard key={item.id} data={item} index={index} />
          )}
        />
      </div>
    </div>
  );
};

export default MovementsPageTable;
