/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../../shared/components/Breadcrumb/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import CustomSelect from "../../../shared/components/CustomSelect/CustomSelect";
import SuppliersIcon from "../../../assets/icons/suppliersIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import AddIcon from "../../../assets/icons/AddIcon";
import InfoCircleIcon from "../../../assets/icons/InfoCircleIcon";
import CheckCircleIcon from "../../../assets/icons/CheckCircleIcon";
import WarningCircleIcon from "../../../assets/icons/WarningCircleIcon";
import { useLocation, useNavigate, useParams } from "react-router";
import RemoveIcon from "../../../assets/icons/RemoveIcon";
import { productMovementSchema } from "./movementSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProducts } from "../../products/queries/useProducts";
import { useCreateMovements } from "../queries/useCreateMovements";
import { useDecodeToken } from "../../../hooks/useDecodeToken";
import { useToast } from "../../../hooks/useToast";

const MovementsForm = () => {
  const { type } = useParams();
  const { state } = useLocation();

  const decode = useDecodeToken();
  const toast = useToast();

  const navigate = useNavigate();

  const [infoProduct, setInfoProduct] = useState(null);
  

  const { data, status } = useProducts();
  const { mutate } = useCreateMovements();

  const {
    watch,
    control,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(productMovementSchema),
    mode: "onChange",
    defaultValues: {
      productId: "",
      type: "",
      quantity: "",
      note: "",
    },
  });

  watch();

  const productsOptions = useMemo(() => {
    if (status === "success") {
      return data?.data.map((prov) => ({
        value: prov.id,
        label: prov.name,
      }));
    }
  }, [data, status]);

  const typeOptions = {
    input: "STOCK_IN",
    output: "STOCK_OUT",
  };

  //  STOCK_IN // Entrada de inventario (compra, reposición)
  // STOCK_OUT // Salida de inventario (venta, pérdida)
  // STOCK_ADJUSTMENT // Ajuste manual (corrección)

  useEffect(() => {
    if (!type) {
      navigate("/movements");
      return; // 👈 importante
    }

    setValue("type", typeOptions[type], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [type]);

  useEffect(() => {
    if (!state?.id) {
      return; // 👈 importante
    }

    setValue("productId", state?.id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [state?.id, setValue]);

  useEffect(() => {
    if (status !== "success") return;
    const find = data?.data?.find((item) => item?.id === state?.id);
    setInfoProduct(find);
  }, [data, state?.id, status]);

  const handleReset = () => {
    const currentType = getValues("type");
    reset({
      productId: "",
      quantity: "",
      type: currentType,
      note: "",
    });
  };

  const handleSubmit = () => {
    const data = {
      ...getValues(),
      companyId: decode?.companyId,
      userId: decode?.id,
    };

    const type = getValues("type");

    let title =
      type === "STOCK_OUT" ? "Salida registrada" : "Entrada registrada";
    let description =
      type === "STOCK_OUT"
        ? "El stock del producto fue reducido correctamente."
        : "El stock del producto fue actualizado correctamente.";

    mutate(data, {
      onSuccess: () => {
        toast.success({
          title,
          description,
        });
        handleReset();
      },
    });
  };

  let newStock =
    getValues("type") === "STOCK_IN" && getValues("quantity")
      ? `${Number(infoProduct?.currentStock) + Number(getValues("quantity"))}`
      : getValues("quantity") &&
        `-${Math.abs(Number(infoProduct?.currentStock) - Number(getValues("quantity")))}`;

  const isStock =
    getValues("type") === "STOCK_OUT" &&
    getValues("quantity") &&
    Number(getValues("quantity")) > Number(infoProduct?.currentStock);



  return (
    <div className="w-full flex flex-1 flex-col justify-start gap-[40px] sm:pb-0 pb-24">
      <div className="relative sm:w-[944px] w-full h-auto flex flex-col items-start justify-between gap-[8px]">
        <Breadcrumb
          items={[
            { label: "Movimientos", to: "/Movements" },
            { label: "REGISTRAR MOVIMIENTO" },
          ]}
        />
        <div className="flex flex-col gap-[4px]">
          <h2 className="tsm:text-[36px] text-[24px] sm:leading-[40px] leading-[32px] text-[#191C1E] dark:text-[#F1F5F9] font-extrabold">
            Nuevo Movimiento de Stock
          </h2>
          <p className="sm:text-[16px] text-[12px] sm:leading-[24px] leading-[16px] text-[#515F74] dark:text-[#94A3B8]">
            Gestione las entradas y salidas de mercancía con precisión
            quirúrgica.
          </p>
        </div>
      </div>
      <div className="w-full flex sm:flex-row flex-col flex-1 items-start gap-[24px]">
        <div className="sm:w-[632px] w-full h-auto flex flex-col sm:gap-[24px] gap-[20px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#C3C6D7]/15 dark:border-[#1E293B] rounded-[8px] sm:px-[32px] sm:pt-[32px] sm:pb-[48px] p-[20px]">
          <div className="flex flex-col gap-[9px] col-span-2">
            <label className="text-[12px] text-[#94A3B8] dark:text-[#F1F5F9] leading-[20x] font-medium">
              Seleccionar producto
            </label>
            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  value={
                    productsOptions?.find((o) => o?.value === field?.value) ||
                    null
                  }
                  options={productsOptions}
                  onChange={(opt) => {
                    const find = data?.data?.find(
                      (item) => item?.id === opt?.value,
                    );
                    setInfoProduct(find);
                    field.onChange(opt?.value);
                  }}
                  icono={<ProductIcon className="w-[24px] text-[#94A3B8]" />}
                  placeholder="Buscar por nombre o SKU..."
                />
              )}
            />
          </div>
          <div className="w-full min-h-[60px] flex sm:flex-row flex-col items-start sm:gap-[24px] gap-[20px]">
            <div className="sm:w-1/2 w-full flex flex-col gap-[9px]">
              <label className="text-[12px] text-[#94A3B8] dark:text-[#F1F5F9] leading-[20x] font-medium">
                Tipo de movimiento
              </label>

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div className="w-full h-[40px] bg-[#F2F4F6] dark:bg-[#051424] rounded-[8px] flex items-center gap-[4px] p-[4px]">
                    <button
                      className={`w-1/2 h-full flex justify-center items-center gap-[4px] ${field.value === "STOCK_IN" ? "bg-[#FFFFFF] dark:bg-[#0D1C2D]" : "bg-transparent"}  rounded-[4px] transition-all duration-300 cursor-pointer`}
                      onClick={() => {
                        field.onChange("STOCK_IN");
                        navigate("/movements/input/new");
                      }}
                    >
                      <div className="w-[15px] h-[15px] flex justify-center items-center">
                        <AddIcon
                          className={`${field.value === "STOCK_IN" ? "text-[#004AC6] dark:text-[#F1F5F9]" : "text-[#64748B]"} `}
                        />
                      </div>
                      <span
                        className={`text-[14px] ${field.value === "STOCK_IN" ? "text-[#004AC6] dark:text-[#F1F5F9]" : "text-[#64748B]"} leading-[20px] font-medium`}
                      >
                        Entrada
                      </span>
                    </button>
                    <button
                      className={`w-1/2 h-full flex justify-center items-center gap-[4px] ${field.value === "STOCK_OUT" ? "bg-[#FFFFFF] dark:bg-[#0D1C2D]" : "bg-transparent"} rounded-[4px] transition-all duration-300 cursor-pointer`}
                      onClick={() => {
                        field.onChange("STOCK_OUT");
                        navigate("/movements/output/new");
                      }}
                    >
                      <div className="w-[15px] h-[15px] flex justify-center items-center">
                        <RemoveIcon
                          className={`${field.value === "STOCK_OUT" ? "text-[#BA1A1A]" : "text-[#64748B]"}`}
                        />
                      </div>
                      <span
                        className={`text-[14px] ${field.value === "STOCK_OUT" ? "text-[#BA1A1A] dark:text-[#EF4444]" : "text-[#64748B]"} leading-[20px] font-medium`}
                      >
                        Salida
                      </span>
                    </button>
                  </div>
                )}
              />
            </div>
            <div className="sm:w-1/2 w-full">
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="Cantidad"
                    value={field.value}
                    name="quantity"
                    placeholder="#"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full h-[132px] flex flex-col gap-[8px] rounded-[12px]">
            <label
              htmlFor=""
              className="text-[12px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20x] font-medium"
            >
              Notas opcionales
            </label>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <textarea
                  name="note"
                  id="note"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="relative w-full outline-none h-[104px] sm:text-[16px] text-[14px] bg-[#F2F4F6] dark:bg-[#051424] border border-transparent dark:border-[#0D1C2D] dark:text-[#E5E7EB] dark:placeholder:text-[#94A3B8] flex justify-start resize-none items-center p-[11px] pr-[16px] rounded-[8px]"
                  placeholder="Motivo del ajuste, número de orden, etc."
                ></textarea>
              )}
            />
          </div>
          {isStock && (
            <p className="text-[14px] text-[#BA1A1A] leading-[20px]">
              {" "}
              ⚠️ Máximo permitido: {infoProduct?.currentStock} unidades
            </p>
          )}
          <button
            type="button"
            disabled={!isValid || isStock}
            onClick={handleSubmit}
            className="w-full h-[44.42px] bg-[#004AC6] disabled:bg-[#E6E8EA] disabled:dark:bg-transparent  group border border-transparent disabled:dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <div className="w-[20px] h-[20px] flex justify-center items-center">
              <AddIcon className="text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#94A3B8]" />
            </div>
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#94A3B8] leading-[22.8px] font-semibold">
              Guardar movimiento
            </span>
          </button>
        </div>
        <div className="sm:w-[304px] w-full h-auto flex flex-col gap-[24px]">
          <div className="w-full min-h-[213px] bg-[#004AC6] flex flex-col gap-[16px] p-[24px] rounded-[8px]">
            <h3 className="text-[18px] text-[#FFFFFF] leading-[28px] font-bold">
              Resumen del Cambio
            </h3>
            {infoProduct && (
              <div className="w-full flex flex-col gap-[12px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-[40px] h-[40px] bg-[#E6E8EA] rounded-[4px] flex justify-center items-center overflow-hidden">
                    {!infoProduct?.productImages[0]?.url && (
                      <ProductIcon className="w-[30px] text-[#2563EB]" />
                    )}

                    {infoProduct?.productImages[0]?.url && (
                      <img
                        src={infoProduct?.productImages[0]?.url}
                        alt={`Img-product-${infoProduct?.productImages[0]?.position + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-0">
                    <p className="text-[14px] leading-[20px] text-[#FFFFFF] font-semibold">
                      {infoProduct?.name}
                    </p>
                    <span className="text-[10px] text-[#FFFFFF]/80">
                      SKU: {infoProduct?.sku}
                    </span>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    Stock Actual
                  </p>
                  <span className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    {infoProduct?.currentStock} unidades
                  </span>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    Stock Minimo
                  </p>
                  <span className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    {infoProduct?.minimumStock} unidades
                  </span>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    Cambio
                  </p>
                  <span className="text-[12px] text-[#FFFFFF] leading-[20px]">
                    {getValues("quantity") || 0} unidades
                  </span>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-[16px] text-[#FFFFFF] leading-[28px] font-bold">
                    Nuevo stock
                  </p>
                  <span className="text-[16px] text-[#FFFFFF] leading-[28px] font-bold">
                    {newStock || 0} unidades
                  </span>
                </div>
                <div className="w-full h-px bg-[#FFFFFF]/20" />
                <p className="text-[12px] text-[#FFFFFF] leading-[16px]">
                  El valor total del inventario se actualizará automáticamente
                  al guardar.
                </p>
              </div>
            )}
            {!infoProduct && (
              <div className="w-full  flex flex-1 flex-col justify-center items-center gap-[8px]">
                <ProductIcon className="w-[50px] text-[#FFFFFF]/80" />
                <p className="w-[220px] text-center text-[12px] text-[#FFFFFF] leading-[16px]">
                  Selecciona un producto para previsualizar el movimiento
                </p>
              </div>
            )}
          </div>
          <div className="w-full min-h-[238px] bg-[#F2F4F6] dark:bg-transparent border border-transparent dark:border-[#1E293B] flex flex-col gap-[16px] p-[24px] rounded-[8px]">
            <div className="w-full flex items-center gap-[8px]">
              <div className="w-[18px] h-[18px] flex justify-center items-center">
                <InfoCircleIcon className="text-[#004AC6]" />
              </div>
              <p className="text-[14px] text-[#004AC6] leading-[20px] font-bold">
                PROTOCOLO
              </p>
            </div>
            <div className="w-full flex items-start gap-[12px]">
              <div className="min-w-[16px] h-[20px] flex justify-center items-center">
                <CheckCircleIcon className="text-[#16A34A]" />
              </div>
              <p className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px]">
                Verifique el SKU antes de confirmar la salida.
              </p>
            </div>
            <div className="w-full flex items-start gap-[12px]">
              <div className="min-w-[16px] h-[20px] flex justify-center items-center">
                <CheckCircleIcon className="text-[#16A34A]" />
              </div>
              <p className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px]">
                Las devoluciones se registran como "Entrada".
              </p>
            </div>
            <div className="w-full flex items-start gap-[12px]">
              <div className="min-w-[18px] h-[20px] flex justify-center items-center">
                <WarningCircleIcon className="text-[#D97706]" />
              </div>
              <p className="text-[14px] text-[#475569] dark:text-[#F1F5F9] leading-[20px]">
                Cantidades negativas no están permitidas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementsForm;
