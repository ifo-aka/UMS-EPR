// src/AppContextProvider.jsx
import { useLayoutEffect, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import { useSelector, useDispatch } from "react-redux";
import { authenticationCheck } from "./DbQuery";
import {
  setSideBarActiveLink ,
  setIsMobileDimention,
  setIsDesktopDimention,
} from "./slices/uiSlice";
import {
  
  restoreAuthFromLocalStorage,
  checkSessionValidation,
 
  
} from "./slices/authSlice"

const AppContextProvider = ({ children }) => {
  const prevWidth = useRef(window.innerWidth)

  const dispatch = useDispatch();
    useEffect(() => {

    dispatch(restoreAuthFromLocalStorage()).then((res) => {
    //will perform tasks
    });
  }, [dispatch]);

  useEffect(()=>{
   dispatch(checkSessionValidation()).then((res)=>{
    
   })
  },[]);

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
      console.log(prevWidth.current);
      const currentWidth = window.innerWidth;
      const wasMobile = prevWidth.current < 950;
      const isNowMobile = currentWidth < 950;
      if (wasMobile !== isNowMobile) {
        if (isNowMobile) dispatch(setIsMobileDimention(true));
        else dispatch(setIsDesktopDimention(true));
      }
      console.log(wasMobile +" and "+ isNowMobile);
      
      prevWidth.current = currentWidth;
    
    };

    window.addEventListener("resize", handleResize);
    return () =>{
       window.removeEventListener("resize", handleResize);
      
      }
  }, [dispatch]);
  console.log(dispatch)

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
