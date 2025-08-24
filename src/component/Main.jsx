// import styles from "../StyleSheets/Main.module.css"
// import { useContext ,useState } from "react";
// import { AppContext } from "../store/AppContext";
// import { SearchIcon } from "../store/icons";




// //   onChange={(e) =>{ setSearch(e.target.value);setHeadingToShow("Search Results")}}  onChange={(e) => setSearchFilter(e.target.value)} onClick={handleSearch}
// const Main =()=>{
//       let [searchFilter,setSearchFilter] = useState("id");  
//           const [search, setSearch] = useState("");
//     const context = useContext(AppContext);
// let {studentList,currentPage,totalElements,totalPages} =context.studentPaginationObject;
// let onPageChange =(page)=>{
// context.fetchStudents(page,5,"id");

// }
//     return <div className={styles.main}>
        
//                 <div className={styles.searchItemsContainer}>
//                         <div className={styles.searchInput}>
//                               <input className={styles.search}
//                                 type={searchFilter=== "id" ? "number" : "text"}
//                                 placeholder="Select filter and search..."
//                                 value={search}
                              
//                               />
//                                 <button className={styles.filterBtn} > <SearchIcon /></button>
//                                 </div>
//                               <select className={styles.filterSelect}  >
//                                 <option value="id">id</option>
//                                 <option value="name">name</option>
//                                 <option value="department">department</option>
//                               </select> 

//                 </div>
//         {/* Example props: students, currentPage, totalPages, totalElements */}
//         {studentList && studentList.length > 0 ? (
//             <>
//                   <table className={styles.studentsTable}>
//                     <thead>
//                         <tr>
//                             <th>id</th>
//                             <th>Name</th>
//                             <th>Age</th>
//                             <th>Department</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {studentList.map((student) => {
//                           return (
//                             <tr key={student.id}>
//                                 <td>{student.id}</td>
//                                 <td>{student.name}</td>
//                                 <td>{student.age}</td>
//                                 <td>{student.department}</td>
//                             </tr>
//                         );
//                       })}
//                     </tbody>
//                 </table>
//                 {/* Pagination controls example */}
//                 <div className={styles.paginationControls}>
//                     <button disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}>Prev</button>
//                     <button disabled={currentPage === totalPages - 1} onClick={() => onPageChange(currentPage + 1)}>Next</button>
//                 </div>  
//             </>
//         ) : (
//             <p>No students found.</p>
//         )}
//     </div>
// }
// export default Main;