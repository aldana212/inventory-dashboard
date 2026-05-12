import React, { useEffect } from "react";
import CloseIcon from "../../../assets/icons/CloseIcon";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import CustomSelect from "../../../shared/components/CustomSelect/CustomSelect";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "./userSchema";
import { useCreateUser } from "../queries/useCreateUser";
import Loader from "../../../shared/components/Loader/Loader";
import { useUpdateUser } from "../queries/useUpdateUser";
import { useToast } from "../../../hooks/useToast";
import { ALLOWED_COLORS } from "../../../constants/ALLOWED_COLORS";
import { usePermissions } from "../../../hooks/usePermissions";

const roles = [
  { value: 2, label: "ADMIN" },
  { value: 3, label: "SUPERVISOR" },
  { value: 4, label: "OPERADOR" },
  { value: 5, label: "VIEWER" },
];

const UserForm = ({ isOpen, onClose, info }) => {
  const { mutate, isPending } = useCreateUser();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateUser(
    info?.id,
  );

  const { hasRole } = usePermissions();

  const toast = useToast();

  const {
    control,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      rol: "",
      brandColor: "",
    },
  });

  const handleReset = () => {
    reset({
      fullName: "",
      email: "",
      rol: "",
      brandColor: "",
    });
    onClose();
  };

  const handleSubmit = () => {
    if (info?.id) {
      mutateUpdate(getValues(), {
        onSuccess: () => {
          handleReset(); // 👈 esto viene de react-hook-form
          toast.success({
            title: "Usuario actualizado",
            description: "Los datos del usuario fueron modificados.",
          });
        },
      });
      return;
    }

    mutate(getValues(), {
      onSuccess: () => {
        handleReset(); // 👈 esto viene de react-hook-form
        toast.success({
          title: "Usuario creado",
          description: "La cuenta fue registrada correctamente.",
        });
      },
    });
  };

  useEffect(() => {
    if (!info) return;

    reset({
      firstName: info?.firstName,
      lastName: info?.lastName,
      email: info?.email,
      rol: info?.roleRel?.id,
      brandColor: info?.brandColor,
    });
  }, [info, reset]);

  const disabled = isPending || isPendingUpdate;

  return (
    <div
      className={`
        sm:relative absolute
        sm:w-[512px] w-full
        bottom-0
        sm:h-auto max-h-[85vh]

        bg-[#FFFFFF]
        dark:bg-[#0D1C2D]

        border border-transparent
        dark:border-[#1E293B]

        sm:rounded-[12px] rounded-t-[12px]

        flex flex-col gap-[24px]
        overflow-hidden

        transition-all duration-300 ease-out

        ${
          isOpen
            ? "translate-y-0 sm:translate-y-0 opacity-100"
            : "translate-y-full sm:translate-y-0 opacity-0"
        }
      `}
    >
      <div className="w-full h-[65px] px-[24px] py-[16px] flex items-center justify-between border-b border-b-[#F1F5F9] dark:border-b-[#051424]">
        <h3 className="text-[20px] text-[#191B23] dark:text-[#F1F5F9] leading-[28px] font-semibold">
          {!info?.id && "Crear Nuevo Usuario"}
          {info?.id && "Actualizar Usuario"}
        </h3>
        <div
          className="min-w-[32px] min-h-[32px] rounded-full flex justify-center hover:bg-[#F8FAFC] hover:dark:bg-[#051424] items-center cursor-pointer transition-all duration-300"
          onClick={onClose}
        >
          <CloseIcon className="w-[14px] stroke-2 text-[#94A3B8]" />
        </div>
      </div>
      <div className="flex flex-col overflow-auto">
        <div className="w-full flex flex-col px-[24px] gap-[20px] pb-[16px]">
          <div className="w-full flex items-center gap-[20px]">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="Nombre"
                  value={field.value}
                  name="firstName"
                  placeholder="Ej. Roberto"
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <CustomInput
                  type="text"
                  label="Apellido"
                  value={field.value}
                  name="lastName"
                  placeholder="Ej. Sánchez"
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomInput
                type="email"
                label="Correo Electronico"
                value={field.value}
                name="email"
                placeholder="usuario@empresa.com"
                onChange={field.onChange}
              />
            )}
          />
          <div className="flex flex-col gap-[9px]">
            <label className="text-[12px] text-[#94A3B8] dark:text-[#F1F5F9] leading-[20x] font-medium">
              Role
            </label>
            <Controller
              name="rol"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  value={roles?.find((o) => o.value === field?.value) || null}
                  options={roles}
                  onChange={(opt) => field.onChange(opt?.value)}
                  icono={
                    <CategoryIcon className="w-[14px] dark:text-[#F1F5F9]" />
                  }
                  disabled={info?.id && !hasRole(["ADMIN"])}
                  placeholder="Seleccione una categoría"
                />
              )}
            />
          </div>

          <div className="w-full sm:h-[64px] h-auto flex flex-col gap-[8px]">
            <label className="text-[12px] text-[#94A3B8] dark:text-[#F1F5F9] leading-[20x] font-medium">
              Color de avatar
            </label>
            <Controller
              name="brandColor"
              control={control}
              render={({ field }) => (
                <div className="w-full flex flex-wrap items-center gap-[12px]">
                  {ALLOWED_COLORS.map((color) => (
                    <div
                      key={color}
                      className={`min-w-[32px] h-[32px] rounded-full cursor-pointer ${getValues("brandColor") === color ? "p-[2px]" : "p-0"} hover:p-[2px] transition-all duration-300`}
                      style={{ border: `1px solid ${color}` }}
                    >
                      <button
                        key={color}
                        type="button"
                        onClick={() => field.onChange(color)}
                        style={{ backgroundColor: color }}
                        className="w-full h-full rounded-full cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
        <div className="w-full h-[75px] flex items-center justify-end gap-[12px] px-[24px] py-[16px] bg-[#F8FAFC] dark:bg-[#051424] border-t border-t-[#F1F5F9] dark:border-t-[#0D1C2D]">
          <button
            onClick={onClose}
            className="sm:max-w-max w-full h-[44.42px] bg-[#FFFFFF dark:bg-transparent  border border-[#CBD5E1] dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <span className="text-[16px] text-[#475569] dark:text-[#F1F5F9] leading-[24px] font-semibold">
              Cancelar
            </span>
          </button>
          <button
            disabled={!isValid || disabled}
            onClick={handleSubmit}
            className="sm:max-w-[154.92px] w-full h-[44.42px] bg-[#0050CB] disabled:bg-[#E0E3E5] group disabled:dark:bg-transparent border border-transparent disabled:dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            {disabled && <Loader />}
            {!disabled && (
              <span className="text-[16px] text-[#FFFFFF] group-disabled:text-[#47556966] group-disabled:dark:text-[#515F74] leading-[24px] font-semibold">
                {!info?.id && "Crear Usuario"}
                {info?.id && "Actualizar Usuario"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
