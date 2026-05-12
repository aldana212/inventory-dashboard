import Filters from "./components/Filters/Filters";

import DataTable from "../../../shared/components/DataView/DataTable/DataTable";
import AddIcon from "../../../assets/icons/AddIcon";
import { useNavigate } from "react-router";
import MetricCard from "../../../shared/components/MetricCard/MetricCard";
import WalletIcon from "../../../assets/icons/WalletIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import { useStatsProducts } from "../queries/useStatsProducts";
import { formatPrice } from "../../../utils/formatPrice";
import DisabledIcon from "../../../assets/icons/DisabledIcon";
import ListProduct from "./components/CardProduct/ListProduct";
import { usePermissions } from "../../../hooks/usePermissions";
import { useTheme } from "../../../hooks/useTheme";
import ProductTable from "./components/ProductTable/ProductTable";

const ProductsPage = () => {
  const { hasRole } = usePermissions();
  const { darkMode } = useTheme();

  const { data: statsData, isLoading: isLoadingStats } = useStatsProducts();

  let navigate = useNavigate();

  return (
    <div className="w-full flex flex-1 flex-col justify-start gap-[32px] sm:pb-0 pb-24">
      <div className="w-full h-auto flex md:flex-row flex-col items-end justify-between gap-[20px]">
        <div className="flex flex-col lg:gap-[8px] gap-[2px]">
          <h3 className="lg:text-[30px] text-[20px] text-[#191C1E] dark:text-[#F1F5F9] lg:leading-[36px] leading-[32px] font-extrabold">
            Gestión de Existencias
          </h3>
          <p className="lg:text-[16px] text-[14px] text-[#434655] dark:text-[#94A3B8] lg:leading-[24px] leading-[16px]">
            Supervisa y actualiza el stock disponible, precios y categorías de
            tus productos en tiempo real.
          </p>
        </div>
        {hasRole(["ADMIN", "SUPERVISOR"]) && (
          <button
          disabled={isLoadingStats}
            onClick={() => navigate(`/products/new`)}
            className="sm:max-w-[206.53px] w-full h-[44.42px] bg-[#004AC6] disabled:bg-[#E0E3E5] dark:disabled:bg-transparent border border-transparent dark:disabled:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <div className="w-[20px] h-[20px] flex justify-center items-center">
              <AddIcon className="text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A]" />
            </div>
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#57657A] leading-[22.8px] font-semibold">
              Agregar producto
            </span>
          </button>
        )}
      </div>
      <div className="xl:min-w-[960px] w-full min-h-[114px] grid lg:grid-cols-4 grid-cols-2 xl:gap-[24px] lg:gap-[12px] gap-[16px]">
        <MetricCard
          active
          title="Valor total"
          value={formatPrice(statsData?.total)}
          icon={<WalletIcon className="w-[25px] text-[#FFFFFF] " />}
          iconBackground="#FFFFFF33"
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Total productos"
          value={statsData?.totalProducts}
          icon={<ProductIcon className="w-[30px] text-[#004AC6] dark:text-[#B3C5FF]" />}
          iconBackground={darkMode ? "#3B82F61A" : "#EFF6FF"}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Stock bajo"
          value={statsData?.lowStock}
          icon={
            <AlertIcon className="w-[25px] text-[#BA1A1A] dark:text-[#EF4444]" />
          }
          iconBackground={darkMode ? "#EF44441A" : "#FEF2F2"}
          border="#BA1A1A33"
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Sin stock"
          value={statsData?.outStock}
          icon={
            <DisabledIcon className="w-[25px] text-[#475569] dark:text-[#94A3B8]" />
          }
          iconBackground={darkMode ? "#6B72801A" : "#F1F5F9"}
          isLoading={isLoadingStats}
        />
      </div>
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
