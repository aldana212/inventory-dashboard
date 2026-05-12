import { useEffect, useState } from "react";
import { useGetUser } from "../queries/useGetUser";
import Header from "../shared/components/Header/Header";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import { Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/authStore";
import Loader from "../shared/components/Loader/Loader";
import BottomNavigation from "../shared/components/BottomNavigation/BottomNavigation";
import SidebarMobile from "../shared/components/Header/SidebarMobile/SidebarMobile";

const DashboardLayout = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    isError,
    error,
    isLoading,
    isFetching,
  } = useGetUser();
  const logout = useAuthStore((s) => s.logout);

  

  useEffect(() => {
    if (!isError) return;
    if (error?.status === 404) {
      logout();
    }
  }, [isError]);

  if (isLoading || isFetching) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#051424]">
      {/* Sidebar */}
      <Sidebar />

      <div className="relative w-full flex flex-col justify-start items-center sm:overflow-auto">
        {/* Header */}
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>
         {/* Sidebar Mobile */}

        <SidebarMobile isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <BottomNavigation />


        {/* Outlet  */}
        <main className="2xl:w-[1330px] xl:w-[1120px] max-w-[1280px] w-full h-auto flex flex-1 justify-start lg:p-[32px] p-[12px] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
