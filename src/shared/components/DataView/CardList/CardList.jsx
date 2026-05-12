import React from "react";
import Pagination from "../DataTable/Pagination";
import SearchIcon from "../../../../assets/icons/SearchIcon";
import CustomLoader from "../../CustomLoader/CustomLoader";

const CardList = ({
  data = [],
  isLoading = false,
  renderItem,
  emptyState,
  pagination,
  pageCount,
  onPaginationChange,
}) => {
  return (
    <div className="w-full h-auto flex flex-1 flex-col   justify-between">
      {!isLoading &&
        data?.length > 0 &&
        data.map((item, index) => renderItem(item, index))}

      {isLoading && (
        <div className="w-full h-[400px] bg-[#FFFFFF]/50 dark:bg-[#0D1C2D] flex justify-center items-center">
          <CustomLoader />
        </div>
      )}

      {!isLoading && data?.length === 0 && (
        <div className="w-full h-[400px] bg-[#FFFFFF]/50 dark:bg-[#0D1C2D] flex flex-col justify-center items-center gap-[8px]">
          <div className="w-[50px] h-[50px] flex justify-center items-center bg-[#F2F4F6] dark:bg-[#051424] border border-transparent dark:border-[#1E293B] p-3 rounded-[12px]">
            <SearchIcon className="text-[#515F74]/30 dark:text-[#94A3B8]" />
          </div>
          <h3 className="text-[14px] text-[#0B1C30] dark:text-[#F1F5F9]  leading-[16px] font-bold">
            {emptyState?.title}
          </h3>
          <p className="w-[80%] text-center text-[11px] text-[#515F74] dark:text-[#94A3B8] leading-[15px]">
            {emptyState?.description}
          </p>
        </div>
      )}

      {data?.length > 0 && pageCount >= 2 && (
        <div className="shrink-0 w-full h-[64px] px-[24px] py-[16px] flex justify-center items-center bg-[#F2F4F6]/30 dark:bg-[#051424]">
          <Pagination
            currentPage={pagination?.pageIndex + 1}
            totalPages={pageCount}
            onPageChange={(page) => onPaginationChange(page - 1)}
          />
        </div>
      )}
    </div>
  );
};

export default CardList;
