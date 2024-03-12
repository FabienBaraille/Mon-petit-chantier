import { useEffect, useState } from "react";

// Hook used to check windows width and windows resize after rendering and prevent hydratation issue

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  return windowWidth;
}