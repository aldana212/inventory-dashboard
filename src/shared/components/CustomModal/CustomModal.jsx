import React, { useEffect } from "react";

const CustomModal = ({ isOpen, children }) => {
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
    <div
      className={`
        bg-[#00000066]/90
        fixed inset-0 z-50

        2xl:px-0 xl:px-0 lg:px-0
        tablet:px-0 mobile:px-2

        flex justify-center
        items-end sm:items-center

        overflow-hidden

        transition-opacity duration-300

        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      {children}
    </div>
  );
};

export default CustomModal;
