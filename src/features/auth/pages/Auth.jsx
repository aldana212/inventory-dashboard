import React from "react";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import EmailIcon from "../../../assets/icons/EmailIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import { Controller, useForm } from "react-hook-form";
import { authSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import serviceAuth from "../services/serviceAuth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../../../hooks/useToast";

const Auth = () => {
  const setToken = useAuthStore((s) => s.setToken);

  const services = new serviceAuth();

  const navigate = useNavigate();

  const toast = useToast();

  const {
    watch,
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  watch();

  const handleLogin = async () => {
    try {
      const response = await services.login("/auth/login", {
        email: getValues("email"),
        password: getValues("password"),
      });

      if (!response?.token) return;
      setToken(response?.token);

      if (response?.user?.mustChangePassword === true) {
        toast.success({
          title: "Acceso limitado",
          description: "Estás usando una contraseña temporal.",
        });
        navigate("/auth/change-temporary-password");
        return;
      }
      toast.success({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente.",
      });
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        if (error.message === "Incorrect username or password") {
          toast.error({
            title: "Acceso denegado",
            description: "Usuario o contraseña incorrectos.",
          });
          return;
        }
      }
      if (error.status === 404 && error?.message === "User does not exist") {
        toast.error({
          title: "Acceso denegado",
          description: "Usuario o contraseña incorrectos.",
        });
        return;
      }
      if (error.status === 403 && error?.message === "Account disabled") {
        toast.error({
          title: "Cuenta inactiva",
          description: "Contacta al administrador para habilitar tu acceso.",
        });
        return;
      }
      if (error.status === 423 && error?.message === "Account blocked") {
        toast.error({
          title: "Cuenta bloqueada",
          description:
            "Tu cuenta ha sido bloqueada. Contacta al administrador.",
        });
        return;
      }
      toast.error({
        title: "Error de servidor",
        description: "No se pudo iniciar sesión. Intenta nuevamente.",
      });
    }
  };

  return (
    <div className="sm:min-h-screen h-screen flex items-center justify-center bg-[#F8F9FF] dark:bg-[#051424] sm:px-0 px-2">
      <div className="sm:w-[448px] w-full h-auto flex flex-col sm:gap-[40px] gap-[20px] p-[40px] bg-[#FFFFFF]/70 dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] shadow-md">
        <div className="w-full flex flex-col justify-center items-center gap-[4px]">
          <div className="w-[56px] h-[45px] flex justify-center items-center bg-[#0066FF] rounded-[8px]"></div>
          <h2 className="text-[24px] text-[#0B1C30] dark:text-[#F1F5F9] leading-[23px] font-black pt-[12px]">
            Nexus Inventory
          </h2>
          <p className="text-[14px] text-[#515F74] dark:text-[#94A3B8] leading-[20px] font-medium">
            Control de precisión empresarial
          </p>
        </div>
        <div className="w-full flex flex-col sm:gap-[24px] gap-[16px]">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomInput
                label="CORREO ELECTRÓNICO"
                type="email"
                name="email"
                value={field.value}
                onChange={field.onChange}
                placeholder="nombre@empresa.com"
                icon={<EmailIcon className="w-[22px] dark:text-[#F1F5F9]" />}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <CustomInput
                  label="CONTRASEÑA"
                  type="password"
                  name="password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="••••••••"
                  icon={<LockIcon className="w-[22px] dark:text-[#F1F5F9]" />}
                />
                <span className="absolute right-0 top-0 text-[11px] text-[#0050CB] leading-[16px] font-semibold cursor-pointer">
                  Olvidé mi contraseña
                </span>
              </div>
            )}
          />

          <div className="w-full p-[4px] flex items-center sm:gap-[12px] gap-[8px]">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <label
                  htmlFor="hr"
                  className="flex flex-row items-center gap-2.5"
                >
                  <input
                    id="hr"
                    type="checkbox"
                    value={field.value}
                    onChange={field.onChange}
                    className="peer hidden"
                  />
                  <div className="h-[16px] w-[16px] flex justify-center items-center rounded-[4px] border border-[#C2C6D8] bg-[#FFFFFF] peer-checked:bg-[#0050CB] transition">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 stroke-[#FFFFFF]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12.6111L8.92308 17.5L20 6.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </label>
              )}
            />

            <span className="text-[14px] text-[#515F74] dark:text-[#94A3B8] leading-[20px] font-medium cursor-pointer">
              Recordar sesión en este equipo
            </span>
          </div>
          <button
            disabled={!isValid}
            className="w-full h-[50px] bg-[#0066FF] flex justify-center items-center gap-[8px] rounded-[8px] disabled:bg-[#E6E8EA] disabled:cursor-default cursor-pointer group"
            onClick={handleLogin}
          >
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] leading-[20px] font-bold">
              Iniciar Sesión
            </span>
          </button>
        </div>
        <div className="w-full flex justify-center items-center sm:pt-[32px] pt-[20px]">
          <p className="text-[14px] text-[#515F74] dark:text-[#94A3B8]">
            ¿No tienes acceso?{" "}
            <span className="text-[#0050CB] font-medium">
              Contacta a soporte
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
