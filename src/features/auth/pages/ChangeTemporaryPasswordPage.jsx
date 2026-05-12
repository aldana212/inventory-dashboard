import React, { useMemo } from "react";
import { passwordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../shared/components/CustomInput/CustomInput";
import EmailIcon from "../../../assets/icons/EmailIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import { useDecodeToken } from "../../../hooks/useDecodeToken";
import { Navigate, useNavigate } from "react-router";
import serviceAuth from "../services/serviceAuth";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../../../hooks/useToast";

const ChangeTemporaryPasswordPage = () => {
  const setToken = useAuthStore((s) => s.setToken);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  const decode = useDecodeToken();

  const navigate = useNavigate();
  const toast = useToast();

  const services = new serviceAuth();

  const {
    watch,
    control,
    getValues,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  watch();

  const password = watch("password", "");

  const level = useMemo(() => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score; // 0 a 4
  }, [password]);

  const feedback = ["Muy baja", "Baja", "Media", "Alta", "Muy alta"][level];

  const colors = [
    "bg-gray-300", // 0
    "bg-red-500", // 1 - Muy baja
    "bg-orange-500", // 2 - Baja
    "bg-yellow-500", // 3 - Media
    "bg-green-500", // 4 - Alta/Muy alta
  ];

  const textColors = [
    "text-gray-400",
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
  ];

  if (!token) return <Navigate to="/auth/login" replace />;

  // 🟢 si ya es usuario normal → no debería estar aquí
  if (decode?.type === "FULL_ACCESS") {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    try {
      const response = await services.changePassword(
        "/auth/complete-password-setup",
        {
          currentPassword: getValues("currentPassword"),
          newPassword: getValues("password"),
        },
      );

      if (!response?.token) return;
      toast.success({
        title: "Contraseña actualizada",
        description: "Ya puedes usar tu nueva contraseña.",
      });
      setToken(response?.token);
      navigate("/");
    } catch (error) {
      if (error.status === 401) {
        if (error.message === "Invalid or expired token") {
          logout();
          toast.info({
            title: "Sesión expirada",
            description: "Inicia sesión nuevamente para continuar.",
          });
          navigate("/auth/login");
          return;
        }
        if (error.message === "Your current password is incorrect") {
          toast.error({
            title: "Error de validación",
            description: "La contraseña actual no es correcta.",
          });
          return;
        }
      }

      if (error.status === 404 && error?.message === "User does not exist") {
        logout();
        toast.error({
          title: "Usuario no encontrado",
          description: "No existe una cuenta asociada a este usuario.",
        });
        navigate("/auth/login");
        return;
      }

      if (error.status === 403 && error?.message === "Account disabled") {
        logout();
        toast.error({
          title: "Cuenta inactiva",
          description: "Contacta al administrador para habilitar tu acceso.",
        });
        navigate("/auth/login");
        return;
      }
      if (error.status === 423 && error?.message === "Account blocked") {
        logout();
        toast.error({
          title: "Cuenta bloqueada",
          description:
            "Tu cuenta ha sido bloqueada. Contacta al administrador.",
        });
        navigate("/auth/login");
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
      <div className="sm:w-[448px] w-full h-auto flex flex-col justify-center items-center sm:gap-[16px] gap-[20px] p-[40px] bg-[#FFFFFF]/70 dark:bg-[#0D1C2D] border border-[#E2E8F0] dark:border-[#1E293B] rounded-[12px] shadow-md">
        <div className="w-full flex flex-col justify-center items-center gap-[4px] pb-[16px]">
          <div className="w-[56px] h-[45px] flex justify-center items-center bg-[#0066FF] rounded-[8px]"></div>
          <h2 className="text-[24px] text-[#0B1C30] dark:text-[#F1F5F9] leading-[23px] font-black pt-[12px]">
            InventoryCentral
          </h2>
          <p className="text-[14px] text-[#515F74] dark:text-[#94A3B8] leading-[20px] font-medium">
            Control de precisión empresarial
          </p>
        </div>
        <div className="w-full flex flex-col sm:gap-[24px] gap-[16px]">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <CustomInput
                label="Contraseña actual"
                type="password"
                name="currentPassword"
                value={field.value}
                onChange={field.onChange}
                placeholder="••••••••"
                icon={<LockIcon className="w-[22px] dark:text-[#F1F5F9]" />}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="w-full flex flex-col sm:gap-[8px] gap-[8px]">
                <CustomInput
                  label="NUEVA CONTRASEÑA"
                  type="password"
                  name="password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="••••••••"
                  icon={<LockIcon className="w-[22px] dark:text-[#F1F5F9]" />}
                />
                <div className="relative w-full min-h-[33px] flex flex-col gap-[8px] pt-[8px]">
                  <div className="w-full flex items-center gap-[6px]">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded transition-all duration-300 ${
                          level >= i
                            ? colors[level]
                            : "bg-gray-200 dark:bg-[#051424]"
                        }`}
                      />
                    ))}
                  </div>
                  {password.length === 0 && (
                    <span
                      className={`text-[11px] text-[#64748B] leading-[16px] font-semibold cursor-pointer`}
                    >
                      Ingresa una contraseña para verificar su nivel de
                      seguridad.
                    </span>
                  )}
                  {password.length !== 0 && (
                    <span
                      className={`absolute right-0 -bottom-1 text-[11px] ${textColors[level]} leading-[16px] font-semibold cursor-pointer`}
                    >
                      {feedback}
                    </span>
                  )}
                </div>
              </div>
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <CustomInput
                label="CONFIRMAR NUEVA CONTRASEÑA"
                type="password"
                name="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="••••••••"
                icon={<LockIcon className="w-[22px] dark:text-[#F1F5F9]" />}
              />
            )}
          />
          <button
            disabled={!isValid}
            className="w-full h-[50px] bg-[#0066FF] flex justify-center items-center gap-[8px] rounded-[8px] disabled:bg-[#E6E8EA] disabled:cursor-default cursor-pointer group"
            onClick={handleLogin}
          >
            <span className="text-[14px] text-[#FFFFFF] group-disabled:text-[#57657A] leading-[20px] font-bold">
              Actualizar contraseña
            </span>
          </button>
        </div>
        <p className="text-[14px] text-[#515F74] dark:text-[#94A3B8] sm:pt-[32px] pt-[20px] font-medium">
          ¿Necesitas ayuda técnica?{" "}
          <span className="text-[#0050CB] font-medium cursor-pointer">
            Contacta a soporte
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChangeTemporaryPasswordPage;
