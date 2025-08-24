import styles from "../StyleSheets/Header.module.css";
import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

// ✅ Import Heroicons (you can swap with fa, md, etc. if you like another style)
import { HiHome, HiInformationCircle, HiDocumentText, HiLogin, HiUserAdd, HiLogout, HiUser } from "react-icons/hi";

const Header = () => {
  const { isAuthenticated, logout, isMobileDimention } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <div className={styles.HeadingCont}>
        <h1 className={styles.logo}>University Name</h1>
        <div className={styles.profile}>
          <HiUser size={24} color={"rgb(230, 97, 173)"} />
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <Link to="/">
            <li className={styles.li}>
              {isMobileDimention ? <HiHome size={20} /> : "Home"}
            </li>
          </Link>
          <Link to="/about">
            <li className={styles.li}>
              {isMobileDimention ? <HiInformationCircle size={20} /> : "About"}
            </li>
          </Link>
          <Link to="/version">
            <li className={styles.li}>
              {isMobileDimention ? <HiDocumentText size={20} /> : "Version"}
            </li>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <li className={styles.li}>
                  {isMobileDimention ? <HiLogin size={20} /> : "Login"}
                </li>
              </Link>
              <Link to="/signup">
                <li className={styles.li}>
                  {isMobileDimention ? <HiUserAdd size={20} /> : "SignUp"}
                </li>
              </Link>
            </>
          ) : (
            <button onClick={logout} className={styles.li}>
              {isMobileDimention ? <HiLogout size={20} /> : "Logout"}
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
