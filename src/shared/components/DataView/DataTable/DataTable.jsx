import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import Pagination from "./Pagination";
import CustomLoader from "../../CustomLoader/CustomLoader";
import SearchIcon from "../../../../assets/icons/SearchIcon";
// import { usePermissions } from "../../../hooks/usePermissions";

const DataTable = ({
  data, // data(registros)
  columns, // columnas de la tabla
  pagination, // datos de paginacion
  onPaginationChange, // Modificar paginacions
  globalFilter,
  onGlobalFilterChange,
  manualPagination,
  manualFiltering,
  pageCount,
  isLoading, //Loading de carga
  onRowClick,
  emptyState,
  isFilters = false,
}) => {
  // const { hasRole } = usePermissions();

  // const filteredColumns = columns.filter((col) => {
  //   console.log(col);
    
  //   if (col.id !== "actions") return true;
  //   return hasRole(["ADMIN", "SUPERVISOR", "OPERADOR"]);
  // });

  //   useReactTable es hook que recibe la config de toda la tabla(data, column) y devuelve todo lo necesario para renderizar la tabla
  const table = useReactTable({
    data,
    columns: columns,
    state: {
      pagination,
      globalFilter,
    },

    manualPagination,
    manualFiltering,

    pageCount,

    onPaginationChange,
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col rounded-b-[8px] min-h-[480px] max-h-[475px] shadow-sm">
      <div className={`${data?.length !== 0 && "flex-1"} overflow-auto`}>
        <table className="w-full table-fixed">
          {/* 🔹 Anchos exactos */}
          <colgroup>
            {table.getAllLeafColumns().map((col) => (
              <col
                key={col.id}
                style={{ width: `${col.columnDef.size}px`, height: "48px" }}
              />
            ))}
          </colgroup>

          {/* Header */}
          <thead className="bg-[#F8FAFC]/50 dark:bg-[#051424] h-[48px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left text-[#64748B] dark:text-[#94A3B8] text-[12px] leading-[16px]"
              >
                {headerGroup.headers.map((header) => {
                  const total = table.getTotalSize();

                  return (
                    <th
                      key={header.id}
                      className="px-6 py-3 font-bold"
                      style={{
                        width: `${(header.getSize() / total) * 100}%`, // 👈 %
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          {data?.length > 0 && !isLoading && (
            <tbody className="bg-[#FFFFFF]/50 dark:bg-[#0D1C2D]">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="bg-transparent text-left border-b border-b-[#C3C6D7]/15 dark:border-b-[#1E293B] last:border-none hover:bg-gray-50 hover:dark:dark:bg-[#051424] transition cursor-pointer "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="h-[72.5px] p-[16px]"
                      onClick={() => onRowClick?.(row.original)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {isLoading && (
        <div className="w-full h-full bg-[#FFFFFF]/50 dark:bg-[#0D1C2D] flex justify-center items-center">
          <CustomLoader />
        </div>
      )}

      {!isFilters && data?.length === 0 && (
        <div className="w-full h-[300px] bg-[#FFFFFF]/50 dark:bg-[#0D1C2D] flex flex-1 flex-col justify-center items-center gap-[8px]">
          <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#F2F4F6] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] p-3 rounded-[12px]">
            <SearchIcon className="text-[#515F74]/30 dark:text-[#94A3B8]" />
          </div>
          <h3 className="text-[18px] text-[#0B1C30] dark:text-[#F1F5F9]  leading-[20px] font-bold">
            {emptyState?.title}
          </h3>
          <p className="w-[381.06px] text-center text-[14px] text-[#515F74] dark:text-[#94A3B8] leading-[18px]">
            {emptyState?.description}
          </p>
        </div>
      )}

      {isFilters && data?.length === 0 && (
        <div className="w-full h-[300px] bg-[#FFFFFF]/50 dark:bg-[#0D1C2D] flex flex-1 flex-col justify-center items-center gap-[8px]">
          <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#F2F4F6] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] p-3 rounded-[12px]">
            <SearchIcon className="text-[#515F74]/30 dark:text-[#94A3B8]" />
          </div>
          <h3 className="text-[18px] text-[#0B1C30] leading-[20px] dark:text-[#F1F5F9] font-bold">
            No se encontraron resultados
          </h3>
          <p className="w-[381.06px] text-center text-[14px] text-[#515F74] dark:text-[#94A3B8] leading-[18px]">
            No se encontraron coincidencias para los filtros seleccionados.
            Intenta ajustar los criterios de búsqueda o limpiar los filtros.
          </p>
        </div>
      )}

      {data?.length > 0 && table?.getPageCount() >= 2 && (
        <div className="shrink-0 w-full h-[64px] px-[24px] py-[16px] flex justify-between items-center bg-[#F2F4F6]/30 dark:bg-[#051424]">
          <p></p>
          <Pagination
            currentPage={table?.getState()?.pagination?.pageIndex + 1}
            totalPages={table?.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
