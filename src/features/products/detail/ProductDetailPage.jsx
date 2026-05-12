import React, { useEffect } from "react";
import Breadcrumb from "../../../shared/components/Breadcrumb/Breadcrumb";
import DownloadIcon from "../../../assets/icons/DownloadIcon";
import AddIcon from "../../../assets/icons/AddIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import RemoveIcon from "../../../assets/icons/RemoveIcon";
import LocationIcon from "../../../assets/icons/LocationIcon";
import DataTable from "../../../shared/components/DataView/DataTable/DataTable";
import { useNavigate, useParams } from "react-router";
import { useProductsById } from "../queries/useProductsById";
import { dateLastUpdate } from "../../../utils/dateLastUpdate";
import ImageOffIcon from "../../../assets/icons/ImageOffIcon";
import { formatPrice } from "../../../utils/formatPrice";
import ProductDetailTable from "./components/ProductDetailTable/ProductDetailTable";
import Skeleton from "../../../shared/components/Skeleton/Skeleton";

const ProductDetailPage = () => {
  let { id } = useParams();

  let navigate = useNavigate();

  const { data: infoProduct, status, isLoading } = useProductsById(id);

  useEffect(() => {
    if (status === "success" && infoProduct === null) {
      navigate("/products");
    }
  }, [status, infoProduct, navigate]);

  const getValueSize = (value) => {
    const len = value?.toString().length || 0;

    if (len >= 14) return "text-[16px]";
    if (len >= 11) return "text-[18px]";
    if (len >= 9) return "text-[20px]";

    return "text-[clamp(20px,2vw,24px)]";
  };

  const url = infoProduct?.productImages?.find(
    (img) => img?.isPrimary === true,
  )?.url;

  return (
    <div className="w-full flex flex-1 flex-col justify-start sm:gap-[40px] gap-[20px] sm:pb-0 pb-24">
      <div className="relative sm:min-w-[944px] h-auto flex sm:flex-row flex-col sm:items-end items-start justify-between gap-[16px]">
        <div className="sm:w-1/2 w-full flex flex-col gap-[4px]">
          <Breadcrumb
            items={[
              { label: "Productos", to: "/products" },
              { label: "Detalle de Producto" },
            ]}
          />
          <h2 className="sm:text-[36px] text-[24px] sm:leading-[40px] leading-[32px] text-[#191C1E] dark:text-[#F1F5F9] font-extrabold">
            {infoProduct?.name}
          </h2>
          <p className="sm:text-[16px] text-[12px] sm:leading-[24px] leading-[16px] text-[#515F74] dark:text-[#94A3B8]">
            • Última actualización: {dateLastUpdate(infoProduct?.updatedAt)}
          </p>
        </div>
        <div className="sm:w-1/2 w-full flex items-start sm:justify-end justify-start gap-[8px]">
          <button
            disabled={isLoading}
            onClick={() => {
              navigate(`/products/${infoProduct?.id}/edit`);
            }}
            className="sm:w-[110.13px] w-max col-span-2 h-[38px] flex items-center gap-[8px] border group border-[#C3C6D7]/20 rounded-[8px] px-[10px] cursor-pointer"
          >
            <div className="w-[16px] h-[16px] flex justify-center items-center">
              <EditIcon className="w-[16px] text-[#191C1E] dark:text-[#FFFFFF] group-disabled:text-[#47556966]" />
            </div>
            <span className="text-[16px] text-[#191C1E] dark:text-[#FFFFFF] group-disabled:text-[#47556966] leading-[24px] sm:flex hidden font-semibold">
              Editar
            </span>
          </button>

          <button
            disabled={isLoading}
            className="w-[169.67px] h-[38px] flex  items-center justify-center gap-[4px] bg-[#FFFFFF] dark:bg-transparent disabled:bg-transparent group border border-[#C3C6D7]/30 rounded-[8px] px-[10px] cursor-pointer"
            onClick={() =>
              navigate("/movements/input/new", {
                state: infoProduct,
              })
            }
          >
            <div className="sm:w-[20px] w-[15px] sm:h-[20px] h-[15px] flex justify-center items-center">
              <AddIcon className="sm:w-[20px] w-[15px] text-[#004AC6] group-disabled:text-[#47556966]" />
            </div>
            <span className="sm:text-[14px] text-[12px] text-[#004AC6] group-disabled:text-[#47556966] sm:leading-[20px] leading-[16px] font-semibold">
              Registrar entrada
            </span>
          </button>
          <button
            disabled={isLoading}
            className="w-[181.88px] h-[38px] flex  items-center justify-center gap-[4px] bg-[#FFFFFF] dark:bg-transparent disabled:bg-transparent group border border-[#C3C6D7]/30 rounded-[8px] px-[10px] cursor-pointer"
            onClick={() =>
              navigate("/movements/output/new", {
                state: infoProduct,
              })
            }
          >
            <div className="sm:w-[20px] w-[15px] sm:h-[20px] h-[15px flex justify-center items-center">
              <RemoveIcon className="sm:w-[20px] w-[15px] text-[#BA1A1A] group-disabled:text-[#47556966]" />
            </div>
            <span className="sm:text-[14px] text-[12px] text-[#BA1A1A] group-disabled:text-[#47556966] sm:leading-[20px] leading-[16px] font-semibold">
              Registrar salida
            </span>
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-[24px]">
        <div className="w-full flex sm:flex-row flex-col items-start gap-[24px]">
          <div className="sm:max-w-[370px] w-full bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-[16px] sm:p-[32px] p-[16px] rounded-[12px]">
            <div
              className={`w-full h-[220px] bg-[#F8FAFC] dark:bg-transparent border border-dashed ${!isLoading && !url ? "border-[#C3C6D7] dark:border-[#1E293B]" : "border-transparent"}  flex flex-col justify-center items-center  gap-[3px] rounded-[8px] overflow-hidden`}
            >
              {!isLoading && !url && (
                <>
                  <ImageOffIcon className="w-[40px] text-[#64748B]" />
                  <p className="sm:text-[14px] text-[12px] text-[#64748B] sm:leading-[20px] leading-[16px]">
                    Sin Imagen disponible
                  </p>
                </>
              )}
              {!isLoading && url && (
                <img
                  src={url}
                  alt={`Img-product`}
                  className="w-full h-full object-cover"
                />
              )}
              {isLoading && <Skeleton className="w-full h-full" />}
            </div>
            <div className="flex flex-col gap-[8px]">
              <h3 className="sm:text-[12px] text-[11px] text-[#191C1E] dark:text-[#E5E7EB] placeholder:text-[#6B7280] dark:placeholder:text-[#94A3B8] sm:leading-[20px] leading-[16px] font-medium">
                DESCRIPCIÓN
              </h3>
              {!isLoading && (
                <div
                  className={`min-h-[112px] max-h-[120px] bg-[#F8FAFC] dark:bg-[#0D1C2D] border border-[#F1F5F9] dark:border-[#1E293B] 
                  flex 
                  ${infoProduct?.description ? "justify-start items-start " : "justify-center items-center"}
                  p-2
                  overflow-y-auto  rounded-[12px]`}
                >
                  {infoProduct?.description && (
                    <span className="w-[300px] text-[14px] text-[#434655] dark:text-[#E5E7EB] leading-[20px]">
                      {infoProduct?.description}
                    </span>
                  )}
                  {!infoProduct?.description && (
                    <span className="sm:w-[300px] w-[250px] text-center sm:text-[14px] text-[12px] text-[#434655] sm:leading-[20px] leading-[16px]">
                      No se ha proporcionado una descripción para este producto.
                    </span>
                  )}
                </div>
              )}

              {isLoading && (
                <Skeleton className="w-full min-h-[112px] max-h-[120px]" />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-[16px]">
            <div className="w-full bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-[24px] sm:p-[32px] p-[20px] rounded-[12px]">
              <h3 className="sm:text-[14px] text-[11px] text-[#64748B] dark:text-[#E5E7EB] sm:leading-[20px] leading-[16px] font-bold pb-[16px] border-b border-b-[#F1F5F9] dark:border-b-[#1E293B]">
                INFORMACIÓN GENERAL
              </h3>
              <div className="w-full grid sm:grid-cols-3 grid-cols-2 sm:gap-[24px] gap-[16px]">
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8]  sm:leading-[20px] leading-[15px]">
                    Nombre del Producto
                  </h3>
                  {!isLoading && (
                    <p className="text-[14px] text-[#0F172A] dark:text-[#E5E7EB] leading-[20px] font-semibold">
                      {infoProduct?.name}
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[60%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    SKU / CÓDIGO
                  </h3>
                  {!isLoading && (
                    <p className="text-[14px] text-[#191C1E] dark:text-[#E5E7EB] leading-[20px] font-semibold">
                      {infoProduct?.sku}
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[60%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    CATEGORÍA
                  </h3>
                  {!isLoading && (
                    <span className="w-full min-h-[20px] flex items-center justify-center bg-[#DBEAFE] dark:bg-[#3B82F622] text-[#1D4ED8] dark:text-[#3B82F6] sm:text-[14px] text-[10px] font-semibold px-[8px] py-[2px] rounded-[12px] max-w-max">
                      {infoProduct?.category?.name}
                    </span>
                  )}
                  {isLoading && <Skeleton className="w-[40%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    Visibilidad
                  </h3>
                  {!isLoading && (
                    <span
                      className={`min-h-[20px] flex items-center justify-center ${infoProduct?.isActive ? "bg-[#D1FAE5] dark:bg-[#10B981]/10 text-[#10B981]" : "bg-[#E0E3E5] text-[#515F74] dark:text-[#94A3B8] dark:bg-[#E0E3E5]/10"}  sm:text-[14px] text-[10px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max`}
                    >
                      {infoProduct?.isActive ? "Activo" : "Inactivo"}
                    </span>
                  )}
                  {isLoading && <Skeleton className="w-[30%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    STOCK ACTUAL
                  </h3>
                  {!isLoading && (
                    <p className="text-[14px] text-[#191C1E] dark:text-[#E5E7EB] leading-[20px] font-semibold">
                      {infoProduct?.currentStock}{" "}
                      <span className="text-[#515F74] dark:text-[#94A3B8]">uds.</span>
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[30%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#E5E7EB] sm:leading-[20px] leading-[15px]">
                    MÍNIMO REQUERIDO
                  </h3>
                  {!isLoading && (
                    <p className="text-[14px] text-[#191C1E] dark:text-[#E5E7EB] leading-[20px] font-semibold">
                      {infoProduct?.minimumStock}{" "}
                      <span className="text-[#515F74] dark:text-[#94A3B8] text-[10px]">uds.</span>
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[30%] h-[15px]" />}
                </div>
              </div>
            </div>
            <div className="w-full bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-[24px] sm:p-[32px] p-[20px] rounded-[12px]">
              <h3 className="sm:text-[14px] text-[11px] text-[#64748B] dark:text-[#E5E7EB] sm:leading-[20px] leading-[16px] font-bold pb-[16px] border-b border-b-[#F1F5F9] dark:border-b-[#1E293B]">
                ANÁLISIS FINANCIERO
              </h3>
              <div className="w-full grid sm:grid-cols-3 grid-cols-1 gap-[24px]">
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    COSTO COMPRA
                  </h3>
                  {!isLoading && (
                    <p
                      className={`${getValueSize(formatPrice(infoProduct?.purchasePrice))} text-[#0F172A] dark:text-[#E5E7EB] leading-[32px] font-bold`}
                    >
                      {formatPrice(infoProduct?.purchasePrice)}
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[50%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start items-start">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    PRECIO DE VENTA
                  </h3>
                  {!isLoading && (
                    <p
                      className={`${getValueSize(formatPrice(infoProduct?.salePrice))} text-[#1D4ED8] dark:text-[#E5E7EB] leading-[32px] font-bold`}
                    >
                      {formatPrice(infoProduct?.salePrice)}
                    </p>
                  )}
                  {isLoading && <Skeleton className="w-[50%] h-[15px]" />}
                </div>
                <div className="flex flex-col gap-[2px] justify-start sm:col-span-1 col-span-2 items-start sm:p-0 p-[16px] sm:bg-transparent bg-[#EFF6FF] dark:bg-transparent border border-transparent dark:border-[#1E293B] rounded-[12px]">
                  <h3 className="sm:text-[14px] text-[10px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[15px]">
                    MARGEN NETO
                  </h3>
                  {!isLoading && (
                    <div className="sm:max-w-max w-full flex items-center justify-between">
                      <p
                        className={`${getValueSize(infoProduct?.marginPercent)} relative text-[#0F172A] dark:text-[#E5E7EB] leading-[32px] font-bold`}
                      >
                        {infoProduct?.marginPercent.toFixed(2)}%
                        <div className="absolute left-full ml-2 bottom-0 min-h-[20px] sm:flex hidden items-center justify-center bg-[#DBEAFE] dark:bg-[#3B82F622] text-[#1D4ED8] dark:text-[#3B82F6] text-[12px] font-semibold leading-0 px-[6px] py-[2px] rounded-[12px] min-w-[52px]">
                          {formatPrice(infoProduct?.margin)}
                        </div>
                      </p>

                      <p className="relative sm:hidden flex text-[14px] text-[#1D4ED8] px-[12px] py-[4px] bg-[#DBEAFE] leading-[20px] rounded-[8px] font-bold">
                        {formatPrice(infoProduct?.margin)}
                      </p>
                    </div>
                  )}
                  {isLoading && <Skeleton className="w-[50%] h-[15px]" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductDetailTable />
      </div>
    </div>
  );
};

export default ProductDetailPage;
