// src/components/Sidebar.jsx
import styles from "../StyleSheets/Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import { useContext, useEffect, useState , useRef} from "react";

const SidebarComponent = ({ role = "guest" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef();
  const sidebarRef = useRef();
const  handleOverLayClick=(event)=>{
  if(isMobileDimention && isOpen){
  
    if(event.target != sidebarRef.current){
      setIsOpen(false)
    }
  }
  }
  console.log(role)
  const {
    sideBarActiveLink,
    setSideBarActiveLink,
    isDesktopDimention,
    isMobileDimention,
  } = useContext(AppContext);

  const { pathname } = useLocation();

  // Define role-based links
  const roleLinks = {
    guest: [
      { to: "/", label: "Home" },
      { to: "/features", label: "Features" },
      { to: "/demo", label: "Live Demo" },
      { to: "/pricing", label: "Pricing" },
      { to: "/docs", label: "Docs" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    student: [
      { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/assignments", label: "Assignments" },
    ],
    teacher: [
      { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/classes", label: "My Classes" },
      { to: "/gradebook", label: "Gradebook" },
    ],
    dean: [
      { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dean Dashboard" },
      { to: "/faculty", label: "Faculty Management" },
      { to: "/reports", label: "Reports" },
      { to: "/settings", label: "System Settings" },
    ],
  };
role= role.toLocaleLowerCase();
console.log(role)

  const linksToShow = roleLinks[role] || roleLinks.guest;

  // Keep active link synced
  useEffect(() => {
    const allValidLinks = linksToShow.map((l) => l.to);
    if (allValidLinks.includes(pathname)) {
      setSideBarActiveLink(pathname);
    } else {
      setSideBarActiveLink(null);
    }
  }, [pathname, setSideBarActiveLink, linksToShow]);

  const handleActive = (link) => setSideBarActiveLink(link);

  return (
    <>
    <aside
      className={`${styles.sidebarContainer} ${
        isMobileDimention  && isOpen? styles.mobileSidebar : ""
      }`}
      ref={overlayRef} onClick={handleOverLayClick} 
    >
      {isMobileDimention &&  <span className={styles.closeBtn} onClick={() => setIsOpen(false)} title="close sidebar">
        &times;
      </span>}
      <div className={styles.sidebar} ref={sidebarRef}>
        <h2 className={styles.title}>
          {role === "guest" ? "Explore" : "Quick links"}
        </h2>

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

          {role === "guest" && (
            <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
              <small style={{ color: "white" }}>
                Want to see how it works? Try the demo — no account required.
              </small>
            </div>
          )}
        </div>
      </div>
    </aside>
    {isMobileDimention &&  <div className={styles.hamburger} onClick={()=>setIsOpen(true)}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                  </div>}
                  </>
  );
};

export default SidebarComponent;
