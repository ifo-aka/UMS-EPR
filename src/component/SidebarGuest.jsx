// src/components/SidebarGuest.jsx
import styles from "../StyleSheets/Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import { useContext, useEffect } from "react";

const SidebarGuest = () => {
  const {
    sideBarActiveLink,
    setSideBarActiveLink,
    isDesktopDimention,
    // no role used here (guest)
  } = useContext(AppContext);

  const { pathname } = useLocation();

  useEffect(() => {
    // keep simple: set active only for public routes we care about
    const publicLinks = ["/", "/features", "/pricing", "/about", "/contact", "/docs"];
    setSideBarActiveLink(publicLinks.includes(pathname) ? pathname : null);
  }, [pathname, setSideBarActiveLink]);

  const handleActive = (link) => setSideBarActiveLink(link);

  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/demo", label: "Live Demo" },
    { to: "/pricing", label: "Pricing" },
    { to: "/docs", label: "Docs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
     
        <aside className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <h2 className={styles.title}>Explore</h2>

            <div className={styles.sideBarContent}>
              <ul className={styles.list}>
                {links.map((item) => (
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

      

              <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
                <small style={{ color: "white" }}>Want to see how it works? Try the demo — no account required.</small>
              </div>
            </div>
          </div>
        </aside>

    </>
  );
};

export default SidebarGuest;
