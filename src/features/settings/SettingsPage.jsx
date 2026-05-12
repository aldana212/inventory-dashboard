/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef } from "react";
import PalleteIcon from "../../assets/icons/PalleteIcon";
import { useState } from "react";
import CustomInput from "../../shared/components/CustomInput/CustomInput";
import BulbIcon from "../../assets/icons/BulbIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import DarkModeIcon from "../../assets/icons/DarkModeIcon";
import SunIcon from "../../assets/icons/SunIcon";
import { useAuthStore } from "../auth/store/authStore";
import { getInitialsFromFullName } from "../../utils/getInitialsFromFullName";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ChangePassword from "./changePassword/ChangePassword";
import { userSchema } from "./userSchema";
import { useUpdateUser } from "../users/queries/useUpdateUser";
import { useTheme } from "../../hooks/useTheme";
import CustomModal from "../../shared/components/CustomModal/CustomModal";
import ArrowNextIcon from "../../assets/icons/ArrowNextIcon";
import { useToast } from "../../hooks/useToast";
import { ALLOWED_COLORS } from "../../constants/ALLOWED_COLORS";
import Loader from "../../shared/components/Loader/Loader";

const SettingsPage = () => {
  const [openPalette, setOpenPalette] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { darkMode, toggleTheme } = useTheme();

  const toast = useToast();

  const user = useAuthStore((s) => s.user);

  let firstName = user?.firstName;
  let lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  const { mutate, isPending } = useUpdateUser(user?.id);

  const {
    watch,
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
      phone: "",
      status: "",
      brandColor: {
        bg: "",
        color: "",
      },
    },
  });

  watch();

  useEffect(() => {
    function handleClick(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        setOpenPalette(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!user) return;

    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone ?? "",
      status: user?.status,
      brandColor: {
        bg: `${user?.brandColor}20`,
        color: user?.brandColor,
      },
    });
  }, [user, reset]);

  const handleReset = () => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone ?? "",
      status: user?.status,
      brandColor: {
        bg: `${user?.brandColor}20`,
        color: user?.brandColor,
      },
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...getValues(),
      brandColor: getValues("brandColor.color"),
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success({
          title: "Perfil actualizado",
          description: "Tus datos fueron guardados correctamente.",
        });
      },
    });
  };

  return (
    <div className="w-full flex flex-1 flex-col justify-start gap-[24px] sm:pb-0 pb-24">
      <div className="w-full md:h-[146px] h-auto bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex md:flex-row flex-col md:items-center items-start justify-between gap-[24px] sm:p-[24px] p-[16px] rounded-[12px]">
        <div className="flex items-center gap-[24px] ">
          <div
            ref={ref}
            className="relative min-w-[96px] min-h-[96px] flex justify-center items-center rounded-full"
            style={{
              backgroundColor: getValues("brandColor.bg"),
            }}
          >
            <span
              className="text-[40px] leading-[32px] font-semibold z-10"
              style={{
                color: getValues("brandColor.color"),
              }}
            >
              {getInitialsFromFullName(fullName)}
            </span>
            <button
              className="absolute right-0 bottom-0 shadow-md w-[30px] h-[30px] bg-[#FFFFFF] dark:bg-[#051424] rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setOpenPalette(!openPalette)}
            >
              <PalleteIcon className="w-[18px] dark:text-[#94A3B8]" />
            </button>
            <div
              className={`absolute ${openPalette ? "top-[87%] left-[105%] opacity-100 z-10" : "top-[87%] left-[50%] opacity-0"}  min-w-max bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] p-[12px] grid grid-cols-4 gap-[8px] rounded-[8px] transition-all duration-300`}
            >
              {ALLOWED_COLORS.map((color) => (
                <div
                  key={color}
                  className={`w-[20px] h-[20px] flex justify-center items-center rounded-full group cursor-pointer`}
                  style={{ border: `1px solid ${color}` }}
                >
                  <Controller
                    name="brandColor"
                    control={control}
                    render={({ field }) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          field.onChange({
                            bg: `${color}20`,
                            color: color,
                          });
                        }}
                        style={{ backgroundColor: color }}
                        className={`${getValues("brandColor.color") === color ? "w-4 h-4" : "group-hover:w-4 group-hover:h-4 w-full h-full"}  rounded-full cursor-pointer transition-all duration-75`}
                      />
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-[4px]">
            <h3 className="text-[24px] text-[#0F172A] dark:text-[#F1F5F9] leading-[32px] font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>
            <div className="flex md:flex-row flex-col lg:items-center items-start gap-[8px]">
              <span
                className="lg:min-w-[69.55px] max-w-max flex items-center justify-center bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-bold px-[8px] py-[2px] rounded-[12px] max-w-max"
                style={{
                  backgroundColor: getValues("brandColor.bg"),
                  color: getValues("brandColor.color"),
                }}
              >
                {user?.role?.name}
              </span>
              <div className="flex items-center sm:gap-[8px] gap-[4px]">
                <div className="min-w-[6px] min-h-[6px] bg-[#94A3B8] dark:text-[#94A3B8] rounded-full" />
                <span className="sm:text-[14px] text-[12px] text-[#64748B] dark:text-[#94A3B8] sm:leading-[20px] leading-[16px]">
                  Gestionando StockMaster desde Enero 2024
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-max flex items-center gap-[7.99px]">
          <button
            className="h-[34px] px-[16px] py-[8px] flex justify-center items-center bg-[#FFFFFF] dark:bg-transparent border border-[#E2E8F0] dark:border-[#1E293B]  rounded-[8px]"
            onClick={handleReset}
          >
            <span className="text-[12px] text-[#334155] dark:text-[#F1F5F9] leading-[16px] font-medium">
              Cancelar
            </span>
          </button>
          <button
            disabled={!isValid}
            className="h-[34px] px-[16px] py-[8px] disabled:bg-[#E6E8EA] disabled:dark:bg-transparent border border-transparent disabled:dark:border-[#1E293B] group flex justify-center items-center bg-[#0050CB] rounded-[8px] cursor-pointer"
            onClick={handleSubmit}
          >
            {isPending && <Loader />}
            {!isPending && (
              <span className="text-[12px] text-[#FFFFFF] group-disabled:text-[#57657A] group-disabled:dark:text-[#57657A] leading-[16px] font-medium">
                Guardar cambios
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex items-start lg:gap-[24px] gap-[16px]">
        <div className="w-full flex flex-col lg:gap-[24px] gap-[16px]">
          <div className="w-full h-[340px] bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-[16px] sm:p-[24px] p-[16px] rounded-[12px]">
            <div className="flex items-center gap-[8px]">
              <h3 className="text-[20px] text-[#191C1E] dark:text-[#F1F5F9] leading-[28px] font-semibold">
                Información Personal
              </h3>
            </div>
            <div className="w-full grid grid-cols-2 gap-[16px]">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Nombre"
                    type="text"
                    name="firstName"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nombre"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    label="Apellido"
                    type="text"
                    name="lastName"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Apellido"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="col-span-2">
                    <CustomInput
                      label="Correo Electrónico"
                      type="email"
                      name="email"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="admin@stockmaster.pro"
                      disabled
                    />
                  </div>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div className="col-span-2">
                    <CustomInput
                      label="Teléfono"
                      type="text"
                      name="phone"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="+57 320 643 3320"
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <button
            className="w-full h-auto bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] md:hidden flex items-center justify-between gap-[16px] sm:p-[24px] p-[16px] rounded-[12px] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <h3 className="sm:text-[20px] text-[16px] text-[#191C1E] dark:text-[#F1F5F9] leading-[28px] font-semibold">
              Cambiar contraseña
            </h3>
            <ArrowNextIcon className="w-[20px] h-[20px] text-[#191C1E] dark:text-[#F1F5F9]" />
          </button>
          <div className="w-full h-auto bg-[#FFFFFF] dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col gap-[16px] sm:p-[24px] p-[16px] rounded-[12px]">
            <div className="flex items-center gap-[8px]">
              <h3 className="text-[20px] text-[#191C1E] dark:text-[#F1F5F9] leading-[28px] font-semibold">
                Preferencias del Sistema
              </h3>
            </div>
            <div className="w-full h-[70px] flex items-center justify-between gap-[12px] bg-[#F8FAFC] dark:bg-[#051424] p-[16px] border border-[#F1F5F9] dark:border-[#1E293B] rounded-[8px]">
              <DarkModeIcon className="w-[20px] h-[20px] md:mr-[16px] dark:text-[#F1F5F9]" />
              {/* <SunIcon /> */}
              <div className="w-full flex flex-col ">
                <h3 className="text-[14px] text-[#0F172A] dark:text-[#F1F5F9] leading-[20px] font-semibold">
                  Modo Oscuro
                </h3>
                <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8] leading-[16px]">
                  Ajusta la interfaz para entornos de poca luz.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={toggleTheme}
                  className="sr-only peer"
                />
                <div
                  className="group peer bg-[#94A3B8] rounded-full duration-300 w-[36px] h-[20px] after:duration-300 after:bg-[#FFFFFF]
                       peer-checked:bg-[#004AC6] after:rounded-full 
                       after:absolute after:h-[16px] after:w-[16px] after:top-1/2 after:-translate-y-1/2 after:left-[2px] after:flex after:justify-center 
                       after:items-center peer-checked:after:translate-x-11/12 peer-hover:after:scale-95"
                ></div>
              </label>
            </div>
          </div>
        </div>
        <div className="min-w-max sm:flex hidden ">
          <ChangePassword />
        </div>
      </div>

      <CustomModal isOpen={isOpen}>
        <ChangePassword isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </CustomModal>
    </div>
  );
};

export default SettingsPage;
