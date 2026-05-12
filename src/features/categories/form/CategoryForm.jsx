import React, { useEffect, useState } from "react";
import Loader from "../../../shared/components/Loader/Loader";
import { Controller, useForm } from "react-hook-form";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import CustomSelect from "../../../shared/components/CustomSelect/CustomSelect";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "./categorySchema";
import CloseIcon from "../../../assets/icons/CloseIcon";
import { categoryIcons, getIcon } from "../../../utils/getIcon";
import { HardHat } from "lucide-react";
import { useUpdateCategory } from "../queries/useUpdateCategory";
import { useCreateCategory } from "../queries/useCreateCategory";
import { useToast } from "../../../hooks/useToast";

const CategoryForm = ({ isOpen, onClose, info }) => {
  const [search, setSearch] = useState("");
  const { mutate, isPending } = useCreateCategory();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCategory(info?.id);

  const toast = useToast();

  const filtered = categoryIcons.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    watch,
    control,
    getValues,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
      icon: "",
    },
  });

  watch();

  useEffect(() => {
    if (!info) return;

    reset({
      name: info?.name,
      description: info?.description,
      isActive: info?.isActive === "active" ? true : false,
      icon: info?.icon,
    });
  }, [info, reset]);

  const handleSubmit = () => {
    if (info?.id) {
      mutateUpdate(getValues(), {
        onSuccess: () => {
          toast.success({
            title: "Categoría actualizada",
            description: "Los cambios se guardaron correctamente.",
          });
          handleReset(); // 👈 esto viene de react-hook-form
        },
      });
      return;
    }
    mutate(getValues(), {
      onSuccess: () => {
        toast.success({
          title: "Categoría creada",
          description: "La categoría fue registrada correctamente.",
        });
        handleReset(); // 👈 esto viene de react-hook-form
      },
    });
  };

  const handleReset = () => {
    reset({
      name: "",
      description: "",
      isActive: true,
      icon: null,
    });
    onClose();
  };

  return (
    <div
      className={`
        sm:relative absolute
        sm:w-[512px] w-full
        bottom-0
        sm:h-auto max-h-[80vh]
      bg-[#FFFFFF] dark:bg-[#0D1C2D] 
        border border-transparent dark:border-[#1E293B] 
        sm:rounded-[12px] rounded-t-[12px]
        flex flex-col gap-[24px] 
        overflow-hidden
      ${
        isOpen
          ? "translate-y-0 sm:translate-y-0 opacity-100"
          : "translate-y-full sm:translate-y-0 opacity-0"
      }
    `}
    >
      <div className="w-full h-auto px-[24px] py-[12px] flex items-center justify-between border-b border-b-[#F1F5F9] dark:border-b-[#051424]">
        <h3 className="text-[20px] text-[#191B23] dark:text-[#F1F5F9] leading-[28px] font-semibold">
          Crear Nueva Categoría
        </h3>
        <div
          className="min-w-[32px] min-h-[32px] rounded-full flex justify-center hover:bg-[#F8FAFC] hover:dark:bg-[#051424] items-center cursor-pointer transition-all duration-300"
          onClick={onClose}
        >
          <CloseIcon className="w-[14px] stroke-2 text-[#94A3B8]" />
        </div>
      </div>
      <div className="w-full flex flex-col px-[24px] gap-[16px] overflow-auto">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="w-full flex flex-col gap-[8px]">
              <CustomInput
                type="text"
                label="Nombre de la categoría"
                value={field.value}
                name="name"
                placeholder="Ej: Electrónicos, Mobiliario..."
                onChange={field.onChange}
              />
              <p className="sm:text-[11px] text-[10px] text-[#434655]/70 dark:text-[#94A3B8] leading-[16px] font-bold">
                MÁXIMO 50 CARACTERES
              </p>
            </div>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="w-full min-h-[82px] flex flex-col gap-[8px] ">
              <label
                htmlFor=""
                className="text-[12px] text-[#191C1E] dark:text-[#F1F5F9] leading-[20x] font-medium"
              >
                Descripción
              </label>
              <textarea
                id="description"
                value={field.value || ""}
                onChange={field.onChange}
                className="relative w-full outline-none h-[82px] bg-[#F2F4F6] dark:bg-[#051424]  border border-transparent  dark:text-[#94A3B8] dark:border-[#0D1C2D] flex justify-start sm:text-[16px] text-[12px] leading-[18px] resize-none items-center p-[11px] pr-[16px] rounded-[4px]"
                placeholder="Describe brevemente qué tipo de productos incluirá esta categoría..."
              ></textarea>
            </div>
          )}
        />
        <div className="w-full min-h-[68px] flex justify-between items-center gap-[17px] bg-[#F8FAFC] dark:bg-[#051424] border border-[#E2E8F0] dark:border-[#0D1C2D] rounded-[8px] p-[16px]">
          <div className="flex flex-col">
            <label className="sm:text-[16px] text-[14px] text-[#191B23] dark:text-[#F1F5F9] sm:leading-[24px] leading-[20px] font-semibold">
              Estado
            </label>
            <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] leading-[16x]">
              Comprueba si el usuario puede iniciar sesión de inmediato.
            </p>
          </div>
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
                  className="group peer bg-[#94A3B8] rounded-full duration-300 w-[36px] h-[20px] after:duration-300 after:bg-[#FFFFFF]
                       peer-checked:bg-[#004AC6] after:rounded-full 
                       after:absolute after:h-[16px] after:w-[16px] after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:flex after:justify-center 
                       after:items-center peer-checked:after:translate-x-11/12 peer-hover:after:scale-95"
                ></div>
              </label>
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-[16px]">
          <CustomInput
            type="text"
            label="SELECCIONAR ICONO"
            value={search}
            name="name"
            placeholder="Buscar icono..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-full sm:h-[120px] h-[180px] grid sm:grid-cols-6 grid-cols-5 gap-[12px] overflow-auto">
            {filtered.map((icon) => {
              const isColor = getValues("icon") === icon;

              const color = isColor ? "#2563EB" : "#64748B";

              return (
                <button
                  key={icon}
                  onClick={() => {
                    setValue("icon", icon, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  className={`w-full h-[50px] flex flex-col items-center justify-center border
                    ${isColor ? "bg-[#003B9A]/5" : "bg-transparent"}
                    ${isColor ? "border-[#2563EB]" : "border-[#64748B] dark:border-[#1E293B]"}
                    hover:bg-gray-100 hover:dark:bg-[#051424] rounded-[8px] cursor-pointer`}
                >
                  {icon === "All" && (
                    <CategoryIcon
                      className={`w-[20px] ${isColor ? "text-[#2563EB]" : "text-[#64748B]"} `}
                    />
                  )}
                  {icon !== "All" && getIcon(icon, color)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-[75px] flex items-center justify-end gap-[12px] px-[24px] py-[16px] bg-[#F8FAFC] dark:bg-[#051424] border-t border-t-[#F1F5F9] dark:border-t-[#0D1C2D]">
        <button
          onClick={handleReset}
          className="max-w-max h-[44.42px] bg-[#FFFFFF dark:bg-transparent  border border-[#CBD5E1] dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center gap-[8px] cursor-pointer"
        >
          <span className="text-[16px] text-[#475569] dark:text-[#F1F5F9] leading-[24px] font-semibold">
            Cancelar
          </span>
        </button>
        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className="min-w-[154.92px] h-[44.42px] bg-[#0050CB] disabled:bg-gray-400 disabled:dark:bg-transparent group border border-transparent disabled:dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
        >
          {(isPending || isPendingUpdate) && <Loader />}
          {(!isPending || !isPendingUpdate) && (
            <span className="text-[16px] text-[#FFFFFF] group-disabled:dark:text-[#94A3B8] leading-[24px] font-semibold">
              Crear Categoria
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
