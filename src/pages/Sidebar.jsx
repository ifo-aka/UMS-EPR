import { useSelector } from "react-redux";
import SidebarStudent from "../component/SidebarStudent";
import SidebarDean from "../component/SidebarDean";
import SidebarTeacher from "../component/SidebarTeacher";
import SidebarGuest from "../component/SidebarGuest";
import { AppContext } from "../store/AppContext";
import { useContext } from "react";
import styles from "../StyleSheets/Sidebar.module.css"
const Sidebar= ()=>{
      const  {
         isDesktopDimention,
         isMobileDimention,
       } = useContext(AppContext);
     const role = useSelector((s) => s.auth.role);
     console.log(role)
     if(isDesktopDimention){
     if(role==="STUDENT")
     {
      return <SidebarStudent />
     }
     else if(role == "TEACHER"){
      return <SidebarTeacher />
     }
     else if(role == "DEAN"){
      return <SidebarDean />
     }
     else{
      return <SidebarGuest />;
     }
}

   else  {
     return <div className={styles.hamburger}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                  </div>
     }
}
export default Sidebar;