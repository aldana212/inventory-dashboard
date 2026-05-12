import React, { useState } from "react";
import DataTable from "../../../../../shared/components/DataView/DataTable/DataTable";
import DownloadIcon from "../../../../../assets/icons/DownloadIcon";
import { useParams } from "react-router";
import { useProductsMovements } from "../../../queries/useProductsMovements";
import { columns } from "../../columns";
import CardList from "../../../../../shared/components/DataView/CardList/CardList";
import ProductDetailTableCard from "./ProductDetailTableCard";

const ProductDetailTable = () => {
  let { id } = useParams();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isLoading } = useProductsMovements({
    id,
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
    <div className="w-full  flex flex-col bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] overflow-hidden">
      <div className="w-full h-[59px] sm:px-[24px] px-[16px] py-[16px] flex items-center justify-between">
        <h3 className="text-[16px] text-[#0F172A] sm:flex hidden dark:text-[#F1F5F9] leading-[24px] font-bold">
          Historial de movimientos
        </h3>
        <h3 className="text-[16px] text-[#0F172A] sm:hidden flex dark:text-[#F1F5F9] leading-[24px] font-bold">
          Historial
        </h3>
        <button className="flex items-center gap-[8px] cursor-pointer">
          <span className="sm:text-[14px] text-[12px] text-[#004AC6] leading-[20px] font-semibold">
            Exportar reporte
          </span>
          <div className="w-[18px] h-[18px] flex justify-center items-center">
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
          pageCount={data?.pagination?.pages ?? 0}
          isLoading={isLoading}
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas o salidas para este producto. Los nuevos movimientos aparecerán aquí.",
          }}
        />
      </div>

      <div className="sm:hidden flex border-t border-t-[#F9FAFB] dark:border-t-[#1E293B]">
        <CardList
          data={data?.data}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          pageCount={data?.pagination?.pages ?? 0}
          emptyState={{
            title: "No hay movimientos registrados",
            description:
              "Aún no se han realizado entradas o salidas para este producto. Los nuevos movimientos aparecerán aquí.",
          }}
          renderItem={(item, index) => (
            <ProductDetailTableCard key={item.id} data={item} index={index} />
          )}
        />
      </div>
    </div>
  );
};

export default ProductDetailTable;
