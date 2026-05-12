import React, { useEffect, useMemo } from "react";
import AddIcon from "../../../assets/icons/AddIcon";
import RemoveIcon from "../../../assets/icons/RemoveIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import Breadcrumb from "../../../shared/components/Breadcrumb/Breadcrumb";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import CustomSelect from "../../../shared/components/CustomSelect/CustomSelect";
import SuppliersIcon from "../../../assets/icons/suppliersIcon";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import BulbIcon from "../../../assets/icons/BulbIcon";
import PhotoUploadIcon from "../../../assets/icons/PhotoUploadIcon";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./productSchema";
import { useParams } from "react-router";
import { useCreateProducts } from "../queries/useCreateProducts";
import { useCategory } from "../../categories/queries/useCategory";
import ProductImageUploader from "./components/ProductImageUploader";
import { useUpdateProducts } from "../queries/useUpdateProducts";
import { useProductsById } from "../queries/useProductsById";
import { useToast } from "../../../hooks/useToast";
import Loader from "../../../shared/components/Loader/Loader";

const ProductForm = () => {
  const { id } = useParams();

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateProducts(id);
  const { mutate, isPending } = useCreateProducts();

  const { data: categoryData, status } = useCategory();
  const { data: infoProduct, status: productStatus } = useProductsById(id);

  const toast = useToast();

  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      image: undefined,
      sku: "",
      category: null,
      purchasePrice: "", // Precio de compra
      salePrice: "", // Precio de venta
      currentStock: "",
      minimumStock: "",
      supplier: null,
      isActive: true,
      description: "",
    },
  });

  const categoryOptions = useMemo(() => {
    if (status === "success") {
      const data = categoryData?.data
      return data?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
    }
  }, [categoryData, status]);

  // const suppliersOptions = useMemo(() => {
  //   return suppliersMock.map((prov) => ({
  //     value: prov.id,
  //     label: prov.name,
  //   }));
  // }, [suppliersMock]);

  const handleReset = () => {
    if (id) {
      const mapped = infoProduct?.productImages?.map((img) => ({
        id: img?.id,
        url: img?.url,
        publicId: img?.publicId,
        position: img?.position,
        existing: true,
        status: "current",
      }));
      reset({
        name: infoProduct?.name,
        image: mapped,
        sku: infoProduct?.sku,
        category: infoProduct?.categoryId,
        purchasePrice: infoProduct?.purchasePrice, // Precio de compra
        salePrice: infoProduct?.salePrice, // Precio de venta
        currentStock: infoProduct?.currentStock,
        minimumStock: infoProduct?.minimumStock,
        supplier: null,
        isActive: infoProduct?.isActive,
        description: infoProduct?.description,
      });
      return;
    }

    reset({
      name: "",
      image: undefined,
      sku: "",
      category: null,
      purchasePrice: "", // Precio de compra
      salePrice: "", // Precio de venta
      currentStock: "",
      minimumStock: "",
      supplier: null,
      isActive: true,
      description: "",
    });
  };

  useEffect(() => {
    if (productStatus === "success" && id) {
      const mapped = infoProduct?.productImages?.map((img) => ({
        id: img?.id,
        url: img?.url,
        publicId: img?.publicId,
        position: img?.position,
        existing: true,
        status: "current",
      }));

      setValue("description", infoProduct?.description, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("isActive", infoProduct?.isActive, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("name", infoProduct?.name, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("image", mapped, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("sku", infoProduct?.sku, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("category", infoProduct?.categoryId, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("salePrice", infoProduct?.salePrice, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("purchasePrice", infoProduct?.purchasePrice, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setValue("currentStock", infoProduct?.currentStock, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("minimumStock", infoProduct?.minimumStock, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("supplier", infoProduct?.supplierId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      handleReset();
    }
  }, [infoProduct, productStatus, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const {
        name,
        image,
        sku,
        category,
        purchasePrice,
        salePrice,
        currentStock,
        minimumStock,
        description,
        isActive,
      } = getValues();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("sku", sku);
      formData.append("category", category);
      formData.append("companyId", 1);
      formData.append("unitId", 1);
      formData.append("purchasePrice", purchasePrice);
      formData.append("salePrice", salePrice);
      formData.append("currentStock", currentStock);
      formData.append("minimumStock", minimumStock);
      formData.append("isActive", Boolean(isActive));
      formData.append("description", description);

      if (image?.length > 0) {
        const normalized = image.filter(Boolean).map((img, index) => ({
          ...img,
          position: index,
        }));

        if (normalized?.length > 0) {
          const deletedImages = normalized?.filter(
            (i) => i.status === "delete",
          );
          if (deletedImages?.length > 0) {
            formData.append("deletedImages", JSON.stringify(deletedImages));
          }

          const replacedImages = normalized?.filter(
            (i) => i.status === "replace",
          );
          if (replacedImages?.length > 0) {
            formData.append("replacedImages", JSON.stringify(replacedImages));
          }
          const newImages = normalized?.filter((i) => i.status === "new");

          if (newImages?.length > 0) {
            formData.append("newImages", JSON.stringify(newImages));
          }

          [...newImages, ...replacedImages].forEach((i) => {
            formData.append("images", i.file);
          });
        }
      }

      if (id) {
        mutateUpdate(formData, {
          onSuccess: () => {
            handleReset(); // 👈 esto viene de react-hook-form
            toast.success({
              title: "Producto Actualizado",
              description: "Producto actualizado correctamente",
            });
          },
        });
      } else {
        mutate(formData, {
          onSuccess: () => {
            // handleReset(); // 👈 esto viene de react-hook-form
            toast.success({
              title: "Producto creado",
              description: "Producto agregado correctamente",
            });
          },
        });
      }
    } catch (error) {
      toast.error({
        title: "Error",
        description: "No se pudo guardar",
      });
    }
  };

  return (
    <div className="relative w-full flex flex-1 flex-col justify-start sm:gap-[40px] gap-[20px] sm:pb-0 pb-[122px]">
      <div className="relative sm:w-[944px] h-auto flex flex-col items-start justify-between gap-[8px]">
        <Breadcrumb
          items={[
            { label: "Productos", to: "/products" },
            { label: `${id ? "Editar" : "Añadir Producto"}` },
          ]}
        />
        <div className="flex flex-col sm:gap-[4px]">
          <h2 className="sm:text-[30px] text-[24px] sm:leading-[36px] leading-[32px] text-[#191C1E] dark:text-[#F1F5F9] font-extrabold">
            {id ? "Editar Producto" : " Añadir Nuevo Producto"}
          </h2>
          <p className="sm:text-[16px] text-[14px]  text-[#515F74] dark:text-[#94A3B8] sm:leading-[26px] leading-[16px]">
            {id &&
              "Actualiza los detalles técnicos y niveles de existencia para MacBook Pro M3 14"}
            {!id &&
              " Complete la información detallada para registrar un nuevo artículo en el sistema de inventario."}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-1 sm:flex-row flex-col-reverse sm:justify-start justify-center sm:items-start items-center sm:pt-[8px] sm:gap-[32px] gap-[16px]">
        <div className="sm:w-[618.67px] w-full flex flex-col gap-[16px]">
          <div className="w-full bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B]  h-auto grid grid-cols-2 rounded-[12px] sm:gap-[24px] gap-[16px] sm:p-[32px] p-[20px]">
            <div className="col-span-2">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="NOMBRE DEL PRODUCTO"
                    value={field.value}
                    name="name"
                    placeholder="Ej. Rodamiento Industrial X-200"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="sm:col-span-1 col-span-2">
              <Controller
                name="sku"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    type="text"
                    label="SKU / CÓDIGO"
                    value={field.value}
                    name="name"
                    placeholder="Ej. PRD-001"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="sm:col-span-1 col-span-2 flex flex-col gap-[9px]">
              <label className="sm:text-[12px] text-[11px] text-[#94A3B8] dark:text-[#E5E7EB] placeholder:text-[#6B7280] dark:placeholder:text-[#94A3B8] sm:leading-[20px] leading-[16px] font-medium">
                CATEGORÍA
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={
                      categoryOptions?.find((o) => o.value === field.value) ||
                      null
                    }
                    options={categoryOptions}
                    onChange={(opt) => field.onChange(opt?.value)}
                    icono={
                      <CategoryIcon className="w-[14px] dark:text-[#94A3B8]" />
                    }
                    placeholder="Seleccione una categoría"
                  />
                )}
              />
            </div>

            <Controller
              name="purchasePrice"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="PRECIO DE COMPRA"
                  value={field.value}
                  name="purchasePrice"
                  placeholder="$ 0.00"
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="salePrice"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="PRECIO DE VENTA"
                  value={field.value}
                  name="salePrice"
                  placeholder="$ 0.00"
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="minimumStock"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="CANTIDAD MINIMA STOCK"
                  value={field.value}
                  name="minimumStock"
                  placeholder="0"
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              name="currentStock"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="CANTIDAD EN STOCK"
                  value={field.value}
                  name="currentStock"
                  placeholder="0"
                  onChange={field.onChange}
                />
              )}
            />

            {/* <div className="flex flex-col gap-[9px] col-span-2 hidden">
              <label className="text-[12px] text-[#94A3B8] leading-[20x] font-medium">
                PROVEEDOR (OPCIONAL)
              </label>
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    value={
                      suppliersOptions.find((o) => o.value === field.value) ||
                      null
                    }
                    options={suppliersOptions}
                    onChange={(opt) => field.onChange(opt?.value)}
                    icono={<SuppliersIcon className="w-[20px]" />}
                    placeholder="Nombre del proveedor o distribuidor"
                  />
                )}
              />
            </div> */}
          </div>
          <div className="w-full h-auto flex justify-between items-center gap-[17px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] p-[16px]">
            <label className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20x] font-medium">
              VISIBILIDAD
            </label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field?.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div
                    className="group peer bg-[#94A3B8] dark:bg-[#051424] rounded-full duration-300 w-[36px] h-[20px] after:duration-300 after:bg-[#FFFFFF]
               peer-checked:bg-[#004AC6] after:rounded-full 
               after:absolute after:h-[16px] after:w-[16px] after:top-1/2 after:-translate-y-1/2 after:left-[3px] after:flex after:justify-center 
               after:items-center peer-checked:after:translate-x-11/12 peer-hover:after:scale-95"
                  ></div>
                </label>
              )}
            />
          </div>
          <div className="w-full sm:h-[218px] h-[183px] flex flex-col gap-[17px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] sm:p-[32px] p-[20px]">
            <label
              htmlFor=""
              className="sm:text-[12px] text-[11px] text-[#191C1E] dark:text-[#E5E7EB] placeholder:text-[#6B7280] dark:placeholder:text-[#94A3B8] sm:leading-[20px] leading-[16px] font-medium"
            >
              DESCRIPCIÓN
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  id="description"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="relative w-full outline-none sm:h-[122px] h-[120px] sm:text-[12px] text-[11px] bg-[#F2F4F6] dark:bg-[#051424] border border-transparent dark:border-[#0D1C2D] dark:text-[#E5E7EB] dark:placeholder:text-[#94A3B8] flex justify-start resize-none items-center p-[11px] pr-[16px] rounded-[8px]"
                  placeholder="Detalles adicionales, especificaciones técnicas o notas de almacenamiento..."
                ></textarea>
              )}
            />
          </div>
        </div>
        <div className="sm:w-[293.33px] w-[80%] flex flex-col gap-[24px]">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ProductImageUploader
                files={field?.value}
                onChangeImg={(value) => field.onChange(value)}
              />
            )}
          />

          <div className="w-full h-[135px] bg-[#2563EB]/10 sm:flex hidden flex-col gap-[12px] p-[24px] rounded-[12px]">
            <div className="flex items-center gap-[7.99px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center">
                <BulbIcon className="text-[#004AC6]" />
              </div>
              <p className="text-[12px] text-[#004AC6] leading-[16px] font-bold">
                CONSEJO PROFESIONAL
              </p>
            </div>
            <p className="text-[12px] text-[#003EA8] leading-[19.5px] font-normal">
              Asegúrese de que el SKU sea único para evitar duplicidades en el
              sistema de gestión de almacén centralizado.
            </p>
          </div>
          <div className="w-full pt-[16px] sm:flex hidden flex-col gap-[12px]">
            <button
              type="button"
              disabled={!isValid}
              className="w-full h-[44.42px] flex justify-center items-center bg-[#004AC6] disabled:dark:bg-transparent disabled:bg-[#E6E8EA] border border-transparent disabled:dark:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
              onClick={handleSubmit}
            >
              {(isPending || isPendingUpdate) && <Loader />}
              {(!isPending || !isPendingUpdate) && (
                <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#94A3B8] leading-[22.8px] font-semibold">
                  {id && "Actualizar producto"}
                  {!id && "Guardar producto"}
                </span>
              )}
            </button>
            <button
              className="w-full h-[44.42px] flex justify-center items-center bg-[#E6E8EA] dark:bg-transparent border border-transparent dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
              onClick={handleReset}
            >
              <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[22.8px] font-semibold">
                Cancelar
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full  bg-[#FFFFFF] dark:bg-[#051424] border-t border-t-[#E2E8F0] dark:border-t-[#1E293B] p-[16px] sm:hidden flex flex-col gap-[8px]">
        <button
          className="w-full sm:h-[44.42px] h-[40px] flex justify-center items-center bg-[#E6E8EA] dark:bg-transparent border border-transparent dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
          onClick={handleReset}
        >
          <span className="text-[14px] text-[#191C1E] dark:text-[#F1F5F9] leading-[22.8px] font-semibold">
            Cancelar
          </span>
        </button>
        <button
          type="button"
          disabled={!isValid}
          className="w-full sm:h-[44.42px] h-[40px] flex justify-center items-center bg-[#004AC6] disabled:dark:bg-transparent disabled:bg-[#E6E8EA] border border-transparent disabled:dark:border-[#1E293B] group rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
          onClick={handleSubmit}
        >
          {(isPending || isPendingUpdate) && <Loader />}
          {(!isPending || !isPendingUpdate) && (
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#94A3B8] leading-[22.8px] font-semibold">
              {id && "Actualizar producto"}
              {!id && "Guardar producto"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
