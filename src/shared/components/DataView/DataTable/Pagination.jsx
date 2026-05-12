import React, { useMemo } from "react";
import ChevronIcon from "../../../../assets/icons/ChevronIcon";
import EllipsisIcon from "../../../../assets/icons/EllipsisIcon";

// currentPage (página actual)
// totalPages (total de páginas)
// onPageChange (modifica la pagina actual)
// delta = 2 (rango alrededor)

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 🔹 lógica del paginador
  const pages = useMemo(() => {
    let result = [];

    if (totalPages <= 6) {
      result = Array.from({ length: totalPages }, (_, i) => i + 1);
      // pages = [1, 2, 3, 4, "...", totalPages];
    } else {
      if (currentPage <= 3) {
        result = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        result = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        result = [1, "...", currentPage, currentPage + 1, "...", totalPages];
      }
    }

    return result;
  }, [currentPage, totalPages]);

  // 🔹 handlers
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-[32px] h-[32px] flex justify-center items-center border rounded-[4px] p-2
            border-[#C3C6D7]/20 dark:border-[#1E293B] text-[#191C1E] dark:text-[#F1F5F9] font-normal
            text-[12px] leading-[16px] disabled:opacity-50 cursor-pointer`}
      >
        <ChevronIcon className="w-5 h-5 text-[#191C1E] dark:text-[#F1F5F9]" />
      </button>

      {/* Pages */}
      {pages.map((p, i) => {
        if (p === "...") {
          return (
            <button
              key={`dots-${i}`}
              className="w-[32px] h-[32px] flex justify-center items-center border rounded-[4px] p-2
            border-[#C3C6D7]/20 dark:border-[#1E293B] text-[#191C1E] font-normal
            text-[12px] leading-[16px]"
            >
              <EllipsisIcon className="text-[#191C1E] dark:text-[#F1F5F9]" />
            </button>
          );
        }

        return (
          <button
            key={i}
            onClick={() => typeof p === "number" && goToPage(p)}
            disabled={p === "..."}
            className={`w-[32px] h-[32px] flex justify-center items-center border rounded-[4px] ${
              p === currentPage
                ? "bg-[#004AC6] text-[#FFFFFF] font-bold border-transparent"
                : "border-[#C3C6D7]/20 text-[#191C1E] dark:text-[#F1F5F9] font-normal"
            } ${p === "..." ? "cursor-default" : ""} text-[12px] leading-[16px] cursor-pointer`}
          >
            {p}
          </button>
        );
      })}

      <button
       onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-[32px] h-[32px] flex justify-center items-center border rounded-[4px] p-2
           border-[#C3C6D7]/20 dark:border-[#1E293B] text-[#191C1E] dark:text-[#F1F5F9] font-normal
            text-[12px] leading-[16px] disabled:opacity-50 cursor-pointer`}
      >
        <ChevronIcon className="w-5 h-5 rotate-180 text-[#191C1E] dark:text-[#F1F5F9]" />
      </button>
    </div>
  );
};

export default Pagination;
