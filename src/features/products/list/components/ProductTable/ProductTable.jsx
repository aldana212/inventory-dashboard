import React, { useState } from "react";
import { useProductHandlers } from "../../../hooks/useProductHandlers";
import { useProductActions } from "../../../hooks/useProductActions";
import { getColumns } from "../../columns";
import { useProducts } from "../../../queries/useProducts";
import Filters from "../Filters/Filters";
import DataTable from "../../../../../shared/components/DataView/DataTable/DataTable";
import CardList from "../../../../../shared/components/DataView/CardList/CardList";
import ProductTableCard from "./ProductTableCard";

const ProductTable = () => {
  const handlers = useProductHandlers();
  const actions = useProductActions(handlers);
  const columns = getColumns(actions);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
    pageCount: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    stockStatus: "all",
    isActive: "all",
  });

  const { data, isLoading } = useProducts({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    search: filters.search,
    category: filters.category,
    stockStatus: filters.stockStatus,
    isActive: filters.isActive,
  });

  const isFilters =
    filters.isActive !== "all" ||
    filters.stockStatus !== "all" ||
    filters.category !== "all" ||
    filters?.search?.trim()?.length != 0;

  const handleChangePageIndex = (value) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: value,
    }));
  };

  return (
    <div className="w-full flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] gap-2 sm:overflow-hidden">
      <Filters disabled={isLoading} filters={filters} setFilters={setFilters} />
      {/* <ListProduct data={data?.data ?? []} /> */}

      <div className="sm:flex hidden">
        <DataTable
          data={data?.data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={setPagination}
          globalFilter={filters.search}
          manualPagination={true}
          manualFiltering={true}
          pageCount={data?.pagination?.pages ?? 0}
          isLoading={isLoading}
          emptyState={{
            title: "No hay productos registrados",
            description:
              "Aún no has agregado productos. Cuando lo hagas, aparecerán aquí.",
          }}
          isFilters={isFilters}
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
            title: "No hay productos registrados",
            description:
              "Aún no has agregado productos. Cuando lo hagas, aparecerán aquí.",
          }}
          renderItem={(item, index) => (
            <ProductTableCard
              key={item.id}
              data={item}
              index={index}
              actions={actions}
            />
          )}
        />
      </div>
    </div>
  );
};

export default ProductTable;
