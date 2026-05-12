import React from "react";
import BulbIcon from "../../../assets/icons/BulbIcon";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import { useUpdatePassword } from "../queries/useUpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../userSchema";
import { Controller, useForm } from "react-hook-form";
import Loader from "../../../shared/components/Loader/Loader";

const ChangePassword = ({isOpen, onClose }) => {
  const { mutate, isPending } = useUpdatePassword();

  const {
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = () => {
    try {
      const payload = {
        currentPassword: getValues("currentPassword"),
        newPassword: getValues("newPassword"),
      };

      mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`
        sm:relative absolute
        lg:max-w-[350px] md:max-w-[300px] sm:max-w-[390px] w-full
        bottom-0
        lg:h-[614px] sm:h-auto max-h-[85vh]
      bg-[#FFFFFF] dark:bg-[#0D1C2D]
        border border-[#E2E8F0] dark:border-[#1E293B]
        flex flex-col sm:gap-[16px] gap-[8px] 
        sm:p-[24px] p-[16px] 
        sm:rounded-[12px] rounded-t-[12px]

        transition-all duration-300 ease-out

        ${
          isOpen
            ? "translate-y-0 sm:translate-y-0 opacity-100"
            : "translate-y-full sm:translate-y-0 sm:opacity-100 opacity-0"
        }
        `}
    >
      <div className="flex items-center ">
        <h3 className="sm:text-[20px] text-[18px] text-[#191C1E] dark:text-[#F1F5F9] sm:leading-[28px] leading-[20px] font-semibold">
          Seguridad
        </h3>
      </div>
      <p className="sm:text-[13px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[18px] leading-[14px]">
        Mantén tu cuenta segura actualizando tu contraseña periódicamente.
      </p>
      <div className="w-full flex flex-col sm:gap-[16px] gap-[8px]">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <CustomInput
              type="password"
              label="Contraseña actual"
              value={field.value}
              name="currentPassword"
              placeholder="••••••••"
              onChange={field.onChange}
            />
          )}
        />

        <div className="w-full h-px bg-[#F1F5F9] dark:bg-[#1E293B]" />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <CustomInput
              type="password"
              label="Nueva contraseña"
              value={field.value}
              name="newPassword"
              placeholder="••••••••"
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <CustomInput
              type="password"
              label="Confirmar contraseña"
              value={field.value}
              name="confirmPassword"
              placeholder="••••••••"
              onChange={field.onChange}
            />
          )}
        />

        <button
          disabled={!isValid}
          className="w-full h-[44.42px] bg-[#0050CB] disabled:dark:bg-transparent border border-[#E2E8F0] dark:border-[#1E293B] flex justify-center items-center gap-[8px] rounded-[8px] disabled:bg-[#E6E8EA] disabled:cursor-default cursor-pointer group"
          onClick={handleSubmit}
        >
          {isPending && <Loader />}
          {!isPending && (
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#57657A] leading-[20px] font-bold">
              Actualizar Contraseña
            </span>
          )}
        </button>
        <button
          onClick={onClose}
          className="w-full h-[44.42px] bg-[#FFFFFF dark:bg-transparent  border border-[#CBD5E1] dark:border-[#1E293B] rounded-[8px] px-[22px] py-[12px] md:hidden flex items-center justify-center gap-[8px] cursor-pointer"
        >
          <span className="text-[16px] text-[#475569] dark:text-[#F1F5F9] leading-[24px] font-semibold">
            Cancelar
          </span>
        </button>
      </div>
      <div className="w-full h-[135px] bg-[#2563EB]/10 lg:flex hidden flex-col gap-[12px] p-[24px] rounded-[12px]">
        <div className="flex items-center gap-[7.99px]">
          <div className="w-[16px] h-[16px] flex justify-center items-center">
            <BulbIcon className="text-[#004AC6]" />
          </div>
          <p className="text-[12px] text-[#004AC6] leading-[16px] font-bold">
            CONSEJO DE SEGURIDAD
          </p>
        </div>
        <p className="text-[12px] text-[#003EA8] leading-[19.5px] font-normal">
          Usa al menos 12 caracteres, mezclando mayúsculas, minúsculas, números
          y símbolos para una protección máxima.
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
