// src/store/slices/studentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStudents as dbFetchStudents,
  addOneStudent as dbAddOneStudent,
  fetchLastPage as dbFetchLastPage,
  searchStudents as dbSearchStudents,
  getNoOfDepartments as dbGetNoOfDepartments,
} from "../DbQuery"; // ensure correct path

const normalizePayload = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return { studentList: payload };
  if (payload.data && typeof payload.data === "object") {
    // if payload.data is an array, return as studentList
    if (Array.isArray(payload.data)) return { studentList: payload.data };
    return payload.data;
  }
  return payload;
};

export const fetchStudentsThunk = createAsyncThunk(
  "students/fetchStudents",
  async ({ page = 0, size = 5, sortBy = "id" } = {}, { rejectWithValue }) => {
    const result = await dbFetchStudents(page, size, sortBy);
    if (!result) return rejectWithValue({ error: "No response" });
    if (result.status === 401 || result.error === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return rejectWithValue({ error: "Unauthorized", status: 401 });
    }
    if (result.error) return rejectWithValue(result);
    // return inner if present so consumers see consistent shape
    return result.data ?? result;
  }
);

export const fetchLastPageThunk = createAsyncThunk(
  "students/fetchLastPage",
  async (totalPages, { rejectWithValue }) => {
    const result = await dbFetchLastPage(totalPages);
    if (!result) return rejectWithValue({ error: "No response" });
    if (result.status === 401 || result.error === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return rejectWithValue({ error: "Unauthorized", status: 401 });
    }
    if (result.error) return rejectWithValue(result);
    return result.data ?? result;
  }
);

export const addStudentThunk = createAsyncThunk(
  "students/addStudent",
  async (studentObject, { rejectWithValue }) => {
    const res = await dbAddOneStudent(studentObject);
    if (!res) return rejectWithValue({ error: "No response" });
    if (res.status === 401 || res.error === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return rejectWithValue({ error: "Unauthorized", status: 401 });
    }
    if (res.error) return rejectWithValue(res);
    return res;
  }
);

export const searchStudentsThunk = createAsyncThunk(
  "students/searchStudents",
  async ({ filter = "id", value = "" }, { rejectWithValue }) => {
    if ((value === "" || value === null || value === undefined) && value !== 0) {
      return rejectWithValue({ error: "Empty search" });
    }
    const result = await dbSearchStudents(filter, value);
    if (!result) return rejectWithValue({ error: "No response" });
    if (result.status === 401 || result.error === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return rejectWithValue({ error: "Unauthorized", status: 401 });
    }
    if (result.error) return rejectWithValue(result);
    return result.data ?? result;
  }
);

export const getNoOfDepartmentsThunk = createAsyncThunk(
  "students/getDepartmentsCount",
  async (_, { rejectWithValue }) => {
    const result = await dbGetNoOfDepartments();
    if (!result) return rejectWithValue({ error: "No response" });
    if (result.status === 401 || result.error === "Unauthorized") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return rejectWithValue({ error: "Unauthorized", status: 401 });
    }
    if (result.error) return rejectWithValue(result);
    return result.data ?? result;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    studentPaginationObject: {
      studentList: [],
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
    },
    studentObject: { id: null, name: "", age: null, department: "" },
    recentStudents: [],
    searchResults: [],
    departmentCount: 0,
    loading: false,
    searchLoading: false,
    error: null,
  },
  reducers: {
    // Accepts either an array OR an object like { studentList: [...] }
    setRecentStudents(state, action) {
      const payload = normalizePayload(action.payload);
      state.recentStudents = payload?.studentList ?? [];
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    setStudentObject(state, action) {
      state.studentObject = action.payload ?? { id: null, name: "", age: null, department: "" };
    },
    setStudentPaginationObject(state, action) {
      const payload = normalizePayload(action.payload);
      if (!payload) return;
      const { studentList = [], currentPage = 0, totalPages = 0, totalElements = 0 } = payload;
      state.studentPaginationObject = { studentList, currentPage, totalPages, totalElements };
    },
    setDepartmentCount(state, action) {
      const payload = action.payload;
      const val = (payload && payload.data) ?? (payload ?? 0);
      state.departmentCount = typeof val === "number" ? val : Number(val) || 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsThunk.fulfilled, (state, action) => {
        const payload = normalizePayload(action.payload);
        const { studentList = [], currentPage = 0, totalPages = 0, totalElements = 0 } = payload ?? {};
        state.studentPaginationObject = { studentList, currentPage, totalPages, totalElements };
        state.loading = false;
      })
      .addCase(fetchStudentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })

      .addCase(fetchLastPageThunk.fulfilled, (state, action) => {
        const payload = normalizePayload(action.payload);
        state.recentStudents = payload?.studentList ?? [];
      })
      .addCase(fetchLastPageThunk.rejected, (state) => {
        state.recentStudents = [];
      })

      .addCase(addStudentThunk.fulfilled, (state) => {
        // no-op; UI should refetch or update lists after add
      })
      .addCase(addStudentThunk.rejected, (state, action) => {
        state.error = action.payload || action.error;
      })

      .addCase(searchStudentsThunk.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchStudentsThunk.fulfilled, (state, action) => {
        const payload = normalizePayload(action.payload);
        state.searchResults = payload?.studentList ?? (Array.isArray(action.payload) ? action.payload : []);
        state.searchLoading = false;
      })
      .addCase(searchStudentsThunk.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchResults = [];
        state.error = action.payload || action.error;
      })

      .addCase(getNoOfDepartmentsThunk.fulfilled, (state, action) => {
        const payload = action.payload;
        const val = (payload && payload.data) ?? (payload ?? 0);
        state.departmentCount = typeof val === "number" ? val : Number(val) || 0;
      })
      .addCase(getNoOfDepartmentsThunk.rejected, (state) => {
        state.departmentCount = 0;
      });
  },
});

export const {
  setRecentStudents,
  clearSearchResults,
  setStudentObject,
  setStudentPaginationObject,
  setDepartmentCount,
} = studentsSlice.actions;

export default studentsSlice.reducer;
