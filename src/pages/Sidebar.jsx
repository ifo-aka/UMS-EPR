import { useSelector } from "react-redux";
import SidebarComponent from "../component/SidebarComponent";

const Sidebar = () => {
  const role = useSelector((s) => s.auth.role);

  return <SidebarComponent role={role} />;
};
export default Sidebar;
