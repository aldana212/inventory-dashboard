import React from "react";
import NotificationIcon from "../../../assets/icons/NotificationIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import CustomInput from "../CustomInput/CustomInput";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { useAuthStore } from "../../../features/auth/store/authStore";
import { getInitialsFromFullName } from "../../../utils/getInitialsFromFullName";
import ProductIcon from "../../../assets/icons/ProductIcon";
import SidebarMobile from "./SidebarMobile/SidebarMobile";
import MenuAltIcon from "../../../assets/icons/MenuAltIcon";
{
  /* <div className="w-full min-h-[64px] bg-[#FFFFFF]/80" /> */
}

const Header = ({ isOpen, setIsOpen }) => {
  const user = useAuthStore((s) => s.user);

  let firstName = user?.firstName;
  let lastName = user?.lastName;
  const fullName = `${firstName} ${lastName}`;

  const color = user?.brandColor; // texto fuerte
  const bg = `${color}20`; // fondo suave

  return (
    <div className="w-full min-h-[64px] bg-[#FFFFFF]/80 dark:bg-[#051424] backdrop-blur-md sticky top-0 z-30 border-b border-b-[#E2E8F0] dark:border-b-[#1E293B] flex items-center justify-between sm:px-[24px] px-[16px]">
      <div className="max-w-max lg:hidden flex items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden sm:flex hidden"
        >
         <MenuAltIcon className="w-[20px] text-[#64748B] dark:text-[#F1F5F9] cursor-pointer" />
        </button>

        <div className="min-w-[32px] min-h-[32px] bg-[#0050CB] flex justify-center items-center rounded-[8px]">
          <ProductIcon className="w-[20px] text-white" />
        </div>
        <div>
          <h1 className="text-[16px] font-bold text-[#1D4ED8] dark:text-[#F1F5F9]">StockMaster</h1>
          <p className="text-[12px] text-[#64748B] dark:text-[#94A3B8]">GESTIÓN PRO</p>
        </div>
      </div>
      <div className="lg:w-[448px] w-[300px] sm:flex hidden items-center gap-[16px]">
        <CustomInput
          type="text"
          value=""
          name="currentStock"
          placeholder="Buscar productos, movimientos o SKU..."
          onChange={() => {}}
          icon={<SearchIcon className="w-[21px] text-[#737686]" />}
        />
      </div>
      <div className="max-w-max flex items-center sm:gap-[8px] gap-[12px]">
        <div className="w-[28px] h-[28px] flex justify-center items-center p-[5px]">
          <NotificationIcon className="dark:text-[#C3C6D6]" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden"
        >
       <MenuAltIcon className="w-[20px] text-[#64748B] dark:text-[#F1F5F9] cursor-pointer" />
        </button>
        <div className="w-px h-[32px] sm:flex hidden justify-center items-center bg-[#E2E8F0] dark:bg-[#1E293B] rounded-full"></div>
        <div className="min-w-[161.27px] h-[48px] sm:flex hidden items-center gap-[12px] p-[6px]">
          <div className="sm:flex hidden items-end flex-col">
            <h3 className="text-[13px] text-[#0F172A] dark:text-[#F1F5F9] leading-[16.3px] font-semibold">
              {user?.role?.name}
            </h3>
            <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-[13px]">
              Gestor de Almacén
            </p>
          </div>
          <div
            className="w-[35px] h-[35px] flex justify-center items-center text-[12px] leading-[16px] font-bold rounded-full"
            style={{ backgroundColor: bg, color }}
          >
            {getInitialsFromFullName(fullName)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
