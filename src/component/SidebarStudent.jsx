// File: src/components/SidebarStudent.jsx
import styles from "../StyleSheets/Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import { useContext, useEffect } from "react";

const SidebarStudent = () => {
  const {
    sideBarActiveLink,
    setSideBarActiveLink,
    isDesktopDimention,
    isMobileDimention,
    // role is not required here — this is the student-specific sidebar
  } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    if (
      pathname === "/" ||
      ["/dashboard", "/assignments", "/classes", "/gradebook", "/faculty", "/reports", "/settings"].includes(pathname)
    ) {
      setSideBarActiveLink(pathname);
    } else if (!["/dashboard", "/assignments", "/classes", "/gradebook", "/faculty", "/reports", "/settings"].includes(pathname)) {
      setSideBarActiveLink(null);
    }
  }, [pathname, setSideBarActiveLink]);

  const handleActive = (link) => setSideBarActiveLink(link);

  const linksToShow = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/assignments", label: "Assignments" },
  ];

  return (
    <>
      {isDesktopDimention ? (
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <h2 className={styles.title}>Quick links</h2>
            <div className={styles.sideBarContent}>
              <ul className={styles.list}>
                {linksToShow.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`${styles.linkclass} ${
                      sideBarActiveLink === item.to ? styles.activeLink : ""
                    }`}
                    onClick={() => handleActive(item.to)}
                  >
                    <li className={styles.sideBarItem}>{item.label}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      )}
    </>
  );
};

export default SidebarStudent;