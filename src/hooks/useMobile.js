import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const manejarResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    manejarResize();

    window.addEventListener("resize", manejarResize);
    return () => {
      window.removeEventListener("resize", manejarResize);
    };
  }, []);

  return { isMobile };
};
