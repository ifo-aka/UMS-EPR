import { useSelector } from "react-redux";
import SidebarStudent from "../component/SidebarStudent";
import SidebarDean from "../component/SidebarDean";
import SidebarTeacher from "../component/SidebarTeacher";
import SidebarGuest from "../component/SidebarGuest";

const Sidebar= ()=>{
     const role = useSelector((s) => s.auth.role);
     if(role=="Student")
     {
      return <SidebarStudent />
     }
     else if(role == "teacher"){
      return <SidebarTeacher />
     }
     else if(role == "dean"){
      return <SidebarDean />
     }
     else{
      return <SidebarGuest />;
     }
}
export default Sidebar;