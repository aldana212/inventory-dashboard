import React, { useEffect, useRef, useState } from "react";
import ProductIcon from "../../../assets/icons/ProductIcon";
import MovementsIcon from "../../../assets/icons/MovementsIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import AddIcon from "../../../assets/icons/AddIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import ProfileIcon from "../../../assets/icons/ProfileIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import { useActiveRoute } from "./hook/useActiveRoute";
import { useNavigate } from "react-router";
import InputIcon from "../../../assets/icons/InputIcon";
import OutputIcon from "../../../assets/icons/OutputIcon";

const BottomNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const { isHome, isProducts, isNewProducts, isEditProduct, isMovements, isProfile } =
    useActiveRoute();    

  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {!isNewProducts && !isEditProduct && (
        <>
          <div
            className={`
      fixed h-screen inset-0 bg-black/50 z-30 sm:hidden
      transition-opacity duration-300
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
          />

          <div className="w-screen fixed bottom-0 left-0 sm:hidden min-h-[70px] flex items-center justify-between gap-[37px] bg-[#FFFFFF] dark:bg-[#051424] border-t border-t-[#E2E8F0] dark:border-t-[#1E293B] z-30 px-[16px]">
            <button
              className="w-[36.73px] flex flex-col justify-center items-center gap-[4px]"
              onClick={() => navigate("/")}
            >
              <div className="max-w-[20px] max-h-[20px] flex justify-center items-center">
                <HomeIcon
                  className={`w-full h-full ${isHome ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                />
              </div>
              <h3
                className={`text-[10px] ${isHome ? "text-[#2563EB]" : "text-[#94A3B8]"}  leading-[15px] font-bold`}
              >
                Home
              </h3>
            </button>
            <button
              className="w-[36.73px]  flex flex-col justify-center items-center gap-[4px]"
              onClick={() => navigate("/products")}
            >
              <div className="max-w-[28px] max-h-[28px] flex justify-center items-center">
                <ProductIcon
                  className={`w-full h-full ${isProducts ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                />
              </div>
              <h3
                className={`text-[10px] ${isProducts ? "text-[#2563EB]" : "text-[#94A3B8]"}  leading-[15px] font-bold`}
              >
                Productos
              </h3>
            </button>
            <div
              className="relative w-[36.73px] flex flex-col justify-center items-center gap-[4px]"
              ref={ref}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-14 flex justify-center items-center w-[56px] h-[56px] rounded-full border-4 border-[#FFFFFF] dark:border-[#2563EB] bg-[#2563EB] shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <AddIcon className="text-white w-[40px] h-[40px]" />
              </div>
              <div
                className={`absolute left-1/2 -translate-x-1/2 ${isOpen ? "bottom-full mb-16" : "top-full mt-16"}  w-[351px] h-[369px] flex flex-col justify-start items-center gap-[24px] bg-[#FFFFFF] dark:bg-[#0D1C2D]  border border-[#F1F5F9] dark:border-[#1E293B] rounded-[24px] p-[24px] shadow-2xl`}
              >
                <div className="w-full h-auto flex items-center justify-between">
                  <h3 className="text-[20px] text-[#1E293B] dark:text-[#F1F5F9] leading-[28px] font-semibold">
                    Acciones Rápidas
                  </h3>
                  <div
                    className="min-w-[32px] min-h-[32px] rounded-full flex justify-center hover:bg-[#F8FAFC] hover:dark:bg-[#051424] items-center cursor-pointer transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <CloseIcon className="w-[18px] stroke-2 text-[#94A3B8]" />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-[12px]">
                  <button
                    className="w-full flex items-center gap-[16px] bg-[#FFFFFF] dark:bg-transparent border border-[#F1F5F9] dark:border-[#1E293B] p-[16px] rounded-[16px]"
                    onClick={() => {
                      navigate("/movements/input/new");
                      setIsOpen(false);
                    }}
                  >
                    <div className="min-w-[32px] min-h-[32px] bg-[#D1FAE5] dark:bg-[#16A34A20] flex justify-center items-center rounded-[12px]">
                      <InputIcon className="w-[15px] text-[#16A34A] dark:text-[#10B981]" />
                    </div>
                    <p className="text-[16px] text-[#334155] dark:text-[#F1F5F9] leading-[24px] font-semibold">
                      Registrar Entrada
                    </p>
                  </button>
                  <button
                    className="w-full flex items-center gap-[16px] bg-[#FFFFFF] dark:bg-transparent border border-[#F1F5F9] dark:border-[#1E293B] p-[16px] rounded-[16px]"
                    onClick={() => {
                      navigate("/movements/output/new");
                      setIsOpen(false);
                    }}
                  >
                    <div className="min-w-[32px] min-h-[32px] bg-[#FFE4E6] dark:bg-[#BA1A1A20] flex justify-center items-center rounded-[12px]">
                      <OutputIcon className="w-[15px] text-[#BA1A1A] dark:text-[#EF4444]" />
                    </div>
                    <p className="text-[16px] text-[#334155] dark:text-[#F1F5F9] leading-[24px] font-semibold">
                      Registrar Salida
                    </p>
                  </button>
                  <button
                    className="w-full flex items-center gap-[16px] bg-[#FFFFFF] dark:bg-transparent border border-[#F1F5F9] dark:border-[#1E293B] p-[16px] rounded-[16px]"
                    onClick={() => {
                      navigate(`/products/new`);
                      setIsOpen(false);
                    }}
                  >
                    <div className="min-w-[32px] min-h-[32px] bg-[#DBEAFE] dark:bg-[#2563EB20] flex justify-center items-center rounded-[12px]">
                      <AddIcon className="text-[#2563EB] w-[22px]" />
                    </div>
                    <p className="text-[16px] text-[#334155] dark:text-[#F1F5F9] leading-[24px] font-semibold">
                      Añadir Producto
                    </p>
                  </button>
                </div>
                <p className="text-[10px] text-[#94A3B8] dark:text-[#F1F5F9] leading-[15px] font-bold">
                  SELECCIONA UNA OPERACIÓN
                </p>
              </div>
            </div>
            <button
              className="w-[36.73px] flex flex-col justify-center items-center gap-[4px]"
              onClick={() => navigate("/movements")}
            >
              <div className="max-w-[24px] max-h-[24px] flex justify-center items-center">
                <MovementsIcon
                  className={`w-full h-full ${isMovements ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                />
              </div>
              <h3
                className={`text-[10px] ${isMovements ? "text-[#2563EB]" : "text-[#94A3B8]"}  leading-[15px] font-bold`}
              >
                Movimientos
              </h3>
            </button>
            <button
              className="w-[36.73px] flex flex-col justify-center items-center gap-[4px]"
              onClick={() => navigate("/settings")}
            >
              <div className="max-w-[20px] max-h-[20px] flex justify-center items-center">
                <ProfileIcon
                  className={`w-full h-full ${isProfile ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                />
              </div>
              <h3
                className={`text-[10px] ${isProfile ? "text-[#2563EB]" : "text-[#94A3B8]"}  leading-[15px] font-bold`}
              >
                Perfil
              </h3>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default BottomNavigation;
