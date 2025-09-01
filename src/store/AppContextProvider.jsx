// src/AppContextProvider.jsx
import { useLayoutEffect, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import { useSelector, useDispatch } from "react-redux";

import {
  setSideBarActiveLink ,
  setIsMobileDimention,
  setIsDesktopDimention,
} from "./slices/uiSlice";

const AppContextProvider = ({ children }) => {
  const prevWidth = useRef(window.innerWidth)

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const width = window.innerWidth;
    if (width < 950) {
      dispatch(setIsMobileDimention(true));
    } else {
      dispatch(setIsDesktopDimention(true));
    }
  
  }, []);

  // resize handler
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const wasMobile = prevWidth.current < 950;
      const isNowMobile = currentWidth < 950;
      if (wasMobile !== isNowMobile) {
        if (isNowMobile) dispatch(setIsMobileDimention(true));
        else dispatch(setIsDesktopDimention(true));
      }
      prevWidth.current = currentWidth;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <AppContext.Provider
      value={{
      }}
    >
     {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
