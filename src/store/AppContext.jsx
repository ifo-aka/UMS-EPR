import { createContext } from "react";


export const AppContext = createContext({

studentPaginationObject: {
  studentList: [],
  currentPage: 0,
  totalPages: 0,
  totalElements: 0
},
authChecked: false,
isAuthenticated: false,
showSpinner: false,
sideBarActiveLink: "/",
studentObject : {
      id: null,
    name: "",
    age: null,
    department: "",
},

isAdmin : false,
isMobileDimention: false,
isDesktopDimention: false,
recentStudents: [],
role : "",
login: ()=>{},
fetchStudents: ()=>{},
setSideBarActiveLink: ()=>{},
logout: ()=>{},
setStudentObject: ()=>{},
addStudent: ()=>{},
setRecentStudents: ()=>{},
dbNoOfDeparts :()=>{},
setShowSpinner : ()=>{},
});