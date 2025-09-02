import styles from "../StyleSheets/Header.module.css";
import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

// ✅ Import Heroicons (you can swap with fa, md, etc. if you like another style)
import { HiHome, HiInformationCircle, HiDocumentText, HiLogin, HiUserAdd, HiLogout, HiUser } from "react-icons/hi";
import {logout} from "../store/slices/authSlice"

import { useSelector,useDispatch } from "react-redux";



const Header = () => {
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector((s)=>s.auth)
  const {isMobileDimention} = useSelector((s)=>s.ui)

  console.log(isMobileDimention)

  return (
    <div className={styles.header}>
      <div className={styles.HeadingCont}>
        <h1 className={styles.logo}>Logo</h1>
        <ThemeToggle />
    
      </div>

      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <Link to="/">
            <li className={styles.li}>
              {isMobileDimention ? <HiHome size={20} /> : "Home"}
            </li>
          </Link>
          { isAuthenticated &&
          <Link to="/profile">
            <li className={styles.li}>
                 <div className={styles.profile}>
         {isMobileDimention ? <HiUser size={24}  /> : "Profile" }
        </div>
            </li>
          </Link>
}
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
            <button onClick={()=>dispatch(logout())} className={styles.li}>
              {isMobileDimention ? <HiLogout size={20} /> : "Logout"}
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
