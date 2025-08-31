// src/AppContextProvider.jsx
import { useLayoutEffect, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";
import { useSelector, useDispatch } from "react-redux";
import store from "./index" // not used directly here but ensure store exists
import {
  loginThunk,
  restoreAuthFromLocalStorage,
  logout as logoutAction,
  setShowSpinner as setShowSpinnerAction,
  setAuthChecked as setAuthCheckedAction,
} from "./slices/authSlice";
import {
  fetchStudentsThunk,
  fetchLastPageThunk,
  addStudentThunk,
  setStudentObject as setStudentObjectAction,
  setRecentStudents as setRecentStudentsAction,
} from "./slices/studentSlice";
import {
  setSideBarActiveLink as setSideBarActiveLinkAction,
  setIsMobileDimention,
  setIsDesktopDimention,
} from "./slices/uiSlice";

const AppContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Selectors
  const {
    token,
    role,
    isAuthenticated,
    isAdmin,
    authChecked,
    showSpinner,
  } = useSelector((s) => s.auth);

  const { studentPaginationObject, studentObject, recentStudents } = useSelector(
    (s) => s.students
  );

  const { sideBarActiveLink, isMobileDimention, isDesktopDimention } = useSelector(
    (s) => s.ui
  );

  const prevWidth = useRef(window.innerWidth);

  // On mount, restore auth & initial fetch
  useEffect(() => {
    dispatch(setShowSpinnerAction(true));
    dispatch(setAuthCheckedAction(false));
    dispatch(restoreAuthFromLocalStorage()).then((res) => {
      const restored = res.payload;
      if (restored?.token) {
        // fetch students
        // dispatch(fetchStudentsThunk({ page: 0, size: 10, sortBy: "id" }));
      }
      dispatch(setShowSpinnerAction(false));
      dispatch(setAuthCheckedAction(true));
    });
  }, [dispatch]);

  // fetch initial and last page for recentStudents (equivalent to previous effect)
  // useEffect(() => {
  //   const fetchInitialAndLastPage = async () => {
  //     const first = await dispatch(fetchStudentsThunk({ page: 0, size: 5, sortBy: "id" }));
  //     if (first.payload && first.payload.totalPages > 1) {
  //       const totalPages = first.payload.totalPages;
  //       const last = await dispatch(fetchLastPageThunk(totalPages));
  //       if (last.payload) {
  //         dispatch(setRecentStudentsAction(last.payload));
  //       } else {
  //         dispatch(setRecentStudentsAction([]));
  //       }
  //     } else if (first.payload && first.payload.studentList) {
  //       dispatch(setRecentStudentsAction(first.payload.studentList));
  //     } else {
  //       dispatch(setRecentStudentsAction([]));
  //     }
  //   };
  //   fetchInitialAndLastPage();
  // }, [dispatch]);

  // layout effect run once to set initial dims
  useLayoutEffect(() => {
    const width = window.innerWidth;
    if (width < 950) {
      dispatch(setIsMobileDimention(true));
    } else {
      dispatch(setIsDesktopDimention(true));
    }
    // no dependency, run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // wrapper functions to expose in context (they dispatch to store)
  const login = (email, password) => dispatch(loginThunk({ email, password }));
  const fetchStudents = (page = 0, size = 5, sortBy = "id") =>
    dispatch(fetchStudentsThunk({ page, size, sortBy }));
  const addStudent = (studentObj) => dispatch(addStudentThunk(studentObj));
  const logout = () => dispatch(logoutAction());
  const setSideBarActiveLink = (link) => dispatch(setSideBarActiveLinkAction(link));
  const setStudentObject = (obj) => dispatch(setStudentObjectAction(obj));
  const setRecentStudents = (arr) => dispatch(setRecentStudentsAction(arr));
  const setShowSpinner = (val) => dispatch(setShowSpinnerAction(val));

  return (
    <AppContext.Provider
      value={{
        studentPaginationObject,
        authChecked,
        isAuthenticated,
        isAdmin,
        showSpinner,
        sideBarActiveLink,
        studentObject,
        isMobileDimention,
        isDesktopDimention,
        recentStudents,
        role,
        login,
        setSideBarActiveLink,
        fetchStudents,
        logout,
        setStudentObject,
        addStudent,
        setRecentStudents,
        // if you still used dbNoOfDeparts from DbQuery directly, pass it through context too:
        // dbNoOfDeparts,
        setShowSpinner,
      }}
    >
     {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
