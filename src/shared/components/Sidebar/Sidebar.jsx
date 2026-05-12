import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import DashboardIcon from "../../../assets/icons/DashboardIcon";
import ProductIcon from "../../../assets/icons/ProductIcon";
import MovementsIcon from "../../../assets/icons/MovementsIcon";
import AlertIcon from "../../../assets/icons/AlertIcon";
import SuppliersIcon from "../../../assets/icons/SuppliersIcon";
import CategoryIcon from "../../../assets/icons/CategoryIcon";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import AddIcon from "../../../assets/icons/AddIcon";
import InfoCircleIcon from "../../../assets/icons/InfoCircleIcon";
import UsersIcon from "../../../assets/icons/UsersIcon";
import SettingIcon from "../../../assets/icons/SettingIcon";

import { usePermissions } from "../../../hooks/usePermissions";
import { useAuthStore } from "../../../features/auth/store/authStore";
import MenuAltIcon from "../../../assets/icons/MenuAltIcon";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  let navigate = useNavigate();
  const { hasRole } = usePermissions();
  const logout = useAuthStore((s) => s.logout);

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

  const handleLogout = () => {
    logout();
    navigate("auth/login");
  };

  return (
    <div
      className={`h-screen bg-[#FFFFFF] dark:bg-[#0D1C2D] border-r border-r-[#E2E8F0] dark:border-r-[#1E293B]
      flex flex-col gap-[8px] transition-all duration-500 ease-in-out lg:flex hidden
      ${isExpanded ? "w-[256px]" : "w-[80px]"}
      `}
    >
      {/* HEADER */}
      <div className="h-[75px] flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <div className="min-w-[32px] min-h-[32px] bg-[#0050CB] flex justify-center items-center rounded-[8px]">
            <ProductIcon className="w-[20px] text-white" />
          </div>
          <div>
            <h2
              className={`text-[16px] font-bold text-[#1D4ED8] dark:text-[#F1F5F9] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      isExpanded
                        ? "opacity-100 translate-x-0 max-w-[200px]"
                        : "opacity-0 -translate-x-3 max-w-0"
                    }`}
            >
              StockMaster
            </h2>
            <p
              className={`text-[12px] text-[#64748B] dark:text-[#94A3B8] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      isExpanded
                        ? "opacity-100 translate-x-0 max-w-[200px]"
                        : "opacity-0 -translate-x-3 max-w-0"
                    }`}
            >
              GESTIÓN PRO
            </p>
          </div>
        </div>

        <button onClick={() => setIsExpanded(!isExpanded)}>
          <MenuAltIcon className="w-[20px] text-[#64748B] dark:text-[#F1F5F9] cursor-pointer" />
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {NavLinks.map((item) => (
            <NavLink key={item.id} to={item.link}>
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
                    ${isActive ? "text-[#2563EB]" : "text-[#64748B] dark:text-[#94A3B8]"}
                    ${
                      isExpanded
                        ? "opacity-100 translate-x-0 max-w-[200px]"
                        : "opacity-0 -translate-x-3 max-w-0"
                    }`}
                  >
                    {item.name}
                  </span>
                  {/* TOOLTIP cuando está colapsado */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-3 px-2 py-1 bg-white dark:bg-[#0D1C2D] shadow-md rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      <span className="text-[12px]">{item.name}</span>
                    </div>
                  )}
                </li>
              )}
            </NavLink>
          ))}
        </ul>
      </nav>

      {/* BOTÓN ACCIÓN */}
      {hasRole(["ADMIN", "SUPERVISOR"]) && (
        <div className="p-2">
          <button
            onClick={() => navigate(`/products/new`)}
            className="w-full h-[42px] bg-[#004AC6] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer"
          >
            <AddIcon className="text-white w-[18px]" />
            {isExpanded && (
              <span className="text-white text-sm font-semibold">
                Nuevo Producto
              </span>
            )}
          </button>
        </div>
      )}

      {/* FOOTER */}
      <div className="border-t border-t-[#E2E8F0]/50 dark:border-t-[#1E293B] p-2 flex flex-col gap-2">
        <button className="flex items-center gap-3 justify-center h-[40px]">
          <InfoCircleIcon className="w-[18px] text-[#475569] dark:text-[#94A3B8]" />
          {isExpanded && <span className="text-sm text-[#475569] dark:text-[#94A3B8]">Ayuda</span>}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 justify-center h-[40px]"
        >
          <LogoutIcon className="w-[18px] text-red-500" />
          {isExpanded && (
            <span className="text-sm text-red-500">Cerrar sesión</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
