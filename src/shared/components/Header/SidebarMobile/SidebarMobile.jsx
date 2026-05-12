import React, { useEffect } from "react";
import ProductIcon from "../../../../assets/icons/productIcon";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import DashboardIcon from "../../../../assets/icons/DashboardIcon";
import MovementsIcon from "../../../../assets/icons/movementsIcon";
import UsersIcon from "../../../../assets/icons/UsersIcon";
import CategoryIcon from "../../../../assets/icons/CategoryIcon";
import SettingIcon from "../../../../assets/icons/SettingIcon";
import { NavLink } from "react-router";

const SidebarMobile = ({ isOpen, onClose }) => {
  const NavLinks = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
      icon: <DashboardIcon className="w-[24px] h-[24px]" />,
    },
    {
      id: 2,
      name: "Productos",
      link: "/products",
      icon: <ProductIcon className="w-[24px] h-[24px]" />,
    },
    {
      id: 3,
      name: "Movimientos",
      link: "/movements",
      icon: <MovementsIcon className="w-[20px] h-[20px]" />,
    },
    {
      id: 4,
      name: "Usuarios",
      link: "/users",
      icon: <UsersIcon className="w-[20px] h-[20px]" />,
    },
    {
      id: 5,
      name: "Categorías",
      link: "/category",
      icon: <CategoryIcon className="w-[20px] h-[20px]" />,
    },
    {
      id: 6,
      name: "Configuración",
      link: "/settings",
      icon: <SettingIcon className="w-[24px] h-[24px]" />,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`
      fixed h-screen inset-0 bg-black/50 lg:hidden
      transition-opacity duration-300 z-40
      ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    `}
      />
      <div
        className={`fixed top-0 left-0 h-screen sm:w-[50%] w-[70%] lg:hidden
      bg-white dark:bg-[#0D1C2D] z-40
      transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        <div className="w-full h-[64px] px-[24px] flex items-center justify-between">
          <div className="max-w-max flex items-center gap-3">
            <div className="min-w-[32px] min-h-[32px] bg-[#0050CB] flex justify-center items-center rounded-[8px]">
              <ProductIcon className="w-[20px] text-white" />
            </div>
            <h2 className="text-[16px] font-bold text-[#1E293B] dark:text-[#F1F5F9] leading-[24px]">
              StockMaster
            </h2>
          </div>
          <button
            className="min-w-[32px] min-h-[32px] bg-transparent flex justify-center items-center rounded-[8px]"
            onClick={onClose}
          >
            <CloseIcon className="w-[16px] text-[#64748B] dark:text-[#F1F5F9]" />
          </button>
        </div>
        <div className="w-full flex flex-1 flex-col gap-[4px] px-[16px] py-[24px] ">
          {NavLinks.map((item) => (
            <NavLink key={item.id} to={item.link} onClick={onClose}>
              {({ isActive }) => (
                <li
                  className={`relative flex items-center gap-3  h-[42px] pl-[12px] rounded-[8px] cursor-pointer transition-all
                    ${
                      isActive
                        ? "bg-[#EFF6FF] dark:bg-[#2563EB]/10"
                        : "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]"
                    }
                  `}
                >
                  <div
                    className={`min-w-[24px] min-h-[24px] flex justify-center items-center group ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-[#475569] dark:text-[#94A3B8]"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span
                    className={`text-[14px] font-semibold whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                    ${isActive ? "text-[#2563EB]" : "text-[#64748B] dark:text-[#94A3B8]"}`}
                  >
                    {item.name}
                  </span>
                </li>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarMobile;
