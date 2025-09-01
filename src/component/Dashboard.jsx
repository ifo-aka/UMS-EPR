// src/component/Dashboard.jsx
import styles from "../StyleSheets/DashBoard.module.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserIcon, SearchIcon, EditIcon, DeleteIcon } from "../store/icons";
import useDebounce from "../store/UseDebounce";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudentsThunk,
  fetchLastPageThunk,
  searchStudentsThunk,
  getNoOfDepartmentsThunk,
  clearSearchResults,
  setRecentStudents,
} from "../store/slices/studentSlice"; // ensure this path is correct
import Container from "./Container";

let Dashboard = () => {
  const dispatch = useDispatch();

  const studentPaginationObject = useSelector(
    (s) => s.students.studentPaginationObject
  );
  const recentStudents = useSelector((s) => s.students.recentStudents);
  const searchResults = useSelector((s) => s.students.searchResults);
  const departmentCount = useSelector((s) => s.students.departmentCount);
  const isAdmin = useSelector((s) => s.auth.isAdmin);
  const role = useSelector((s) => s.auth.role);

  const {
    studentList = [],
    currentPage = 0,
    totalElements = 0,
    totalPages = 0,
  } = studentPaginationObject ?? {};

  // UI state (kept local)
  const [search, setSearch] = useState("");
  const debouncedSearchValue = useDebounce(search, 500);
  const [searchFilter, setSearchFilter] = useState("id");
  const [tableToShow, setTableToShow] = useState("All"); // "All" | "Recent" | "Search"
  const [headingToShow, setHeadingToShow] = useState("All Students");

  // Derived list to render
  const studentToShow =
    tableToShow === "Search"
      ? searchResults
      : tableToShow === "Recent"
      ? recentStudents
      : studentList;

  const initialFetchedRef = useRef(false);

  useEffect(() => {
    if (initialFetchedRef.current) return;
    initialFetchedRef.current = true;

    // fetch first page
    dispatch(fetchStudentsThunk({ page: 0, size: 5, sortBy: "id" }))
      .then((action) => {
        const payload = action.payload ?? {};
        // payload might already be inner data (because thunk returns result.data ?? result)
        const data = payload?.studentList || payload;
        const total =
          payload?.totalPages ??
          payload?.data?.totalPages ??
          payload?.totalPages;
        if (total && total > 1) {
          // fetch last page (thunk returns inner data)
          dispatch(fetchLastPageThunk(total)).then((lastAction) => {
            const lastPayload = lastAction.payload ?? {};
            // setRecentStudents expects array or object with studentList
            const arr =
              lastPayload?.studentList ??
              (Array.isArray(lastPayload) ? lastPayload : []);
            dispatch(setRecentStudents(arr));
          });
        } else if (payload?.studentList) {
          dispatch(setRecentStudents(payload.studentList));
        } else if (Array.isArray(data) && data.length) {
          dispatch(setRecentStudents(data));
        }
      })
      .catch(() => {});

    dispatch(getNoOfDepartmentsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    // Debugging: log when recentStudents change
    console.log("recentStudents length:", recentStudents?.length ?? 0);
    // console.table(recentStudents);
  }, [recentStudents]);

  // Debounced search effect — dispatch search thunk when user stops typing
  useEffect(() => {
    if (
      debouncedSearchValue &&
      debouncedSearchValue.toString().trim().length > 0
    ) {
      dispatch(
        searchStudentsThunk({
          filter: searchFilter,
          value: debouncedSearchValue,
        })
      )
        .then((action) => {
          if (action.meta?.requestStatus === "fulfilled") {
            setTableToShow("Search");
            setHeadingToShow("Search Results");
          }
        })
        .catch(() => {
          setTableToShow("All");
          setHeadingToShow("All Students");
        });
    } else {
      dispatch(clearSearchResults());
      setTableToShow("All");
      setHeadingToShow("All Students");
    }
  }, [debouncedSearchValue, searchFilter, dispatch]);

  useEffect(() => {
    if (tableToShow === "All") setHeadingToShow("All Students");
  }, [studentList, tableToShow]);

  const onPageChange = (page) => {
    dispatch(fetchStudentsThunk({ page, size: 10, sortBy: "id" }));
  };

  const handleSearchBtn = () => {
    if (search && search.toString().trim().length > 0) {
      dispatch(searchStudentsThunk({ filter: searchFilter, value: search }));
      setTableToShow("Search");
      setHeadingToShow("Search Results");
    }
  };

  const handleEdit = (student) => {
    alert(`Edit student: ${student.name}`);
  };
  const handleDelete = (student) => {
    if (window.confirm(`Delete student ${student.name}?`)) {
      alert(`Deleted student: ${student.name}`);
    }
  };

  return (
    <Container>
      <div className={styles.dashboard}>
        <div className={styles.herocont}>
          <div className={styles.Usericon}>
            <UserIcon color={" white"} />
            <div>
              <h1 className={styles.headingTop}>Admin Dashboard</h1>
              <span className={styles.roleIndicator}>{role}</span>
            </div>
          </div>
          <Link to="/addStudentForm">
            <button className={styles.addStudentbtn}>+ Add</button>
          </Link>
        </div>

        <div className="d-flex justify-content-space-between mb-4 gap-2 flex-wrap ">
          <div className={styles.totalStudent}>
            <div className={styles.totalStudentValue}>{totalElements}</div>
            <div className={styles.totalStudentLabel}>Total Students</div>
          </div>
          <div className={styles.totalPages}>
            <div className={styles.totalPagesValue}>{totalPages}</div>
            <div className={styles.totalPagesLabel}>Total Pages</div>
          </div>
          <div className={styles.totalDepartments}>
            <span className={styles.totalDepartmentsLabel}>
              Departments: <b>{departmentCount}</b>
            </span>
          </div>
        </div>

        <div className={styles.searchicon}>
          <div className={styles.searchInput}>
            <input
              className={styles.search}
              type={searchFilter === "id" ? "number" : "text"}
              placeholder="Select filter and search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className={styles.filterBtn} onClick={handleSearchBtn}>
              <SearchIcon />
            </button>
          </div>

          <select
            className={styles.filterSelect}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="department">department</option>
          </select>

          <div className={styles.btns}>
            <button
              className={styles.recentBtn}
              onClick={() => {
                setTableToShow("Recent");
                setHeadingToShow("Recent Students");
              }}
            >
              Recent
            </button>
            <button
              className={styles.allBtn}
              onClick={() => {
                setTableToShow("All");
                setHeadingToShow("All Students");
              }}
            >
              All
            </button>
          </div>
        </div>

        <>
          <h2 className={styles.studentToshowHeading}>{headingToShow}</h2>
          <div className={styles.tableContainer}>
            <table className={styles.studentsTable}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentToShow && studentToShow.length > 0 ? (
                  studentToShow.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.department}</td>
                      <td className={styles.tableActions}>
                        <button
                          title="Edit"
                          className={styles.actionBtn}
                          onClick={() => handleEdit(student)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          title="Delete"
                          className={styles.actionBtn}
                          onClick={() => handleDelete(student)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className={styles.noDataCell}>
                      No student data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {tableToShow === "All" && (
            <div className={styles.paginationControls}>
              <button
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages - 1 || totalPages === 0}
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      </div>
    </Container>
  );
};

export default Dashboard;
